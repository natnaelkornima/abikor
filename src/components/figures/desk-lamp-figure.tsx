"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  computeIsoBounds,
  f2,
  IsoBox,
  IsoPlane,
  IsoVents,
  IsoScrews,
  IsoFigureContainer,
  type IsoProjector,
} from "@/lib/iso";
import { portfolio } from "@/data/portfolio";

// Vector 3D mathematics
type Vec3 = [number, number, number];

const add = (a: Vec3, b: Vec3): Vec3 => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
const sub = (a: Vec3, b: Vec3): Vec3 => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
const mul = (a: Vec3, s: number): Vec3 => [a[0] * s, a[1] * s, a[2] * s];
const mag = (a: Vec3): number => Math.hypot(...a);
const unit = (a: Vec3): Vec3 => mul(a, 1 / mag(a));
const dot = (a: Vec3, b: Vec3): number => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const cross = (a: Vec3, b: Vec3): Vec3 => [
  a[1] * b[2] - a[2] * b[1],
  a[2] * b[0] - a[0] * b[2],
  a[0] * b[1] - a[1] * b[0],
];

// Physical scene dimensions
const D = 7; // table height
const O: Vec3 = [300, 250, D]; // table size
const base = { x: 190, y: 22, w: 72, d: 60, h: 18 };
const A = D + base.h; // base top Z (25)

// Lamp articulated arm joint positions
const j: Vec3 = [212, 37, 35]; // lower pivot
const M: Vec3 = [180, 69, 150]; // elbow pivot
const N: Vec3 = [125, 124, 146]; // wrist pivot
const P: Vec3 = [115, 134, 134]; // shade mount

const F = unit([1, 1, 0]); // arm lateral vector
const I = unit([-0.22, 0.22, -1]); // lamp beam pointing direction
const L = 34; // lamp shade cone length
const rRear = 7; // shade rear radius
const rRim = 24; // shade front aperture radius
const zRim = add(P, mul(I, L)); // shade rim center
const divergence = 0.52; // beam cone expansion rate
const B = F; // shade orientation basis X
const V = unit(cross(I, F)); // shade orientation basis Y

// 3D circle point generator around center with radius at angle
const circle3D = (center: Vec3, radius: number, angle: number): Vec3 =>
  add(center, add(mul(B, radius * Math.cos(angle)), mul(V, radius * Math.sin(angle))));

// Pool of light projection on plane at height zLevel
const lightPool = (zLevel: number) => {
  const t = (zRim[2] - zLevel) / -I[2];
  return {
    c: add(zRim, mul(I, t)),
    r: rRim + divergence * t,
  };
};

const tablePool = lightPool(D);

// Book physical dimensions
const spineX = 91;
const pageWidth = 53;
const pageY = [129, 197]; // page height = 197 - 129 = 68
const bookZ = 18;
const bookLightPool = lightPool(bookZ);
const lineOffsets = [10, 17, 24, 31, 38, 45, 52, 59];

// Compute isometric bounds & projection matrix
const Y: IsoProjector & { viewBox: string } = computeIsoBounds([
  [0, O[1], 0],
  [O[0], 0, D],
  [O[0], O[1], 0],
  [0, 0, D],
  [M[0], M[1], M[2] + 12],
  [P[0], P[1], P[2] + 12],
  circle3D(zRim, rRim, 0),
  circle3D(zRim, rRim, Math.PI),
  [spineX, pageY[0], 71],
]);
const X = Y.P;

