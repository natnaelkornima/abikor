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

      {/* Crafted Isometric Studio Easel Figure */}
      <div className="mt-10">
        <EaselFigure
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

      {/* Kinfish-Style Photo/Painting Tile Grid */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredPaintings.map((painting, idx) => {
          // Parse aspect ratio string like "3/4" or "4/3"
          const [w, h] = painting.aspect ? painting.aspect.split("/").map(Number) : [4, 5];
          const aspectRatioStyle = {
            aspectRatio: `${w || 4} / ${h || 5}`,
            "--tone": painting.tone || "#1a1a1a",
          } as React.CSSProperties;

          return (
            <figure
              key={painting.id}
              className="k-tile"
              style={aspectRatioStyle}
            >
              <button
                type="button"
                className="k-tile__button"
                onClick={() => openViewer(idx)}
                aria-label={`Open painting ${idx + 1}: ${painting.title}`}
              >
                <div className="relative w-full h-full overflow-hidden">
                  <Image
                    src={painting.url}
                    alt={painting.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="k-tile__img"
                    priority={idx < 3}
                  />
                </div>
                <span aria-hidden="true" className="k-tile__corners" />
                <span aria-hidden="true" className="k-tile__number">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <span aria-hidden="true" className="k-tile__cap">
                  {painting.title}
                </span>
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

