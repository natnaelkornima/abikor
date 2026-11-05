"use client";

import React, { useState } from "react";
import { portfolio } from "@/data/portfolio";
import { MapPin, Eye } from "lucide-react";
import { InstantCameraFigure } from "@/components/figures/instant-camera-figure";

export default function PicsPage() {
  const { pics } = portfolio;
  const [filter, setFilter] = useState("All");
  const [activePic, setActivePic] = useState<string | null>(null);

  const tags = ["All", "Addis Ababa", "Highlands", "Architecture", "Craft"];

  const filteredPics =
    filter === "All" ? pics : pics.filter((p) => p.tag === filter);

  return (
    <div>
      <header className="grid items-start gap-10">
        <div>
          <p className="k-label">
            <span className="text-[#6e6e6e]">04</span>
            <span aria-hidden="true" className="mx-1.5 text-[#4a4a4a]">/</span>
            <span>Pics</span>
          </p>
          <h1 className="mt-3 text-[26px] sm:text-[30px] font-extrabold tracking-[-0.035em] text-[#ededed]">
            Pictures
          </h1>
          <div className="mt-4 max-w-[60ch] font-sans space-y-4 leading-7 text-[#b7b7b7]">
            Things I stopped to look at, from the bustling avenues of Addis Ababa to the quiet ridges of the highlands. Open one to inspect details.
          </div>
        </div>
      </header>

      {/* Crafted Isometric Instant Camera Figure from Anatomy Kit */}
      <div className="mt-10">
        <InstantCameraFigure framesLeft={filteredPics.length} />
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
                <div className="text-white/90 font-serif-regular text-sm font-medium mb-1">{pic.title}</div>
                <div className="text-[10px] text-white/50">{pic.location}</div>
              </div>
              <div className="absolute bottom-2 right-2 flex items-center gap-1 rounded bg-black/60 px-1.5 py-0.5 font-mono text-[9px] text-white/70 backdrop-blur-sm">
                <Eye className="size-3" />
                {pic.aspect}
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between">
              <span className="font-serif-regular text-[14.5px] font-medium text-[#ededed] group-hover:underline decoration-[#525252] underline-offset-4">
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

            <p className="mt-2 font-sans text-[12.5px] leading-relaxed text-[#929292]">
              {pic.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

