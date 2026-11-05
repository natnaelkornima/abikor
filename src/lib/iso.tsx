import React from "react";

const COS_30 = Math.round(Math.cos(Math.PI / 6) * 1e9) / 1e9;
const SIN_30 = 0.5;

export const f2 = (e: number) => (Math.abs(e) < 0.005 ? 0 : e).toFixed(2);
export const f4 = (e: number) => (Math.abs(e) < 5e-5 ? 0 : e).toFixed(4);

export interface IsoProjector {
  P: (x: number, y: number, z: number) => [number, number];
  D: (x: number, y: number, z: number) => [number, number];
  plane: (p: [number, number, number], u: [number, number, number], v: [number, number, number]) => string;
  TOP: (x: number, y: number, z: number) => string;
  FRONT: (x: number, y: number, z: number) => string;
  SIDE: (x: number, y: number, z: number) => string;
  path: (pts: [number, number, number][]) => string;
  viewBox?: string;
}

export function createIsoProjector(ox = 0, oy = 0): IsoProjector {
  const P = (x: number, y: number, z: number): [number, number] => [
    (x - y) * COS_30 + ox,
    (x + y) * SIN_30 - z + oy,
  ];
  const D = (x: number, y: number, z: number): [number, number] => [
    (x - y) * COS_30,
    (x + y) * SIN_30 - z,
  ];
  const plane = (
    p: [number, number, number],
    u: [number, number, number],
    v: [number, number, number]
  ) => {
    const [px, py] = P(...p);
    const [ux, uy] = D(...u);
    const [vx, vy] = D(...v);
    return `matrix(${f4(ux)} ${f4(uy)} ${f4(vx)} ${f4(vy)} ${f2(px)} ${f2(py)})`;
  };
  return {
    P,
    D,
    plane,
    TOP: (x, y, z) => plane([x, y, z], [1, 0, 0], [0, 1, 0]),
    FRONT: (x, y, z) => plane([x, y, z], [1, 0, 0], [0, 0, -1]),
    SIDE: (x, y, z) => plane([x, y, z], [0, -1, 0], [0, 0, -1]),
    path: (pts) => "M" + pts.map((pt) => P(...pt).map(f2).join(" ")).join("L"),
  };
}

export function computeIsoBounds(pts: [number, number, number][], marginRatio = 0.05, aspect = 1.5): IsoProjector & { viewBox: string } {
  const projected = pts.map(([x, y, z]) => [(x - y) * COS_30, (x + y) * SIN_30 - z]);
  const minX = Math.min(...projected.map((p) => p[0]));
  const maxX = Math.max(...projected.map((p) => p[0]));
  const minY = Math.min(...projected.map((p) => p[1]));
  const maxY = Math.max(...projected.map((p) => p[1]));
  const margin = marginRatio * Math.max(maxX - minX, maxY - minY);
  let w = maxX - minX + 2 * margin;
  let h = maxY - minY + 2 * margin;
  let ox = margin - minX;
  let oy = margin - minY;

  if (w / h < aspect) {
    const targetW = h * aspect;
    ox += (targetW - w) / 2;
    w = targetW;
  } else {
    const targetH = w / aspect;
    oy += (targetH - h) / 2;
    h = targetH;
  }

  const proj = createIsoProjector(ox, oy);
  return { ...proj, viewBox: `0 0 ${f2(w)} ${f2(h)}` };
}

export function IsoBox({
  k,
  at: [x, y, z],
  size: [w, d, h],
  r = 0,
  className = "",
}: {
  k: IsoProjector;
  at: [number, number, number];
  size: [number, number, number];
  r?: number;
  className?: string;
}) {
  const cls = className ? ` ${className}` : "";
  if (r <= 0) {
    return (
      <>
        <g transform={k.SIDE(x + w, y + d, z + h)}>
          <rect className={`face${cls}`} width={d} height={h} />
        </g>
        <g transform={k.FRONT(x, y + d, z + h)}>
          <rect className={`face${cls}`} width={w} height={h} />
        </g>
        <g transform={k.TOP(x, y, z + h)}>
          <rect className={`face top${cls}`} width={w} height={d} />
        </g>
      </>
    );
  }

  const radius = Math.min(r, w / 2, d / 2);
  const arc = (cx: number, cy: number, start: number, end: number) =>
    Array.from({ length: 9 }, (_, idx) => {
      const angle = start + ((end - start) * idx) / 8;
      return [cx + radius * Math.cos(angle), cy + radius * Math.sin(angle)];
    });

  const p4 = Math.PI / 4;
  const p2 = Math.PI / 2;
  const topPts = [
    ...arc(x + w - radius, y + radius, -p2, 0),
    ...arc(x + w - radius, y + d - radius, 0, p2),
    ...arc(x + radius, y + d - radius, p2, 2 * p2),
    ...arc(x + radius, y + radius, 2 * p2, 3 * p2),
  ];
  const sidePts = [
    ...arc(x + w - radius, y + radius, -p4, 0),
    ...arc(x + w - radius, y + d - radius, 0, p2),
    ...arc(x + radius, y + d - radius, p2, 3 * p4),
  ];
  const closePath = (pts: [number, number, number][]) => `${k.path(pts)}Z`;
  const topZ = z + h;

  return (
    <>
      <path
        className={`face${cls}`}
        d={closePath([
          ...sidePts.map(([px, py]) => [px, py, z] as [number, number, number]),
          ...[...sidePts].reverse().map(([px, py]) => [px, py, topZ] as [number, number, number]),
        ])}
      />
      <path
        className={`face top${cls}`}
        d={closePath(topPts.map(([px, py]) => [px, py, topZ] as [number, number, number]))}
      />
    </>
  );
}

