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
  // Deep 3D gallery-wrap profiles with substantial physical depth
  const CANVAS_SPECS = [
    { w: 14, h: 96, tag: "01" },
    { w: 12, h: 104, tag: "02" },
    { w: 15, h: 92, tag: "03" },
    { w: 11, h: 108, tag: "04" },
    { w: 16, h: 112, tag: "05" },
    { w: 12, h: 90, tag: "06" },
    { w: 15, h: 102, tag: "07" },
    { w: 11, h: 94, tag: "08" },
    { w: 16, h: 106, tag: "09" },
    { w: 11, h: 88, tag: "10" },
    { w: 14, h: 98, tag: "11" },
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
        /* Physical 4-stage extraction: Lift straight up out of carton -> arc across studio -> tilt back into 3D perspective -> settle firmly on easel */
        @keyframes canvas-lift-and-settle {
          0% {
            transform: translate3d(265px, 35px, 0) scale(0.62) rotate(0deg);
            opacity: 0.15;
          }
          24% {
            /* Lifted vertically straight UP out of the carton box rim */
            transform: translate3d(255px, -75px, 0) scale(0.76) rotate(-2.5deg);
            opacity: 0.95;
          }
          60% {
            /* Arcing across the studio air towards the ground easel */
            transform: translate3d(85px, -32px, 0) scale(0.92) rotate(1.2deg);
            opacity: 1;
          }
          84% {
            /* Touches down on the floor, tilting back into 3D perspective */
            transform: translate3d(0px, 3.5px, 0) scale(1.008) rotate(-0.25deg);
            opacity: 1;
          }
          100% {
            /* Settled firmly in 3D perspective leaning back against easel */
            transform: translate3d(0px, 0px, 0) scale(1) rotate(0deg);
            opacity: 1;
          }
        }
        .anim-canvas-extract {
          animation: canvas-lift-and-settle 0.85s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          transform-origin: 140px 285px;
        }

        /* Ground Contact Shadow tracking the landing */
        @keyframes shadow-settle-ground {
          0% {
            opacity: 0;
            transform: scale(0.25) translate(140px, 0);
          }
          28% {
            opacity: 0.12;
            transform: scale(0.4) translate(90px, 0);
          }
          62% {
            opacity: 0.55;
            transform: scale(0.85) translate(20px, 0);
          }
          86% {
            opacity: 0.95;
            transform: scale(1.03) translate(0, 0);
          }
          100% {
            opacity: 0.85;
            transform: scale(1) translate(0, 0);
          }
        }
        .anim-shadow-ground {
          animation: shadow-settle-ground 0.85s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          transform-origin: 132px 287px;
        }

        /* 3D Canvas spine & deep side hover inside carton */
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
        name="Fig 04. / Archival 3D Carton: Deep Canvases & Studio Easel Display"
        hint="Click canvas in carton to extract · Click ground canvas to expand"
        readout={`${String(activeIdx + 1).padStart(2, "0")}/${paintings.length} · ${currentPainting.title.toUpperCase().slice(0, 24)}`}
        power={true}
        viewBox="0 0 680 330"
        label="Isometric anatomy figure showing an open 3D cardboard carton box with deep stretched canvases, with one portrait canvas lifted out and settled in 3D perspective against an easel."
      >
        <defs>
          {/* Clipping path for the slender portrait canvas face in 3D perspective tilt */}
          <clipPath id="ground-canvas-tall-clip">
            <polygon points="84,60 224,60 212,285 72,285" />
          </clipPath>

          {/* Barcode pattern for shipping carton label */}
          <pattern id="carton-barcode" width="6" height="12" patternUnits="userSpaceOnUse">
            <line x1="1" y1="0" x2="1" y2="12" stroke="#8e8e98" strokeWidth="1" />
            <line x1="3.5" y1="0" x2="3.5" y2="12" stroke="#8e8e98" strokeWidth="0.8" />
            <line x1="5" y1="0" x2="5" y2="12" stroke="#8e8e98" strokeWidth="0.5" />
          </pattern>
        </defs>

        {/* Studio Floor Horizon Line */}
        <line className="detail" x1="15" y1="285" x2="665" y2="285" opacity="0.4" />

        {/* ========================================================== */}
        {/* 1. 3D STUDIO EASEL / BACK SUPPORT STAND (IN BACKGROUND)    */}
        {/* ========================================================== */}
        {/*
          This easel stands on the floor in the background. The extracted
          canvas rests on its shelf, leaning back against the central mast.
        */}
        <g transform="translate(0, 0)">
          {/* Rear Diagonal Tripod Leg extending into 3D background */}
          <polygon
            points="150,52 156,52 188,262 182,262"
            className="face recess"
            strokeWidth="0.8"
            opacity="0.85"
          />
          {/* Rear Leg Floor Contact Foot */}
          <polygon points="179,262 191,262 195,266 175,266" className="face" opacity="0.9" />

          {/* Central Vertical Easel Mast rising behind the canvas */}
          <polygon
            points="148,36 158,36 158,285 148,285"
            className="face"
            strokeWidth="1"
          />
          {/* Mast center adjustment track groove */}
          <line className="detail" x1="153" y1="40" x2="153" y2="283" strokeWidth="1" opacity="0.6" />

          {/* Top Mast Wooden Clamp Block with Brass Adjustment Knob */}
          <rect className="face top" x="144" y="34" width="18" height="16" rx="2" strokeWidth="1" />
          <circle className="detail" cx="153" cy="42" r="2.8" fill="var(--iso-accent-hi)" opacity="0.75" />
          <line className="detail" x1="150" y1="42" x2="156" y2="42" strokeWidth="1" />

          {/* Easel Base Floor Shelf (holding bottom of canvas) */}
          <polygon
            points="62,284 222,284 218,289 58,289"
            className="face top"
            strokeWidth="1"
          />
          <polygon
            points="58,289 218,289 218,294 58,294"
            className="face"
            strokeWidth="1"
          />
          {/* Brass retention pegs on the shelf */}
          <rect className="face recess" x="80" y="281" width="8" height="6" rx="1" />
          <rect className="face recess" x="194" y="281" width="8" height="6" rx="1" />
        </g>

        {/* ========================================================== */}
        {/* 2. 3D CARDBOARD CARTON BOX (OPEN WITH 4 FOLDED FLAPS)      */}
        {/* ========================================================== */}
        <g transform="translate(290, 42)">
          {/* Carton Base Contact Ground Shadow */}
          <polygon
            points="145,242 285,196 145,150 5,196"
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
          {/* 3D STRETCHED CANVASES WITH REAL DEPTH INSIDE CARTON      */}
          {/* ======================================================== */}
          {/*
            Each canvas has:
            - Front spine face (w x h)
            - Significant 3D depth face (receding 62px back into the carton)
            - Top canvas face with realistic corner tuck lines
            - Ambient occlusion shadow between adjacent canvases
          */}
          {(() => {
            // Significant 3D depth receding into the interior of the box
            const depthX = 62;
            const depthY = -21;

            return CANVAS_SPECS.map((spec, i) => {
              const isSelected = i === activeIdx;
              // Placement along interior diagonal of the carton
              const progress = i / (CANVAS_SPECS.length - 1);
              const bx = 26 + progress * 180;
              const by = 132 + (progress - 0.5) * 12;
              const topY = by - spec.h;

              if (isSelected) {
                // Empty extracted slot inside carton: Bold 3D dashed outline
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
                      strokeWidth="1.2"
                      strokeDasharray="3 3"
                    />
                    {/* Side depth slot opening */}
                    <polygon
                      points={`
                        ${bx + spec.w},${topY + 22 + spec.w * 0.35}
                        ${bx + spec.w + depthX},${topY + 22 + depthY + spec.w * 0.35}
                        ${bx + spec.w + depthX},${by + 20 + depthY + spec.w * 0.35}
                        ${bx + spec.w},${by + 20 + spec.w * 0.35}
                      `}
                      fill="none"
                      stroke="var(--iso-accent-hi)"
                      strokeWidth="1.2"
                      strokeDasharray="3 3"
                      opacity="0.6"
                    />
                    {/* Front vertical slot opening */}
                    <polygon
                      points={`
                        ${bx},${topY + 22}
                        ${bx + spec.w},${topY + 22 + spec.w * 0.35}
                        ${bx + spec.w},${by + 20 + spec.w * 0.35}
                        ${bx},${by + 20}
                      `}
                      fill="none"
                      stroke="var(--iso-accent-hi)"
                      strokeWidth="1.2"
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

              // Standing 3D Stretched Canvas with deep 3D volume, corner folds, and linen texture
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
                      ${bx + spec.w + depthX + 2},${topY + depthY}
                      ${bx + spec.w + depthX + 2},${by + depthY + 25}
                      ${bx - 1},${by + 25}
                    `}
                    fill="#07070b"
                    opacity="0.6"
                  />

                  {/* 1. Deep Side Face (3D depth receding 62px into box) */}
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
                  {/* Stretched canvas texture lines along the deep side face */}
                  <line
                    className="detail"
                    x1={bx + spec.w + 6}
                    y1={topY + spec.w * 0.35 + 18}
                    x2={bx + spec.w + depthX - 6}
                    y2={topY + depthY + spec.w * 0.35 + 18}
                    opacity="0.35"
                    strokeDasharray="3 4"
                  />
                  <line
                    className="detail"
                    x1={bx + spec.w + 6}
                    y1={topY + spec.w * 0.35 + 42}
                    x2={bx + spec.w + depthX - 6}
                    y2={topY + depthY + spec.w * 0.35 + 42}
                    opacity="0.35"
                    strokeDasharray="3 4"
                  />
                  <line
                    className="detail"
                    x1={bx + spec.w + 6}
                    y1={topY + spec.w * 0.35 + 68}
                    x2={bx + spec.w + depthX - 6}
                    y2={topY + depthY + spec.w * 0.35 + 68}
                    opacity="0.35"
                    strokeDasharray="3 4"
                  />

                  {/* 2. Top Face of Stretched Canvas (catching light, showing corner folds) */}
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
                  {/* Canvas Corner Tuck lines on the top fold */}
                  <line
                    className="detail"
                    x1={bx}
                    y1={topY}
                    x2={bx + 8}
                    y2={topY + 3}
                    strokeWidth="0.8"
                    opacity="0.6"
                  />
                  <line
                    className="detail"
                    x1={bx + spec.w}
                    y1={topY + spec.w * 0.35}
                    x2={bx + spec.w - 5}
                    y2={topY + spec.w * 0.35 - 4}
                    strokeWidth="0.8"
                    opacity="0.6"
                  />
                  <line
                    className="detail"
                    x1={bx + depthX}
                    y1={topY + depthY}
                    x2={bx + depthX + 5}
                    y2={topY + depthY + 2}
                    strokeWidth="0.8"
                    opacity="0.5"
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
            points="5,98 145,144 145,242 5,196"
            className="face"
            strokeWidth="1.2"
          />

          {/* Right-Front 3D Cardboard Wall */}
          <polygon
            points="145,144 285,98 285,196 145,242"
            className="face"
            strokeWidth="1.2"
          />

          {/* Central Corrugated Seam Line between front walls */}
          <line className="detail" x1="145" y1="144" x2="145" y2="242" strokeWidth="1.3" opacity="0.8" />

          {/* Cardboard Packaging Tape strip along vertical center */}
          <polygon
            points="141,143 149,141 149,242 141,242"
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
        {/* 3. EXTRACTED CANVAS SETTLING IN 3D LEANING ON THE EASEL    */}
        {/* ========================================================== */}
        {/*
          Lifts vertically up from the carton box, arcs across the studio,
          and settles leaning back in 3D perspective against the easel mast.
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
            cx="132"
            cy="287"
            rx="92"
            ry="8.5"
            fill="#000000"
            opacity="0.85"
            filter="url(#k-soft)"
            className="anim-shadow-ground"
          />

          {/* Crisp Ground Contact Line where the canvas touches down on the easel shelf */}
          <line
            x1="48"
            y1="285.5"
            x2="216"
            y2="285.5"
            stroke="#000000"
            strokeWidth="2.8"
            strokeLinecap="round"
          />

          {/* 1. Deep 3D Stretcher Bar Depth (32px Bold Gallery-Wrap Left Edge) */}
          <polygon
            className="face"
            points="52,48 84,60 72,285 40,275"
            strokeWidth="1.2"
            fill="#1a1b24"
          />
          {/* Stretched canvas edge staple pins along the wooden stretcher frame */}
          {[82, 116, 150, 184, 218, 252].map((sy) => (
            <line
              key={sy}
              className="detail"
              x1="45"
              y1={sy}
              x2="50"
              y2={sy + 2}
              strokeWidth="1.4"
              opacity="0.85"
            />
          ))}

          {/* Horizontal canvas weave texture lines along the deep edge */}
          <line x1="50" y1="95" x2="82" y2="107" stroke="#ffffff" strokeWidth="0.4" strokeOpacity="0.05" strokeDasharray="3 3" />
          <line x1="47" y1="140" x2="79" y2="152" stroke="#ffffff" strokeWidth="0.4" strokeOpacity="0.05" strokeDasharray="3 3" />
          <line x1="44" y1="185" x2="76" y2="197" stroke="#ffffff" strokeWidth="0.4" strokeOpacity="0.05" strokeDasharray="3 3" />
          <line x1="42" y1="230" x2="74" y2="242" stroke="#ffffff" strokeWidth="0.4" strokeOpacity="0.05" strokeDasharray="3 3" />

          {/* 2. Top Edge Wrap of Canvas (12px bold depth facet catching light) */}
          <polygon
            className="face top"
            points="52,48 192,48 224,60 84,60"
            strokeWidth="1.2"
          />

          {/* 3. Front Canvas Face (Slender Portrait Rectangle, tilted back in 3D perspective) */}
          <polygon
            className="face top"
            points="84,60 224,60 212,285 72,285"
            strokeWidth="1.3"
          />

          {/* High-Resolution Framed Painting Artwork */}
          <g clipPath="url(#ground-canvas-tall-clip)">
            <image
              href={currentPainting.url}
              x="68"
              y="56"
              width="160"
              height="234"
              preserveAspectRatio="xMidYMid slice"
              style={{ filter: "contrast(1.05) brightness(1.02)" }}
            />

            {/* Subtle linen weave texture overlays */}
            <line x1="72" y1="108" x2="222" y2="108" stroke="#ffffff" strokeWidth="0.4" strokeOpacity="0.04" strokeDasharray="3 3" />
            <line x1="72" y1="158" x2="222" y2="158" stroke="#ffffff" strokeWidth="0.4" strokeOpacity="0.04" strokeDasharray="3 3" />
            <line x1="72" y1="208" x2="222" y2="208" stroke="#ffffff" strokeWidth="0.4" strokeOpacity="0.04" strokeDasharray="3 3" />
            <line x1="72" y1="258" x2="222" y2="258" stroke="#ffffff" strokeWidth="0.4" strokeOpacity="0.04" strokeDasharray="3 3" />

            {/* Minimal Title Placard at Bottom of the Canvas */}
            <polygon points="72,260 214,260 212,285 72,285" fill="#0b0c10" opacity="0.94" />
            <text x="80" y="275" className="ink" fontSize="6.8" letterSpacing="0.04em">
              {currentPainting.title.toUpperCase().slice(0, 18)}
            </text>
          </g>

          {/* Realistic Canvas Corner Tuck Folds (where fabric is folded over the frame) */}
          <g opacity="0.75">
            {/* Top-Left Corner Fold */}
            <line className="detail" x1="84" y1="72" x2="96" y2="60" strokeWidth="1" />
            {/* Top-Right Corner Fold */}
            <line className="detail" x1="224" y1="72" x2="212" y2="60" strokeWidth="1" />
            {/* Bottom-Left Corner Fold */}
            <line className="detail" x1="72" y1="273" x2="84" y2="285" strokeWidth="1" />
            {/* Bottom-Right Corner Fold */}
            <line className="detail" x1="212" y1="273" x2="200" y2="285" strokeWidth="1" />
          </g>

          {/* Precision Brass Protective Corner Guards */}
          <path className="detail" stroke="var(--iso-accent-hi)" strokeWidth="1.2" d="M86 68 L86 62 L94 62" />
          <path className="detail" stroke="var(--iso-accent-hi)" strokeWidth="1.2" d="M222 68 L222 62 L214 62" />
          <path className="detail" stroke="var(--iso-accent-hi)" strokeWidth="1.2" d="M74 277 L74 283 L82 283" />
          <path className="detail" stroke="var(--iso-accent-hi)" strokeWidth="1.2" d="M210 277 L210 283 L202 283" />

          {/* Floor Alignment Markers at base of canvas */}
          <line className="detail" x1="50" y1="289" x2="64" y2="289" opacity="0.4" />
          <line className="detail" x1="204" y1="289" x2="218" y2="289" opacity="0.4" />
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