// Convex hull path helper for 2D projected silhouettes
function convexHullPath(points: [number, number][]): string {
  const sorted = [...points].sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  const crossProd = (o: [number, number], a: [number, number], b: [number, number]) =>
    (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
  const lower: [number, number][] = [];
  const upper: [number, number][] = [];
  for (const pt of sorted) {
    while (lower.length >= 2 && crossProd(lower[lower.length - 2], lower[lower.length - 1], pt) <= 0) {
      lower.pop();
    }
    lower.push(pt);
  }
  for (const pt of sorted.reverse()) {
    while (upper.length >= 2 && crossProd(upper[upper.length - 2], upper[upper.length - 1], pt) <= 0) {
      upper.pop();
    }
    upper.push(pt);
  }
  return `M${lower.slice(0, -1).concat(upper.slice(0, -1)).map((pt) => pt.map(f2).join(" ")).join("L")}Z`;
}

// 72-segment circle points for shade hull & light beam
const angles72 = Array.from({ length: 72 }, (_, idx) => (idx / 72) * 2 * Math.PI);
const shadeHullPath = convexHullPath(
  angles72
    .map((a) => X(...circle3D(P, rRear, a)))
    .concat(angles72.map((a) => X(...circle3D(zRim, rRim, a))))
);
const beamConePath = convexHullPath(
  angles72
    .map((a) => X(...circle3D(zRim, rRim, a)))
    .concat(
      angles72.map((a) =>
        X(
          tablePool.c[0] + tablePool.r * 0.82 * Math.cos(a),
          tablePool.c[1] + tablePool.r * 0.82 * Math.sin(a),
          D
        )
      )
    )
);

// Rim & circular contour lines
function contourPath(center: Vec3, radius: number): string {
  const lightDir: Vec3 = [1, 1, 1];
  const slope = Math.atan2(17, L);
  const normal = (angle: number) =>
    add(
      mul(add(mul(B, Math.cos(angle)), mul(V, Math.sin(angle))), Math.cos(slope)),
      mul(I, -Math.sin(slope))
    );
  let pathStr = "";
  let currentSegment: Vec3[] = [];
  const flush = () => {
    if (currentSegment.length > 1) {
      pathStr += Y.path(currentSegment);
    }
    currentSegment = [];
  };
  for (let idx = 0; idx <= 72; idx++) {
    const angle = (idx / 72) * 2 * Math.PI;
    if (dot(normal(angle), lightDir) > 0) {
      currentSegment.push(circle3D(center, radius, angle));
    } else {
      flush();
    }
  }
  flush();
  return pathStr;
}

const shadeFrontRim = contourPath(zRim, rRim);
const shadeRidges = [0.62, 0.86].map((frac) =>
  contourPath(add(P, mul(I, frac * L)), rRear + 17 * frac)
);

// Linkage bar between joints
function LinkageBar({
  a: ptA,
  b: ptB,
  w: barWidth,
  off = 0,
}: {
  a: Vec3;
  b: Vec3;
  w: number;
  off?: number;
}) {
  const dir = unit(sub(ptB, ptA));
  const normal = unit(cross(F, dir));
  return (
    <g transform={Y.plane(add(ptA, mul(normal, off)), dir, normal)}>
      <rect
        className="face"
        x={-barWidth / 2}
        y={-barWidth / 2}
        width={mag(sub(ptB, ptA)) + barWidth}
        height={barWidth}
        rx={barWidth / 2}
      />
    </g>
  );
}

// Circular pivot joint
function PivotJoint({ at: center, r: radius }: { at: Vec3; r: number }) {
  return (
    <g transform={Y.plane(center, unit([-1, 1, 0]), [0, 0, -1])}>
      <circle className="face" r={radius} />
      <circle className="detail" r={radius * 0.45} />
      <circle className="face recess" r="1.3" />
    </g>
  );
}

// Tension spring coil between base and elbow
const springPath = (() => {
  const dir = unit(sub(M, j));
  const normal = unit(cross(F, dir));
  const dist = mag(sub(M, j));
  const pts: Vec3[] = [];
  for (let idx = 0; idx <= 160; idx++) {
    const alpha = 0.12 + (0.6 * idx) / 160;
    const angle = (idx / 160) * 22 * 2 * Math.PI;
    pts.push(
      add(
        add(add(j, mul(dir, alpha * dist)), mul(normal, 1.8 * Math.sin(angle))),
        mul(F, 4 + 1.8 * Math.cos(angle))
      )
    );
  }
  return Y.path(pts);
})();

// Page curve calculation
const PAGE_TURN_DURATION = 1.6;
const CYCLE_PERIOD = 3.4;
const smoothStepT = (val: number) => {
  const t = Math.min(1, Math.max(0, val));
  return t * t * (3 - 2 * t);
};

function computePageCurve(angle: number): [number, number][] {
  const pts: [number, number][] = [[spineX, bookZ]];
  let [curX, curZ] = pts[0];
  for (let idx = 1; idx <= 12; idx++) {
    const frac = idx / 12;
    const curAngle = angle - 0.6 * Math.sin(angle) * frac * frac;
    curX += (Math.cos(curAngle) * pageWidth) / 12;
    curZ += (Math.sin(curAngle) * pageWidth) / 12;
    pts.push([curX, curZ]);
  }
  return pts;
}

const samplePageCurve = (curve: [number, number][], t: number): [number, number] => {
  const scaled = Math.min(1, Math.max(0, t)) * (curve.length - 1);
  const idx = Math.min(curve.length - 2, Math.floor(scaled));
  const frac = scaled - idx;
  const [x0, z0] = curve[idx];
  const [x1, z1] = curve[idx + 1];
  return [x0 + (x1 - x0) * frac, z0 + (z1 - z0) * frac];
};

// Turning page component
function TurningPage({ angle, lit }: { angle: number; lit: boolean }) {
  const curve = computePageCurve(angle);
  const pagePath = `${Y.path([
    ...curve.map(([px, pz]) => [px, pageY[1], pz] as Vec3),
    ...[...curve].reverse().map(([px, pz]) => [px, pageY[0], pz] as Vec3),
  ])}Z`;

  const textLines = lineOffsets
    .map((offset, idx) => {
      const startPt = samplePageCurve(curve, 6 / pageWidth);
      const endPt = samplePageCurve(
        curve,
        (idx === lineOffsets.length - 1 ? 30 : 46) / pageWidth
      );
      return Y.path([
        [startPt[0], pageY[0] + offset, startPt[1]],
        [endPt[0], pageY[0] + offset, endPt[1]],
      ]);
    })
    .join("");

  const [edgeX, edgeZ] = curve[curve.length - 1];

  return (
    <g className={`k-page${lit ? " hot" : ""}`}>
      <path className="face top" d={pagePath} />
      <path className="detail" d={textLines} />
      <path
        className="k-page-edge"
        filter="url(#k-soft)"
        d={Y.path([
          [edgeX, pageY[0], edgeZ],
          [edgeX, pageY[1], edgeZ],
        ])}
      />
    </g>
  );
}

// Static halves of the open book
function BookHalves({ side }: { side: number }) {
  const posX = side < 0 ? 38 : 92;
  return (
    <>
      <IsoBox
        k={Y}
        at={[posX, pageY[0], 10]}
        size={[52, pageY[1] - pageY[0], 8]}
        r={1.5}
      />
      <IsoPlane t={Y.FRONT(posX, pageY[1], bookZ)}>
        <IsoVents from={1.6} to={6.4} step={1.2} across={[1.5, 50.5]} vertical={false} />
      </IsoPlane>
      {side > 0 && (
        <IsoPlane t={Y.SIDE(posX + pageWidth - 1, pageY[1], bookZ)}>
          <IsoVents
            from={1.6}
            to={6.4}
            step={1.2}
            across={[1.5, pageY[1] - pageY[0] - 1.5]}
            vertical={false}
          />
        </IsoPlane>
      )}
      <IsoPlane t={Y.TOP(posX, pageY[0], bookZ)}>
        {lineOffsets.map((lineOffset, idx) => (
          <line
            key={lineOffset}
            className="detail"
            x1={6}
            y1={lineOffset}
            x2={idx === lineOffsets.length - 1 ? 30 : 46}
            y2={lineOffset}
          />
        ))}
      </IsoPlane>
    </>
  );
}

// Light pool illumination on the book
function BookLightPool({ on }: { on: boolean }) {
  const [cx, cy] = [bookLightPool.c[0] - 38, bookLightPool.c[1] - pageY[0]];
  return (
    <g className={`k-light${on ? " on" : ""}`}>
      <g transform={Y.TOP(38, pageY[0], bookZ)}>
        <g clipPath="url(#k-pages)">
          <circle cx={f2(cx)} cy={f2(cy)} r={f2(bookLightPool.r)} fill="url(#k-pool)" />
          <circle
            cx={f2(cx)}
            cy={f2(cy)}
            r={f2(bookLightPool.r * 0.45)}
            fill="url(#k-pool)"
            filter="url(#k-bloom)"
          />
        </g>
      </g>
    </g>
  );
}

// Finished books stack component on the desk
function FinishedBooksStack({
  k: projector,
  at: [bx, by, bz],
  books,
  onPick,
}: {
  k: IsoProjector;
  at: Vec3;
  books: typeof portfolio.books;
  onPick: (book: (typeof portfolio.books)[0] | null) => void;
}) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const pointerTypeRef = useRef("mouse");

  const hashString = (str: string) =>
    str.split("").reduce((acc, ch) => (acc * 31 + ch.charCodeAt(0)) >>> 0, 7);

  // Specific realistic book dimensional profiles for rich thickness and size variation
  const BOOK_PROFILES: Record<string, { w: number; d: number; t: number; spine: string }> = {
    "Designing Data-Intensive Applications": {
      w: 86,
      d: 62,
      t: 11.2,
      spine: "DATA-INTENSIVE APPS",
    },
    "Structure and Interpretation of Computer Programs (SICP)": {
      w: 88,
      d: 64,
      t: 12.6,
      spine: "SICP · COMP. PROGRAMS",
    },
    "Gödel, Escher, Bach: An Eternal Golden Braid": {
      w: 84,
      d: 60,
      t: 10.5,
      spine: "GÖDEL, ESCHER, BACH",
    },
    "Site Reliability Engineering": {
      w: 80,
      d: 56,
      t: 8.8,
      spine: "SITE RELIABILITY ENG.",
    },
    "The Pragmatic Programmer": {
      w: 76,
      d: 52,
      t: 7.4,
      spine: "PRAGMATIC PROGRAMMER",
    },
    "Clean Architecture": {
      w: 74,
      d: 50,
      t: 6.8,
      spine: "CLEAN ARCHITECTURE",
    },
    "Atomic Habits": {
      w: 68,
      d: 48,
      t: 5.6,
      spine: "ATOMIC HABITS",
    },
    "Meditations": {
      w: 62,
      d: 44,
      t: 4.8,
      spine: "MEDITATIONS",
    },
  };

  let currentZ = bz;
  const stackItems = [...books].reverse().map((book, idx) => {
    const hash = hashString(book.title);
    const profile = BOOK_PROFILES[book.title] || {
      w: 72 + (hash % 14),
      d: 48 + ((hash >> 3) % 10),
      t: 5.2 + ((hash >> 6) % 6),
      spine: book.title.toUpperCase(),
    };

    const bookWidth = profile.w;
    const bookDepth = profile.d;
    const thickness = profile.t;

    const item = {
      book,
      spineText: profile.spine,
      x: bx + (88 - bookWidth) / 2 + (((hash >> 7) % 5) - 2),
      y: by + (64 - bookDepth),
      z: currentZ,
      w: bookWidth,
      d: bookDepth,
      t: thickness,
      tone: (idx + hash) % 4,
    };
    currentZ += thickness;
    return item;
  });

  const [pullX, pullY] = projector.D(0, 13, 0);

  const handlePick = (idx: number | null) => {
    setHoveredIdx(idx);
    onPick(idx === null ? null : stackItems[idx].book);
  };

  const handleScrollToBook = (book: (typeof portfolio.books)[0]) => {
    const slug =
      "book-" +
      book.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
    const el = document.getElementById(slug);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      el.classList.remove("k-book-flash");
      void el.offsetWidth;
      el.classList.add("k-book-flash");
    }
  };

  return (
    <g className="k-stack seen">
      {stackItems.map(
        ({ book, spineText, x: itemX, y: itemY, z: itemZ, w: itemW, d: itemD, t: itemT, tone }, idx) => {
          const isTop = idx === stackItems.length - 1;
          const fontSize = Math.min(itemT * 0.55, 3.8);
          const isSelected = hoveredIdx === idx;
          const maxSpineLen = itemW - 12;

          return (
            <g
              key={book.title}
              className={`k-stack__book${isSelected ? " out" : ""}`}
              style={
                {
                  "--i": idx,
                  "--pull": `translate(${f2(pullX)}px, ${f2(pullY)}px)`,
                } as React.CSSProperties
              }
              tabIndex={0}
              role="button"
              aria-label={`${book.title} by ${book.author}`}
              onPointerDown={(e) => {
                pointerTypeRef.current = e.pointerType;
              }}
              onPointerEnter={(e) => {
                if (e.pointerType === "mouse") handlePick(idx);
              }}
              onPointerLeave={(e) => {
                if (e.pointerType === "mouse") handlePick(null);
              }}
              onFocus={() => handlePick(idx)}
              onBlur={() => handlePick(null)}
              onClick={() => {
                if (pointerTypeRef.current === "touch" && hoveredIdx !== idx) {
                  handlePick(idx);
                } else {
                  handleScrollToBook(book);
                }
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  e.stopPropagation();
                  handleScrollToBook(book);
                }
              }}
            >
              <IsoBox
                k={projector}
                at={[itemX, itemY, itemZ]}
                size={[itemW, itemD, itemT]}
                className={`tone-${tone} pages`}
              />
              <IsoPlane t={projector.FRONT(itemX, itemY + itemD, itemZ + itemT)}>
                {itemT >= 4.5 ? (
                  <text
                    className="k-stack__title"
                    x="6"
                    y={f2(itemT / 2)}
                    fontSize={f2(fontSize)}
                    dominantBaseline="central"
                    textLength={f2(Math.min(maxSpineLen, spineText.length * fontSize * 0.68))}
                    lengthAdjust="spacingAndGlyphs"
                  >
                    {spineText}
                  </text>
                ) : (
                  <line
                    className="detail"
                    x1="6"
                    y1={f2(itemT / 2)}
                    x2={f2(Math.min(itemW - 6, 6 + spineText.length * 1.5))}
                    y2={f2(itemT / 2)}
                  />
                )}
              </IsoPlane>
              {isTop && (
                <IsoPlane t={projector.TOP(itemX, itemY, itemZ + itemT)}>
                  <text
                    className="k-stack__title"
                    x="7"
                    y="11"
                    fontSize="3.8"
                    textLength={f2(Math.min(itemW - 14, spineText.length * 2.6))}
                    lengthAdjust="spacingAndGlyphs"
                  >
                    {spineText}
                  </text>
                  <line
                    className="detail"
                    x1="7"
                    y1={f2(itemD - 13)}
                    x2={f2(itemW - 7)}
                    y2={f2(itemD - 13)}
                  />
                  <text
                    className="k-stack__title"
                    x="7"
                    y={f2(itemD - 7)}
                    fontSize="2.8"
                    opacity="0.8"
                  >
                    {book.author.toUpperCase().slice(0, 20)}
                  </text>
                </IsoPlane>
              )}
            </g>
          );
        }
      )}
    </g>
  );
}

