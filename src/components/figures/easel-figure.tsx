"use client";

import React, { useState, useEffect, useRef } from "react";
import { portfolio, Painting } from "@/data/portfolio";

interface CanvasCrateFigureProps {
  totalPaintings?: number;
  currentPaintingIndex?: number;
  onSelectPainting?: (index: number) => void;
  onOpenViewer?: (index: number) => void;
}

export function EaselFigure({
  currentPaintingIndex = 0,
  onSelectPainting,
  onOpenViewer,
}: CanvasCrateFigureProps) {
  const { paintings } = portfolio;
  const [activeIdx, setActiveIdx] = useState(currentPaintingIndex);
  const [isPaused, setIsPaused] = useState(false);
  const [animStage, setAnimStage] = useState<"idle" | "lifting" | "landing">("idle");
  const isHoveredRef = useRef(false);

  // 11 Canvases with distinct physical widths, heights, and spine colors
  const CANVAS_SPECS = [
    { t: 15, h: 140, tag: "01", spine: "#3a4238", accent: "#4ade80" }, // Green Hag
    { t: 11, h: 148, tag: "02", spine: "#4a2a2e", accent: "#f43f5e" }, // Solitude
    { t: 13, h: 142, tag: "03", spine: "#3c3228", accent: "#fb923c" }, // Vigil
    { t: 10, h: 146, tag: "04", spine: "#2d353b", accent: "#38bdf8" }, // Veil
    { t: 16, h: 154, tag: "05", spine: "#383630", accent: "#e2b340" }, // Wounded Angel
    { t: 12, h: 138, tag: "06", spine: "#342d38", accent: "#a855f7" }, // Ascent
    { t: 14, h: 145, tag: "07", spine: "#283438", accent: "#2dd4bf" }, // Tactician
    { t: 10, h: 140, tag: "08", spine: "#38342e", accent: "#facc15" }, // Wanderer
    { t: 15, h: 150, tag: "09", spine: "#252834", accent: "#818cf8" }, // Nocturne
    { t: 10, h: 136, tag: "10", spine: "#363636", accent: "#9ca3af" }, // Echoes
    { t: 13, h: 144, tag: "11", spine: "#2e3b32", accent: "#34d399" }, // Guardian
  ];

  const handleSelect = (idx: number) => {
    if (idx === activeIdx) return;
    setAnimStage("lifting");
    setTimeout(() => {
      setActiveIdx(idx);
      setAnimStage("landing");
      if (onSelectPainting) onSelectPainting(idx);
      setTimeout(() => setAnimStage("idle"), 600);
    }, 300);
  };

  const handleNext = () => {
    handleSelect((activeIdx + 1) % paintings.length);
  };

  const handlePrev = () => {
    handleSelect((activeIdx - 1 + paintings.length) % paintings.length);
  };

  // Autonomous Cycle: pulls out the next canvas from the box to the ground every 5.5s
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      if (!isHoveredRef.current) {
        handleSelect((activeIdx + 1) % paintings.length);
      }
    }, 5500);
    return () => clearInterval(interval);
  }, [activeIdx, isPaused]);

  const currentPainting: Painting = paintings[activeIdx] || paintings[0];
  const activeSpec = CANVAS_SPECS[activeIdx] || CANVAS_SPECS[0];

  return (
    <figure
      className="auth not-prose mx-auto my-6 w-full max-w-[720px] select-none"
      data-hold={isPaused ? "true" : "false"}
      onMouseEnter={() => {
        isHoveredRef.current = true;
      }}
      onMouseLeave={() => {
        isHoveredRef.current = false;
      }}
    >
      <style>{`
        .crate-stage {
          --face: #101014;
          --edge: #25252e;
          --wood-dark: #141419;
          --wood-mid: #1a1a22;
          --wood-light: #262632;
          --gold: #c29b38;
          --ink: #ededed;
          --muted: #767676;
        }
        .crate-stage svg { display: block; width: 100%; height: auto; overflow: visible; }
        .crate-stage :is(path, line, rect, polygon) { vector-effect: non-scaling-stroke; stroke-linecap: round; stroke-linejoin: round; }
        .crate-stage .tag { fill: var(--muted); font: 8px/1 var(--font-geist-mono), ui-monospace, monospace; text-transform: uppercase; letter-spacing: .08em; }
        .crate-stage .readout { fill: var(--ink); font: 9.5px/1.2 var(--font-geist-mono), ui-monospace, monospace; }
        .crate-stage .m { animation-timing-function: cubic-bezier(.65,0,.35,1); animation-iteration-count: infinite; }
        .crate-stage[data-hold="true"] .m { animation-play-state: paused; }

        /* Animation: Canvas Extraction Arc from Box to Ground */
        @keyframes canvas-lift-and-land {
          0% {
            transform: translate(210px, -70px) scale(0.65) rotate(-6deg);
            opacity: 0.2;
          }
          45% {
            transform: translate(110px, -45px) scale(0.85) rotate(-2deg);
            opacity: 0.9;
          }
          100% {
            transform: translate(0px, 0px) scale(1) rotate(0deg);
            opacity: 1;
          }
        }
        .anim-extract {
          animation: canvas-lift-and-land 0.65s cubic-bezier(0.2, 0.9, 0.3, 1) forwards;
          transform-origin: 190px 250px;
        }

        /* Subtle breathing shadow on ground */
        @keyframes ground-shadow {
          0%, 100% { opacity: 0.8; transform: scale(1); }
          50% { opacity: 0.95; transform: scale(1.02); }
        }
        .ground-pulse {
          animation: ground-shadow 4s ease-in-out infinite;
          transform-origin: 200px 350px;
        }
      `}</style>

      {/* Main Container */}
      <div className="crate-stage rounded-lg border border-[#24242c] bg-[#0b0c10] p-4">
        <svg
          viewBox="0 0 680 380"
          role="img"
          aria-label="Rectangular archival box with vertically stacked canvases. One canvas is pulled out and displayed standing on the studio ground in front."
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
              <rect width="680" height="380" fill="url(#crate-fade)" />
            </mask>

            {/* Clipping path for ground canvas artwork */}
            <clipPath id="ground-artwork-clip">
              <polygon points="120,120 270,195 270,335 120,260" />
            </clipPath>

            {/* Soft Shadow Filter */}
            <filter id="soft-blur" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" />
            </filter>
          </defs>

          {/* Dot Grid Background */}
          <rect width="680" height="380" fill="url(#crate-dots)" mask="url(#crate-mask)" />

          {/* Top Telemetry & Status Bar */}
          <g>
            <text x="24" y="20" className="tag">POINT TO HOLD · CLICK ANY CANVAS IN BOX</text>
            <text x="656" y="20" textAnchor="end" className="readout">
              EXTRACTED: {String(activeIdx + 1).padStart(2, "0")}/{paintings.length} &middot; &ldquo;{currentPainting.title.toUpperCase().slice(0, 24)}&rdquo;
            </text>
          </g>

          {/* Studio Isometric Floor Plane */}
          <polygon
            points="340,375 660,215 340,55 20,215"
            fill="#08080c"
            stroke="#1c1c24"
            strokeWidth="0.8"
            opacity="0.85"
          />

          {/* ========================================================== */}
          {/* 1. RECTANGULAR ARCHIVAL STORAGE BOX (IN THE MID-GROUND)     */}
          {/* ========================================================== */}
          {/*
            An open rectangular storage crate positioned at the upper right.
            Inside, canvases stand vertically like books on a shelf!
          */}
          <g transform="translate(170, 30)">
            {/* Box Floor Shadow */}
            <polygon
              points="140,240 430,95 290,25 0,170"
              fill="#040406"
              opacity="0.9"
              filter="url(#soft-blur)"
            />

            {/* Box Interior Rear Walls */}
            <polygon points="290,25 430,95 430,165 290,95" fill="#121217" stroke="#22222c" strokeWidth="1" />
            <polygon points="0,170 290,25 290,95 0,240" fill="#16171e" stroke="#22222c" strokeWidth="1" />

            {/* Bottom Support Rack Slats inside Box */}
            <line x1="30" y1="215" x2="310" y2="75" stroke="#252532" strokeWidth="1.5" />
            <line x1="60" y1="225" x2="340" y2="85" stroke="#252532" strokeWidth="1.5" />

            {/* ======================================================== */}
            {/* 2. VERTICALLY STACKED CANVASES INSIDE THE RECTANGULAR BOX */}
            {/* ======================================================== */}
            {/*
              Canvases stand vertically side-by-side like books in a shelf.
              Each canvas has its own thickness (t) and height (h).
              If it is the active canvas, its slot is empty (extracted!).
            */}
            {(() => {
              let currentDist = 0;
              return CANVAS_SPECS.map((spec, i) => {
                const isSelected = i === activeIdx;
                // Isometric origin along the rack axis
                const cx = 35 + currentDist * 0.866;
                const cy = 210 - currentDist * 0.5;
                currentDist += spec.t + 3.5;

                // If selected, canvas is OUT of the box on the ground!
                // Render an empty slot indicator inside the box:
                if (isSelected) {
                  return (
                    <g key={i}>
                      {/* Empty Slot Groove Lines */}
                      <line
                        x1={cx}
                        y1={cy}
                        x2={cx + 70 * 0.866}
                        y2={cy + 70 * 0.5}
                        stroke="#e56b40"
                        strokeWidth="1.5"
                        strokeDasharray="3 3"
                        opacity="0.8"
                      />
                      <line
                        x1={cx + spec.t * 0.866}
                        y1={cy - spec.t * 0.5}
                        x2={cx + spec.t * 0.866 + 70 * 0.866}
                        y2={cy - spec.t * 0.5 + 70 * 0.5}
                        stroke="#e56b40"
                        strokeWidth="1"
                        strokeDasharray="3 3"
                        opacity="0.5"
                      />
                      {/* Slot extracted label */}
                      <text
                        x={cx + 10}
                        y={cy + 8}
                        transform={`rotate(30 ${cx + 10} ${cy + 8})`}
                        fill="#e56b40"
                        fontSize="6"
                        fontFamily="var(--font-geist-mono)"
                      >
                        [0{i + 1} OUT]
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
                    {/* Top Spine / Edge of Stretched Canvas */}
                    <polygon
                      points={`
                        ${cx},${cy - spec.h + 50}
                        ${cx + spec.t * 0.866},${cy - spec.h + 50 - spec.t * 0.5}
                        ${cx + spec.t * 0.866 + 75 * 0.866},${cy - spec.h + 50 - spec.t * 0.5 + 75 * 0.5}
                        ${cx + 75 * 0.866},${cy - spec.h + 50 + 75 * 0.5}
                      `}
                      fill={spec.spine}
                      stroke="#3b3b4a"
                      strokeWidth="0.8"
                      className="group-hover:stroke-white/60 transition-colors"
                    />

                    {/* Front-Facing Edge of Standing Canvas (Spine with label) */}
                    <polygon
                      points={`
                        ${cx},${cy}
                        ${cx + spec.t * 0.866},${cy - spec.t * 0.5}
                        ${cx + spec.t * 0.866},${cy - spec.h + 50 - spec.t * 0.5}
                        ${cx},${cy - spec.h + 50}
                      `}
                      fill="#1a1a22"
                      stroke="#2d2e3a"
                      strokeWidth="0.8"
                      className="group-hover:fill-[#262634] transition-colors"
                    />

                    {/* Technical Canvas Number on Vertical Edge */}
                    <text
                      x={cx + 2}
                      y={cy - 22}
                      transform={`rotate(-30 ${cx} ${cy - 22})`}
                      fill="#8a8a9a"
                      fontSize="5.5"
                      fontFamily="var(--font-geist-mono)"
                      className="group-hover:fill-[#ededed]"
                    >
                      {spec.tag}
                    </text>
                  </g>
                );
              });
            })()}

            {/* Front & Right Exterior Walls of the Box */}
            <polygon points="0,240 290,95 290,165 0,310" fill="#1e1f28" stroke="#333442" strokeWidth="1" />
            <polygon points="290,95 430,165 430,235 290,165" fill="#15161d" stroke="#2b2c37" strokeWidth="1" />

            {/* Brass / Metallic Corner Brackets & Screws */}
            <g>
              <polygon points="0,240 14,233 14,247 0,254" fill="#c29b38" />
              <circle cx="7" cy="243" r="1.2" fill="#4d3b10" />
              <polygon points="290,165 290,179 304,172 304,158" fill="#c29b38" />
              <circle cx="297" cy="168" r="1.2" fill="#4d3b10" />
            </g>

            {/* Stenciled Box Label */}
            <text
              x="18"
              y="276"
              transform="rotate(30 18 276)"
              fill="#6b6c7c"
              fontSize="6.5"
              fontFamily="var(--font-geist-mono)"
              letterSpacing="1"
            >
              ARCHIVE CRATE // VERTICAL STORAGE (11 CANVASES)
            </text>
          </g>

          {/* ========================================================== */}
          {/* 3. THE EXTRACTED CANVAS DISPLAYED ON THE GROUND IN FRONT    */}
          {/* ========================================================== */}
          {/*
            This canvas has animated out of the box and is standing on the ground!
            Clicking it opens the high-resolution lightbox modal!
          */}
          <g
            key={activeIdx}
            className={`cursor-pointer anim-extract`}
            onClick={() => {
              if (onOpenViewer) onOpenViewer(activeIdx);
            }}
          >
            {/* Ground Contact Shadow */}
            <polygon
              points="110,265 280,350 295,360 125,275"
              fill="#000000"
              opacity="0.9"
              filter="url(#soft-blur)"
              className="ground-pulse"
            />

            {/* Stretcher Bar Left Edge (Canvas 3D Depth) */}
            <polygon
              points="112,120 120,120 120,260 112,260"
              fill="#1b1b20"
              stroke="#292932"
              strokeWidth="0.8"
            />
            {/* Stretcher Bar Bottom Edge */}
            <polygon
              points="120,260 270,335 270,340 120,265"
              fill="#131317"
              stroke="#292932"
              strokeWidth="0.8"
            />

            {/* Canvas Surface (Front Isometric Artwork Plane) */}
            <polygon
              points="120,120 270,195 270,335 120,260"
              fill="#141418"
              stroke="#3a3a46"
              strokeWidth="1.2"
            />

            {/* Real Artwork Image Rendered Directly on the Canvas */}
            <g clipPath="url(#ground-artwork-clip)">
              <image
                href={currentPainting.url}
                x="120"
                y="120"
                width="150"
                height="215"
                preserveAspectRatio="xMidYMid slice"
                style={{ filter: "contrast(1.06) brightness(1.02)" }}
              />

              {/* Fine Linen Texture Overlay */}
              <line x1="120" y1="160" x2="270" y2="235" stroke="#ffffff" strokeWidth="0.4" strokeOpacity="0.04" strokeDasharray="3 3" />
              <line x1="120" y1="200" x2="270" y2="275" stroke="#ffffff" strokeWidth="0.4" strokeOpacity="0.04" strokeDasharray="3 3" />
              <line x1="120" y1="240" x2="270" y2="315" stroke="#ffffff" strokeWidth="0.4" strokeOpacity="0.04" strokeDasharray="3 3" />

              {/* Bottom Matte Studio Bar */}
              <rect x="120" y="308" width="150" height="27" fill="#090a0d" opacity="0.9" />
              <text x="128" y="324" fill="#ededed" fontSize="6.5" fontFamily="var(--font-geist-mono)" letterSpacing="0.4">
                {currentPainting.title.toUpperCase().slice(0, 20)}
              </text>
            </g>

            {/* Metallic Corner Framing Reinforcement Brackets */}
            <line x1="122" y1="122" x2="134" y2="128" stroke="#ededed" strokeWidth="1.2" opacity="0.9" />
            <line x1="268" y1="333" x2="256" y2="327" stroke="#ededed" strokeWidth="1.2" opacity="0.9" />

            {/* Wooden Floor Support Wedges */}
            <polygon points="175,290 190,298 190,304 175,296" fill="#442f20" />
            <polygon points="190,298 200,293 200,299 190,304" fill="#2c1e14" />
          </g>

          {/* ========================================================== */}
          {/* 4. GROUND PLACARD & METADATA CHIP                          */}
          {/* ========================================================== */}
          <g transform="translate(42, 295)">
            <rect x="0" y="0" width="180" height="52" rx="4" fill="#0f1015" stroke="#252530" strokeWidth="1" />
            <circle cx="12" cy="14" r="2.5" fill="#4ade80" />
            <text x="20" y="17" fill="#ededed" fontSize="7.5" fontFamily="var(--font-geist-mono)" letterSpacing="0.5">
              ON GROUND: {currentPainting.title.slice(0, 20)}
            </text>
            <text x="12" y="32" fill="#8e8e98" fontSize="7" fontFamily="var(--font-geist-sans)">
              {currentPainting.artist} &middot; {currentPainting.year}
            </text>
            <text x="12" y="44" fill="#4ade80" fontSize="6.5" fontFamily="var(--font-geist-mono)">
              &rarr; CLICK CANVAS TO EXPAND FULLSCREEN
            </text>
          </g>

          {/* ========================================================== */}
          {/* 5. TACTILE CONTROL PEDESTAL (PREV / NEXT STEPPERS)         */}
          {/* ========================================================== */}
          <g transform="translate(510, 265)">
            <polygon points="0,35 60,0 120,35 60,70" fill="#131418" stroke="#2c2d38" strokeWidth="1" />
            <polygon points="0,35 60,70 60,80 0,45" fill="#0d0e11" />
            <polygon points="60,70 120,35 120,45 60,80" fill="#08080a" />

            {/* PREV BUTTON (◀) */}
            <g className="cursor-pointer" onClick={handlePrev}>
              <polygon points="15,35 45,18 45,27 15,44" fill="#22232c" stroke="#3b3d4c" strokeWidth="0.8" />
              <polygon points="26,35 34,30 34,40" fill="#ccc" />
            </g>

            {/* NEXT BUTTON (▶) */}
            <g className="cursor-pointer" onClick={handleNext}>
              <polygon points="65,44 95,27 95,36 65,53" fill="#22232c" stroke="#3b3d4c" strokeWidth="0.8" />
              <polygon points="84,39 76,34 76,44" fill="#ccc" />
            </g>

            <text x="28" y="70" fill="#6e6e7c" fontSize="6" fontFamily="var(--font-geist-mono)" letterSpacing="0.8">
              PULL CANVAS
            </text>
          </g>

          {/* ========================================================== */}
          {/* 6. TECHNICAL COACH MARKS (ANATOMY SYSTEM)                 */}
          {/* ========================================================== */}
          <g>
            {/* Guide to Box Canvases */}
            <line x1="390" y1="110" x2="480" y2="70" stroke="#4a4a58" strokeWidth="1" strokeDasharray="3 3" />
            <circle cx="390" cy="110" r="2" fill="#ededed" />
            <text x="485" y="73" fill="#8e8e98" fontSize="6.5" fontFamily="var(--font-geist-mono)">
              BOX: VERTICAL CANVASES (SELECTABLE)
            </text>

            {/* Guide to Ground Canvas */}
            <line x1="200" y1="230" x2="280" y2="210" stroke="#4ade80" strokeWidth="1" strokeDasharray="3 3" />
            <circle cx="200" cy="230" r="2" fill="#4ade80" />
            <text x="285" y="213" fill="#4ade80" fontSize="6.5" fontFamily="var(--font-geist-mono)">
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
