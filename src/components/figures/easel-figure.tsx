"use client";

import React, { useState, useEffect, useRef } from "react";
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
  const activeSpec = CANVAS_SPECS[activeIdx % CANVAS_SPECS.length];

  return (
    <figure
      className="crate-fig not-prose mx-auto my-6 w-full max-w-[720px] select-none"
      data-hold={isPaused ? "true" : "false"}
      onMouseEnter={() => {
        isHoveredRef.current = true;
      }}
      onMouseLeave={() => {
        isHoveredRef.current = false;
      }}
    >
      <style>{`
        .crate-fig {
          --face: #101014;
          --edge: #25252e;
          --ink: #ededed;
          --muted: #767676;
          --box-bg: #13141a;
          --box-border: #2c2d3a;
          --box-wood: #181922;
          --accent: #4ade80;
        }
        .crate-fig svg { display: block; width: 100%; height: auto; overflow: visible; }
        .crate-fig :is(path, line, rect, polygon) { vector-effect: non-scaling-stroke; stroke-linecap: round; stroke-linejoin: round; }
        .crate-fig .tag { fill: var(--muted); font: 8px/1 var(--font-geist-mono), ui-monospace, monospace; text-transform: uppercase; letter-spacing: .08em; }
        .crate-fig .readout { fill: var(--ink); font: 9.5px/1.2 var(--font-geist-mono), ui-monospace, monospace; }
        .crate-fig .title { fill: var(--ink); font: 500 12px/1.2 var(--font-geist-sans), ui-sans-serif, system-ui; }
        .crate-fig .metric { fill: #8a8a98; font: 8.5px/1.2 var(--font-geist-mono), ui-monospace, monospace; }
        .crate-fig .m { animation-timing-function: cubic-bezier(.65,0,.35,1); animation-iteration-count: infinite; }
        .crate-fig[data-hold="true"] .m { animation-play-state: paused; }

        /* Animation: Smooth physical arc pulling canvas OUT from the box to the ground */
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

        /* Canvas spine hover effect in crate */
        .canvas-spine {
          transition: fill 0.2s ease, stroke 0.2s ease;
        }
        .canvas-spine:hover {
          stroke: #ffffff;
          stroke-width: 1.2px;
        }
      `}</style>

      {/* Main Container */}
      <div className="crate-fig rounded-lg border border-[#24242c] bg-[#0c0c10] p-4">
        <svg
          viewBox="0 0 720 400"
          role="img"
          aria-label="Rectangular archival box with vertically stacked canvases like books. One canvas animates out from the box and is displayed standing on the ground."
        >
          <defs>
            {/* Background Dot Grid */}
            <pattern id="crate-dots" width="14" height="14" patternUnits="userSpaceOnUse">
              <circle cx="7" cy="7" r="0.75" fill="#20212a" />
            </pattern>
            <radialGradient id="crate-fade" cx="50%" cy="50%" r="65%">
              <stop offset="0.35" stopColor="#fff" />
              <stop offset="1" stopColor="#fff" stopOpacity="0" />
            </radialGradient>
            <mask id="crate-mask">
              <rect width="720" height="400" fill="url(#crate-fade)" />
            </mask>

            {/* Clipping path for ground canvas artwork */}
            <clipPath id="ground-canvas-clip">
              <rect x="76" y="105" width="168" height="235" rx="2" />
            </clipPath>

            {/* Soft Shadow Filter */}
            <filter id="ground-shadow-blur" x="-25%" y="-25%" width="150%" height="150%">
              <feGaussianBlur stdDeviation="4.5" />
            </filter>
          </defs>

          {/* Dot Grid Background */}
          <rect width="720" height="400" fill="url(#crate-dots)" mask="url(#crate-mask)" />

          {/* Top Telemetry Header */}
          <g>
            <text x="24" y="20" className="tag">
              ARCHIVAL BOX // VERTICAL CANVASES (LIKE BOOKS) &middot; CLICK ANY TO EXTRACT
            </text>
            <text x="696" y="20" textAnchor="end" className="readout">
              ON GROUND: {String(activeIdx + 1).padStart(2, "0")}/{paintings.length} &middot; &ldquo;{currentPainting.title.toUpperCase().slice(0, 24)}&rdquo;
            </text>
          </g>

          {/* Perspective Studio Floor Guidelines */}
          <g opacity="0.6">
            <line x1="30" y1="360" x2="690" y2="360" stroke="#1d1e28" strokeWidth="1" />
            <line x1="80" y1="390" x2="250" y2="280" stroke="#161720" strokeWidth="0.8" strokeDasharray="4 4" />
            <line x1="400" y1="390" x2="520" y2="280" stroke="#161720" strokeWidth="0.8" strokeDasharray="4 4" />
          </g>

          {/* ========================================================== */}
          {/* 1. RECTANGULAR ARCHIVAL STORAGE BOX (IN THE BACKGROUND)   */}
          {/* ========================================================== */}
          {/*
            A structured rectangular storage crate in perspective.
            Canvases sit vertically stacked inside it like books on a bookshelf.
          */}
          <g transform="translate(285, 65)">
            {/* Box Floor Base Shadow */}
            <polygon
              points="15,225 395,225 410,240 0,240"
              fill="#060609"
              opacity="0.8"
              filter="url(#ground-shadow-blur)"
            />

            {/* Box Interior Rear Wall */}
            <rect x="18" y="12" width="372" height="188" rx="4" fill="#0f1015" stroke="#22232c" strokeWidth="1" />
            {/* Inner Wood Slats & Shading */}
            <line x1="18" y1="75" x2="390" y2="75" stroke="#181922" strokeWidth="1" />
            <line x1="18" y1="135" x2="390" y2="135" stroke="#181922" strokeWidth="1" />

            {/* Box Interior Floor Rack (Where canvases rest) */}
            <polygon points="18,185 390,185 405,215 5,215" fill="#14151c" stroke="#252632" strokeWidth="1" />
            {/* Bottom guide rails */}
            <line x1="10" y1="195" x2="400" y2="195" stroke="#20212b" strokeWidth="1.5" />
            <line x1="6" y1="205" x2="404" y2="205" stroke="#20212b" strokeWidth="1.5" />

            {/* ======================================================== */}
            {/* 2. VERTICALLY STACKED CANVASES INSIDE THE BOX           */}
            {/* ======================================================== */}
            {/*
              Each canvas has its own width (t) and height (h) like books on a shelf!
              When clicked, it animates out onto the ground!
            */}
            {(() => {
              let currentX = 28;
              return CANVAS_SPECS.map((spec, i) => {
                const isSelected = i === activeIdx;
                const canvasX = currentX;
                currentX += spec.t + 6; // advance by this canvas's individual width + gap

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
                        stroke="#e56b40"
                        strokeWidth="1.2"
                        strokeDasharray="3 3"
                        opacity="0.85"
                      />
                      <line
                        x1={canvasX + spec.t / 2}
                        y1={195}
                        x2={canvasX + spec.t / 2}
                        y2={212}
                        stroke="#e56b40"
                        strokeWidth="1.5"
                      />
                      {/* Empty Slot Callout */}
                      <text
                        x={canvasX + spec.t / 2}
                        y={190 - spec.h + 12}
                        textAnchor="middle"
                        fill="#e56b40"
                        fontSize="7"
                        fontFamily="var(--font-geist-mono)"
                        fontWeight="600"
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
                    className="cursor-pointer group"
                    onClick={() => handleSelect(i)}
                  >
                    {/* Canvas Body Shadow / Left side */}
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
                      x={canvasX}
                      y={195 - spec.h + 20}
                      width={spec.t}
                      height={spec.h - 15}
                      rx="2.5"
                      fill={spec.spine}
                      stroke="#2e303d"
                      strokeWidth="1"
                      className="canvas-spine"
                    />

                    {/* Top Canvas Stretched Fold Edge */}
                    <polygon
                      points={`
                        ${canvasX},${195 - spec.h + 20}
                        ${canvasX + spec.t},${195 - spec.h + 20}
                        ${canvasX + spec.t - 3},${195 - spec.h + 16}
                        ${canvasX + 3},${195 - spec.h + 16}
                      `}
                      fill="#3a3d4d"
                      opacity="0.7"
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

                    {/* Vertical Canvas Number & Name */}
                    <g transform={`translate(${canvasX + spec.t / 2}, ${195 - spec.h + 46}) rotate(90)`}>
                      <text
                        x="0"
                        y="2.5"
                        textAnchor="start"
                        fill="#8a8a9a"
                        fontSize="7.5"
                        fontFamily="var(--font-geist-mono)"
                        className="group-hover:fill-[#ededed] transition-colors"
                        letterSpacing="0.05em"
                      >
                        {spec.tag} &middot; {spec.name.toUpperCase()}
                      </text>
                    </g>

                    {/* Bottom Stretcher Joint */}
                    <line
                      x1={canvasX + 2}
                      y1={195 - 4}
                      x2={canvasX + spec.t - 2}
                      y2={195 - 4}
                      stroke="#181820"
                      strokeWidth="1.2"
                    />
                  </g>
                );
              });
            })()}

            {/* Box Front Lower Wall (Retaining Lip) */}
            <polygon
              points="0,215 410,215 410,240 0,240"
              fill="#181922"
              stroke="#2e303d"
              strokeWidth="1.2"
            />
            {/* Box Left Wall */}
            <polygon
              points="0,15 18,12 18,185 0,215"
              fill="#13141a"
              stroke="#292a36"
              strokeWidth="1"
            />
            {/* Box Right Wall */}
            <polygon
              points="390,12 410,15 410,215 390,185"
              fill="#101117"
              stroke="#252632"
              strokeWidth="1"
            />

            {/* Brass / Steel Reinforced Corners */}
            <rect x="0" y="215" width="16" height="25" fill="#2b2d3a" stroke="#3e4154" strokeWidth="0.8" />
            <circle cx="8" cy="222" r="1.5" fill="#c5a059" />
            <circle cx="8" cy="233" r="1.5" fill="#c5a059" />

            <rect x="394" y="215" width="16" height="25" fill="#2b2d3a" stroke="#3e4154" strokeWidth="0.8" />
            <circle cx="402" cy="222" r="1.5" fill="#c5a059" />
            <circle cx="402" cy="233" r="1.5" fill="#c5a059" />

            {/* Archival Box Stencil Title */}
            <text
              x="20"
              y="232"
              fill="#7a7c8e"
              fontSize="8"
              fontFamily="var(--font-geist-mono)"
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
            {/* Ground Contact Shadow (Firmly anchoring the canvas to the floor) */}
            <ellipse
              cx="160"
              cy="348"
              rx="102"
              ry="11"
              fill="#000000"
              opacity="0.9"
              filter="url(#ground-shadow-blur)"
              className="anim-shadow"
            />

            {/* 3D Stretcher Bar Depth (Left Edge of the Canvas) */}
            <polygon
              points="64,114 76,105 76,340 64,345"
              fill="#181920"
              stroke="#2c2d38"
              strokeWidth="1"
            />
            {/* Raw Linen Wrapped Staples on side edge */}
            {[0, 1, 2, 3, 4, 5].map((s) => (
              <line
                key={s}
                x1="68"
                y1={140 + s * 34}
                x2="72"
                y2={142 + s * 34}
                stroke="#4a4c5d"
                strokeWidth="1.2"
              />
            ))}

            {/* Front Canvas Face with Framed Artwork */}
            <rect
              x="76"
              y="105"
              width="168"
              height="235"
              rx="2"
              fill="#14141a"
              stroke="#3a3c4c"
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

              {/* Museum Canvas Texture Overlay */}
              <line x1="76" y1="160" x2="244" y2="160" stroke="#ffffff" strokeWidth="0.5" strokeOpacity="0.04" strokeDasharray="3 3" />
              <line x1="76" y1="220" x2="244" y2="220" stroke="#ffffff" strokeWidth="0.5" strokeOpacity="0.04" strokeDasharray="3 3" />
              <line x1="76" y1="280" x2="244" y2="280" stroke="#ffffff" strokeWidth="0.5" strokeOpacity="0.04" strokeDasharray="3 3" />

              {/* Bottom Matte Placard on Canvas */}
              <rect x="76" y="312" width="168" height="28" fill="#0c0d12" opacity="0.92" />
              <text x="86" y="328" fill="#ededed" fontSize="7.5" fontFamily="var(--font-geist-mono)" letterSpacing="0.04em">
                {currentPainting.title.toUpperCase().slice(0, 22)}
              </text>
            </g>

            {/* Metallic Corner Protection Brackets */}
            <path d="M78 117 L78 107 L88 107" fill="none" stroke="#ededed" strokeWidth="1.5" opacity="0.8" />
            <path d="M242 117 L242 107 L232 107" fill="none" stroke="#ededed" strokeWidth="1.5" opacity="0.8" />
            <path d="M78 328 L78 338 L88 338" fill="none" stroke="#ededed" strokeWidth="1.5" opacity="0.8" />
            <path d="M242 328 L242 338 L232 338" fill="none" stroke="#ededed" strokeWidth="1.5" opacity="0.8" />

            {/* Wooden Floor Chocks / Studio Wedges */}
            <polygon points="100,342 114,342 114,348 100,348" fill="#3a271d" stroke="#251912" strokeWidth="0.8" />
            <polygon points="206,342 220,342 220,348 206,348" fill="#3a271d" stroke="#251912" strokeWidth="0.8" />
          </g>

          {/* ========================================================== */}
          {/* 4. GROUND GALLERY PLACARD & METADATA CHIP                  */}
          {/* ========================================================== */}
          <g transform="translate(254, 298)">
            <rect x="0" y="0" width="205" height="52" rx="4" fill="#0f1015" stroke="#252632" strokeWidth="1" />
            <circle cx="12" cy="14" r="2.5" fill="#4ade80" />
            <text x="20" y="17" fill="#ededed" fontSize="8" fontFamily="var(--font-geist-mono)" letterSpacing="0.5">
              DISPLAYED: {currentPainting.title.slice(0, 20)}
            </text>
            <text x="12" y="32" fill="#8e8e98" fontSize="7.5" fontFamily="var(--font-geist-sans)">
              {currentPainting.artist} &middot; {currentPainting.year}
            </text>
            <text
              x="12"
              y="44"
              fill="#4ade80"
              fontSize="7"
              fontFamily="var(--font-geist-mono)"
              className="hover:underline cursor-pointer"
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
            <rect x="0" y="0" width="130" height="46" rx="4" fill="#13141a" stroke="#2c2d3a" strokeWidth="1" />
            
            {/* PREV BUTTON */}
            <g className="cursor-pointer group" onClick={handlePrev}>
              <rect x="8" y="8" width="52" height="30" rx="3" fill="#1a1b24" stroke="#333544" strokeWidth="0.8" className="group-hover:fill-[#252734] transition-colors" />
              <path d="M37 19 L31 23 L37 27" fill="none" stroke="#ededed" strokeWidth="1.5" />
              <text x="22" y="36" fill="#7a7c8e" fontSize="5.5" fontFamily="var(--font-geist-mono)">PREV</text>
            </g>

            {/* NEXT BUTTON */}
            <g className="cursor-pointer group" onClick={handleNext}>
              <rect x="70" y="8" width="52" height="30" rx="3" fill="#1a1b24" stroke="#333544" strokeWidth="0.8" className="group-hover:fill-[#252734] transition-colors" />
              <path d="M93 19 L99 23 L93 27" fill="none" stroke="#ededed" strokeWidth="1.5" />
              <text x="84" y="36" fill="#7a7c8e" fontSize="5.5" fontFamily="var(--font-geist-mono)">NEXT</text>
            </g>
          </g>

          {/* ========================================================== */}
          {/* 6. TECHNICAL ANNOTATION MARKS                             */}
          {/* ========================================================== */}
          <g>
            {/* Guide to Box Canvases */}
            <line x1="480" y1="120" x2="520" y2="48" stroke="#4a4c5d" strokeWidth="1" strokeDasharray="3 3" />
            <circle cx="480" cy="120" r="2" fill="#ededed" />
            <text x="525" y="50" fill="#8e8e98" fontSize="7" fontFamily="var(--font-geist-mono)">
              BOX: VERTICAL CANVASES (SELECTABLE)
            </text>

            {/* Guide to Ground Canvas */}
            <line x1="160" y1="210" x2="195" y2="60" stroke="#4ade80" strokeWidth="1" strokeDasharray="3 3" />
            <circle cx="160" cy="210" r="2" fill="#4ade80" />
            <text x="200" y="62" fill="#4ade80" fontSize="7" fontFamily="var(--font-geist-mono)">
              EXTRACTED: DISPLAYED ON GROUND
            </text>
          </g>
        </svg>
      </div>

      {/* Caption Bar with Pause/Play Motion Toggle */}
      <figcaption className="mt-3">
        <div className="flex items-center justify-between gap-4 font-mono text-[9px] uppercase tracking-wider text-[#767676]">
          <span>
            Fig. 04 — Archival Storage Box: Vertical Canvases with Animated Ground Display
          </span>
          <button
            type="button"
            onClick={() => setIsPaused(!isPaused)}
            className="text-[#8e8e8e] hover:text-[#ededed] transition-colors cursor-pointer py-1"
          >
            {isPaused ? "Play motion" : "Pause motion"}
          </button>
        </div>
      </figcaption>
    </figure>
  );
}
