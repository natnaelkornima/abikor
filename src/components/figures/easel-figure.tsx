"use client";

import React, { useState, useEffect } from "react";
import { portfolio, Painting } from "@/data/portfolio";

interface EaselFigureProps {
  totalPaintings?: number;
  currentPaintingIndex?: number;
  onSelectPainting?: (index: number) => void;
  onOpenViewer?: (index: number) => void;
}

export function EaselFigure({
  currentPaintingIndex = 0,
  onSelectPainting,
  onOpenViewer,
}: EaselFigureProps) {
  const { paintings } = portfolio;
  const [activeIdx, setActiveIdx] = useState(currentPaintingIndex);
  const [isVarnishing, setIsVarnishing] = useState(false);
  const [isColor, setIsColor] = useState(true);
  const [prevPressed, setPrevPressed] = useState(false);
  const [nextPressed, setNextPressed] = useState(false);
  const [varnishPressed, setVarnishPressed] = useState(false);
  const [freshDrop, setFreshDrop] = useState(false);
  const [segLevel, setSegLevel] = useState(7);

  const currentPainting: Painting = paintings[activeIdx] || paintings[0];
  const nextPainting: Painting = paintings[(activeIdx + 1) % paintings.length];

  // Dynamic pigment spectrum meter
  useEffect(() => {
    const timer = setInterval(() => {
      const base = 4 + Math.floor(Math.random() * 4);
      setSegLevel(Math.min(8, base + Math.floor(Math.random() * 3)));
    }, 180);
    return () => clearInterval(timer);
  }, []);

  const handleNext = () => {
    setNextPressed(true);
    setFreshDrop(true);
    const next = (activeIdx + 1) % paintings.length;
    setActiveIdx(next);
    if (onSelectPainting) onSelectPainting(next);

    setTimeout(() => setNextPressed(false), 140);
    setTimeout(() => setFreshDrop(false), 700);
  };

  const handlePrev = () => {
    setPrevPressed(true);
    setFreshDrop(true);
    const prev = (activeIdx - 1 + paintings.length) % paintings.length;
    setActiveIdx(prev);
    if (onSelectPainting) onSelectPainting(prev);

    setTimeout(() => setPrevPressed(false), 140);
    setTimeout(() => setFreshDrop(false), 700);
  };

  const handleVarnish = () => {
    if (isVarnishing) return;
    setVarnishPressed(true);
    setIsVarnishing(true);

    setTimeout(() => setVarnishPressed(false), 150);
    setTimeout(() => setIsVarnishing(false), 2600);
  };

  const handleToggleColor = () => {
    setIsColor((c) => !c);
  };

  return (
    <div
      className="k-iso w-full flex items-center justify-center py-4 my-2 select-none"
      title="Interactive Studio Easel & Painting Illuminator — Click controls to cycle works"
    >
      <svg
        className="w-full max-w-[620px] h-auto overflow-visible select-none"
        role="img"
        aria-label="An isometric studio easel apparatus holding an illuminated canvas, displaying masterworks with mechanical buttons, pigment levels, and archival prints."
        viewBox="0 0 626.94 417.96"
        tabIndex={0}
      >
        <defs>
          <filter id="k-glow" filterUnits="userSpaceOnUse" x="-2000" y="-2000" width="6000" height="6000">
            <feGaussianBlur stdDeviation="4" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="k-soft" filterUnits="userSpaceOnUse" x="-2000" y="-2000" width="6000" height="6000">
            <feGaussianBlur stdDeviation="2.2" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="k-bloom" filterUnits="userSpaceOnUse" x="-2000" y="-2000" width="6000" height="6000">
            <feGaussianBlur stdDeviation="9" />
          </filter>
          <clipPath id="easel-canvas-clip">
            <rect x="0" y="0" width="136" height="156" rx="3" />
          </clipPath>
          <clipPath id="easel-print-clip">
            <rect x="6" y="6" width="96" height="96" rx="1.5" />
          </clipPath>
        </defs>

        {/* ======================================================== */}
        {/* 1. MAIN ISOMETRIC BASE CHASSIS (Solid Studio Deck)      */}
        {/* ======================================================== */}
        {/* Front-left edge bevel */}
        <path
          className="face"
          d="M566.18 241.98L566.09 242.95L565.85 243.91L565.44 244.85L564.87 245.77L564.15 246.65L563.29 247.48L562.28 248.26L561.15 248.98L325.60 384.98L323.00 386.21L320.03 387.13L316.82 387.69L313.47 387.88L310.13 387.69L306.91 387.13L303.95 386.21L301.35 384.98L65.79 248.98L64.66 248.26L63.66 247.48L62.79 246.65L62.07 245.77L61.50 244.85L61.10 243.91L60.85 242.95L60.77 241.98L60.77 234.98L60.85 235.95L61.10 236.91L61.50 237.85L62.07 238.77L62.79 239.65L63.66 240.48L64.66 241.26L65.79 241.98L301.35 377.98L303.95 379.21L306.91 380.13L310.13 380.69L313.47 380.88L316.82 380.69L320.03 380.13L323.00 379.21L325.60 377.98L561.15 241.98L562.28 241.26L563.29 240.48L564.15 239.65L564.87 238.77L565.44 237.85L565.85 236.91L566.09 235.95L566.18 234.98Z"
        />

        {/* Top Deck Surface */}
        <path
          className="face top"
          d="M561.15 227.98L563.29 229.48L564.87 231.19L565.85 233.05L566.18 234.98L565.85 236.91L564.87 238.77L563.29 240.48L561.15 241.98L325.60 377.98L323.00 379.21L320.03 380.13L316.82 380.69L313.47 380.88L310.13 380.69L306.91 380.13L303.95 379.21L301.35 377.98L65.79 241.98L63.66 240.48L62.07 238.77L61.10 236.91L60.77 234.98L61.10 233.05L62.07 231.19L63.66 229.48L65.79 227.98L301.35 91.98L303.95 90.75L306.91 89.83L310.13 89.27L313.47 89.08L316.82 89.27L320.03 89.83L323.00 90.75L325.60 91.98Z"
        />

        {/* Top Deck Screws & Border Details */}
        <g transform="matrix(0.8660 0.5000 -0.8660 0.5000 313.47 84.98)">
          <rect className="detail" x="9" y="9" width="282" height="282" rx="10" />
          {/* 4 Corner Screws */}
          <g>
            <circle className="face recess" cx="18" cy="18" r="3" />
            <line className="detail" x1="16.2" y1="18" x2="19.8" y2="18" />
          </g>
          <g>
            <circle className="face recess" cx="282" cy="18" r="3" />
            <line className="detail" x1="280.2" y1="18" x2="283.8" y2="18" />
          </g>
          <g>
            <circle className="face recess" cx="18" cy="282" r="3" />
            <line className="detail" x1="16.2" y1="282" x2="19.8" y2="282" />
          </g>
          <g>
            <circle className="face recess" cx="282" cy="282" r="3" />
            <line className="detail" x1="280.2" y1="282" x2="283.8" y2="282" />
          </g>
        </g>

        {/* ======================================================== */}
        {/* 2. MOTORIZED EASEL GANTRY (Center Raised Tower)           */}
        {/* ======================================================== */}
        <path
          className="face"
          d="M482.74 221.98L482.63 223.23L482.32 224.46L481.79 225.68L481.06 226.85L480.14 227.98L479.03 229.05L477.74 230.06L476.28 230.98L420.86 262.98L417.52 264.56L413.71 265.74L409.57 266.46L405.27 266.71L400.97 266.46L396.83 265.74L393.02 264.56L389.68 262.98L256.31 185.98L254.86 185.06L253.57 184.05L252.46 182.98L251.53 181.85L250.81 180.68L250.28 179.46L249.96 178.23L249.86 176.98L249.86 80.98L249.96 82.23L250.28 83.46L250.81 84.68L251.53 85.85L252.46 86.98L253.57 88.05L254.86 89.06L256.31 89.98L389.68 166.98L393.02 168.56L396.83 169.74L400.97 170.46L405.27 170.71L409.57 170.46L413.71 169.74L417.52 168.56L420.86 166.98L476.28 134.98L477.74 134.06L479.03 133.05L480.14 131.98L481.06 130.85L481.79 129.68L482.32 128.46L482.63 127.23L482.74 125.98Z"
        />
        <path
          className="face top"
          d="M476.28 116.98L479.03 118.91L481.06 121.11L482.32 123.50L482.74 125.98L482.32 128.46L481.06 130.85L479.03 133.05L476.28 134.98L420.86 166.98L417.52 168.56L413.71 169.74L409.57 170.46L405.27 170.71L400.97 170.46L396.83 169.74L393.02 168.56L389.68 166.98L256.31 89.98L253.57 88.05L251.53 85.85L250.28 83.46L249.86 80.98L250.28 78.50L251.53 76.11L253.57 73.91L256.31 71.98L311.74 39.98L315.08 38.40L318.89 37.22L323.03 36.50L327.33 36.25L331.63 36.50L335.76 37.22L339.58 38.40L342.92 39.98Z"
        />

        {/* ======================================================== */}
        {/* 3. ILLUMINATED CANAVAS ON EASEL DISPLAY                  */}
        {/* ======================================================== */}
        <g
          transform="matrix(0.8660 0.5000 0.0000 1.0000 248 70)"
          className="cursor-pointer"
          onClick={() => {
            if (onOpenViewer) onOpenViewer(activeIdx);
          }}
        >
          {/* Recessed Gantry Bay */}
          <rect className="face recess" x="8" y="10" width="148" height="170" rx="6" />

          {/* Stretched Canvas Frame */}
          <g transform="translate(14, 16)">
            {/* Wooden Canvas Edge */}
            <rect x="0" y="0" width="136" height="156" rx="3" fill="#18181b" stroke="#333" strokeWidth="1" />

            {/* Canvas Artwork Image */}
            <image
              href={currentPainting.url}
              x="0"
              y="0"
              width="136"
              height="156"
              preserveAspectRatio="xMidYMid slice"
              clipPath="url(#easel-canvas-clip)"
              style={{
                filter: isColor
                  ? isVarnishing
                    ? "brightness(1.15) contrast(1.12)"
                    : "contrast(1.05)"
                  : "grayscale(1) contrast(1.1)",
                transition: "filter 0.5s ease-out",
              }}
            />

            {/* Wet Varnish Impasto Sheen Animation */}
            {isVarnishing && (
              <rect
                x="0"
                y="0"
                width="136"
                height="156"
                rx="3"
                fill="none"
                stroke="#ededed"
                strokeWidth="2"
                opacity="0.8"
                filter="url(#k-glow)"
              />
            )}

            {/* Canvas Corner Brackets */}
            <line x1="4" y1="4" x2="14" y2="4" stroke="#ffffff" strokeWidth="0.8" opacity="0.6" />
            <line x1="4" y1="4" x2="4" y2="14" stroke="#ffffff" strokeWidth="0.8" opacity="0.6" />
            <line x1="132" y1="152" x2="122" y2="152" stroke="#ffffff" strokeWidth="0.8" opacity="0.6" />
            <line x1="132" y1="152" x2="132" y2="142" stroke="#ffffff" strokeWidth="0.8" opacity="0.6" />

            {/* Studio Tag Overlay */}
            <rect x="6" y="136" width="124" height="14" rx="2" fill="#000000" opacity="0.65" />
            <text x="10" y="146" fill="#ededed" fontSize="5.5" fontFamily="var(--font-geist-mono)" letterSpacing="0.6">
              {currentPainting.title.toUpperCase().slice(0, 22)}
            </text>
          </g>

          {/* Top Illuminator Lamp Hood */}
          <rect x="22" y="4" width="120" height="6" rx="2" fill="#2d2d32" stroke="#444" strokeWidth="0.8" />
          <line x1="30" y1="7" x2="134" y2="7" stroke={isColor ? "#fff" : "#888"} strokeWidth="1.2" opacity="0.8" filter="url(#k-soft)" />
        </g>

        {/* ======================================================== */}
        {/* 4. MECHANICAL CONTROL PANEL (Buttons, Meter & Readout)   */}
        {/* ======================================================== */}
        <g transform="matrix(0.8660 -0.5000 0.0000 1.0000 405.27 175.98)">
          {/* Meter Recess */}
          <rect className="face recess" x="14" y="24" width="56" height="48" rx="5" />

          {/* Dancing Pigment Spectrum Bars (VU-meter style) */}
          <g>
            {[0, 1, 2, 3, 4, 5, 6, 7].map((bar) => (
              <rect
                key={bar}
                className={`k-seg ${segLevel > bar ? (bar >= 6 ? "on peak" : "on") : ""}`}
                x={18 + bar * 6.2}
                y={58 - bar * 3.5}
                width="4.8"
                height="12"
                rx="1"
              />
            ))}
            <text className="label" x="20" y="20" fontSize="4.5" letterSpacing="0.8">
              SPECTRUM DENSITY
            </text>
          </g>

          {/* Cooling Vents & Screws */}
          <line className="detail" x1="78" y1="20" x2="78" y2="72" />
          <line className="detail" x1="82" y1="20" x2="82" y2="72" />
          <line className="detail" x1="86" y1="20" x2="86" y2="72" />
          <line className="detail" x1="90" y1="20" x2="90" y2="72" />

          {/* Status Indicator LED */}
          <circle className={`led ${isVarnishing ? "hot" : ""}`} cx="42" cy="84" r="2.2" />
          <text className="label" x="48" y="86" fontSize="4.2" letterSpacing="0.6">
            VARNISH {isVarnishing ? "ACTIVE" : "READY"}
          </text>
        </g>

        {/* Counter Display & Silkscreen Header */}
        <g transform="matrix(0.8660 0.5000 -0.8660 0.5000 327.33 30.98)">
          <rect className="detail" x="8" y="8" width="174" height="84" rx="12" />
          {/* LCD Counter */}
          <rect className="face recess" x="98" y="18" width="58" height="24" rx="4" />
          <text className="k-counter" x="127" y="34.5" fontSize="12" textAnchor="middle">
            {String(activeIdx + 1).padStart(2, "0")} / {String(paintings.length).padStart(2, "0")}
          </text>
          <text className="label" x="98" y="52" fontSize="5" letterSpacing="1.2">
            CATALOGUE PIECE
          </text>
          <text className="label" x="16" y="24" fontSize="7" letterSpacing="1.5">
            STUDIO EASEL · 04
          </text>
          <text className="label" x="16" y="36" fontSize="4.5" letterSpacing="0.8">
            OIL &amp; TEMPERA ARCHIVE
          </text>
        </g>

        {/* ======================================================== */}
        {/* 5. TACTILE PUSH BUTTONS: PREV / NEXT / VARNISH           */}
        {/* ======================================================== */}
        {/* PREV (◀◀) Button */}
        <g
          className={`press ${prevPressed ? "down" : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            handlePrev();
          }}
          style={{ cursor: "pointer" }}
        >
          <path
            className="face"
            d="M432.83 186.48L432.82 186.62L432.79 186.76L432.73 186.89L432.65 187.02L432.54 187.15L432.42 187.27L432.28 187.38L432.12 187.48L426.92 190.48L426.55 190.66L426.13 190.79L425.67 190.87L425.19 190.89L424.71 190.87L424.25 190.79L423.83 190.66L423.46 190.48L422.59 189.98L422.43 189.88L422.29 189.77L422.16 189.65L422.06 189.52L421.98 189.39L421.92 189.26L421.88 189.12L421.87 188.98L421.87 180.98L421.88 181.12L421.92 181.26L421.98 181.39L422.06 181.52L422.16 181.65L422.29 181.77L422.43 181.88L422.59 181.98L423.46 182.48L423.83 182.66L424.25 182.79L424.71 182.87L425.19 182.89L425.67 182.87L426.13 182.79L426.55 182.66L426.92 182.48L432.12 179.48L432.28 179.38L432.42 179.27L432.54 179.15L432.65 179.02L432.73 178.89L432.79 178.76L432.82 178.62L432.83 178.48Z"
          />
          <path
            className="face top"
            d="M432.12 177.48L432.42 177.70L432.65 177.94L432.79 178.20L432.83 178.48L432.79 178.76L432.65 179.02L432.42 179.27L432.12 179.48L426.92 182.48L426.55 182.66L426.13 182.79L425.67 182.87L425.19 182.89L424.71 182.87L424.25 182.79L423.83 182.66L423.46 182.48L422.59 181.98L422.29 181.77L422.06 181.52L421.92 181.26L421.87 180.98L421.92 180.70L422.06 180.44L422.29 180.20L422.59 179.98L427.79 176.98L428.16 176.80L428.58 176.67L429.04 176.59L429.52 176.57L430.00 176.59L430.46 176.67L430.88 176.80L431.25 176.98Z"
          />
          <g transform="matrix(0.8660 0.5000 -0.8660 0.5000 427.33 179.5)">
            <polygon className="k-glyph" points="5,3 1,5.5 5,8" />
          </g>
        </g>

        {/* NEXT (▶▶) Button */}
        <g
          className={`press ${nextPressed ? "down" : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            handleNext();
          }}
          style={{ cursor: "pointer" }}
        >
          <path
            className="face"
            d="M479.60 159.48L479.59 159.62L479.55 159.76L479.49 159.89L479.41 160.02L479.31 160.15L479.19 160.27L479.04 160.38L478.88 160.48L473.69 163.48L473.31 163.66L472.89 163.79L472.43 163.87L471.95 163.89L471.48 163.87L471.02 163.79L470.59 163.66L470.22 163.48L469.36 162.98L469.19 162.88L469.05 162.77L468.93 162.65L468.82 162.52L468.74 162.39L468.69 162.26L468.65 162.12L468.64 161.98L468.64 153.98L468.65 154.12L468.69 154.26L468.74 154.39L468.82 154.52L468.93 154.65L469.05 154.77L469.19 154.88L469.36 154.98L470.22 155.48L470.59 155.66L471.02 155.79L471.48 155.87L471.95 155.89L472.43 155.87L472.89 155.79L473.31 155.66L473.69 155.48L478.88 152.48L479.04 152.38L479.19 152.27L479.31 152.15L479.41 152.02L479.49 151.89L479.55 151.76L479.59 151.62L479.60 151.48Z"
          />
          <path
            className="face top"
            d="M478.88 150.48L479.19 150.70L479.41 150.94L479.55 151.20L479.60 151.48L479.55 151.76L479.41 152.02L479.19 152.27L478.88 152.48L473.69 155.48L473.31 155.66L472.89 155.79L472.43 155.87L471.95 155.89L471.48 155.87L471.02 155.79L470.59 155.66L470.22 155.48L469.36 154.98L469.05 154.77L468.82 154.52L468.69 154.26L468.64 153.98L468.69 153.70L468.82 153.44L469.05 153.20L469.36 152.98L474.55 149.98L474.92 149.80L475.35 149.67L475.81 149.59L476.28 149.57L476.76 149.59L477.22 149.67L477.64 149.80L478.02 149.98Z"
          />
          <g transform="matrix(0.8660 0.5000 -0.8660 0.5000 474.1 152.5)">
            <polygon className="k-glyph" points="1,3 5,5.5 1,8" />
          </g>
        </g>

        {/* VARNISH / ILLUMINATE Big Main Switch */}
        <g
          className={`press k-shutter ${varnishPressed ? "down" : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            handleVarnish();
          }}
          style={{ cursor: "pointer" }}
        >
          <path
            className="face"
            d="M421.70 142.98L421.63 143.81L421.42 144.64L421.07 145.44L420.58 146.23L419.96 146.98L419.22 147.69L418.36 148.36L417.39 148.98L417.39 148.98L415.17 150.04L412.63 150.82L409.87 151.30L407.00 151.47L404.13 151.30L401.38 150.82L398.84 150.04L396.61 148.98L396.61 148.98L395.64 148.36L394.78 147.69L394.04 146.98L393.42 146.23L392.94 145.44L392.59 144.64L392.38 143.81L392.30 142.98L392.30 140.98L392.38 141.81L392.59 142.64L392.94 143.44L393.42 144.23L394.04 144.98L394.78 145.69L395.64 146.36L396.61 146.98L396.61 146.98L398.84 148.04L401.38 148.82L404.13 149.30L407.00 149.47L409.87 149.30L412.63 148.82L415.17 148.04L417.39 146.98L417.39 146.98L418.36 146.36L419.22 145.69L419.96 144.98L420.58 144.23L421.07 143.44L421.42 142.64L421.63 141.81L421.70 140.98Z"
          />
          <path
            className="face top"
            d="M417.39 134.98L419.22 136.27L420.58 137.73L421.42 139.33L421.70 140.98L421.42 142.64L420.58 144.23L419.22 145.69L417.39 146.98L417.39 146.98L415.17 148.04L412.63 148.82L409.87 149.30L407.00 149.47L404.13 149.30L401.38 148.82L398.84 148.04L396.61 146.98L396.61 146.98L394.78 145.69L393.42 144.23L392.59 142.64L392.30 140.98L392.59 139.33L393.42 137.73L394.78 136.27L396.61 134.98L396.61 134.98L398.84 133.93L401.38 133.14L404.13 132.66L407.00 132.50L409.87 132.66L412.63 133.14L415.17 133.93L417.39 134.98Z"
          />
          <circle cx="407" cy="141" r="5" fill="#e56b40" opacity={isVarnishing ? "1" : "0.75"} filter={isVarnishing ? "url(#k-glow)" : "none"} />
        </g>

        {/* Monochrome / Color Toggle Lever */}
        <g
          transform="matrix(0.8660 0.5000 0.0000 1.0000 271.90 62.98)"
          onClick={(e) => {
            e.stopPropagation();
            handleToggleColor();
          }}
          style={{ cursor: "pointer" }}
        >
          <rect className="face recess" x="8" y="3" width="26" height="10" rx="3" />
          <circle className="face top" cx={isColor ? 26 : 14} cy="8" r="4" />
          <circle cx={isColor ? 26 : 14} cy="8" r="2" fill={isColor ? "#4ade80" : "#888"} />
        </g>

        {/* ======================================================== */}
        {/* 6. PHYSICAL EXHIBITION PRINT PILE (Kin-style Prints)     */}
        {/* ======================================================== */}
        <g
          className="k-pile cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            if (onOpenViewer) onOpenViewer((activeIdx + 1) % paintings.length);
          }}
        >
          <g transform="matrix(0.8660 0.5000 -0.8660 0.5000 245.92 264.58)">
            <g transform="rotate(-6) translate(-54 -65)">
              <rect className="k-shade" x="3" y="4" width="108" height="132" rx="2" filter="url(#k-soft)" />
              <rect className="k-pile__edge" y="1.4" width="108" height="132" rx="1.5" />
              <rect className="k-print-paper" width="108" height="132" rx="1.5" />
              <image
                href={nextPainting.url}
                x="6"
                y="6"
                width="96"
                height="96"
                preserveAspectRatio="xMidYMid slice"
                clipPath="url(#easel-print-clip)"
                className="k-print-image"
              />
              <text className="k-print-hand" x="10" y="120" fontSize="6.5">
                {nextPainting.title.slice(0, 18)}
              </text>
            </g>
          </g>
        </g>

        {/* Freshly Animated Active Print on the Desk */}
        <g
          className={`k-pile ${freshDrop ? "is-fresh" : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            if (onOpenViewer) onOpenViewer(activeIdx);
          }}
          style={{
            cursor: "pointer",
            transition: "transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)",
          }}
        >
          <g transform="matrix(0.8660 0.5000 -0.8660 0.5000 256.31 267.58)">
            <g transform="rotate(3) translate(-54 -65)">
              <rect className="k-shade" x="3" y="4" width="108" height="132" rx="2" filter="url(#k-soft)" />
              <rect className="k-pile__edge" y="1.4" width="108" height="132" rx="1.5" />
              <rect className="k-print-paper" width="108" height="132" rx="1.5" />
              <image
                href={currentPainting.url}
                x="6"
                y="6"
                width="96"
                height="96"
                preserveAspectRatio="xMidYMid slice"
                clipPath="url(#easel-print-clip)"
                className="k-print-image"
                style={{
                  filter: isColor ? "none" : "grayscale(1) contrast(1.1)",
                }}
              />
              <text className="k-print-hand" x="10" y="120" fontSize="6.5">
                {currentPainting.title.slice(0, 18)}
              </text>
            </g>
          </g>
        </g>

        {/* ======================================================== */}
        {/* 7. SIGNATURE GUIDANCE COACHES (.k-coach)                 */}
        {/* ======================================================== */}
        <g aria-hidden="true" className="k-coach is-live">
          {/* Wire pointing to the Next button */}
          <g style={{ "--k-coach-at": "0.3s" } as React.CSSProperties}>
            <circle className="k-coach__dot is-end" cx="475" cy="158" r="2.4" />
            <circle className="k-coach__port" cx="525" cy="120" r="2.2" />
            <path className="k-coach__wire" pathLength="1" d="M475 158 Q500 135 525 120" />
            <g className="k-coach__tag">
              <text className="k-coach__label" x="532" y="123" fontSize="7.5">
                CYCLE WORK (11 PIECES)
              </text>
            </g>
          </g>

          {/* Wire pointing to Canvas */}
          <g style={{ "--k-coach-at": "0.65s" } as React.CSSProperties}>
            <circle className="k-coach__dot" cx="310" cy="190" r="2.4" />
            <path className="k-coach__wire" pathLength="1" d="M310 190 L310 250 Q310 258 290 258 L240 258" />
            <g className="k-coach__tag">
              <text className="k-coach__label" x="234" y="261" fontSize="7.5" textAnchor="end">
                CLICK CANVAS TO EXAMINE
              </text>
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
}
