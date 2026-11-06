"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { portfolio, Painting } from "@/data/portfolio";
import { EaselFigure } from "@/components/figures/easel-figure";
import { X, ChevronLeft, ChevronRight, SlidersHorizontal } from "lucide-react";

export default function PaintingsPage() {
  const { paintings } = portfolio;
  const [activeFilter, setActiveFilter] = useState("All");
  const [viewerIndex, setViewerIndex] = useState<number | null>(null);
  const [isColorMode, setIsColorMode] = useState(true);

  const tags = ["All", "Symbolism", "Fantasy", "Classical", "Expressionism"];

  const filteredPaintings: Painting[] =
    activeFilter === "All"
      ? paintings
      : paintings.filter((p) => p.tag === activeFilter);

  const openViewer = (index: number) => {
    setViewerIndex(index);
  };

  const closeViewer = useCallback(() => {
    setViewerIndex(null);
  }, []);

  const handlePrev = useCallback(() => {
    if (viewerIndex === null) return;
    setViewerIndex((prev) =>
      prev !== null
        ? (prev - 1 + filteredPaintings.length) % filteredPaintings.length
        : 0
    );
  }, [viewerIndex, filteredPaintings.length]);

  const handleNext = useCallback(() => {
    if (viewerIndex === null) return;
    setViewerIndex((prev) =>
      prev !== null ? (prev + 1) % filteredPaintings.length : 0
    );
  }, [viewerIndex, filteredPaintings.length]);

  // Keyboard navigation for the viewer
  useEffect(() => {
    if (viewerIndex === null) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeViewer();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key.toLowerCase() === "c") {
        setIsColorMode((prev) => !prev);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [viewerIndex, closeViewer, handlePrev, handleNext]);

  const currentPainting =
    viewerIndex !== null ? filteredPaintings[viewerIndex] : null;

  return (
    <div>
      <header className="grid items-start gap-10">
        <div>
          <p className="k-label">
            <span className="text-[#6e6e6e]">04</span>
            <span aria-hidden="true" className="mx-1.5 text-[#4a4a4a]">
              /
            </span>
            <span>Paintings</span>
          </p>
          <h1 className="mt-3 text-2xl font-medium tracking-[-0.025em] text-[#ededed]">
            Favorite Paintings
          </h1>
          <div className="mt-4 max-w-[62ch] font-sans space-y-4 leading-7 text-[#b7b7b7]">
            A personal curation of paintings, chiaroscuro studies, and evocative
            symbolist masterworks that inspire my technical work. Open any
            canvas to examine its brushwork, palette, and composition.
          </div>
        </div>
      </header>

      {/* Anatomy One Stage Figure (Chest of Seven Drawers) */}
      <div className="mt-4 sm:mt-6">
        <EaselFigure
          paintings={filteredPaintings}
          totalPaintings={filteredPaintings.length}
          onOpenViewer={(idx) => openViewer(idx)}
        />
      </div>

      {/* Tag Filters */}
      <div className="mt-8 flex flex-wrap items-center gap-2">
        {tags.map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => {
              setActiveFilter(tag);
              setViewerIndex(null);
            }}
            className={`rounded-[4px] border px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider transition-colors duration-140 ${
              activeFilter === tag
                ? "border-white/30 bg-[#ededed] text-black font-semibold"
                : "border-[#303030] bg-[#1c1c1c] text-[#8e8e8e] hover:border-white/20 hover:text-[#ededed]"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Pinterest-Style Masonry Columns Gallery (Natural Uncropped Heights) */}
      <div className="mt-8 columns-1 gap-4 sm:columns-2 lg:columns-3 [column-fill:_balance]">
        {filteredPaintings.map((painting, idx) => {
          return (
            <figure
              key={painting.id}
              className="group mb-4 break-inside-avoid overflow-hidden rounded-[5px] border border-[#262626] bg-[#161616] transition-all duration-300 hover:border-[#404040] hover:shadow-[0_12px_32px_rgba(0,0,0,0.7)]"
            >
              <button
                type="button"
                className="relative block w-full text-left cursor-zoom-in"
                onClick={() => openViewer(idx)}
                aria-label={`Open painting ${idx + 1}: ${painting.title}`}
              >
                {/* Natural-Height Canvas Container (No cropping, full height) */}
                <div
                  className="relative w-full overflow-hidden"
                  style={{ backgroundColor: painting.tone || "#181818" }}
                >
                  <img
                    src={painting.url}
                    alt={painting.title}
                    className="w-full h-auto block filter grayscale contrast-[1.06] brightness-[0.88] transition-all duration-700 ease-out group-hover:scale-[1.025] group-hover:grayscale-0 group-hover:contrast-[1.02] group-hover:brightness-[1]"
                    loading="lazy"
                  />

                  {/* Corner registration marks */}
                  <span aria-hidden="true" className="k-tile__corners" />

                  {/* Top-left number badge */}
                  <span
                    aria-hidden="true"
                    className="absolute top-2.5 left-2.5 rounded-[3px] bg-black/70 px-1.5 py-0.5 font-mono text-[10px] text-[#ededed] backdrop-blur-sm border border-white/10"
                  >
                    {String(idx + 1).padStart(2, "0")}
                  </span>

                  {/* Top-right tag badge */}
                  <span
                    aria-hidden="true"
                    className="absolute top-2.5 right-2.5 rounded-[3px] bg-black/70 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-[#a0a0a0] backdrop-blur-sm border border-white/10"
                  >
                    {painting.tag}
                  </span>

                  {/* Minimal Title overlay badge revealed strictly on hover */}
                  <span
                    aria-hidden="true"
                    className="absolute bottom-2.5 left-2.5 right-2.5 rounded-[3px] bg-black/80 px-2 py-1 font-mono text-[10px] text-[#ededed] backdrop-blur-sm border border-white/10 opacity-0 transition-all duration-300 transform translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 truncate pointer-events-none"
                  >
                    {painting.title}
                  </span>
                </div>
              </button>
            </figure>
          );
        })}
      </div>

      {/* Kinfish Fullscreen Lightbox Viewer (k-viewer) */}
      {viewerIndex !== null && currentPainting && (
        <div
          className="k-viewer"
          role="dialog"
          aria-modal="true"
          aria-label={currentPainting.title}
        >
          {/* Top Bar */}
          <div className="k-viewer__bar">
            <div className="flex items-center gap-3">
              <span className="font-mono text-[11px] uppercase tracking-wider text-[#ededed]">
                {String(viewerIndex + 1).padStart(2, "0")}
                <span className="text-[#6e6e6e] mx-1.5">/</span>
                {String(filteredPaintings.length).padStart(2, "0")}
              </span>
              <button
                type="button"
                onClick={() => setIsColorMode(!isColorMode)}
                className="flex items-center gap-1.5 rounded border border-[#333] bg-[#1a1a1a] px-2 py-0.5 font-mono text-[10px] text-[#8e8e8e] hover:text-[#ededed] transition-colors"
                title="Toggle monochrome / color filter (press C)"
              >
                <span
                  className={`k-viewer__swatch ${isColorMode ? "is-on" : ""}`}
                />
                <span>{isColorMode ? "Color" : "Mono"}</span>
              </button>
            </div>

            <button
              type="button"
              onClick={closeViewer}
              className="flex items-center gap-1.5 rounded border border-[#333] bg-[#1a1a1a] px-2.5 py-1 font-mono text-[11px] text-[#8e8e8e] hover:text-[#ededed] hover:border-white/20 transition-colors"
            >
              <span>Esc</span>
              <X className="size-3.5" />
            </button>
          </div>

          {/* Central Stage */}
          <div className="k-viewer__stage">
            <button
              type="button"
              className="k-viewer__step"
              onClick={handlePrev}
              aria-label="Previous painting (Arrow Left)"
            >
              <ChevronLeft className="size-5" />
            </button>

            <div className="relative max-w-full max-h-[calc(100svh-220px)] flex items-center justify-center">
              <img
                src={currentPainting.url}
                alt={currentPainting.title}
                className={`k-viewer__img ${isColorMode ? "is-color" : ""}`}
              />
            </div>

            <button
              type="button"
              className="k-viewer__step"
              onClick={handleNext}
              aria-label="Next painting (Arrow Right)"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>

          {/* Footer Metadata & Thumbnail Strip */}
          <div className="k-viewer__foot border-t border-[#222]">
            <div className="k-viewer__meta">
              <div>
                <h2 className="text-[15px] font-medium text-[#ededed]">
                  {currentPainting.title}
                </h2>
                <div className="mt-0.5 flex flex-wrap items-center gap-2 font-mono text-[11px] text-[#8e8e8e]">
                  <span>{currentPainting.artist || "Traditional Masterwork"}</span>
                  <span className="text-[#444]">·</span>
                  <span>{currentPainting.medium}</span>
                  <span className="text-[#444]">·</span>
                  <span>{currentPainting.year}</span>
                  <span className="text-[#444]">·</span>
                  <span className="rounded bg-[#222] px-1.5 py-0.2 text-[10px] text-[#a0a0a0]">
                    {currentPainting.tag}
                  </span>
                </div>
                <p className="mt-1 text-[13px] leading-relaxed text-[#b0b0b0] max-w-[70ch]">
                  {currentPainting.description}
                </p>
              </div>
            </div>

            {/* Thumbnail Navigation Strip */}
            <div className="k-viewer__strip">
              {filteredPaintings.map((p, idx) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setViewerIndex(idx)}
                  className={`k-viewer__thumb ${
                    idx === viewerIndex ? "is-current" : ""
                  }`}
                  aria-label={`View ${p.title}`}
                >
                  <img src={p.url} alt={p.title} />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

