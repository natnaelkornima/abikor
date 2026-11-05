"use client";

import React, { useState, useEffect, useRef } from "react";
import { IsoFigureContainer } from "@/lib/iso";
import { portfolio, Painting } from "@/data/portfolio";

interface CanvasCrateFigureProps {
  paintings?: Painting[];
  totalPaintings?: number;
  currentPaintingIndex?: number;
  onSelectPainting?: (index: number) => void;
  onOpenViewer?: (index: number) => void;
}

export function EaselFigure({
  paintings: propPaintings,
  currentPaintingIndex = 0,
  onSelectPainting,
  onOpenViewer,
}: CanvasCrateFigureProps) {
  const paintings = propPaintings && propPaintings.length > 0 ? propPaintings : portfolio.paintings;
  const [activeIdx, setActiveIdx] = useState(currentPaintingIndex);
  const [isPaused, setIsPaused] = useState(false);
  const isHoveredRef = useRef(false);

  // 11 Canvases with individual physical widths (spines), heights, and palette swatches
  const CANVAS_SPECS = [
    { t: 24, h: 145, tag: "01", spine: "#232b21", accent: "#4ade80", name: "Green Hag" },
    { t: 18, h: 152, tag: "02", spine: "#361c20", accent: "#f43f5e", name: "Solitude" },
    { t: 22, h: 142, tag: "03", spine: "#30241b", accent: "#fb923c", name: "Vigil" },
    { t: 16, h: 156, tag: "04", spine: "#1d252c", accent: "#38bdf8", name: "Veil" },
    { t: 26, h: 160, tag: "05", spine: "#2d2a21", accent: "#e2b340", name: "Angel" },
    { t: 20, h: 140, tag: "06", spine: "#271f2c", accent: "#a855f7", name: "Ascent" },
    { t: 24, h: 148, tag: "07", spine: "#1c272a", accent: "#2dd4bf", name: "Tactician" },
    { t: 18, h: 144, tag: "08", spine: "#2b2820", accent: "#facc15", name: "Wanderer" },
    { t: 25, h: 154, tag: "09", spine: "#1a1f2c", accent: "#818cf8", name: "Nocturne" },
    { t: 16, h: 138, tag: "10", spine: "#282828", accent: "#9ca3af", name: "Echoes" },
    { t: 22, h: 146, tag: "11", spine: "#1e2920", accent: "#34d399", name: "Guardian" },
  ];

  const handleSelect = (idx: number) => {
    const validIdx = (idx + paintings.length) % paintings.length;
    setActiveIdx(validIdx);
    if (onSelectPainting) onSelectPainting(validIdx);
  };

  const handleNext = () => {
    handleSelect(activeIdx + 1);
  };

  const handlePrev = () => {
    handleSelect(activeIdx - 1);
  };

  // Autonomous Cycle: pulls out the next canvas from the box to the ground every 5 seconds
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      if (!isHoveredRef.current) {
        handleSelect((activeIdx + 1) % paintings.length);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [activeIdx, isPaused, paintings.length]);

  const currentPainting: Painting = paintings[activeIdx] || paintings[0];

  return (
    <div
      className="w-full select-none"
      onMouseEnter={() => {
        isHoveredRef.current = true;
      }}
      onMouseLeave={() => {
        isHoveredRef.current = false;
      }}
    >
      <style>{`
        /* Smooth physical arc extracting canvas OUT from the box onto the ground */
        @keyframes extract-out-to-ground {
          0% {
            transform: translate(250px, -55px) scale(0.65) rotate(4deg);
            opacity: 0.2;
          }
          40% {
            transform: translate(120px, -35px) scale(0.85) rotate(1.5deg);
            opacity: 0.85;
          }
          85% {
            transform: translate(0px, 3px) scale(1.01) rotate(-0.5deg);
            opacity: 1;
          }
          100% {
            transform: translate(0px, 0px) scale(1) rotate(0deg);
            opacity: 1;
          }
        }
        .anim-extract {
          animation: extract-out-to-ground 0.75s cubic-bezier(0.18, 0.9, 0.25, 1) forwards;
          transform-origin: 160px 240px;
        }

        /* Ground Contact Shadow settling animation */
        @keyframes shadow-settle {
          0% { opacity: 0; transform: scale(0.6); }
          50% { opacity: 0.45; transform: scale(0.9); }
          100% { opacity: 0.85; transform: scale(1); }
        }
        .anim-shadow {
          animation: shadow-settle 0.75s cubic-bezier(0.18, 0.9, 0.25, 1) forwards;
          transform-origin: 160px 348px;
        }
      `}</style>

      {/* Official Isometric Anatomy Figure Container (.k-iso) */}
      <IsoFigureContainer
        name="Fig 04. / Archival Storage Box: Vertical Canvases with Ground Display"
        hint="Click any canvas in box to extract · Click ground canvas to expand"
        readout={`ON GROUND: ${String(activeIdx + 1).padStart(2, "0")}/${paintings.length} · "${currentPainting.title.toUpperCase().slice(0, 24)}"`}
        power={true}
        viewBox="0 0 720 400"
        label="Isometric anatomy figure showing a rectangular archival box with vertically stacked canvases like books, with one canvas pulled out and displayed standing on the studio ground in front."
      >
        <defs>
          {/* Clipping path for ground canvas artwork */}
          <clipPath id="ground-canvas-clip">
            <rect x="76" y="105" width="168" height="235" rx="2" />
          </clipPath>
        </defs>

        {/* Studio Ground Perspective Guidelines */}
        <g opacity="0.7">
          <line className="detail" x1="20" y1="360" x2="700" y2="360" />
          <line className="detail" x1="80" y1="390" x2="250" y2="280" strokeDasharray="4 4" />
          <line className="detail" x1="400" y1="390" x2="520" y2="280" strokeDasharray="4 4" />
        </g>

        {/* ========================================================== */}
        {/* 1. RECTANGULAR ARCHIVAL STORAGE BOX (IN PERSPECTIVE)       */}
        {/* ========================================================== */}
        <g transform="translate(285, 65)">
          {/* Box Floor Base Contact Shadow */}
          <polygon
            points="15,225 395,225 410,240 0,240"
            fill="#050508"
            opacity="0.8"
            filter="url(#k-soft)"
          />

          {/* Box Interior Rear Wall */}
          <rect className="face recess" x="18" y="12" width="372" height="188" rx="4" />
          {/* Inner Slat Guidelines */}
          <line className="detail" x1="18" y1="75" x2="390" y2="75" />
          <line className="detail" x1="18" y1="135" x2="390" y2="135" />

          {/* Box Interior Floor Rack (Where canvases stand vertically) */}
          <polygon points="18,185 390,185 405,215 5,215" className="face" />
          {/* Rack support lines */}
          <line className="detail" x1="10" y1="195" x2="400" y2="195" strokeWidth="1.5" />
          <line className="detail" x1="6" y1="205" x2="404" y2="205" strokeWidth="1.5" />

          {/* ======================================================== */}
          {/* 2. VERTICALLY STACKED CANVASES INSIDE THE BOX           */}
          {/* ======================================================== */}
          {/*
            Each canvas has its own thickness/width (t) and height (h) like books on a shelf!
            When clicked, it extracts out onto the ground!
          */}
          {(() => {
            let currentX = 28;
            return CANVAS_SPECS.map((spec, i) => {
              const isSelected = i === activeIdx;
              const canvasX = currentX;
              currentX += spec.t + 6;

              // If this is the extracted canvas, render the empty slot with guide lines!
              if (isSelected) {
                return (
                  <g key={i}>
                    {/* Empty Slot Groove / Extraction Guide */}
                    <rect
                      x={canvasX}
                      y={195 - spec.h + 20}
                      width={spec.t}
                      height={spec.h - 15}
                      rx="2"
                      fill="none"
                      stroke="var(--iso-accent-hi)"
                      strokeWidth="1.2"
                      strokeDasharray="3 3"
                      opacity="0.85"
                    />
                    <line
                      className="detail"
                      x1={canvasX + spec.t / 2}
                      y1={195}
                      x2={canvasX + spec.t / 2}
                      y2={212}
                      strokeWidth="1.5"
                    />
                    {/* Empty Slot Callout */}
                    <text
                      className="accent"
                      x={canvasX + spec.t / 2}
                      y={190 - spec.h + 12}
                      textAnchor="middle"
                      fontSize="7"
                      fontWeight="bold"
                    >
                      [OUT]
                    </text>
                  </g>
                );
              }

              // Normal Standing Vertical Canvas inside the box
              return (
                <g
                  key={i}
                  className="press"
                  role="button"
                  tabIndex={0}
                  onClick={() => handleSelect(i)}
                >
                  {/* Canvas Body Left Shadow */}
                  <rect
                    x={canvasX - 1}
                    y={195 - spec.h + 20}
                    width={spec.t + 2}
                    height={spec.h - 15}
                    rx="2"
                    fill="#0a0a0d"
                    opacity="0.5"
                  />

                  {/* Canvas Spine (Front Vertical Edge facing forward like a book) */}
                  <rect
                    className="face"
                    x={canvasX}
                    y={195 - spec.h + 20}
                    width={spec.t}
                    height={spec.h - 15}
                    rx="2.5"
                    style={{ fill: spec.spine }}
                  />

                  {/* Top Canvas Fold Edge */}
                  <polygon
                    className="face top"
                    points={`
                      ${canvasX},${195 - spec.h + 20}
                      ${canvasX + spec.t},${195 - spec.h + 20}
                      ${canvasX + spec.t - 3},${195 - spec.h + 16}
                      ${canvasX + 3},${195 - spec.h + 16}
                    `}
                  />

                  {/* Color Swatch / Palette Accent Ribbon */}
                  <rect
                    x={canvasX + 2}
                    y={195 - spec.h + 26}
                    width={Math.max(4, spec.t - 4)}
                    height="4"
                    rx="1"
                    fill={spec.accent}
                  />

                  {/* Vertical Canvas Number & Name along spine */}
                  <g transform={`translate(${canvasX + spec.t / 2}, ${195 - spec.h + 46}) rotate(90)`}>
                    <text
                      className="label"
                      x="0"
                      y="2.5"
                      textAnchor="start"
                      fontSize="7.5"
                      letterSpacing="0.05em"
                    >
                      {spec.tag} &middot; {spec.name.toUpperCase()}
                    </text>
                  </g>

                  {/* Bottom Stretcher Joint */}
                  <line
                    className="detail"
                    x1={canvasX + 2}
                    y1={195 - 4}
                    x2={canvasX + spec.t - 2}
                    y2={195 - 4}
                  />
                </g>
              );
            });
          })()}

          {/* Box Front Lower Wall (Retaining Lip) */}
          <polygon
            points="0,215 410,215 410,240 0,240"
            className="face top"
          />
          {/* Box Left Wall */}
          <polygon
            points="0,15 18,12 18,185 0,215"
            className="face"
          />
          {/* Box Right Wall */}
          <polygon
            points="390,12 410,15 410,215 390,185"
            className="face"
          />

          {/* Brass / Metallic Reinforced Corners with Screws */}
          <g>
            <rect className="face recess" x="0" y="215" width="16" height="25" />
            <circle className="accent" cx="8" cy="222" r="1.5" />
            <line className="detail" x1="6.8" y1="222" x2="9.2" y2="222" />
            <circle className="accent" cx="8" cy="233" r="1.5" />
            <line className="detail" x1="6.8" y1="233" x2="9.2" y2="233" />

            <rect className="face recess" x="394" y="215" width="16" height="25" />
            <circle className="accent" cx="402" cy="222" r="1.5" />
            <line className="detail" x1="400.8" y1="222" x2="403.2" y2="222" />
            <circle className="accent" cx="402" cy="233" r="1.5" />
            <line className="detail" x1="400.8" y1="233" x2="403.2" y2="233" />
          </g>

          {/* Archival Box Stencil Title */}
          <text
            className="label"
            x="20"
            y="232"
            fontSize="8"
            letterSpacing="0.1em"
            fontWeight="500"
          >
            ARCHIVE CRATE // {paintings.length} VERTICAL CANVASES (SELECTABLE)
          </text>
        </g>

        {/* ========================================================== */}
        {/* 3. THE EXTRACTED CANVAS DISPLAYED ON THE GROUND IN FRONT   */}
        {/* ========================================================== */}
        {/*
          This canvas has animated out of the box and is standing on the ground!
          Clicking it opens the high-resolution lightbox modal!
        */}
        <g
          key={activeIdx}
          className="cursor-pointer anim-extract"
          onClick={() => {
            if (onOpenViewer) onOpenViewer(activeIdx);
          }}
        >
          {/* Ground Contact Shadow */}
          <ellipse
            cx="160"
            cy="348"
            rx="102"
            ry="11"
            fill="#000000"
            opacity="0.9"
            filter="url(#k-soft)"
            className="anim-shadow"
          />

          {/* 3D Stretcher Bar Depth (Left Edge of Canvas) */}
          <polygon
            className="face"
            points="64,114 76,105 76,340 64,345"
          />
          {/* Raw Linen Wrapped Staples on side edge */}
          {[0, 1, 2, 3, 4, 5].map((s) => (
            <line
              key={s}
              className="detail"
              x1="68"
              y1={140 + s * 34}
              x2="72"
              y2={142 + s * 34}
              strokeWidth="1.2"
            />
          ))}

          {/* Front Canvas Face with Framed Artwork */}
          <rect
            className="face top"
            x="76"
            y="105"
            width="168"
            height="235"
            rx="2"
            strokeWidth="1.4"
          />

          {/* High-Resolution Artwork Image */}
          <g clipPath="url(#ground-canvas-clip)">
            <image
              href={currentPainting.url}
              x="76"
              y="105"
              width="168"
              height="235"
              preserveAspectRatio="xMidYMid slice"
              style={{ filter: "contrast(1.05) brightness(1.02)" }}
            />

            {/* Fine Linen Texture Overlay */}
            <line x1="76" y1="160" x2="244" y2="160" stroke="#ffffff" strokeWidth="0.5" strokeOpacity="0.04" strokeDasharray="3 3" />
            <line x1="76" y1="220" x2="244" y2="220" stroke="#ffffff" strokeWidth="0.5" strokeOpacity="0.04" strokeDasharray="3 3" />
            <line x1="76" y1="280" x2="244" y2="280" stroke="#ffffff" strokeWidth="0.5" strokeOpacity="0.04" strokeDasharray="3 3" />

            {/* Bottom Matte Studio Placard */}
            <rect x="76" y="312" width="168" height="28" fill="#0c0d12" opacity="0.92" />
            <text x="86" y="328" className="ink" fontSize="7.5" letterSpacing="0.04em">
              {currentPainting.title.toUpperCase().slice(0, 22)}
            </text>
          </g>

          {/* Metallic Corner Protection Brackets */}
          <path className="detail" stroke="var(--iso-accent-hi)" strokeWidth="1.5" d="M78 117 L78 107 L88 107" />
          <path className="detail" stroke="var(--iso-accent-hi)" strokeWidth="1.5" d="M242 117 L242 107 L232 107" />
          <path className="detail" stroke="var(--iso-accent-hi)" strokeWidth="1.5" d="M78 328 L78 338 L88 338" />
          <path className="detail" stroke="var(--iso-accent-hi)" strokeWidth="1.5" d="M242 328 L242 338 L232 338" />

          {/* Wooden Floor Chocks / Studio Wedges */}
          <polygon points="100,342 114,342 114,348 100,348" className="face recess" />
          <polygon points="206,342 220,342 220,348 206,348" className="face recess" />
        </g>

        {/* ========================================================== */}
        {/* 4. GROUND GALLERY PLACARD & METADATA CHIP                  */}
        {/* ========================================================== */}
        <g transform="translate(254, 298)">
          <rect className="face recess" x="0" y="0" width="205" height="52" rx="4" />
          <circle className="led hot" cx="12" cy="14" r="2.5" />
          <text className="ink" x="20" y="17" fontSize="8" letterSpacing="0.5">
            DISPLAYED: {currentPainting.title.slice(0, 20)}
          </text>
          <text className="label" x="12" y="32" fontSize="7.5">
            {currentPainting.artist} &middot; {currentPainting.year}
          </text>
          <text
            className="accent cursor-pointer hover:underline"
            x="12"
            y="44"
            fontSize="7"
            onClick={() => {
              if (onOpenViewer) onOpenViewer(activeIdx);
            }}
          >
            &rarr; CLICK CANVAS TO EXPAND FULLSCREEN
          </text>
        </g>

        {/* ========================================================== */}
        {/* 5. TACTILE CONTROL STEPPERS (PREV / NEXT)                  */}
        {/* ========================================================== */}
        <g transform="translate(565, 302)">
          <rect className="face recess" x="0" y="0" width="130" height="46" rx="4" />
          
          {/* PREV BUTTON */}
          <g className="press" role="button" tabIndex={0} onClick={handlePrev}>
            <rect className="face" x="8" y="8" width="52" height="30" rx="3" />
            <path className="k-glyph" d="M37 19 L31 23 L37 27" fill="none" strokeWidth="1.5" />
            <text className="label" x="22" y="36" fontSize="5.5">PREV</text>
          </g>

          {/* NEXT BUTTON */}
          <g className="press" role="button" tabIndex={0} onClick={handleNext}>
            <rect className="face" x="70" y="8" width="52" height="30" rx="3" />
            <path className="k-glyph" d="M93 19 L99 23 L93 27" fill="none" strokeWidth="1.5" />
            <text className="label" x="84" y="36" fontSize="5.5">NEXT</text>
          </g>
        </g>

        {/* ========================================================== */}
        {/* 6. TECHNICAL ANATOMY COACH MARKS                          */}
        {/* ========================================================== */}
        <g aria-hidden="true" className="k-coach is-live">
          {/* Guide to Box Canvases */}
          <g>
            <circle className="k-coach__dot is-end" cx="480" cy="120" r="2.2" />
            <line className="k-coach__wire" x1="480" y1="120" x2="520" y2="48" strokeDasharray="3 3" />
            <text className="k-coach__label" x="525" y="50" fontSize="7">
              BOX: VERTICAL CANVASES (SELECTABLE)
            </text>
          </g>

          {/* Guide to Ground Canvas */}
          <g>
            <circle className="k-coach__dot is-end" cx="160" cy="210" r="2.2" />
            <line className="k-coach__wire" x1="160" y1="210" x2="195" y2="60" strokeDasharray="3 3" />
            <text className="k-coach__label" x="200" y="62" fontSize="7">
              EXTRACTED: DISPLAYED ON GROUND
            </text>
          </g>
        </g>
      </IsoFigureContainer>
    </div>
  );
}
