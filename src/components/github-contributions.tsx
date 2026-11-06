"use client";

import React, { useState, useMemo } from "react";
import staticContributions from "@/data/github-contributions.json";
import { ArrowUpRight } from "lucide-react";

interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

const YEAR_OPTIONS = [
  { id: "last-year" as const, label: "Last year" },
  { id: "2026" as const, label: "2026" },
  { id: "2025" as const, label: "2025" },
];

const MONTH_NAMES = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

const DAY_LABELS = [
  { day: 1, label: "Mon" },
  { day: 3, label: "Wed" },
  { day: 5, label: "Fri" },
];

export function GitHubContributions() {
  const [selectedPeriod, setSelectedPeriod] = useState<"last-year" | "2026" | "2025">("last-year");
  const [hoveredDay, setHoveredDay] = useState<ContributionDay | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(null);

  const allContributions: ContributionDay[] = useMemo(() => {
    return [...(staticContributions.contributions as ContributionDay[])].sort((a, b) =>
      a.date.localeCompare(b.date)
    );
  }, []);

  const filteredDays: ContributionDay[] = useMemo(() => {
    if (selectedPeriod === "2026") {
      return allContributions.filter((d) => d.date.startsWith("2026"));
    }
    if (selectedPeriod === "2025") {
      return allContributions.filter((d) => d.date.startsWith("2025"));
    }
    const latestDateStr = allContributions[allContributions.length - 1]?.date || "2026-12-31";
    const latestDate = new Date(latestDateStr);
    const oneYearAgo = new Date(latestDate);
    oneYearAgo.setDate(oneYearAgo.getDate() - 364);
    const minStr = oneYearAgo.toISOString().split("T")[0];

    const slice = allContributions.filter((d) => d.date >= minStr && d.date <= latestDateStr);
    return slice.length > 0 ? slice : allContributions.slice(-365);
  }, [allContributions, selectedPeriod]);

  const totalContributions = useMemo(() => {
    return filteredDays.reduce((acc, d) => acc + d.count, 0);
  }, [filteredDays]);

  const { weeks, monthHeaders } = useMemo(() => {
    if (filteredDays.length === 0) return { weeks: [], monthHeaders: [] };

    const firstDate = new Date(filteredDays[0].date);
    const firstDayOfWeek = firstDate.getDay();

    const columns: (ContributionDay | null)[][] = [];
    let currentWeek: (ContributionDay | null)[] = [];

    for (let i = 0; i < firstDayOfWeek; i++) {
      currentWeek.push(null);
    }

    const monthStarts: { month: string; colIndex: number }[] = [];
    let lastMonth = -1;

    filteredDays.forEach((day) => {
      const d = new Date(day.date + "T00:00:00");
      const m = d.getMonth();

      if (m !== lastMonth && d.getDate() <= 14) {
        monthStarts.push({
          month: MONTH_NAMES[m],
          colIndex: columns.length,
        });
        lastMonth = m;
      }

      currentWeek.push(day);

      if (currentWeek.length === 7) {
        columns.push(currentWeek);
        currentWeek = [];
      }
    });

    if (currentWeek.length > 0) {
      while (currentWeek.length < 7) {
        currentWeek.push(null);
      }
      columns.push(currentWeek);
    }

    return { weeks: columns, monthHeaders: monthStarts };
  }, [filteredDays]);

  // Restrained monochrome palette matching page background with subtle luminance steps
  const getLevelClasses = (level: number) => {
    switch (level) {
      case 1:
        return "bg-[#222226] border-white/[0.06] hover:border-white/20";
      case 2:
        return "bg-[#333339] border-white/[0.09] hover:border-white/30";
      case 3:
        return "bg-[#55555f] border-white/[0.14] hover:border-white/40";
      case 4:
        return "bg-[#9a9aa5] border-white/[0.22] hover:border-white/60";
      default:
        return "bg-[#151517] border-white/[0.03] hover:border-white/10";
    }
  };

  const formatDate = (dateStr: string) => {
    try {
      const [y, m, d] = dateStr.split("-").map(Number);
      const dt = new Date(Date.UTC(y, m - 1, d));
      return dt.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        timeZone: "UTC",
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="relative w-full rounded-[6px] border border-white/[0.08] bg-[#121214]/60 p-4 sm:p-5">
      {/* Clean, quiet header: Real GitHub mark, count, period switcher */}
      <div className="flex items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          {/* Real official GitHub SVG mark */}
          <svg
            className="size-4 shrink-0 fill-[#8e8e8e]"
            viewBox="0 0 16 16"
            aria-hidden="true"
          >
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
          </svg>
          <span className="font-mono text-[#ededed]">
            {totalContributions} contributions
          </span>
          <span className="text-[#555]">&middot;</span>
          <span className="font-mono text-[#737373]">
            {selectedPeriod === "last-year" ? "last year" : selectedPeriod}
          </span>
        </div>

        {/* Minimal text-based year filter */}
        <div className="flex items-center gap-2.5 font-mono text-[11px]">
          {YEAR_OPTIONS.map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => setSelectedPeriod(opt.id)}
              className={`transition-colors ${
                selectedPeriod === opt.id
                  ? "text-[#ededed] underline decoration-white/30 underline-offset-4"
                  : "text-[#666] hover:text-[#999]"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Heatmap Grid */}
      <div className="mt-4 w-full overflow-x-auto pb-1 scrollbar-none">
        <div className="min-w-[660px]">
          {/* Month labels */}
          <div className="relative mb-1 flex h-3.5 pl-6 font-mono text-[9.5px] text-[#5e5e5e]">
            {monthHeaders.map((m, i) => (
              <span
                key={`${m.month}-${i}`}
                style={{
                  position: "absolute",
                  left: `${24 + m.colIndex * 12.5}px`,
                }}
              >
                {m.month}
              </span>
            ))}
          </div>

          {/* Grid rows */}
          <div className="flex gap-1.5">
            {/* Weekday indicators */}
            <div className="flex flex-col justify-between py-0.5 font-mono text-[8.5px] text-[#555]">
              {DAY_LABELS.map((d) => (
                <span
                  key={d.label}
                  style={{
                    height: "10px",
                    lineHeight: "10px",
                    marginTop: d.day === 1 ? "11px" : d.day === 3 ? "12px" : "12px",
                  }}
                >
                  {d.label}
                </span>
              ))}
            </div>

            {/* Weeks Columns */}
            <div className="flex gap-[2.5px]">
              {weeks.map((week, wIdx) => (
                <div key={`w-${wIdx}`} className="flex flex-col gap-[2.5px]">
                  {week.map((day, dIdx) => {
                    if (!day) {
                      return (
                        <div
                          key={`empty-${wIdx}-${dIdx}`}
                          className="h-[10px] w-[10px] opacity-0"
                        />
                      );
                    }

                    return (
                      <div
                        key={day.date}
                        onMouseEnter={(e) => {
                          const rect = e.currentTarget.getBoundingClientRect();
                          setHoveredDay(day);
                          setTooltipPos({
                            x: rect.left + rect.width / 2,
                            y: rect.top,
                          });
                        }}
                        onMouseLeave={() => {
                          setHoveredDay(null);
                          setTooltipPos(null);
                        }}
                        className={`h-[10px] w-[10px] cursor-pointer rounded-[2px] border transition-colors ${getLevelClasses(
                          day.level
                        )}`}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Floating Minimal Tooltip */}
      {hoveredDay && tooltipPos && (
        <div
          style={{
            position: "fixed",
            left: `${tooltipPos.x}px`,
            top: `${tooltipPos.y - 6}px`,
            transform: "translate(-50%, -100%)",
            pointerEvents: "none",
            zIndex: 9999,
          }}
          className="rounded-[4px] border border-white/10 bg-[#161618] px-2 py-1 font-mono text-[10.5px] shadow-lg"
        >
          <span className="text-[#ededed]">
            {hoveredDay.count === 0 ? "No commits" : `${hoveredDay.count} commit${hoveredDay.count === 1 ? "" : "s"}`}
          </span>{" "}
          <span className="text-[#737373]">&middot; {formatDate(hoveredDay.date)}</span>
        </div>
      )}

      {/* Quiet Footer: Handle link + Minimal scale */}
      <div className="mt-3 flex items-center justify-between border-t border-white/[0.05] pt-2.5 font-mono text-[10.5px] text-[#6e6e6e]">
        <a
          href="https://github.com/natnaelkornima"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-1 hover:text-[#ededed] transition-colors"
        >
          <span>@natnaelkornima</span>
          <ArrowUpRight className="size-3 text-[#555] transition-colors group-hover:text-[#ededed]" />
        </a>

        {/* Quiet monochrome ramp */}
        <div className="flex items-center gap-1">
          <span>Less</span>
          <span className="h-[9px] w-[9px] rounded-[1.5px] border border-white/[0.03] bg-[#151517]" />
          <span className="h-[9px] w-[9px] rounded-[1.5px] border border-white/[0.06] bg-[#222226]" />
          <span className="h-[9px] w-[9px] rounded-[1.5px] border border-white/[0.09] bg-[#333339]" />
          <span className="h-[9px] w-[9px] rounded-[1.5px] border border-white/[0.14] bg-[#55555f]" />
          <span className="h-[9px] w-[9px] rounded-[1.5px] border border-white/[0.22] bg-[#9a9aa5]" />
          <span>More</span>
        </div>
      </div>
    </div>
  );
}