export function IsoPlane({
  t,
  children,
  className,
}: {
  t: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <g transform={t} className={className}>
      {children}
    </g>
  );
}

export function IsoVents({
  from,
  to,
  step,
  across: [a, b],
  vertical = true,
}: {
  from: number;
  to: number;
  step: number;
  across: [number, number];
  vertical?: boolean;
}) {
  const lines: number[] = [];
  for (let pos = from; pos <= to + 1e-6; pos += step) lines.push(pos);
  return (
    <>
      {lines.map((val) =>
        vertical ? (
          <line key={val} className="detail" x1={f2(val)} y1={a} x2={f2(val)} y2={b} />
        ) : (
          <line key={val} className="detail" x1={a} y1={f2(val)} x2={b} y2={f2(val)} />
        )
      )}
    </>
  );
}

export function IsoScrews({ at }: { at: [number, number][] }) {
  return (
    <>
      {at.map(([x, y]) => (
        <g key={`${x}-${y}`}>
          <circle className="face recess" cx={x} cy={y} r="3" />
          <line className="detail" x1={x - 1.8} y1={y} x2={x + 1.8} y2={y} />
        </g>
      ))}
    </>
  );
}

export function IsoDefs() {
  const filterAttrs = {
    filterUnits: "userSpaceOnUse" as const,
    x: -2000,
    y: -2000,
    width: 6000,
    height: 6000,
  };
  return (
    <defs>
      <filter id="k-glow" {...filterAttrs}>
        <feGaussianBlur stdDeviation="4" result="b" />
        <feMerge>
          <feMergeNode in="b" />
          <feMergeNode in="b" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
      <filter id="k-soft" {...filterAttrs}>
        <feGaussianBlur stdDeviation="2.2" result="b" />
        <feMerge>
          <feMergeNode in="b" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
      <filter id="k-bloom" {...filterAttrs}>
        <feGaussianBlur stdDeviation="9" />
      </filter>
    </defs>
  );
}

export function pressKeyElement(el: HTMLElement | SVGElement | null, duration = 160) {
  if (!el) return;
  const elem = el as any;
  elem.classList.add("down", "lit");
  window.clearTimeout(elem._downTimer);
  window.clearTimeout(elem._litTimer);
  elem._downTimer = window.setTimeout(() => elem.classList.remove("down"), 110);
  elem._litTimer = window.setTimeout(() => elem.classList.remove("lit"), duration);
}

export function prefersReducedMotion(): boolean {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export interface IsoFigureProps {
  rootRef?: React.Ref<HTMLElement>;
  name: string;
  hint: string;
  readout: string;
  power?: boolean;
  viewBox: string;
  label: string;
  svgProps?: React.SVGProps<SVGSVGElement>;
  children: React.ReactNode;
}

export function IsoFigureContainer({
  rootRef,
  name,
  hint,
  readout,
  power,
  viewBox,
  label,
  svgProps,
  children,
}: IsoFigureProps) {
  return (
    <figure ref={rootRef} className="k-iso" data-power={power || undefined}>
      <div className="k-iso__bar">
        <span>{name}</span>
      </div>
      <div className="k-iso__stage">
        <svg role="img" aria-label={label} viewBox={viewBox} {...svgProps}>
          <IsoDefs />
          {children}
        </svg>
      </div>
      <figcaption className="k-iso__bar">
        <span>{hint}</span>
        <span className="k-iso__readout">{readout}</span>
      </figcaption>
    </figure>
  );
}
