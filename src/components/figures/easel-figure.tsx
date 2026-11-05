"use client";

import React, { useState, useEffect, useRef } from "react";
import { IsoFigureContainer, IsoDefs } from "@/lib/iso";
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

  // 11 Vertical Canvases with individual physical thicknesses (t) and heights (h)
  // Clean monochromatic anatomy specs: strictly no hardcoded color accents
  const CANVAS_SPECS = [
    { t: 24, h: 148, tag: "01" },
    { t: 18, h: 154, tag: "02" },
    { t: 22, h: 142, tag: "03" },
    { t: 16, h: 158, tag: "04" },
    { t: 26, h: 162, tag: "05" },
    { t: 20, h: 140, tag: "06" },
    { t: 24, h: 150, tag: "07" },
    { t: 18, h: 144, tag: "08" },
    { t: 25, h: 156, tag: "09" },
    { t: 16, h: 138, tag: "10" },
    { t: 22, h: 146, tag: "11" },
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

  // Autonomous Cycle: pulls out the next canvas from the box every 5 seconds
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
            transform: translate(210px, -45px) scale(0.72) rotate(2.5deg);
            opacity: 0.2;
          }
          50% {
            transform: translate(90px, -20px) scale(0.88) rotate(1deg);
            opacity: 0.9;
          }
          85% {
            transform: translate(0px, 2px) scale(1.008) rotate(-0.3deg);
            opacity: 1;
          }
          100% {
            transform: translate(0px, 0px) scale(1) rotate(0deg);
            opacity: 1;
          }
        }
        .anim-extract {
          animation: extract-out-to-ground 0.7s cubic-bezier(0.18, 0.9, 0.25, 1) forwards;
          transform-origin: 135px 240px;
        }

        /* Ground Contact Shadow settling animation */
        @keyframes shadow-settle {
          0% { opacity: 0; transform: scale(0.65); }
          50% { opacity: 0.45; transform: scale(0.92); }
          100% { opacity: 0.85; transform: scale(1); }
        }
        .anim-shadow {
          animation: shadow-settle 0.7s cubic-bezier(0.18, 0.9, 0.25, 1) forwards;
          transform-origin: 135px 282px;
        }

        /* Spine hover */
        .crate-canvas-spine {
          cursor: pointer;
          transition: transform 0.15s ease, filter 0.15s ease;
        }
        .crate-canvas-spine:hover rect.face {
          fill: var(--iso-top) !important;
          stroke: var(--iso-ink) !important;
        }
        .crate-canvas-spine:hover text.label {
          fill: var(--iso-ink) !important;
        }
      `}</style>

      {/* Official Isometric Anatomy Figure Container (.k-iso) */}
      <IsoFigureContainer
        name="Fig 04. / Archival Storage Crate: Vertical Canvases"
        hint="Click canvas in crate to extract · Click ground canvas to expand"
        readout={`${String(activeIdx + 1).padStart(2, "0")}/${paintings.length} · ${currentPainting.title.toUpperCase().slice(0, 24)}`}
        power={true}
        viewBox="0 0 680 320"
        label="Isometric anatomy figure showing an archival crate with vertically stacked canvases, with one canvas displayed on the studio floor."
      >
        <defs>
          {/* Clipping path for ground canvas artwork */}
          <clipPath id="ground-canvas-clip">
            <rect x="52" y="52" width="168" height="226" rx="2" />
          </clipPath>
        </defs>

        {/* Studio Floor Horizon Line */}
        <line className="detail" x1="20" y1="282" x2="660" y2="282" opacity="0.5" />

        {/* ========================================================== */}
        {/* 1. RECTANGULAR ARCHIVAL STORAGE BOX (IN PERSPECTIVE)       */}
        {/* ========================================================== */}
        <g transform="translate(250, 36)">
          {/* Crate Base Contact Shadow */}
          <polygon
            points="12,228 388,228 400,242 0,242"
            fill="#050508"
            opacity="0.85"
            filter="url(#k-soft)"
          />

          {/* Crate Interior Rear Cavity */}
          <rect className="face recess" x="16" y="16" width="370" height="184" rx="2" />
          
          {/* Subtle interior structural slat lines */}
          <line className="detail" x1="16" y1="78" x2="386" y2="78" opacity="0.4" />
          <line className="detail" x1="16" y1="138" x2="386" y2="138" opacity="0.4" />

          {/* Crate Floor Rack (Lower Bed where canvases stand) */}
          <polygon points="16,184 386,184 400,218 2,218" className="face" />
          <line className="detail" x1="8" y1="196" x2="392" y2="196" strokeWidth="1" opacity="0.7" />
          <line className="detail" x1="5" y1="208" x2="396" y2="208" strokeWidth="1" opacity="0.7" />

          {/* ======================================================== */}
          {/* 2. VERTICALLY STACKED CANVASES INSIDE THE BOX           */}
          {/* ======================================================== */}
          {(() => {
            let currentX = 24;
            return CANVAS_SPECS.map((spec, i) => {
              const isSelected = i === activeIdx;
              const canvasX = currentX;
              currentX += spec.t + 8;

              // If selected, render clean dashed extraction slot
              if (isSelected) {
                return (
                  <g key={i}>
                    {/* Recessed slot in the floor */}
                    <rect
                      x={canvasX}
                      y={196 - spec.h + 20}
                      width={spec.t}
                      height={spec.h - 15}
                      rx="2"
                      className="face recess"
                      stroke="var(--iso-accent-hi)"
                      strokeWidth="1.2"
                      strokeDasharray="3 3"
                    />
                    <line
                      className="detail"
                      x1={canvasX + spec.t / 2}
                      y1={196}
                      x2={canvasX + spec.t / 2}
                      y2={214}
                      strokeWidth="1.2"
                    />
                    <text
                      className="label"
                      x={canvasX + spec.t / 2}
                      y={190 - spec.h + 12}
                      textAnchor="middle"
                      fontSize="6.5"
                      fontFamily="var(--font-geist-mono)"
                    >
                      [{spec.tag}]
                    </text>
                  </g>
                );
              }

              // Normal Standing Vertical Canvas inside the box
              return (
                <g
                  key={i}
                  className="crate-canvas-spine"
                  role="button"
                  tabIndex={0}
                  onClick={() => handleSelect(i)}
                >
                  {/* Canvas Body Shadow */}
                  <rect
                    x={canvasX - 1}
                    y={196 - spec.h + 20}
                    width={spec.t + 2}
                    height={spec.h - 15}
                    rx="2"
                    fill="#08080c"
                    opacity="0.6"
                  />

                  {/* Canvas Spine (Vertical edge facing forward) */}
                  <rect
                    className="face"
                    x={canvasX}
                    y={196 - spec.h + 20}
                    width={spec.t}
                    height={spec.h - 15}
                    rx="2"
                  />

                  {/* Top Canvas Fold Edge */}
                  <polygon
                    className="face top"
                    points={`
                      ${canvasX},${196 - spec.h + 20}
                      ${canvasX + spec.t},${196 - spec.h + 20}
                      ${canvasX + spec.t - 3},${196 - spec.h + 16}
                      ${canvasX + 3},${196 - spec.h + 16}
                    `}
                  />

                  {/* Clean Minimalist Number Tag */}
                  <text
                    className="label"
                    x={canvasX + spec.t / 2}
                    y={196 - spec.h + 32}
                    textAnchor="middle"
                    fontSize="6.5"
                    fontFamily="var(--font-geist-mono)"
                  >
                    {spec.tag}
                  </text>

                  {/* Fine spine seam line */}
                  <line
                    className="detail"
                    x1={canvasX + spec.t / 2}
                    y1={196 - spec.h + 38}
                    x2={canvasX + spec.t / 2}
                    y2={196 - 10}
                    opacity="0.35"
                  />

                  {/* Bottom stretcher bar line */}
                  <line
                    className="detail"
                    x1={canvasX + 2}
                    y1={196 - 3}
                    x2={canvasX + spec.t - 2}
                    y2={196 - 3}
                  />
                </g>
              );
            });
          })()}

          {/* Crate Front Lower Retaining Lip */}
          <polygon
            points="0,218 400,218 400,240 0,240"
            className="face top"
          />

          {/* Crate Left Outer Wall */}
          <polygon
            points="0,18 16,16 16,184 0,218"
            className="face"
          />
          {/* Crate Right Outer Wall */}
          <polygon
            points="386,16 400,18 400,218 386,184"
            className="face"
          />

          {/* Minimal Steel Reinforced Corners & Rivets */}
          <g>
            <rect className="face recess" x="0" y="218" width="14" height="22" rx="1" />
            <circle className="detail" cx="7" cy="224" r="1.2" />
            <circle className="detail" cx="7" cy="234" r="1.2" />

            <rect className="face recess" x="386" y="218" width="14" height="22" rx="1" />
            <circle className="detail" cx="393" cy="224" r="1.2" />
            <circle className="detail" cx="393" cy="234" r="1.2" />
          </g>
        </g>

        {/* ========================================================== */}
        {/* 3. THE EXTRACTED CANVAS DISPLAYED ON THE GROUND IN FRONT   */}
        {/* ========================================================== */}
        <g
          key={activeIdx}
          className="cursor-pointer anim-extract"
          onClick={() => {
            if (onOpenViewer) onOpenViewer(activeIdx);
          }}
        >
          {/* Ground Contact Shadow */}
          <ellipse
            cx="136"
            cy="282"
            rx="94"
            ry="9"
            fill="#000000"
            opacity="0.85"
            filter="url(#k-soft)"
            className="anim-shadow"
          />

          {/* 3D Stretcher Bar Depth (Left Edge of Canvas) */}
          <polygon
            className="face"
            points="42,60 52,52 52,278 42,282"
          />
          {/* Canvas edge staples */}
          {[0, 1, 2, 3, 4].map((s) => (
            <line
              key={s}
              className="detail"
              x1="45"
              y1={78 + s * 44}
              x2="49"
              y2={80 + s * 44}
              strokeWidth="1"
            />
          ))}

          {/* Front Canvas Face Frame */}
          <rect
            className="face top"
            x="52"
            y="52"
            width="168"
            height="226"
            rx="2"
            strokeWidth="1.2"
          />

          {/* High-Resolution Framed Artwork */}
          <g clipPath="url(#ground-canvas-clip)">
            <image
              href={currentPainting.url}
              x="52"
              y="52"
              width="168"
              height="226"
              preserveAspectRatio="xMidYMid slice"
              style={{ filter: "contrast(1.04) brightness(1.02)" }}
            />

            {/* Subtle linen weave lines */}
            <line x1="52" y1="108" x2="220" y2="108" stroke="#ffffff" strokeWidth="0.4" strokeOpacity="0.04" strokeDasharray="3 3" />
            <line x1="52" y1="165" x2="220" y2="165" stroke="#ffffff" strokeWidth="0.4" strokeOpacity="0.04" strokeDasharray="3 3" />
            <line x1="52" y1="222" x2="220" y2="222" stroke="#ffffff" strokeWidth="0.4" strokeOpacity="0.04" strokeDasharray="3 3" />

            {/* Minimal Title Bar at Bottom of Canvas */}
            <rect x="52" y="254" width="168" height="24" fill="#0d0e12" opacity="0.9" />
            <text x="60" y="269" className="ink" fontSize="7" letterSpacing="0.04em">
              {currentPainting.title.toUpperCase().slice(0, 22)}
            </text>
          </g>

          {/* Minimal Corner Protective Brackets */}
          <path className="detail" stroke="var(--iso-accent-hi)" strokeWidth="1.2" d="M54 62 L54 54 L62 54" />
          <path className="detail" stroke="var(--iso-accent-hi)" strokeWidth="1.2" d="M218 62 L218 54 L210 54" />
          <path className="detail" stroke="var(--iso-accent-hi)" strokeWidth="1.2" d="M54 268 L54 276 L62 276" />
          <path className="detail" stroke="var(--iso-accent-hi)" strokeWidth="1.2" d="M218 268 L218 276 L210 276" />

          {/* Wooden Floor Chocks */}
          <polygon points="75,278 87,278 87,282 75,282" className="face recess" />
          <polygon points="182,278 194,278 194,282 182,282" className="face recess" />
        </g>

        {/* ========================================================== */}
        {/* 4. GROUND METADATA & STEPPER CONTROLS (ALIGNED TO BASELINE)*/}
        {/* ========================================================== */}
        <g transform="translate(250, 276)">
          {/* Metadata Chip */}
          <rect className="face recess" x="0" y="0" width="290" height="28" rx="3" />
          <circle className="led hot" cx="12" cy="14" r="2.2" />
          <text className="ink" x="22" y="14" fontSize="7.5" fontWeight="500">
            {currentPainting.title}
          </text>
          <text className="label" x="22" y="22" fontSize="6">
            {currentPainting.artist} &middot; {currentPainting.year}
          </text>

          {/* Compact Stepper Buttons */}
          <g transform="translate(306, 0)">
            <rect className="face recess" x="0" y="0" width="94" height="28" rx="3" />
            
            {/* PREV BUTTON */}
            <g className="press" role="button" tabIndex={0} onClick={handlePrev}>
              <rect className="face" x="4" y="4" width="40" height="20" rx="2" />
              <path className="k-glyph" d="M26 10 L21 14 L26 18" fill="none" strokeWidth="1.3" />
            </g>

            {/* NEXT BUTTON */}
            <g className="press" role="button" tabIndex={0} onClick={handleNext}>
              <rect className="face" x="50" y="4" width="40" height="20" rx="2" />
              <path className="k-glyph" d="M68 10 L73 14 L68 18" fill="none" strokeWidth="1.3" />
            </g>
          </g>
        </g>
      </IsoFigureContainer>
    </div>
  );
}