// Main Desk Lamp Figure
export function DeskLampFigure() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const switchRef = useRef<SVGGElement | null>(null);
  const dragRef = useRef<{ x: number; y: number; from: number; moved: boolean } | null>(null);

  const [lampOn, setLampOn] = useState(true);
  const [dimmer, setDimmer] = useState(0.8);
  const [animTime, setAnimTime] = useState(PAGE_TURN_DURATION * 0.55);
  const [pageNum, setPageNum] = useState(1);
  const [isHeld, setIsHeld] = useState(false);
  const [pickedBook, setPickedBook] = useState<(typeof portfolio.books)[0] | null>(null);

  const cycleTimeRef = useRef(PAGE_TURN_DURATION * 0.55);
  const stateRef = useRef({ lampOn, isHeld });
  stateRef.current = { lampOn, isHeld };

  // Autonomous page turning loop
  useEffect(() => {
    let animId = 0;
    let lastTimestamp: number | null = null;

    const step = (now: number) => {
      const dt = lastTimestamp === null ? 0 : Math.min(1 / 30, (now - lastTimestamp) / 1000);
      lastTimestamp = now;

      if (stateRef.current.lampOn && !stateRef.current.isHeld) {
        const prevCycle = cycleTimeRef.current;
        cycleTimeRef.current = (cycleTimeRef.current + dt) % CYCLE_PERIOD;
        if (cycleTimeRef.current < prevCycle) {
          setPageNum((p) => p + 1);
        }
        setAnimTime(cycleTimeRef.current);
      }
      animId = requestAnimationFrame(step);
    };

    animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, []);

  const handleUpdateDimmer = (val: number) => {
    const clamped = Math.round(Math.min(1, Math.max(0.1, val)) * 10) / 10;
    setDimmer(clamped);
    setLampOn(true);
  };

  const currentBook = portfolio.books[0];
  const pageAngle = Math.PI * smoothStepT(Math.min(animTime, PAGE_TURN_DURATION) / PAGE_TURN_DURATION);
  const isTurningForward = pageAngle < Math.PI / 2;
  const isPageLit = animTime < PAGE_TURN_DURATION && lampOn;

  const turningPageEl = <TurningPage angle={pageAngle} lit={isPageLit} />;

  const openBookEl = (
    <g
      onPointerEnter={() => setIsHeld(true)}
      onPointerLeave={(e) => {
        if (e.pointerType !== "touch") setIsHeld(false);
      }}
    >
      <IsoBox k={Y} at={[36, pageY[0] - 2, D]} size={[55, pageY[1] - pageY[0] + 4, 3]} r={2} />
      <IsoBox k={Y} at={[spineX, pageY[0] - 2, D]} size={[55, pageY[1] - pageY[0] + 4, 3]} r={2} />
      <BookHalves side={-1} />
      {currentBook && (
        <IsoPlane t={Y.TOP(38, pageY[0], bookZ)}>
          <text className="label" x="6" y="5.5" fontSize="3.6" letterSpacing="0.6">
            {currentBook.title.slice(0, 16).toUpperCase()}
          </text>
        </IsoPlane>
      )}
      {isTurningForward ? (
        <>
          <BookHalves side={1} />
          <BookLightPool on={lampOn} />
          {turningPageEl}
        </>
      ) : (
        <>
          <BookLightPool on={lampOn} />
          {turningPageEl}
          <BookHalves side={1} />
        </>
      )}
    </g>
  );

  const readoutText = pickedBook
    ? `${pickedBook.title} · ${pickedBook.author}`
    : lampOn
    ? `${currentBook ? `${currentBook.title.slice(0, 15)} · ` : ""}page ${pageNum} · ${Math.round(
        dimmer * 100
      )}%`
    : "lamp off";

  const hintText = isHeld
    ? "Holding the page"
    : portfolio.books.length
    ? "Turn the dimmer · pick a book"
    : "Turn the dimmer · click the switch";

  return (
    <IsoFigureContainer
      rootRef={rootRef}
      name="Desk lamp"
      hint={hintText}
      readout={readoutText}
      power={lampOn}
      viewBox={Y.viewBox}
      label="An isometric desk lamp lighting an open book whose pages turn, beside a stack of finished books. Turn the dimmer on its base to set how bright it is, and click its switch to turn it off and on."
      svgProps={{
        tabIndex: 0,
        style: { "--lamp": dimmer } as React.CSSProperties,
        onKeyDown: (e: React.KeyboardEvent<SVGSVGElement>) => {
          if (e.key === "ArrowUp" || e.key === "ArrowRight") {
            handleUpdateDimmer(dimmer + 0.1);
          } else if (e.key === "ArrowDown" || e.key === "ArrowLeft") {
            handleUpdateDimmer(dimmer - 0.1);
          } else if (e.key === " " || e.key === "Enter") {
            setLampOn((l) => !l);
          } else {
            return;
          }
          e.preventDefault();
        },
      }}
    >
      <defs>
        <radialGradient id="k-pool">
          <stop offset="0" stopColor="var(--iso-accent-hi)" stopOpacity=".5" />
          <stop offset=".4" stopColor="var(--iso-accent-hi)" stopOpacity=".3" />
          <stop offset=".75" stopColor="var(--iso-accent)" stopOpacity=".1" />
          <stop offset="1" stopColor="var(--iso-accent)" stopOpacity="0" />
        </radialGradient>
        <linearGradient
          id="k-beam"
          gradientUnits="userSpaceOnUse"
          x1={f2(X(...zRim)[0])}
          y1={f2(X(...zRim)[1])}
          x2={f2(X(...tablePool.c)[0])}
          y2={f2(X(...tablePool.c)[1])}
        >
          <stop offset="0" stopColor="var(--iso-accent-hi)" stopOpacity=".26" />
          <stop offset=".6" stopColor="var(--iso-accent)" stopOpacity=".1" />
          <stop offset="1" stopColor="var(--iso-accent)" stopOpacity="0" />
        </linearGradient>
        <clipPath id="k-pages">
          <rect x="0" y="0" width={106} height={pageY[1] - pageY[0]} />
        </clipPath>
      </defs>

      {/* Desk Surface Table */}
      <IsoBox k={Y} at={[0, 0, 0]} size={O} r={14} />
      <IsoPlane t={Y.TOP(0, 0, D)}>
        <rect
          className="detail"
          x="9"
          y="9"
          width={O[0] - 18}
          height={O[1] - 18}
          rx="10"
        />
        <IsoScrews
          at={[
            [18, 18],
            [O[0] - 18, 18],
            [18, O[1] - 18],
            [O[0] - 18, O[1] - 18],
          ]}
        />
        <g className={`k-light${lampOn ? " on" : ""}`}>
          <circle
            cx={f2(tablePool.c[0])}
            cy={f2(tablePool.c[1])}
            r={f2(tablePool.r * 1.3)}
            fill="url(#k-pool)"
          />
        </g>
      </IsoPlane>

      {/* Lamp Base */}
      <IsoBox k={Y} at={[base.x, base.y, D]} size={[base.w, base.d, base.h]} r={6} />
      <IsoPlane t={Y.TOP(base.x, base.y, A)}>
        <rect
          className="detail"
          x="4"
          y="4"
          width={base.w - 8}
          height={base.d - 8}
          rx="4"
        />
      </IsoPlane>
      <IsoPlane t={Y.FRONT(base.x, base.y + base.d, A)}>
        <IsoVents from={8} to={30} step={3} across={[5, 13]} />
        <text className="label" x={base.w - 8} y="11.5" fontSize="5" textAnchor="end">
          KF-03
        </text>
      </IsoPlane>

      {/* Power Cord Wire */}
      <path
        className="wire"
        d={Y.path([
          [base.x + base.w, base.y + base.d - 33, 10.5],
          [base.x + base.w + 10, base.y + base.d - 33, 7.6],
          [base.x + base.w + 22, base.y + base.d - 22, 7.6],
          [base.x + base.w + 26, base.y + base.d + 14, 7.6],
          [base.x + base.w + 27, 150, 7.6],
        ])}
      />

      {/* Interactive Dimmer Knob with 11 Radial Ticks */}
      <g
        className="k-dimmer"
        onPointerDown={(e) => {
          e.currentTarget.setPointerCapture(e.pointerId);
          dragRef.current = {
            x: e.clientX,
            y: e.clientY,
            from: dimmer,
            moved: false,
          };
        }}
        onPointerMove={(e) => {
          const drag = dragRef.current;
          if (!drag) return;
          const dx = e.clientX - drag.x;
          const dy = e.clientY - drag.y;
          if (Math.abs(dx) + Math.abs(dy) > 3) drag.moved = true;
          if (drag.moved) handleUpdateDimmer(drag.from + (dx - dy) / 110);
        }}
        onPointerUp={() => {
          const drag = dragRef.current;
          dragRef.current = null;
          if (drag && !drag.moved) {
            handleUpdateDimmer(dimmer >= 1 ? 0.1 : dimmer + 0.1);
          }
        }}
        onPointerCancel={() => {
          dragRef.current = null;
        }}
      >
        <IsoPlane t={Y.TOP(215, 61, A)}>
          <circle className="k-dimmer__hit" r="17" />
          {Array.from({ length: 11 }, (_, idx) => {
            const rad = ((-135 + idx * 27) * Math.PI) / 180;
            const rx = Math.sin(rad);
            const ry = -Math.cos(rad);
            const outer = idx % 5 ? 13 : 14.5;
            const isTickLit = lampOn && idx <= Math.round(dimmer * 10);
            return (
              <line
                key={idx}
                className={`detail k-tick${isTickLit ? " on" : ""}`}
                x1={f2(rx * 11)}
                y1={f2(ry * 11)}
                x2={f2(rx * outer)}
                y2={f2(ry * outer)}
              />
            );
          })}
          <circle className="face top" r="9" />
          <circle className="detail" r="7" />
          <rect
            className="k-knob"
            x="-1"
            y="-7.7"
            width="2"
            height="7.7"
            rx="1"
            transform={`rotate(${f2(-135 + 270 * dimmer)})`}
          />
        </IsoPlane>
      </g>

      {/* Rocker Power Switch (I / O) */}
      <g
        className={`press${lampOn ? " latched" : ""}`}
        ref={switchRef}
        onClick={() => setLampOn((l) => !l)}
      >
        <IsoBox k={Y} at={[236, 56, A]} size={[16, 16, 5]} r={2} />
        <IsoPlane t={Y.TOP(236, 56, A + 5)}>
          <line className="detail" x1="2" y1="8" x2="14" y2="8" />
          <text className="label" x="8" y="6" fontSize="4.5" textAnchor="middle">
            I
          </text>
          <text className="label" x="8" y="13.6" fontSize="4.5" textAnchor="middle">
            O
          </text>
        </IsoPlane>
      </g>

      {/* Arm Base Mount */}
      <IsoBox k={Y} at={[204, 30, A]} size={[16, 14, 8]} r={2} />

      {/* Open Book and Turning Page */}
      {openBookEl}

      {/* Ruler and Eraser */}
      <IsoBox k={Y} at={[60, 212, D]} size={[84, 6, 6]} r={1.5} />
      <IsoPlane t={Y.TOP(60, 212, 13)}>
        <line className="detail" x1="9" y1="0" x2="9" y2="6" />
        <line className="detail" x1="12" y1="0" x2="12" y2="6" />
        <line className="detail" x1="14" y1="3" x2="84" y2="3" />
      </IsoPlane>
      <IsoBox k={Y} at={[144, 213, 8]} size={[8, 4, 4]} r={1} />

      {/* Finished Books Stack */}
      {portfolio.books.length > 0 && (
        <FinishedBooksStack
          k={Y}
          at={[209, 177, D]}
          books={portfolio.books}
          onPick={setPickedBook}
        />
      )}

      {/* Light Beam Volumetric Cone */}
      <path className={`k-light${lampOn ? " on" : ""}`} d={beamConePath} fill="url(#k-beam)" />

      {/* Articulated Double Arms, Linkages, and Joints */}
      <LinkageBar a={j} b={M} w={3.4} off={-4} />
      <LinkageBar a={j} b={M} w={3.4} off={4} />
      <path className="k-spring" d={springPath} />
      <PivotJoint at={j} r={6.5} />

      <LinkageBar a={M} b={N} w={3.2} off={-3.6} />
      <LinkageBar a={M} b={N} w={3.2} off={3.6} />
      <PivotJoint at={M} r={7} />

      <LinkageBar a={N} b={P} w={4.2} />
      <PivotJoint at={N} r={5.5} />

      {/* Glowing Bulb and Filament Halo */}
      <g className={`k-light${lampOn ? " on" : ""}`}>
        <g transform={Y.plane(zRim, B, V)}>
          <circle
            className="halo hot"
            style={{ opacity: 0.7 }}
            r={rRim * 1.15}
            filter="url(#k-bloom)"
          />
          <circle className="accent" r={rRim * 0.55} filter="url(#k-glow)" />
        </g>
      </g>

      {/* Lamp Shade Silhouette & Decorative Ridges */}
      <path className="face" d={shadeHullPath} />
      {shadeRidges.map((ridgeD, idx) => (
        <path key={idx} className="detail" d={ridgeD} />
      ))}

      {/* Lamp Shade Rear Mount */}
      <g transform={Y.plane(P, B, V)}>
        <circle className="face top" r={rRear} />
        <circle className="detail" r={4.6} />
      </g>

      {/* Lamp Shade Front Aperture Rim & Bloom */}
      <path
        className={`k-rim-bloom k-light${lampOn ? " on" : ""}`}
        d={shadeFrontRim}
        filter="url(#k-bloom)"
      />
      <path className={`k-rim${lampOn ? " on" : ""}`} d={shadeFrontRim} />
    </IsoFigureContainer>
  );
}
