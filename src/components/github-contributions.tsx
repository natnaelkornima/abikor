"use client";

import React, { useState, useMemo, useRef, useEffect, useCallback } from "react";
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

export function GitHubContributions() {
  const [selectedPeriod, setSelectedPeriod] = useState<"last-year" | "2026" | "2025">("last-year");
  const [hoveredDay, setHoveredDay] = useState<ContributionDay | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(null);

  // Drag-to-scroll refs & state
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(0);
  const dragStartScrollLeft = useRef(0);
  const hasMoved = useRef(false);

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

  // Default view: automatically scroll to the closest (most recent) contributions on the right
  const scrollToClosest = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    el.scrollLeft = el.scrollWidth - el.clientWidth;
  }, []);

  useEffect(() => {
    // Run scroll on mount and whenever period / data updates
    const timer = setTimeout(scrollToClosest, 50);
    return () => clearTimeout(timer);
  }, [scrollToClosest, selectedPeriod, weeks.length]);

  // Drag-to-scroll event handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    const el = scrollContainerRef.current;
    if (!el) return;
    setIsDragging(true);
    hasMoved.current = false;
    dragStartX.current = e.pageX - el.offsetLeft;
    dragStartScrollLeft.current = el.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const el = scrollContainerRef.current;
    if (!el) return;
    e.preventDefault();
    const x = e.pageX - el.offsetLeft;
    const walk = (x - dragStartX.current) * 1.25;
    if (Math.abs(walk) > 3) {
      hasMoved.current = true;
      setHoveredDay(null); // dismiss tooltip while dragging
    }
    el.scrollLeft = dragStartScrollLeft.current - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Authentic GitHub Green Palette with subtle emerald luminescence
  const getLevelClasses = (level: number) => {
    switch (level) {
      case 1:
        return "bg-[#0e4429] border-[#006d32]/40 hover:border-[#26a641]";
      case 2:
        return "bg-[#006d32] border-[#26a641]/50 hover:border-[#39d353]";
      case 3:
        return "bg-[#26a641] border-[#39d353]/70 hover:ring-1 hover:ring-[#39d353]";
      case 4:
        return "bg-[#39d353] border-[#39d353] shadow-[0_0_8px_rgba(57,211,83,0.35)] hover:ring-1 hover:ring-white";
      default:
        return "bg-[#151517] border-white/[0.04] hover:border-white/15";
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

  // Dimensions: 13px cell + 4px gap = 17px per column
  const CELL_SIZE = 13;
  const GAP_SIZE = 4;
  const COL_PITCH = CELL_SIZE + GAP_SIZE; // 17px
  const LEFT_OFFSET = 32;

  return (
    <div className="relative w-full rounded-[8px] border border-dotted border-[#35353a] bg-[#121214]/60 p-4 sm:p-5 select-none transition-colors">
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

      {/* Heatmap Grid with Drag-to-Scroll support (Defaulted to closest/recent on right) */}
      <div
        ref={scrollContainerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className={`mt-5 w-full overflow-x-auto pb-2 scrollbar-none ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
      >
        <div style={{ minWidth: `${LEFT_OFFSET + weeks.length * COL_PITCH + 10}px` }}>
          {/* Month labels header */}
          <div className="relative mb-2 flex h-3.5 font-mono text-[10px] text-[#666]">
            {monthHeaders.map((m, i) => (
              <span
                key={`${m.month}-${i}`}
                style={{
                  position: "absolute",
                  left: `${LEFT_OFFSET + m.colIndex * COL_PITCH}px`,
                }}
              >
                {m.month}
              </span>
            ))}
          </div>

          {/* Grid rows */}
          <div className="flex gap-2">
            {/* Weekday indicators precisely matched to 7-row heights */}
            <div
              className="flex flex-col font-mono text-[9px] text-[#555] select-none"
              style={{ gap: `${GAP_SIZE}px` }}
            >
              <span style={{ height: `${CELL_SIZE}px`, lineHeight: `${CELL_SIZE}px` }} className="opacity-0">Sun</span>
              <span style={{ height: `${CELL_SIZE}px`, lineHeight: `${CELL_SIZE}px` }}>Mon</span>
              <span style={{ height: `${CELL_SIZE}px`, lineHeight: `${CELL_SIZE}px` }} className="opacity-0">Tue</span>
              <span style={{ height: `${CELL_SIZE}px`, lineHeight: `${CELL_SIZE}px` }}>Wed</span>
              <span style={{ height: `${CELL_SIZE}px`, lineHeight: `${CELL_SIZE}px` }} className="opacity-0">Thu</span>
              <span style={{ height: `${CELL_SIZE}px`, lineHeight: `${CELL_SIZE}px` }}>Fri</span>
              <span style={{ height: `${CELL_SIZE}px`, lineHeight: `${CELL_SIZE}px` }} className="opacity-0">Sat</span>
            </div>

            {/* Weeks Columns: each cell is 13px x 13px with 3.5px border radius and 4px breathing gap */}
            <div className="flex" style={{ gap: `${GAP_SIZE}px` }}>
              {weeks.map((week, wIdx) => (
                <div key={`w-${wIdx}`} className="flex flex-col" style={{ gap: `${GAP_SIZE}px` }}>
                  {week.map((day, dIdx) => {
                    if (!day) {
                      return (
                        <div
                          key={`empty-${wIdx}-${dIdx}`}
                          style={{ width: `${CELL_SIZE}px`, height: `${CELL_SIZE}px` }}
                          className="opacity-0"
                        />
                      );
                    }

                    return (
                      <div
                        key={day.date}
                        style={{ width: `${CELL_SIZE}px`, height: `${CELL_SIZE}px` }}
                        onMouseEnter={(e) => {
                          if (isDragging || hasMoved.current) return;
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
                        className={`rounded-[3.5px] border transition-transform duration-75 hover:scale-115 hover:z-20 ${getLevelClasses(
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
      {hoveredDay && tooltipPos && !isDragging && (
        <div
          style={{
            position: "fixed",
            left: `${tooltipPos.x}px`,
            top: `${tooltipPos.y - 7}px`,
            transform: "translate(-50%, -100%)",
            pointerEvents: "none",
            zIndex: 9999,
          }}
          className="rounded-[4px] border border-white/10 bg-[#161618] px-2.5 py-1 font-mono text-[10.5px] shadow-lg"
        >
          <span className="text-[#ededed]">
            {hoveredDay.count === 0 ? "No commits" : `${hoveredDay.count} commit${hoveredDay.count === 1 ? "" : "s"}`}
          </span>{" "}
          <span className="text-[#737373]">&middot; {formatDate(hoveredDay.date)}</span>
        </div>
      )}

      {/* Quiet Footer: Handle link + Green intensity scale */}
      <div className="mt-4 flex items-center justify-between border-t border-dotted border-[#35353a] pt-3 font-mono text-[10.5px] text-[#6e6e6e]">
        <a
          href="https://github.com/natnaelkornima"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-1 hover:text-[#ededed] transition-colors"
        >
          <span>@natnaelkornima</span>
          <ArrowUpRight className="size-3 text-[#555] transition-colors group-hover:text-[#ededed]" />
        </a>

        {/* Green scale with matching rounded radius */}
        <div className="flex items-center gap-1.5">
          <span>Less</span>
          <span className="h-[11px] w-[11px] rounded-[3px] border border-white/[0.04] bg-[#151517]" />
          <span className="h-[11px] w-[11px] rounded-[3px] border border-[#006d32]/40 bg-[#0e4429]" />
          <span className="h-[11px] w-[11px] rounded-[3px] border border-[#26a641]/50 bg-[#006d32]" />
          <span className="h-[11px] w-[11px] rounded-[3px] border border-[#39d353]/70 bg-[#26a641]" />
          <span className="h-[11px] w-[11px] rounded-[3px] border border-[#39d353] bg-[#39d353] shadow-[0_0_6px_rgba(57,211,83,0.3)]" />
          <span>More</span>
        </div>
      </div>
    </div>
  );
}
