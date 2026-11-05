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

  // 11 Stretched Canvases stored vertically inside the carton
  // Slim, realistic stretcher thicknesses (10-14px) with authentic depth
  const CANVAS_SPECS = [
    { w: 11, h: 96, tag: "01" },
    { w: 10, h: 104, tag: "02" },
    { w: 12, h: 92, tag: "03" },
    { w: 9, h: 108, tag: "04" },
    { w: 13, h: 112, tag: "05" },
    { w: 10, h: 90, tag: "06" },
    { w: 12, h: 102, tag: "07" },
    { w: 9, h: 94, tag: "08" },
    { w: 13, h: 106, tag: "09" },
    { w: 9, h: 88, tag: "10" },
    { w: 11, h: 98, tag: "11" },
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
        /* Physically accurate extraction: Lift straight up out of carton -> arc across -> settle flush on easel */
        @keyframes canvas-lift-and-settle {
          0% {
            transform: translate3d(260px, 30px, 0) scale(0.68) rotate(0deg);
            opacity: 0.15;
          }
          22% {
            /* Lifted vertically straight UP out of the box rim */
            transform: translate3d(250px, -70px, 0) scale(0.78) rotate(-2deg);
            opacity: 0.95;
          }
          58% {
            /* Arcing across studio air towards easel ledge */
            transform: translate3d(80px, -28px, 0) scale(0.94) rotate(1deg);
            opacity: 1;
          }
          85% {
            /* Contacts easel ledge, cushioning softly */
            transform: translate3d(0px, 2px, 0) scale(1.004) rotate(-0.15deg);
            opacity: 1;
          }
          100% {
            /* Settled perfectly flush and balanced against easel */
            transform: translate3d(0px, 0px, 0) scale(1) rotate(0deg);
            opacity: 1;
          }
        }
        .anim-canvas-extract {
          animation: canvas-lift-and-settle 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          transform-origin: 140px 282px;
        }

        /* Ground Contact Shadow tracking landing */
        @keyframes shadow-settle-ground {
          0% {
            opacity: 0;
            transform: scale(0.3) translate(140px, 0);
          }
          28% {
            opacity: 0.15;
            transform: scale(0.45) translate(90px, 0);
          }
          62% {
            opacity: 0.55;
            transform: scale(0.85) translate(20px, 0);
          }
          85% {
            opacity: 0.95;
            transform: scale(1.02) translate(0, 0);
          }
          100% {
            opacity: 0.85;
            transform: scale(1) translate(0, 0);
          }
        }
        .anim-shadow-ground {
          animation: shadow-settle-ground 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          transform-origin: 140px 284px;
        }

        /* 3D Canvas hover inside carton */
        .carton-3d-canvas {
          cursor: pointer;
          transition: transform 0.15s ease, filter 0.15s ease;
        }
        .carton-3d-canvas:hover polygon.face,
        .carton-3d-canvas:hover polygon.face-top {
          fill: var(--iso-top) !important;
          stroke: var(--iso-ink) !important;
        }
        .carton-3d-canvas:hover text.label {
          fill: var(--iso-ink) !important;
        }
      `}</style>

      {/* Official Isometric Anatomy Figure Container (.k-iso) */}
      <IsoFigureContainer
        name="Fig 04. / Studio Easel & 3D Archival Carton: Stretched Canvases"
        hint="Click canvas in carton to extract · Click ground canvas to expand"
        readout={`${String(activeIdx + 1).padStart(2, "0")}/${paintings.length} · ${currentPainting.title.toUpperCase().slice(0, 24)}`}
        power={true}
        viewBox="0 0 680 330"
        label="Isometric anatomy figure showing an open 3D cardboard carton box with vertical canvases, and one slender portrait canvas resting in physical perspective against a studio easel."
      >
        <defs>
          {/* Slender Portrait Canvas Face (130px width × 217px height, physically accurate lean) */}
          <clipPath id="ground-canvas-slender-clip">
            <polygon points="82,65 212,65 205,282 75,282" />
          </clipPath>

          {/* Barcode pattern for shipping carton label */}
          <pattern id="carton-barcode" width="6" height="12" patternUnits="userSpaceOnUse">
            <line x1="1" y1="0" x2="1" y2="12" stroke="#8e8e98" strokeWidth="1" />
            <line x1="3.5" y1="0" x2="3.5" y2="12" stroke="#8e8e98" strokeWidth="0.8" />
            <line x1="5" y1="0" x2="5" y2="12" stroke="#8e8e98" strokeWidth="0.5" />
          </pattern>
        </defs>

        {/* Studio Floor Horizon Line */}
        <line className="detail" x1="15" y1="282" x2="665" y2="282" opacity="0.4" />

        {/* ========================================================== */}
        {/* 1. 3D STUDIO EASEL IN BACKGROUND (PHYSICALLY ACCURATE LEAN)*/}
        {/* ========================================================== */}
        {/*
          The easel mast tilts back at the EXACT same angle as the canvas (1.85 deg).
          The canvas lies perfectly flush against this support.
        */}
        <g>
          {/* Rear Tripod Leg extending into 3D background */}
          <polygon
            points="146,54 152,54 176,238 170,238"
            className="face recess"
            strokeWidth="0.8"
            opacity="0.85"
          />
          {/* Rear Leg Foot on Floor */}
          <polygon points="167,238 179,238 182,242 164,242" className="face" opacity="0.9" />

          {/* Easel Central Mast (Tilts back with exact slope matching canvas) */}
          <polygon
            points="143,38 153,38 145,282 135,282"
            className="face"
            strokeWidth="1"
          />
          {/* Mast center height-adjustment track */}
          <line className="detail" x1="148" y1="42" x2="140" y2="280" strokeWidth="0.9" opacity="0.6" />

          {/* Top Mast Wooden Clamp Block with Brass Adjustment Knob */}
          <polygon
            points="140,34 156,34 155,50 139,50"
            className="face top"
            strokeWidth="1"
          />
          <circle className="detail" cx="147.5" cy="42" r="2.5" fill="var(--iso-accent-hi)" opacity="0.8" />
          <line className="detail" x1="145" y1="42" x2="150" y2="42" strokeWidth="1" />

          {/* Easel Bottom Support Ledge (holding canvas base at y = 282) */}
          <polygon
            points="68,281 216,281 213,286 65,286"
            className="face top"
            strokeWidth="1"
          />
          <polygon
            points="65,286 213,286 213,290 65,290"
            className="face"
            strokeWidth="1"
          />
          {/* Wooden lip pegs holding stretcher frame */}
          <rect className="face recess" x="85" y="278" width="6" height="5" rx="1" />
          <rect className="face recess" x="195" y="278" width="6" height="5" rx="1" />
        </g>

        {/* ========================================================== */}
        {/* 2. 3D CARDBOARD CARTON BOX (OPEN WITH 4 FOLDED FLAPS)      */}
        {/* ========================================================== */}
        <g transform="translate(290, 42)">
          {/* Carton Base Contact Ground Shadow */}
          <polygon
            points="145,240 285,194 145,148 5,194"
            fill="#050508"
            opacity="0.85"
            filter="url(#k-soft)"
          />

          {/* Carton Rear Open Flaps (folded back/upward in 3D perspective) */}
          {/* Back-Left Flap */}
          <polygon
            points="5,98 145,52 135,28 -5,72"
            className="face top"
            strokeWidth="1.1"
          />
          <line className="detail" x1="-5" y1="72" x2="135" y2="28" strokeDasharray="3 3" opacity="0.6" />

          {/* Back-Right Flap */}
          <polygon
            points="145,52 285,98 295,72 155,28"
            className="face top"
            strokeWidth="1.1"
          />
          <line className="detail" x1="155" y1="28" x2="295" y2="72" strokeDasharray="3 3" opacity="0.6" />

          {/* Carton Interior Rear Cavity (deep cardboard recess) */}
          <polygon
            points="5,98 145,52 285,98 285,185 145,232 5,185"
            className="face recess"
          />
          <line className="detail" x1="145" y1="52" x2="145" y2="155" opacity="0.4" />

          {/* ======================================================== */}
          {/* 3D STRETCHED CANVASES INSIDE CARTON                      */}
          {/* ======================================================== */}
          {/*
            Each canvas has:
            - Front spine face (w x h)
            - Realistic 3D depth face (receding 42px into the box)
            - Top canvas wrap with corner tuck lines
            - Slim profile matching real art canvases
          */}
          {(() => {
            const depthX = 42;
            const depthY = -14;

            return CANVAS_SPECS.map((spec, i) => {
              const isSelected = i === activeIdx;
              const progress = i / (CANVAS_SPECS.length - 1);
              const bx = 28 + progress * 190;
              const by = 130 + (progress - 0.5) * 12;
              const topY = by - spec.h;

              if (isSelected) {
                // Empty extracted slot inside carton: Clean 3D dashed outline
                return (
                  <g key={i}>
                    {/* Top slot opening */}
                    <polygon
                      points={`
                        ${bx},${topY + 22}
                        ${bx + depthX},${topY + 22 + depthY}
                        ${bx + depthX + spec.w},${topY + 22 + depthY + spec.w * 0.35}
                        ${bx + spec.w},${topY + 22 + spec.w * 0.35}
                      `}
                      fill="none"
                      stroke="var(--iso-accent-hi)"
                      strokeWidth="1.1"
                      strokeDasharray="3 3"
                    />
                    {/* Front slot opening */}
                    <polygon
                      points={`
                        ${bx},${topY + 22}
                        ${bx + spec.w},${topY + 22 + spec.w * 0.35}
                        ${bx + spec.w},${by + 20 + spec.w * 0.35}
                        ${bx},${by + 20}
                      `}
                      fill="none"
                      stroke="var(--iso-accent-hi)"
                      strokeWidth="1.1"
                      strokeDasharray="3 3"
                    />
                    <text
                      className="label"
                      x={bx + spec.w / 2}
                      y={topY + 16}
                      textAnchor="middle"
                      fontSize="6"
                      fontFamily="var(--font-geist-mono)"
                    >
                      [{spec.tag}]
                    </text>
                  </g>
                );
              }

              // Standing 3D Canvas
              return (
                <g
                  key={i}
                  className="carton-3d-canvas"
                  role="button"
                  tabIndex={0}
                  onClick={() => handleSelect(i)}
                >
                  {/* Canvas Body Shadow cast on next canvas */}
                  <polygon
                    points={`
                      ${bx - 1},${topY}
                      ${bx + spec.w + depthX + 1},${topY + depthY}
                      ${bx + spec.w + depthX + 1},${by + depthY + 25}
                      ${bx - 1},${by + 25}
                    `}
                    fill="#07070b"
                    opacity="0.55"
                  />

                  {/* 1. Side Depth Face (receding 42px into carton) */}
                  <polygon
                    className="face"
                    points={`
                      ${bx + spec.w},${topY + spec.w * 0.35}
                      ${bx + spec.w + depthX},${topY + depthY + spec.w * 0.35}
                      ${bx + spec.w + depthX},${by + depthY + 22 + spec.w * 0.35}
                      ${bx + spec.w},${by + 22 + spec.w * 0.35}
                    `}
                    fill="#181922"
                    strokeWidth="1"
                  />
                  {/* Subtle canvas weave horizontal lines */}
                  <line
                    className="detail"
                    x1={bx + spec.w + 4}
                    y1={topY + spec.w * 0.35 + 20}
                    x2={bx + spec.w + depthX - 4}
                    y2={topY + depthY + spec.w * 0.35 + 20}
                    opacity="0.3"
                    strokeDasharray="2 3"
                  />
                  <line
                    className="detail"
                    x1={bx + spec.w + 4}
                    y1={topY + spec.w * 0.35 + 50}
                    x2={bx + spec.w + depthX - 4}
                    y2={topY + depthY + spec.w * 0.35 + 50}
                    opacity="0.3"
                    strokeDasharray="2 3"
                  />

                  {/* 2. Top Face of Stretched Canvas (catching light) */}
                  <polygon
                    className="face top"
                    points={`
                      ${bx},${topY}
                      ${bx + depthX},${topY + depthY}
                      ${bx + depthX + spec.w},${topY + depthY + spec.w * 0.35}
                      ${bx + spec.w},${topY + spec.w * 0.35}
                    `}
                    strokeWidth="1"
                  />
                  {/* Canvas Corner Tuck lines */}
                  <line
                    className="detail"
                    x1={bx}
                    y1={topY}
                    x2={bx + 6}
                    y2={topY + 2}
                    strokeWidth="0.8"
                    opacity="0.6"
                  />
                  <line
                    className="detail"
                    x1={bx + spec.w}
                    y1={topY + spec.w * 0.35}
                    x2={bx + spec.w - 4}
                    y2={topY + spec.w * 0.35 - 3}
                    strokeWidth="0.8"
                    opacity="0.6"
                  />

                  {/* 3. Front Spine Face (facing forward) */}
                  <polygon
                    className="face"
                    points={`
                      ${bx},${topY}
                      ${bx + spec.w},${topY + spec.w * 0.35}
                      ${bx + spec.w},${by + 22 + spec.w * 0.35}
                      ${bx},${by + 22}
                    `}
                    strokeWidth="1.1"
                  />

                  {/* Monospace Numeric Canvas Tag */}
                  <text
                    className="label"
                    x={bx + spec.w / 2}
                    y={topY + 14}
                    textAnchor="middle"
                    fontSize="6"
                    fontFamily="var(--font-geist-mono)"
                  >
                    {spec.tag}
                  </text>

                  {/* Vertical center crease on the canvas spine */}
                  <line
                    className="detail"
                    x1={bx + spec.w / 2}
                    y1={topY + 20}
                    x2={bx + spec.w / 2}
                    y2={by + 16}
                    opacity="0.35"
                  />
                </g>
              );
            });
          })()}

          {/* ======================================================== */}
          {/* CARTON 3D FRONT WALLS & FOREGROUND OPEN FLAPS            */}
          {/* ======================================================== */}
          {/* Left-Front 3D Cardboard Wall */}
          <polygon
            points="5,98 145,144 145,240 5,194"
            className="face"
            strokeWidth="1.2"
          />

          {/* Right-Front 3D Cardboard Wall */}
          <polygon
            points="145,144 285,98 285,194 145,240"
            className="face"
            strokeWidth="1.2"
          />

          {/* Central Corrugated Seam Line between front walls */}
          <line className="detail" x1="145" y1="144" x2="145" y2="240" strokeWidth="1.3" opacity="0.8" />

          {/* Cardboard Packaging Tape strip along vertical center */}
          <polygon
            points="141,143 149,141 149,240 141,240"
            fill="#2c2c36"
            opacity="0.45"
          />

          {/* Left-Front Open Flap (folded downward over front wall) */}
          <polygon
            points="5,98 145,144 135,178 -5,130"
            className="face top"
            strokeWidth="1.2"
          />
          <line className="detail" x1="-5" y1="130" x2="135" y2="178" strokeWidth="0.8" opacity="0.7" />

          {/* Right-Front Open Flap (folded downward over front wall) */}
          <polygon
            points="145,144 285,98 295,130 155,178"
            className="face top"
            strokeWidth="1.2"
          />
          <line className="detail" x1="155" y1="178" x2="295" y2="130" strokeWidth="0.8" opacity="0.7" />

          {/* Shipping Carton Label on Front-Left Wall */}
          <g>
            <polygon
              points="25,145 88,165 88,205 25,185"
              className="face top"
              strokeWidth="0.8"
            />
            <text
              x="30"
              y="158"
              className="label"
              fontSize="5.2"
              transform="skewY(17.8) translate(14, 2)"
              letterSpacing="0.08em"
            >
              PARCEL 04 // ARCHIVE
            </text>

            {/* Barcode Stripes */}
            <rect
              x="30"
              y="164"
              width="50"
              height="16"
              fill="url(#carton-barcode)"
              transform="skewY(17.8) translate(14, -2)"
              opacity="0.8"
            />

            {/* "THIS SIDE UP" Stencil Arrows ⇡⇡ */}
            <g transform="translate(100, 185) skewY(17.8)">
              <path d="M4 14 L8 9 L12 14 M8 9 L8 18" fill="none" stroke="var(--iso-label)" strokeWidth="1.2" />
              <path d="M16 14 L20 9 L24 14 M20 9 L20 18" fill="none" stroke="var(--iso-label)" strokeWidth="1.2" />
            </g>
          </g>

          {/* Die-Cut Oval Carrying Handle on Front-Right Wall */}
          <g transform="translate(205, 155) skewY(-17.8)">
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

        {/* ========================================================== */}
        {/* 3. SLENDER PORTRAIT CANVAS LEANING FLUSH ON THE EASEL      */}
        {/* ========================================================== */}
        {/*
          Physically accurate lean (1.85 deg back), slim 12px stretcher frame,
          resting solidly on easel ledge at y = 282.
        */}
        <g
          key={activeIdx}
          className="cursor-pointer anim-canvas-extract"
          onClick={() => {
            if (onOpenViewer) onOpenViewer(activeIdx);
          }}
        >
          {/* Studio Floor Soft Ambient Contact Shadow */}
          <ellipse
            cx="138"
            cy="284"
            rx="82"
            ry="7.5"
            fill="#000000"
            opacity="0.85"
            filter="url(#k-soft)"
            className="anim-shadow-ground"
          />

          {/* Crisp Contact Shadow Line where stretcher frame meets easel ledge */}
          <line
            x1="63"
            y1="282.5"
            x2="208"
            y2="282.5"
            stroke="#000000"
            strokeWidth="2.4"
            strokeLinecap="round"
          />

          {/* 1. Slim Stretcher Bar Depth (Realistic 12px Gallery-Wrap Profile) */}
          <polygon
            className="face"
            points="70,60 82,65 75,282 63,277"
            strokeWidth="1.1"
            fill="#1a1b24"
          />
          {/* Subtle canvas edge staples along rear stretcher corner */}
          {[95, 130, 165, 200, 235, 270].map((sy) => (
            <line
              key={sy}
              className="detail"
              x1="66"
              y1={sy}
              x2="70"
              y2={sy + 1.2}
              strokeWidth="1.2"
              opacity="0.85"
            />
          ))}

          {/* 2. Top Edge Wrap of Canvas (Slim 8px depth facet catching light) */}
          <polygon
            className="face top"
            points="70,60 200,60 212,65 82,65"
            strokeWidth="1.1"
          />

          {/* 3. Front Canvas Face (Slender Portrait Rectangle, 130px wide × 217px high) */}
          <polygon
            className="face top"
            points="82,65 212,65 205,282 75,282"
            strokeWidth="1.2"
          />

          {/* High-Resolution Framed Painting Artwork */}
          <g clipPath="url(#ground-canvas-slender-clip)">
            <image
              href={currentPainting.url}
              x="68"
              y="60"
              width="150"
              height="226"
              preserveAspectRatio="xMidYMid slice"
              style={{ filter: "contrast(1.05) brightness(1.02)" }}
            />

            {/* Fine linen weave texture overlays */}
            <line x1="75" y1="110" x2="212" y2="110" stroke="#ffffff" strokeWidth="0.4" strokeOpacity="0.04" strokeDasharray="3 3" />
            <line x1="75" y1="160" x2="212" y2="160" stroke="#ffffff" strokeWidth="0.4" strokeOpacity="0.04" strokeDasharray="3 3" />
            <line x1="75" y1="210" x2="212" y2="210" stroke="#ffffff" strokeWidth="0.4" strokeOpacity="0.04" strokeDasharray="3 3" />
            <line x1="75" y1="260" x2="212" y2="260" stroke="#ffffff" strokeWidth="0.4" strokeOpacity="0.04" strokeDasharray="3 3" />

            {/* Minimal Matte Placard along bottom of canvas */}
            <polygon points="75,260 207,260 205,282 75,282" fill="#0b0c10" opacity="0.94" />
            <text x="83" y="274" className="ink" fontSize="6.8" letterSpacing="0.04em">
              {currentPainting.title.toUpperCase().slice(0, 18)}
            </text>
          </g>

          {/* Realistic Canvas Corner Tuck Folds */}
          <g opacity="0.75">
            {/* Top-Left Corner Fold */}
            <line className="detail" x1="82" y1="74" x2="91" y2="65" strokeWidth="0.9" />
            {/* Top-Right Corner Fold */}
            <line className="detail" x1="212" y1="74" x2="203" y2="65" strokeWidth="0.9" />
            {/* Bottom-Left Corner Fold */}
            <line className="detail" x1="75" y1="273" x2="84" y2="282" strokeWidth="0.9" />
            {/* Bottom-Right Corner Fold */}
            <line className="detail" x1="205" y1="273" x2="196" y2="282" strokeWidth="0.9" />
          </g>

          {/* Precision Protective Corner Guards */}
          <path className="detail" stroke="var(--iso-accent-hi)" strokeWidth="1.2" d="M84 72 L84 67 L91 67" />
          <path className="detail" stroke="var(--iso-accent-hi)" strokeWidth="1.2" d="M210 72 L210 67 L203 67" />
          <path className="detail" stroke="var(--iso-accent-hi)" strokeWidth="1.2" d="M77 275 L77 280 L84 280" />
          <path className="detail" stroke="var(--iso-accent-hi)" strokeWidth="1.2" d="M203 275 L203 280 L196 280" />
        </g>

        {/* ========================================================== */}
        {/* 4. GROUND METADATA & STEPPER CONTROLS                      */}
        {/* ========================================================== */}
        <g transform="translate(245, 288)">
          {/* Metadata Chip */}
          <rect className="face recess" x="0" y="0" width="295" height="28" rx="3" />
          <circle className="led hot" cx="12" cy="14" r="2.2" />
          <text className="ink" x="22" y="14" fontSize="7.5" fontWeight="500">
            {currentPainting.title}
          </text>
          <text className="label" x="22" y="22" fontSize="6">
            {currentPainting.artist} &middot; {currentPainting.year}
          </text>

          {/* Compact Stepper Buttons */}
          <g transform="translate(310, 0)">
            <rect className="face recess" x="0" y="0" width="95" height="28" rx="3" />
            
            {/* PREV BUTTON */}
            <g className="press" role="button" tabIndex={0} onClick={handlePrev}>
              <rect className="face" x="4" y="4" width="40" height="20" rx="2" />
              <path className="k-glyph" d="M26 10 L21 14 L26 18" fill="none" strokeWidth="1.3" />
            </g>

            {/* NEXT BUTTON */}
            <g className="press" role="button" tabIndex={0} onClick={handleNext}>
              <rect className="face" x="51" y="4" width="40" height="20" rx="2" />
              <path className="k-glyph" d="M69 10 L74 14 L69 18" fill="none" strokeWidth="1.3" />
            </g>
          </g>
        </g>
      </IsoFigureContainer>
    </div>
  );
}
