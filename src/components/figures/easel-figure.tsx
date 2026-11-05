"use client";

import React, { useState, useEffect } from "react";

interface EaselFigureProps {
  totalPaintings?: number;
  onSelect?: (index: number) => void;
}

export function EaselFigure({ totalPaintings = 11, onSelect }: EaselFigureProps) {
  const [activePaletteIndex, setActivePaletteIndex] = useState(0);
  const [isBrushing, setIsBrushing] = useState(false);
  const [wetSheen, setWetSheen] = useState(false);

  const colors = [
    { name: "Cadmium Red", hex: "#d14343" },
    { name: "Viridian Green", hex: "#329b68" },
    { name: "Cobalt Blue", hex: "#3f72e5" },
    { name: "Ochre Gold", hex: "#d69c36" },
    { name: "Burnt Umber", hex: "#7a4627" },
    { name: "Titanium White", hex: "#ededed" },
  ];

  const handleBrush = () => {
    if (isBrushing) return;
    setIsBrushing(true);
    setWetSheen(true);

    const nextColor = (activePaletteIndex + 1) % colors.length;
    setActivePaletteIndex(nextColor);
    if (onSelect) onSelect(nextColor);

    setTimeout(() => {
      setIsBrushing(false);
    }, 900);

    setTimeout(() => {
      setWetSheen(false);
    }, 2400);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      handleBrush();
    }, 7000);
    return () => clearInterval(timer);
  }, [activePaletteIndex]);

  const currentColor = colors[activePaletteIndex];

  return (
    <figure className="k-iso w-full select-none cursor-pointer" onClick={handleBrush}>
      <div className="k-iso__bar">
        <span>Studio Easel · Oil on Canvas</span>
        <div className="k-iso__readout font-mono text-[10px] text-[#8e8e8e] flex items-center gap-2">
          <span
            className="inline-block w-2 h-2 rounded-full border border-white/20 transition-colors duration-300"
            style={{ backgroundColor: currentColor.hex }}
          />
          <span className="uppercase tracking-wider">{currentColor.name}</span>
          <span className="text-[#4a4a4a]">/</span>
          <span>{totalPaintings} WORKS</span>
        </div>
      </div>

      <div className="k-iso__stage">
        <svg
          role="img"
          aria-label="An isometric studio easel holding a stretched linen canvas, with an oil palette, brushes, and wet impasto paint strokes."
          viewBox="0 0 626.94 417.96"
          tabIndex={0}
          className="w-full max-w-[620px] h-auto overflow-visible select-none"
        >
          <defs>
            <filter id="easel-glow" filterUnits="userSpaceOnUse" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="easel-soft" filterUnits="userSpaceOnUse" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="1.8" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <radialGradient id="palette-wood" cx="40%" cy="40%" r="70%">
              <stop offset="0%" stopColor="#432f21" />
              <stop offset="60%" stopColor="#2c1d14" />
              <stop offset="100%" stopColor="#1b120c" />
            </radialGradient>
            <linearGradient id="canvas-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#222225" />
              <stop offset="45%" stopColor="#18181b" />
              <stop offset="100%" stopColor="#121214" />
            </linearGradient>
            <linearGradient id="paint-stroke-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={currentColor.hex} stopOpacity="0.9" />
              <stop offset="100%" stopColor={currentColor.hex} stopOpacity="0.4" />
            </linearGradient>
            <clipPath id="canvas-clip">
              <polygon points="215,92 385,190 385,340 215,242" />
            </clipPath>
          </defs>

          {/* Iso Studio Floor Ground Shadow */}
          <polygon
            points="313,405 530,280 313,155 96,280"
            fill="#0b0b0d"
            opacity="0.8"
          />

          {/* Rear Leg of the Tripod Easel */}
          <g opacity="0.6">
            <line x1="313" y1="120" x2="313" y2="390" stroke="#1c1611" strokeWidth="8" strokeLinecap="round" />
            <line x1="313" y1="120" x2="313" y2="390" stroke="#312217" strokeWidth="3" strokeLinecap="round" />
          </g>

          {/* Main Central Mast (Vertical spine) */}
          <g>
            <polygon points="296,55 304,50 304,360 296,365" fill="#38291d" />
            <polygon points="304,50 312,55 312,365 304,360" fill="#241911" />
            {/* Ratchet notches down the central mast */}
            {Array.from({ length: 14 }).map((_, i) => (
              <line
                key={i}
                x1="300"
                y1={85 + i * 18}
                x2="308"
                y2={80 + i * 18}
                stroke="#150e09"
                strokeWidth="1.6"
              />
            ))}
          </g>

          {/* Left A-frame Leg */}
          <polygon points="296,65 303,61 176,375 168,370" fill="#433123" />
          <polygon points="168,370 176,375 182,371 303,61" fill="#2a1d14" />

          {/* Right A-frame Leg */}
          <polygon points="305,61 312,65 440,370 432,375" fill="#322216" />
          <polygon points="312,65 319,61 448,371 440,375" fill="#20150d" />

          {/* Lower Cross Bar connecting the legs */}
          <polygon points="208,295 400,295 400,305 208,305" fill="#2d1f15" />
          <line x1="208" y1="295" x2="400" y2="295" stroke="#4a3525" strokeWidth="1.5" />

          {/* Adjustable Shelf / Canvas Tray (Holds the canvas) */}
          <g transform="translate(0, 0)">
            {/* Main wooden shelf block */}
            <polygon points="180,240 430,240 430,252 180,252" fill="#4a3525" />
            <polygon points="180,240 430,240 436,236 186,236" fill="#614632" />
            <polygon points="430,240 436,236 436,248 430,252" fill="#2d1f15" />
            {/* Brass adjustment knob */}
            <circle cx="304" cy="246" r="5" fill="#bfa15f" />
            <circle cx="304" cy="246" r="3" fill="#8c733b" />
          </g>

          {/* Canvas Stretched on Easel */}
          <g>
            {/* Canvas Shadow */}
            <polygon points="220,95 390,193 390,345 220,247" fill="#000000" opacity="0.6" filter="url(#easel-soft)" />

            {/* Canvas Edge / Thickness (Wood stretcher bar) */}
            <polygon points="213,92 215,92 215,242 213,242" fill="#17171a" />
            <polygon points="215,242 385,340 385,343 215,245" fill="#111113" />

            {/* Canvas Face */}
            <polygon points="215,92 385,190 385,340 215,242" fill="url(#canvas-gradient)" stroke="#2f2f35" strokeWidth="1" />

            {/* Canvas Artwork Content (Clipped to Canvas Face) */}
            <g clipPath="url(#canvas-clip)">
              {/* Atmospheric Background Underpainting */}
              <ellipse cx="300" cy="216" rx="90" ry="70" fill="#1b1c24" opacity="0.7" />
              <path
                d="M215,200 Q280,180 340,240 T385,280 L385,340 L215,242 Z"
                fill="#15171e"
                opacity="0.9"
              />

              {/* Distant Mountain Peak Silhouette */}
              <polygon points="240,225 295,150 330,195 365,160 385,210 385,340 215,242" fill="#111317" />

              {/* Expressive Painterly Brushstrokes */}
              <path
                d="M235,175 Q285,145 340,165"
                stroke="#2b313d"
                strokeWidth="7"
                strokeLinecap="round"
                fill="none"
                opacity="0.6"
              />
              <path
                d="M245,205 Q295,175 355,190"
                stroke="#373d4b"
                strokeWidth="9"
                strokeLinecap="round"
                fill="none"
                opacity="0.5"
              />

              {/* Dynamic Active Brushstroke in current palette pigment */}
              <path
                d="M240,215 C275,185 305,215 350,185"
                stroke="url(#paint-stroke-grad)"
                strokeWidth="11"
                strokeLinecap="round"
                fill="none"
                className="transition-all duration-700"
                style={{
                  strokeDasharray: 200,
                  strokeDashoffset: isBrushing ? 0 : 0,
                  filter: wetSheen ? "url(#easel-glow)" : "none",
                }}
              />

              {/* Wet Impasto Texture Specks */}
              <circle cx="280" cy="202" r="2.5" fill={currentColor.hex} opacity="0.8" />
              <circle cx="325" cy="194" r="3.2" fill={currentColor.hex} opacity="0.9" />
              <circle cx="305" cy="205" r="1.8" fill="#ededed" opacity="0.7" />

              {/* Subtle Canvas Woven Texture Overlay */}
              <line x1="215" y1="120" x2="385" y2="218" stroke="#ffffff" strokeWidth="0.4" strokeOpacity="0.04" strokeDasharray="2 2" />
              <line x1="215" y1="150" x2="385" y2="248" stroke="#ffffff" strokeWidth="0.4" strokeOpacity="0.04" strokeDasharray="2 2" />
              <line x1="215" y1="180" x2="385" y2="278" stroke="#ffffff" strokeWidth="0.4" strokeOpacity="0.04" strokeDasharray="2 2" />
              <line x1="215" y1="210" x2="385" y2="308" stroke="#ffffff" strokeWidth="0.4" strokeOpacity="0.04" strokeDasharray="2 2" />
            </g>

            {/* Top Canvas Clamp */}
            <g>
              <polygon points="296,82 312,91 312,100 296,91" fill="#4a3525" />
              <circle cx="304" cy="86" r="3.5" fill="#bfa15f" />
            </g>
          </g>

          {/* Wooden Artist Palette resting at the base */}
          <g transform="matrix(0.92 0.38 -0.65 0.75 350 250)">
            {/* Palette Shadow */}
            <path
              d="M 50,20 C 110,10 145,55 125,95 C 110,120 70,125 35,105 C 10,90 5,45 50,20 Z"
              fill="#060608"
              opacity="0.7"
              filter="url(#easel-soft)"
              transform="translate(8, 12)"
            />

            {/* Palette Body */}
            <path
              d="M 50,20 C 110,10 145,55 125,95 C 110,120 70,125 35,105 C 10,90 5,45 50,20 Z"
              fill="url(#palette-wood)"
              stroke="#543c2a"
              strokeWidth="2"
            />

            {/* Thumbhole */}
            <ellipse cx="40" cy="85" rx="8" ry="11" fill="#0c0d10" stroke="#312217" strokeWidth="1.5" />

            {/* Paint dollops arranged along outer rim */}
            {/* Cadmium Red */}
            <circle cx="65" cy="28" r="5" fill="#cf3c3c" filter="url(#easel-glow)" />
            <circle cx="64" cy="27" r="1.5" fill="#ffffff" opacity="0.6" />

            {/* Viridian Green */}
            <circle cx="90" cy="35" r="5" fill="#329b68" />
            <circle cx="89" cy="34" r="1.5" fill="#ffffff" opacity="0.6" />

            {/* Cobalt Blue */}
            <circle cx="112" cy="50" r="5.5" fill="#3f72e5" />
            <circle cx="111" cy="49" r="1.5" fill="#ffffff" opacity="0.6" />

            {/* Ochre Gold */}
            <circle cx="118" cy="72" r="5" fill="#d69c36" />
            <circle cx="117" cy="71" r="1.5" fill="#ffffff" opacity="0.6" />

            {/* Burnt Umber */}
            <circle cx="102" cy="94" r="5" fill="#7a4627" />
            <circle cx="101" cy="93" r="1.5" fill="#ffffff" opacity="0.6" />

            {/* Titanium White */}
            <circle cx="78" cy="105" r="5.5" fill="#e8e8e8" />
            <circle cx="77" cy="104" r="1.5" fill="#ffffff" opacity="0.8" />

            {/* Palette Knife / Spatula */}
            <path
              d="M 25,60 L 55,50 L 58,45 L 68,44 L 62,55 L 25,60 Z"
              fill="#8e8e8e"
              stroke="#2e2e2e"
              strokeWidth="0.8"
            />
            <rect x="12" y="60" width="16" height="4" rx="1.5" fill="#432f21" />
          </g>

          {/* Long Filbert Paintbrush resting against the tray */}
          <g
            transform={`translate(0, ${isBrushing ? -12 : 0})`}
            className="transition-transform duration-500"
          >
            {/* Long wooden handle */}
            <line x1="260" y1="365" x2="360" y2="215" stroke="#1f1813" strokeWidth="4.5" strokeLinecap="round" />
            <line x1="260" y1="365" x2="360" y2="215" stroke="#3b2b1e" strokeWidth="2.5" strokeLinecap="round" />
            {/* Silver / Brass Ferrule */}
            <line x1="358" y1="218" x2="368" y2="203" stroke="#a0a0a0" strokeWidth="4.5" strokeLinecap="round" />
            <line x1="358" y1="218" x2="368" y2="203" stroke="#e0e0e0" strokeWidth="1.8" />
            {/* Bristles with wet paint tip */}
            <path
              d="M 368,203 Q 375,193 378,188 Q 373,195 365,207 Z"
              fill={currentColor.hex}
              stroke={currentColor.hex}
              strokeWidth="2.5"
              strokeLinejoin="round"
              filter={wetSheen ? "url(#easel-glow)" : "none"}
            />
          </g>

          {/* Technical Reticle Marks matching kinfish aesthetic */}
          <g opacity="0.4" className="detail">
            <line x1="120" y1="60" x2="135" y2="60" stroke="#ededed" strokeWidth="1" />
            <line x1="120" y1="60" x2="120" y2="75" stroke="#ededed" strokeWidth="1" />
            <text x="140" y="64" fill="#6e6e6e" fontSize="8" fontFamily="var(--font-geist-mono)">STUDIO // 04</text>

            <line x1="500" y1="360" x2="515" y2="360" stroke="#ededed" strokeWidth="1" />
            <line x1="515" y1="345" x2="515" y2="360" stroke="#ededed" strokeWidth="1" />
            <text x="440" y="374" fill="#6e6e6e" fontSize="8" fontFamily="var(--font-geist-mono)">OIL IMPASTO</text>
          </g>
        </svg>
      </div>
    </figure>
  );
}

