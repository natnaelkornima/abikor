"use client";

import React, { useState, useEffect, useRef } from "react";
import { IsoFigureContainer } from "@/lib/iso";
import { portfolio, Painting } from "@/data/portfolio";
import { Maximize2, ChevronLeft, ChevronRight } from "lucide-react";

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
  const paintings =
    propPaintings && propPaintings.length > 0 ? propPaintings : portfolio.paintings;
  const [activeIdx, setActiveIdx] = useState(currentPaintingIndex);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const isHoveredRef = useRef(false);

  // 11 Stretched Canvases stored vertically inside the carton with generous 3D depth
  const CANVAS_SPECS = [
    { w: 16, h: 86, tag: "01" },
    { w: 15, h: 92, tag: "02" },
    { w: 17, h: 84, tag: "03" },
    { w: 14, h: 94, tag: "04" },
    { w: 18, h: 98, tag: "05" },
    { w: 15, h: 82, tag: "06" },
    { w: 17, h: 90, tag: "07" },
    { w: 14, h: 86, tag: "08" },
    { w: 18, h: 92, tag: "09" },
    { w: 14, h: 80, tag: "10" },
    { w: 16, h: 86, tag: "11" },
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

  // Autonomous cycle: elevates the next canvas every 5.5 seconds unless paused/hovered
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      if (!isHoveredRef.current) {
        handleSelect((activeIdx + 1) % paintings.length);
      }
    }, 5500);
    return () => clearInterval(interval);
  }, [activeIdx, isPaused, paintings.length]);

  const currentPainting: Painting = paintings[activeIdx] || paintings[0];

  // 3D projection parameters for canvases
  const depthX = 76;
  const depthY = -24;

  return (
    <div
      className="w-full select-none"
      onMouseEnter={() => {
        isHoveredRef.current = true;
      }}
      onMouseLeave={() => {
        isHoveredRef.current = false;
        setHoveredIdx(null);
      }}
    >
      <style>{`
        /* Smooth vertical elevation without leaving carton box */
        .carton-canvas-item {
          cursor: pointer;
          transition: transform 0.38s cubic-bezier(0.16, 1, 0.3, 1), filter 0.2s ease;
          transform-box: fill-box;
        }
        .carton-canvas-item:hover polygon.face-hover,
        .carton-canvas-item:hover polygon.face-top-hover {
          fill: var(--iso-top) !important;
          stroke: var(--iso-ink) !important;
        }
        .carton-canvas-item:hover text.label {
          fill: var(--iso-ink-hi) !important;
        }
        @media (prefers-reduced-motion: reduce) {
          .carton-canvas-item {
            transition: none !important;
          }
        }
      `}</style>

      {/* Official Isometric Anatomy Figure Container (.k-iso) */}
      <IsoFigureContainer
        name="Fig 04. / Studio Archival Carton: Preserved Canvases"
        hint="Click any canvas in the box to elevate · Click elevated canvas to expand"
        readout={`${String(activeIdx + 1).padStart(2, "0")}/${paintings.length} · ${currentPainting.title.toUpperCase().slice(0, 24)}`}
        power={true}
        viewBox="0 0 680 340"
        label="Centered isometric anatomy figure showing an archival cardboard carton with stretched canvases with rich 3D depth, with the selected canvas elevated upward inside the box."
      >
        <defs>
          {/* Barcode pattern for shipping carton label */}
          <pattern id="carton-barcode-pattern" width="6" height="12" patternUnits="userSpaceOnUse">
            <line x1="1" y1="0" x2="1" y2="12" stroke="#8e8e98" strokeWidth="1" />
            <line x1="3.5" y1="0" x2="3.5" y2="12" stroke="#8e8e98" strokeWidth="0.8" />
            <line x1="5" y1="0" x2="5" y2="12" stroke="#8e8e98" strokeWidth="0.5" />
          </pattern>

          {/* Clip path generator for canvas depth artwork faces */}
          {CANVAS_SPECS.map((spec, i) => {
            const p = i / (CANVAS_SPECS.length - 1);
            const bx = 215 + p * 195;
            const by = 195 - p * 55;
            const topY = by - spec.h;

            return (
              <clipPath key={`depth-clip-${i}`} id={`depth-clip-${i}`}>
                <polygon
                  points={`
                    ${bx + spec.w},${topY + spec.w * 0.3}
                    ${bx + spec.w + depthX},${topY + depthY + spec.w * 0.3}
                    ${bx + spec.w + depthX},${by + depthY + spec.w * 0.3}
                    ${bx + spec.w},${by + spec.w * 0.3}
                  `}
                />
              </clipPath>
            );
          })}
        </defs>

        {/* Studio Floor Horizon Line */}
        <line className="detail" x1="20" y1="285" x2="660" y2="285" opacity="0.35" />

        {/* ======================================================== */}
        {/* CENTERED 3D ARCHIVAL CARDBOARD CARTON                    */}
        {/* ======================================================== */}
        <g>
          {/* Ground Soft Contact Shadow */}
          <polygon
            points="160,225 340,288 520,225 340,162"
            fill="#030305"
            opacity="0.85"
            filter="url(#k-soft)"
          />

          {/* Carton Rear Open Flaps (folded backward/upward in 3D perspective) */}
          {/* Back-Left Flap */}
          <polygon
            points="160,145 340,85 328,52 148,112"
            className="face top"
            strokeWidth="1.1"
          />
          <line className="detail" x1="148" y1="112" x2="328" y2="52" strokeDasharray="3 3" opacity="0.6" />

          {/* Back-Right Flap */}
          <polygon
            points="340,85 520,145 532,112 352,52"
            className="face top"
            strokeWidth="1.1"
          />
          <line className="detail" x1="352" y1="52" x2="532" y2="112" strokeDasharray="3 3" opacity="0.6" />

          {/* Carton Interior Cavity (Deep recess behind canvases) */}
          <polygon
            points="160,145 340,85 520,145 520,195 340,255 160,195"
            className="face recess"
            fill="#0c0c10"
          />
          <line className="detail" x1="340" y1="85" x2="340" y2="210" opacity="0.3" />

          {/* ======================================================== */}
          {/* 3D STRETCHED CANVASES INSIDE BOX (WITH REAL DEPTH)       */}
          {/* ======================================================== */}
          {CANVAS_SPECS.map((spec, i) => {
            const isSelected = i === activeIdx;
            const isHovered = hoveredIdx === i;
            const painting = paintings[i % paintings.length] || currentPainting;

            const p = i / (CANVAS_SPECS.length - 1);
            const bx = 215 + p * 195;
            const by = 195 - p * 55;
            const topY = by - spec.h;

            // When selected, moves UP by 44px without leaving the box!
            // When hovered (and not selected), lifts gently by 8px
            const translateY = isSelected ? -44 : isHovered ? -8 : 0;

            return (
              <g
                key={i}
                className="carton-canvas-item"
                role="button"
                tabIndex={0}
                aria-label={`Canvas ${spec.tag}: ${painting.title}`}
                onClick={() => {
                  if (isSelected) {
                    if (onOpenViewer) onOpenViewer(i);
                  } else {
                    handleSelect(i);
                  }
                }}
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
                style={{
                  transform: `translateY(${translateY}px)`,
                }}
              >
                {/* Contact drop shadow cast onto neighbor canvas */}
                <polygon
                  points={`
                    ${bx - 2},${topY}
                    ${bx + spec.w + depthX + 2},${topY + depthY}
                    ${bx + spec.w + depthX + 2},${by + depthY + 28}
                    ${bx - 2},${by + 28}
                  `}
                  fill="#050508"
                  opacity={isSelected ? 0.7 : 0.4}
                />

                {/* 1. Receding 3D Side Depth Face (depthX = 76px, depthY = -24px) */}
                <polygon
                  className={`face face-hover ${isSelected ? "lit" : ""}`}
                  points={`
                    ${bx + spec.w},${topY + spec.w * 0.3}
                    ${bx + spec.w + depthX},${topY + depthY + spec.w * 0.3}
                    ${bx + spec.w + depthX},${by + depthY + spec.w * 0.3}
                    ${bx + spec.w},${by + spec.w * 0.3}
                  `}
                  fill={isSelected ? "#1c1c24" : "#16171d"}
                  strokeWidth="1.1"
                />

                {/* Painting Artwork Texture on Side Depth Face */}
                <g clipPath={`url(#depth-clip-${i})`} opacity={isSelected ? 0.95 : 0.65}>
                  <image
                    href={painting.url}
                    x={bx + spec.w - 10}
                    y={topY + depthY - 10}
                    width={depthX + spec.w + 20}
                    height={spec.h + 20}
                    preserveAspectRatio="xMidYMid slice"
                    style={{
                      filter: isSelected
                        ? "contrast(1.08) brightness(1.05)"
                        : "grayscale(0.35) brightness(0.8)",
                    }}
                  />
                  {/* Subtle canvas linen weave stripes */}
                  <line
                    x1={bx + spec.w}
                    y1={topY + 30}
                    x2={bx + spec.w + depthX}
                    y2={topY + depthY + 30}
                    stroke="#ffffff"
                    strokeWidth="0.5"
                    strokeOpacity="0.08"
                    strokeDasharray="2 3"
                  />
                  <line
                    x1={bx + spec.w}
                    y1={topY + 60}
                    x2={bx + spec.w + depthX}
                    y2={topY + depthY + 60}
                    stroke="#ffffff"
                    strokeWidth="0.5"
                    strokeOpacity="0.08"
                    strokeDasharray="2 3"
                  />
                </g>

                {/* 2. Top Face of Canvas Stretcher (catching light, showing thickness + depth) */}
                <polygon
                  className={`face top face-top-hover ${isSelected ? "lit" : ""}`}
                  points={`
                    ${bx},${topY}
                    ${bx + depthX},${topY + depthY}
                    ${bx + depthX + spec.w},${topY + depthY + spec.w * 0.3}
                    ${bx + spec.w},${topY + spec.w * 0.3}
                  `}
                  fill={isSelected ? "var(--iso-accent-hi)" : "#22232a"}
                  strokeWidth="1.1"
                />

                {/* Canvas Corner Tuck Lines */}
                <line
                  className="detail"
                  x1={bx}
                  y1={topY}
                  x2={bx + 6}
                  y2={topY + 2}
                  strokeWidth="0.9"
                  opacity={isSelected ? 0.9 : 0.5}
                />
                <line
                  className="detail"
                  x1={bx + spec.w}
                  y1={topY + spec.w * 0.3}
                  x2={bx + spec.w - 5}
                  y2={topY + spec.w * 0.3 - 2}
                  strokeWidth="0.9"
                  opacity={isSelected ? 0.9 : 0.5}
                />

                {/* 3. Front Spine Face (facing forward) */}
                <polygon
                  className={`face ${isSelected ? "lit" : ""}`}
                  points={`
                    ${bx},${topY}
                    ${bx + spec.w},${topY + spec.w * 0.3}
                    ${bx + spec.w},${by + spec.w * 0.3}
                    ${bx},${by}
                  `}
                  fill={isSelected ? "#272730" : "#1a1a20"}
                  strokeWidth="1.1"
                />

                {/* Tag Number [01], [02] */}
                <text
                  className="label"
                  x={bx + spec.w / 2}
                  y={topY + 14}
                  textAnchor="middle"
                  fontSize="5.8"
                  fontFamily="var(--font-geist-mono)"
                  fill={isSelected ? "var(--iso-accent-hi)" : "var(--iso-ink)"}
                  fontWeight={isSelected ? "600" : "400"}
                >
                  {spec.tag}
                </text>

                {/* Center spine ridge indicator */}
                <line
                  className="detail"
                  x1={bx + spec.w / 2}
                  y1={topY + 19}
                  x2={bx + spec.w / 2}
                  y2={by - 10}
                  opacity={isSelected ? 0.9 : 0.3}
                  stroke={isSelected ? "var(--iso-accent-hi)" : "var(--iso-line)"}
                  strokeWidth={isSelected ? 1.2 : 0.8}
                />

                {/* Active Glowing Dot when selected */}
                {isSelected && (
                  <circle
                    cx={bx + spec.w / 2}
                    cy={topY + 26}
                    r="1.8"
                    fill="var(--iso-accent-hi)"
                    className="led hot"
                  />
                )}

                {/* Floating "CLICK TO EXPAND ↗" pill above elevated canvas */}
                {isSelected && (
                  <g transform={`translate(${bx - 20}, ${topY - 18})`}>
                    <rect
                      x="0"
                      y="0"
                      width="68"
                      height="13"
                      rx="3"
                      fill="#151515"
                      stroke="var(--iso-accent-hi)"
                      strokeWidth="0.8"
                      opacity="0.95"
                    />
                    <text
                      x="34"
                      y="9"
                      textAnchor="middle"
                      fontSize="5"
                      fontFamily="var(--font-geist-mono)"
                      fill="#ededed"
                      letterSpacing="0.06em"
                    >
                      EXPAND ↗
                    </text>
                  </g>
                )}
              </g>
            );
          })}

          {/* ======================================================== */}
          {/* CARTON 3D FRONT WALLS & FOREGROUND OPEN FLAPS            */}
          {/* Rendered in front of canvases so bottoms remain in box!  */}
          {/* ======================================================== */}
          {/* Left-Front 3D Cardboard Wall */}
          <polygon
            points="160,145 340,205 340,280 160,220"
            className="face"
            strokeWidth="1.2"
          />

          {/* Right-Front 3D Cardboard Wall */}
          <polygon
            points="340,205 520,145 520,220 340,280"
            className="face"
            strokeWidth="1.2"
          />

          {/* Central Corrugated Seam Line between front walls */}
          <line className="detail" x1="340" y1="205" x2="340" y2="280" strokeWidth="1.3" opacity="0.8" />

          {/* Cardboard Packaging Tape strip along vertical center */}
          <polygon
            points="336,204 344,204 344,280 336,280"
            fill="#2c2c36"
            opacity="0.45"
          />

          {/* Left-Front Open Flap (folded downward over front wall) */}
          <polygon
            points="160,145 340,205 328,240 148,180"
            className="face top"
            strokeWidth="1.2"
          />
          <line className="detail" x1="148" y1="180" x2="328" y2="240" strokeWidth="0.8" opacity="0.7" />

          {/* Right-Front Open Flap (folded downward over front wall) */}
          <polygon
            points="340,205 520,145 532,180 352,240"
            className="face top"
            strokeWidth="1.2"
          />
          <line className="detail" x1="352" y1="240" x2="532" y2="180" strokeWidth="0.8" opacity="0.7" />

          {/* Shipping Carton Label on Front-Left Wall */}
          <g>
            <polygon
              points="185,190 252,212 252,252 185,230"
              className="face top"
              strokeWidth="0.8"
            />
            <text
              x="190"
              y="203"
              className="label"
              fontSize="5.2"
              transform="skewY(18) translate(14, 2)"
              letterSpacing="0.08em"
            >
              PARCEL 04 // ARCHIVE
            </text>

            {/* Barcode Stripes */}
            <rect
              x="190"
              y="209"
              width="50"
              height="16"
              fill="url(#carton-barcode-pattern)"
              transform="skewY(18) translate(14, -2)"
              opacity="0.8"
            />

            {/* "THIS SIDE UP" Stencil Arrows ⇡⇡ */}
            <g transform="translate(262, 230) skewY(18)">
              <path d="M4 14 L8 9 L12 14 M8 9 L8 18" fill="none" stroke="var(--iso-label)" strokeWidth="1.2" />
              <path d="M16 14 L20 9 L24 14 M20 9 L20 18" fill="none" stroke="var(--iso-label)" strokeWidth="1.2" />
            </g>
          </g>

          {/* Die-Cut Oval Carrying Handle on Front-Right Wall */}
          <g transform="translate(435, 202) skewY(-18)">
            <rect
              className="face recess"
              x="0"
              y="0"
              width="36"
              height="16"
              rx="8"
              strokeWidth="1.2"
            />
            <line className="detail" x1="4" y1="8" x2="32" y2="8" opacity="0.5" />
          </g>
        </g>

        {/* ======================================================== */}
        {/* GROUND METADATA BAR & STEPPER CONTROLS (CENTERED)        */}
        {/* ======================================================== */}
        <g transform="translate(135, 296)">
          {/* Metadata Pod */}
          <rect className="face recess" x="0" y="0" width="280" height="30" rx="4" />
          <circle className="led hot" cx="14" cy="15" r="2.4" />
          <text className="ink" x="26" y="14" fontSize="8" fontWeight="500">
            {currentPainting.title}
          </text>
          <text className="label" x="26" y="23" fontSize="6.2">
            {currentPainting.artist} &middot; {currentPainting.year} &middot;{" "}
            <tspan fill="var(--iso-accent)">{currentPainting.tag}</tspan>
          </text>

          {/* Stepper Pod (Prev / Next / Expand) */}
          <g transform="translate(295, 0)">
            <rect className="face recess" x="0" y="0" width="115" height="30" rx="4" />

            {/* PREV BUTTON */}
            <g
              className="press"
              role="button"
              tabIndex={0}
              onClick={handlePrev}
              aria-label="Previous canvas"
            >
              <rect className="face" x="4" y="4" width="32" height="22" rx="2.5" />
              <path className="k-glyph" d="M22 11 L17 15 L22 19" fill="none" strokeWidth="1.4" />
            </g>

            {/* NEXT BUTTON */}
            <g
              className="press"
              role="button"
              tabIndex={0}
              onClick={handleNext}
              aria-label="Next canvas"
            >
              <rect className="face" x="41" y="4" width="32" height="22" rx="2.5" />
              <path className="k-glyph" d="M55 11 L60 15 L55 19" fill="none" strokeWidth="1.4" />
            </g>

            {/* EXPAND BUTTON */}
            <g
              className="press"
              role="button"
              tabIndex={0}
              onClick={() => {
                if (onOpenViewer) onOpenViewer(activeIdx);
              }}
              aria-label="Expand artwork in viewer"
            >
              <rect className="face" x="78" y="4" width="33" height="22" rx="2.5" />
              {/* Expand icon in SVG */}
              <path
                className="k-glyph"
                d="M91 18 L99 10 M99 10 L94 10 M99 10 L99 15"
                fill="none"
                strokeWidth="1.3"
              />
            </g>
          </g>
        </g>
      </IsoFigureContainer>
    </div>
  );
}
