"use client";

import React, { useState, useEffect } from "react";
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
  const [isHovered, setIsHovered] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Organic distinct widths and depths for each canvas
  const CANVAS_PROFILES = [
    { t: 14, h: 140, label: "01 // GREEN HAG" },
    { t: 10, h: 148, label: "02 // SOLITUDE" },
    { t: 12, h: 142, label: "03 // VIGIL" },
    { t: 9, h: 146, label: "04 // VEIL" },
    { t: 16, h: 154, label: "05 // WOUNDED ANGEL" },
    { t: 11, h: 138, label: "06 // ASCENT" },
    { t: 13, h: 144, label: "07 // TACTICIAN" },
    { t: 10, h: 140, label: "08 // WANDERER" },
    { t: 15, h: 150, label: "09 // NOCTURNE" },
    { t: 9, h: 136, label: "10 // ECHOES" },
    { t: 12, h: 145, label: "11 // GUARDIAN" },
  ];

  const handleSelect = (idx: number) => {
    if (idx === activeIdx || isTransitioning) return;
    setIsTransitioning(true);
    setActiveIdx(idx);
    if (onSelectPainting) onSelectPainting(idx);
    setTimeout(() => setIsTransitioning(false), 600);
  };

  const handleNext = () => {
    handleSelect((activeIdx + 1) % paintings.length);
  };

  const handlePrev = () => {
    handleSelect((activeIdx - 1 + paintings.length) % paintings.length);
  };

  // Autonomous slow canvas demonstration cycle
  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      handleSelect((activeIdx + 1) % paintings.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [activeIdx, isHovered]);

  const currentPainting: Painting = paintings[activeIdx] || paintings[0];

  return (
    <figure
      className="k-iso w-full select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      title="Interactive Canvas Storage Box — Select any vertical canvas to pull it onto the ground"
    >
      {/* Top Bar with Live Readout */}
      <div className="k-iso__bar">
        <span>Archival Canvas Crate · Vertical Storage</span>
        <div className="k-iso__readout font-mono text-[10px] text-[#8e8e8e] flex items-center gap-2">
          <span className="text-[#4ade80]">● ACTIVE ON GROUND</span>
          <span className="text-[#4a4a4a]">/</span>
          <span>{String(activeIdx + 1).padStart(2, "0")} OF {paintings.length}</span>
        </div>
      </div>

      <div className="k-iso__stage">
        <svg
          role="img"
          aria-label="An isometric rectangular archival box containing vertically stacked canvases with varying widths. One canvas is pulled out and displayed resting on the ground in front."
          viewBox="0 0 660 410"
          tabIndex={0}
          className="w-full max-w-[640px] h-auto overflow-visible select-none"
        >
          <defs>
            <filter id="crate-glow" filterUnits="userSpaceOnUse" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="crate-soft" filterUnits="userSpaceOnUse" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <clipPath id="ground-canvas-clip">
              <polygon points="120,130 270,216 270,366 120,280" />
            </clipPath>
          </defs>

          {/* ======================================================== */}
          {/* 1. STUDIO GROUND & OVERALL SHADOWS                       */}
          {/* ======================================================== */}
          <polygon
            points="330,405 590,255 330,105 70,255"
            fill="#090a0d"
            opacity="0.9"
          />

          {/* ======================================================== */}
          {/* 2. RECTANGULAR CANVAS STORAGE BOX (CRATE IN THE BACK)    */}
          {/* ======================================================== */}
          <g transform="translate(140, 20)">
            {/* Box Floor Drop Shadow */}
            <polygon
              points="280,260 460,156 310,70 130,174"
              fill="#060608"
              opacity="0.8"
              filter="url(#crate-soft)"
            />

            {/* Back Inside Faces of the Open Box */}
            <polygon points="310,70 460,156 460,210 310,124" fill="#141418" stroke="#25252e" strokeWidth="1" />
            <polygon points="130,174 310,70 310,124 130,228" fill="#1a1a20" stroke="#25252e" strokeWidth="1" />

            {/* ==================================================== */}
            {/* 3. VERTICALLY STACKED CANVASES INSIDE THE BOX        */}
            {/* ==================================================== */}
            {/*
              Each canvas is standing vertically inside the box.
              Offset along the isometric axis (x, y) with its own thickness (t) and height (h).
            */}
            {(() => {
              let currentDist = 0;
              return CANVAS_PROFILES.map((profile, i) => {
                const isSelected = i === activeIdx;
                // Base isometric origin along the rack axis
                const cx = 160 + currentDist * 0.866;
                const cy = 205 - currentDist * 0.5;
                currentDist += profile.t + 3;

                // If selected, the canvas is OUT of the box (rendered on ground),
                // so inside the box we render an empty slot indicator or phantom groove!
                if (isSelected) {
                  return (
                    <g key={i}>
                      {/* Empty Slot Groove in Box Floor */}
                      <line
                        x1={cx}
                        y1={cy}
                        x2={cx + 80 * 0.866}
                        y2={cy + 80 * 0.5}
                        stroke="#e56b40"
                        strokeWidth="1.5"
                        strokeDasharray="3 3"
                        opacity="0.7"
                      />
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
                        ${cx},${cy - profile.h + 50}
                        ${cx + profile.t * 0.866},${cy - profile.h + 50 - profile.t * 0.5}
                        ${cx + profile.t * 0.866 + 80 * 0.866},${cy - profile.h + 50 - profile.t * 0.5 + 80 * 0.5}
                        ${cx + 80 * 0.866},${cy - profile.h + 50 + 80 * 0.5}
                      `}
                      fill="#22232a"
                      stroke="#383944"
                      strokeWidth="0.8"
                    />

                    {/* Front-Facing Edge of Standing Canvas (Spine with label) */}
                    <polygon
                      points={`
                        ${cx},${cy}
                        ${cx + profile.t * 0.866},${cy - profile.t * 0.5}
                        ${cx + profile.t * 0.866},${cy - profile.h + 50 - profile.t * 0.5}
                        ${cx},${cy - profile.h + 50}
                      `}
                      fill="#18181e"
                      stroke="#2c2d38"
                      strokeWidth="0.8"
                    />

                    {/* Tiny Technical Canvas Code on Visible Edge */}
                    <text
                      x={cx + 2}
                      y={cy - 20}
                      transform={`rotate(-30 ${cx} ${cy - 20})`}
                      fill="#7a7a88"
                      fontSize="5"
                      fontFamily="var(--font-geist-mono)"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </text>
                  </g>
                );
              });
            })()}

            {/* Front & Right Exterior Walls of the Box */}
            <polygon points="130,228 310,124 310,180 130,284" fill="#202128" stroke="#32333e" strokeWidth="1" />
            <polygon points="310,124 460,210 460,266 310,180" fill="#17181e" stroke="#2b2c36" strokeWidth="1" />

            {/* Brass Corner Brackets on the Box */}
            <g>
              <polygon points="130,228 142,221 142,233 130,240" fill="#cca348" />
              <circle cx="136" cy="230" r="1.2" fill="#5c4618" />
              <polygon points="310,180 310,192 322,185 322,173" fill="#cca348" />
              <circle cx="316" cy="182" r="1.2" fill="#5c4618" />
            </g>

            {/* Stenciled Box Label */}
            <text
              x="146"
              y="256"
              transform="rotate(30 146 256)"
              fill="#5e5f6e"
              fontSize="6"
              fontFamily="var(--font-geist-mono)"
              letterSpacing="1"
            >
              ARCHIVE CRATE // 11 CANVASES
            </text>
          </g>

          {/* ======================================================== */}
          {/* 4. THE PULLED CANVAS DISPLAYED ON THE GROUND IN FRONT    */}
          {/* ======================================================== */}
          {/*
            This canvas has animated out of the box and is standing proudly
            on the ground in the foreground, displaying the full painting!
          */}
          <g
            className={`cursor-pointer ${isTransitioning ? "opacity-30 scale-95" : "opacity-100 scale-100"}`}
            style={{
              transition: "transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.5s ease-out",
            }}
            onClick={() => {
              if (onOpenViewer) onOpenViewer(activeIdx);
            }}
          >
            {/* Canvas Ground Contact Shadow */}
            <polygon
              points="120,280 270,366 284,374 134,288"
              fill="#000000"
              opacity="0.8"
              filter="url(#crate-soft)"
            />

            {/* Stretcher Bar Left Edge (Canvas Depth) */}
            <polygon
              points="114,130 120,130 120,280 114,280"
              fill="#18181b"
              stroke="#27272a"
              strokeWidth="0.8"
            />
            {/* Stretcher Bar Bottom Edge */}
            <polygon
              points="120,280 270,366 270,370 120,284"
              fill="#121215"
              stroke="#27272a"
              strokeWidth="0.8"
            />

            {/* Stretched Canvas Surface (Front Isometric Plane) */}
            <polygon
              points="120,130 270,216 270,366 120,280"
              fill="#141417"
              stroke="#383842"
              strokeWidth="1.2"
            />

            {/* Artwork Image Projected across Canvas */}
            <g clipPath="url(#ground-canvas-clip)">
              <image
                href={currentPainting.url}
                x="120"
                y="130"
                width="150"
                height="236"
                preserveAspectRatio="xMidYMid slice"
                style={{ filter: "contrast(1.08) brightness(1.02)" }}
              />

              {/* Fine Linen Texture Lines */}
              <line x1="120" y1="170" x2="270" y2="256" stroke="#ffffff" strokeWidth="0.4" strokeOpacity="0.05" strokeDasharray="3 3" />
              <line x1="120" y1="210" x2="270" y2="296" stroke="#ffffff" strokeWidth="0.4" strokeOpacity="0.05" strokeDasharray="3 3" />
              <line x1="120" y1="250" x2="270" y2="336" stroke="#ffffff" strokeWidth="0.4" strokeOpacity="0.05" strokeDasharray="3 3" />

              {/* Bottom Matte Info Overlay */}
              <rect x="120" y="340" width="150" height="26" fill="#0c0c0f" opacity="0.85" />
              <text x="128" y="356" fill="#ededed" fontSize="6.5" fontFamily="var(--font-geist-mono)" letterSpacing="0.4">
                {currentPainting.title.toUpperCase().slice(0, 20)}
              </text>
            </g>

            {/* Subtle Canvas Corner Framing Tabs */}
            <line x1="123" y1="133" x2="135" y2="140" stroke="#ededed" strokeWidth="1" opacity="0.8" />
            <line x1="267" y1="363" x2="255" y2="356" stroke="#ededed" strokeWidth="1" opacity="0.8" />

            {/* Wooden Ground Support Wedge (Holding it Upright on the Floor) */}
            <polygon points="190,320 205,329 205,335 190,326" fill="#442f20" />
            <polygon points="205,329 215,323 215,329 205,335" fill="#2c1e14" />
          </g>

          {/* ======================================================== */}
          {/* 5. TACTILE CONTROL PEDESTAL & STEP BUTTONS               */}
          {/* ======================================================== */}
          <g transform="translate(480, 280)">
            {/* Control Base Plate */}
            <polygon points="0,35 60,0 120,35 60,70" fill="#131418" stroke="#2c2d38" strokeWidth="1" />
            <polygon points="0,35 60,70 60,82 0,47" fill="#0d0e11" />
            <polygon points="60,70 120,35 120,47 60,82" fill="#08080a" />

            {/* PREV BUTTON (◀) */}
            <g className="cursor-pointer" onClick={handlePrev}>
              <polygon points="15,35 45,18 45,28 15,45" fill="#22232c" stroke="#3b3d4c" strokeWidth="0.8" />
              <polygon points="26,35 34,30 34,40" fill="#ccc" />
            </g>

            {/* NEXT BUTTON (▶) */}
            <g className="cursor-pointer" onClick={handleNext}>
              <polygon points="65,45 95,28 95,38 65,55" fill="#22232c" stroke="#3b3d4c" strokeWidth="0.8" />
              <polygon points="84,40 76,35 76,45" fill="#ccc" />
            </g>

            <text x="25" y="72" fill="#6e6e7c" fontSize="5.5" fontFamily="var(--font-geist-mono)" letterSpacing="0.8">
              PULL CANVAS
            </text>
          </g>

          {/* ======================================================== */}
          {/* 6. ANATOMY SIGNATURE GUIDANCE COACHES                    */}
          {/* ======================================================== */}
          <g aria-hidden="true" className="k-coach is-live">
            {/* Guide to Box Canvases */}
            <g style={{ "--k-coach-at": "0.3s" } as React.CSSProperties}>
              <circle className="k-coach__dot is-end" cx="360" cy="120" r="2.4" />
              <circle className="k-coach__port" cx="440" cy="65" r="2.2" />
              <path className="k-coach__wire" pathLength="1" d="M360 120 Q400 90 440 65" />
              <g className="k-coach__tag">
                <text className="k-coach__label" x="446" y="68" fontSize="7.5">
                  CLICK CANVAS IN BOX TO PULL
                </text>
              </g>
            </g>

            {/* Guide to Ground Canvas */}
            <g style={{ "--k-coach-at": "0.65s" } as React.CSSProperties}>
              <circle className="k-coach__dot" cx="195" cy="248" r="2.4" />
              <path className="k-coach__wire" pathLength="1" d="M195 248 L195 180 Q195 170 170 170 L110 170" />
              <g className="k-coach__tag">
                <text className="k-coach__label" x="104" y="173" fontSize="7.5" textAnchor="end">
                  ON GROUND: CLICK TO EXAMINE
                </text>
              </g>
            </g>
          </g>
        </svg>
      </div>

      {/* Caption Bar with Direct Controls */}
      <figcaption className="mt-4 px-2">
        <div className="auth-cap flex items-center justify-between font-mono text-[10px] text-[#767676]">
          <span>FIG. 04 — CRATE CRACKED: ACTIVE STUDY [{currentPainting.title.toUpperCase()}]</span>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handlePrev}
              className="hover:text-[#ededed] transition-colors"
            >
              PREV CANVAS
            </button>
            <span className="text-[#444]">/</span>
            <button
              type="button"
              onClick={handleNext}
              className="hover:text-[#ededed] transition-colors"
            >
              NEXT CANVAS
            </button>
            <span className="text-[#444]">/</span>
            <button
              type="button"
              onClick={() => onOpenViewer && onOpenViewer(activeIdx)}
              className="text-[#ededed] hover:underline underline-offset-4"
            >
              FULLSCREEN EXAMINE
            </button>
          </div>
        </div>
      </figcaption>
    </figure>
  );
}
