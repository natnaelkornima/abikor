"use client";

import React, { useState } from "react";
import { portfolio } from "@/data/portfolio";
import { Camera, MapPin, Eye } from "lucide-react";

export default function PicsPage() {
  const { pics } = portfolio;
  const [filter, setFilter] = useState("All");
  const [activePic, setActivePic] = useState<string | null>(null);
  const [flash, setFlash] = useState(false);

  const tags = ["All", "Addis Ababa", "Highlands", "Architecture", "Craft"];

  const filteredPics =
    filter === "All" ? pics : pics.filter((p) => p.tag === filter);

  const triggerShutter = () => {
    setFlash(true);
    setTimeout(() => setFlash(false), 200);
  };

  return (
    <div>
      <header className="grid items-start gap-10">
        <div>
          <p className="k-label">
            <span className="text-[#6e6e6e]">04</span>
            <span aria-hidden="true" className="mx-1.5 text-[#4a4a4a]">/</span>
            <span>Pics</span>
          </p>
          <h1 className="mt-3 text-2xl font-medium tracking-[-0.025em] text-[#ededed]">
            Pictures
          </h1>
          <div className="mt-4 max-w-[60ch] space-y-4 leading-7 text-[#b7b7b7]">
            Things I stopped to look at, from the bustling avenues of Addis Ababa to the quiet ridges of the highlands. Open one to inspect details.
          </div>
        </div>
      </header>

      {/* Retro Instant Camera Visualizer */}
      <div className="mt-10">
        <figure className="k-iso">
          <div className="k-iso__bar">
            <span>Instant Camera // Viewfinder</span>
            <span className="text-[#6e6e6e]">
              AUTO · 1/125s · {filteredPics.length} PRINTS
            </span>
          </div>
          <div className="k-iso__stage relative flex flex-col items-center justify-center py-8 overflow-hidden">
            {/* Shutter Flash Effect */}
            {flash && (
              <div className="absolute inset-0 bg-white z-20 pointer-events-none transition-opacity duration-150" />
            )}

            <div className="flex flex-col items-center gap-3">
              <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-[#333] bg-[#161616] shadow-xl">
                <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-teal-500/40 bg-[#1e1e1e]">
                  <div className="h-6 w-6 rounded-full bg-teal-400/20 border border-teal-400/60 animate-pulse" />
                </div>
              </div>

              <button
                type="button"
                onClick={triggerShutter}
                className="flex items-center gap-2 rounded border border-[#3e3e3e] bg-[#222] px-3.5 py-1.5 font-mono text-[11px] text-[#ededed] hover:bg-[#2a2a2a] active:scale-95 transition-all"
              >
                <Camera className="size-3.5" />
                PRESS SHUTTER
              </button>
            </div>
          </div>
        </figure>
      </div>

      {/* Tag Filters */}
      <div className="mt-8 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => setFilter(tag)}
            className={`rounded-[4px] border px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider transition-colors duration-140 ${
              filter === tag
                ? "border-white/30 bg-[#ededed] text-black"
                : "border-[#303030] bg-[#1c1c1c] text-[#8e8e8e] hover:border-white/20 hover:text-[#ededed]"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {filteredPics.map((pic) => (
          <div
            key={pic.id}
            onClick={() => setActivePic(pic.id === activePic ? null : pic.id)}
            className="group rounded-md border border-[#2a2a2a] bg-[#1a1a1a] p-4 transition-all duration-150 hover:border-white/20 cursor-pointer"
          >
            {/* Artistic Color Placeholder Frame */}
            <div
              className={`relative flex items-center justify-center rounded border border-[#333] bg-gradient-to-br ${pic.tone} h-40 overflow-hidden`}
            >
              <div className="text-center font-mono text-xs text-[#888] select-none">
                <div className="text-white/80 font-medium mb-1">{pic.title}</div>
                <div className="text-[10px] text-white/50">{pic.location}</div>
              </div>
              <div className="absolute bottom-2 right-2 flex items-center gap-1 rounded bg-black/60 px-1.5 py-0.5 font-mono text-[9px] text-white/70 backdrop-blur-sm">
                <Eye className="size-3" />
                {pic.aspect}
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between">
              <span className="text-[14px] font-medium text-[#ededed] group-hover:underline decoration-[#525252] underline-offset-4">
                {pic.title}
              </span>
              <span className="k-chip">{pic.tag}</span>
            </div>

            <div className="mt-1 flex items-center gap-1 text-[11.5px] font-mono text-[#6e6e6e]">
              <MapPin className="size-3" />
              <span>{pic.location}</span>
              <span className="mx-1">·</span>
              <span>{pic.year}</span>
            </div>

            <p className="mt-2 text-[12.5px] leading-relaxed text-[#929292]">
              {pic.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

