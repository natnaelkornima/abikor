"use client";

import React, { useRef, useEffect, useState } from "react";
import OneStage from "anatomy-figures/one-stage";
import { portfolio, Painting } from "@/data/portfolio";

interface OneStageFigureProps {
  paintings?: Painting[];
  totalPaintings?: number;
  currentPaintingIndex?: number;
  onSelectPainting?: (index: number) => void;
  onOpenViewer?: (index: number) => void;
  theme?: "light" | "dark";
}

export function EaselFigure(props: OneStageFigureProps) {
  return <OneStageFigure {...props} />;
}

export function OneStageFigure({
  paintings: propPaintings,
  onOpenViewer,
  theme = "dark",
}: OneStageFigureProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const paintings =
    propPaintings && propPaintings.length > 0 ? propPaintings : portfolio.paintings;

  const [activeDrawer, setActiveDrawer] = useState<number | null>(null);

  // Inject painting artworks inside the drawers of OneStage and remove any background
  useEffect(() => {
    const rootEl = containerRef.current;
    if (!rootEl) return;

    let cleanupTimer: number;

    const attachDrawerArtworks = () => {
      // Find the anatomy-one-stage container element
      const stageHost = rootEl.querySelector('[data-anatomy-figure="anatomy-one-stage"]') as HTMLElement | null;
      if (!stageHost) {
        cleanupTimer = window.setTimeout(attachDrawerArtworks, 50);
        return;
      }

      const shadow = stageHost.shadowRoot;
      if (!shadow) {
        cleanupTimer = window.setTimeout(attachDrawerArtworks, 50);
        return;
      }

      // Inject clean transparency override directly into Shadow DOM
      if (!shadow.querySelector("#fig21-transparency-override")) {
        const style = document.createElement("style");
        style.id = "fig21-transparency-override";
        style.textContent = `
          .gk.gk-embed {
            background: transparent !important;
          }
          .fig21 {
            background: transparent !important;
            box-shadow: none !important;
          }
          .gk, .materials {
            --gk-paper: #121214 !important;
          }
        `;
        shadow.appendChild(style);
      }

      const svg = shadow.querySelector("svg");
      const drawerEls = shadow.querySelectorAll(".fig21-drawer");
      if (!svg || drawerEls.length === 0) {
        cleanupTimer = window.setTimeout(attachDrawerArtworks, 50);
        return;
      }

      // Check if defs exists, else create for clipPaths
      let defs = svg.querySelector("defs");
      if (!defs) {
        defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
        svg.insertBefore(defs, svg.firstChild);
      }

      drawerEls.forEach((drawerEl, idx) => {
        const painting = paintings[idx % paintings.length];
        if (!painting) return;

        // Check if artwork is already mounted
        if (drawerEl.querySelector(".fig21-painting-plate")) return;

        // Locate sheet top face
        const sheetEl = drawerEl.querySelector(".fig21-sheet");
        if (!sheetEl) return;

        const topPath =
          sheetEl.querySelector(".gk-top") ||
          sheetEl.querySelector(".gk-fill") ||
          sheetEl.querySelector("path");

        if (!topPath) return;

        const pathD = topPath.getAttribute("d");
        if (!pathD) return;

        // Get bounding box of sheet
        let bbox = { x: 100, y: 100, width: 200, height: 120 };
        try {
          const b = (topPath as SVGGraphicsElement).getBBox();
          if (b && b.width > 0 && b.height > 0) {
            bbox = b;
          }
        } catch {
          // fallback to defaults
        }

        const clipId = `fig21-painting-clip-${idx}`;
        let clipPath = defs?.querySelector(`#${clipId}`);
        if (!clipPath) {
          clipPath = document.createElementNS("http://www.w3.org/2000/svg", "clipPath");
          clipPath.id = clipId;
          const clipP = document.createElementNS("http://www.w3.org/2000/svg", "path");
          clipP.setAttribute("d", pathD);
          clipPath.appendChild(clipP);
          defs?.appendChild(clipPath);
        }

        // Create painting group
        const plateGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
        plateGroup.setAttribute("class", "fig21-painting-plate");
        plateGroup.setAttribute("clip-path", `url(#${clipId})`);
        plateGroup.style.cursor = "pointer";

        // Painting Artwork Image
        const img = document.createElementNS("http://www.w3.org/2000/svg", "image");
        img.setAttributeNS("http://www.w3.org/1999/xlink", "href", painting.url);
        img.setAttribute("href", painting.url);
        img.setAttribute("x", String(bbox.x - 4));
        img.setAttribute("y", String(bbox.y - 4));
        img.setAttribute("width", String(bbox.width + 8));
        img.setAttribute("height", String(bbox.height + 8));
        img.setAttribute("preserveAspectRatio", "xMidYMid slice");
        img.setAttribute("style", "filter: contrast(1.08) brightness(1.02);");

        // Subtle archival glaze overlay
        const glaze = document.createElementNS("http://www.w3.org/2000/svg", "path");
        glaze.setAttribute("d", pathD);
        glaze.setAttribute("fill", "#050508");
        glaze.setAttribute("opacity", "0.18");

        plateGroup.appendChild(img);
        plateGroup.appendChild(glaze);

        // Click on painting opens full viewer
        plateGroup.addEventListener("click", (e) => {
          e.stopPropagation();
          if (onOpenViewer) onOpenViewer(idx % paintings.length);
        });

        // Insert inside drawer after sheet
        sheetEl.parentNode?.insertBefore(plateGroup, sheetEl.nextSibling);
      });

      // Track active drawer state for interactive sync
      const slider = shadow.querySelector(".fig21");
      if (slider) {
        const observer = new MutationObserver(() => {
          const pickedAttr = slider.getAttribute("data-picked");
          if (pickedAttr !== null) {
            const valNow = slider.getAttribute("aria-valuenow");
            const num = valNow ? parseInt(valNow, 10) - 1 : null;
            setActiveDrawer(num);
          } else {
            setActiveDrawer(null);
          }
        });
        observer.observe(slider, { attributes: true, attributeFilter: ["data-picked", "aria-valuenow"] });
      }
    };

    cleanupTimer = window.setTimeout(attachDrawerArtworks, 80);

    return () => {
      window.clearTimeout(cleanupTimer);
    };
  }, [paintings, onOpenViewer]);

  const currentPainting =
    activeDrawer !== null ? paintings[activeDrawer % paintings.length] : null;

  return (
    <div className="relative w-full select-none -mt-6 sm:-mt-10">
      {/* Remove black background completely — only the design renders */}
      <style>{`
        [data-anatomy-figure="anatomy-one-stage"],
        [data-anatomy-figure="anatomy-one-stage"] > div {
          background: transparent !important;
          box-shadow: none !important;
          padding-top: 0px !important;
          padding-bottom: 18px !important;
        }
        [data-anatomy-figure="anatomy-one-stage"] .gk-stage-head {
          margin-bottom: 2px !important;
        }
      `}</style>

      <div ref={containerRef} className="w-full bg-transparent">
        <OneStage
          theme={theme}
          tokens={{
            "--anatomy-card": "transparent",
          }}
        />
      </div>

      {/* Synchronized painting title pill when a drawer is open */}
      {currentPainting && (
        <div className="mt-2 flex items-center justify-center gap-2 animate-in fade-in duration-200">
          <button
            type="button"
            onClick={() => {
              if (activeDrawer !== null && onOpenViewer) {
                onOpenViewer(activeDrawer % paintings.length);
              }
            }}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#161618] px-3.5 py-1 text-xs font-mono text-[#ededed] shadow-lg hover:border-white/20 hover:bg-[#202022] transition-colors"
          >
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#3b82f6] animate-pulse" />
            <span className="text-[#a0a0a0]">Inside Drawer:</span>
            <span className="font-medium text-white">{currentPainting.title}</span>
            <span className="text-[#737373]">&middot; {currentPainting.year}</span>
            <span className="text-xs text-[#a0a0a0] ml-1">↗</span>
          </button>
        </div>
      )}
    </div>
  );
}
