"use client";

import React, { useEffect, useRef } from "react";

export function LiveWire() {
  const lwRef = useRef<HTMLDivElement>(null);
  const selectRef = useRef<HTMLDivElement>(null);
  const wireRef = useRef<SVGPathElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let activeTarget: HTMLElement | null = null;
    let mouseX = 0;
    let mouseY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (activeTarget) {
        updateWire(activeTarget);
      }
    };

    function updateWire(target: HTMLElement) {
      const wire = wireRef.current;
      if (!wire) return;
      const rect = target.getBoundingClientRect();
      const targetCenterX = rect.left + rect.width / 2;
      const targetCenterY = rect.top;

      const pathD = `M ${mouseX} ${mouseY} Q ${(mouseX + targetCenterX) / 2} ${Math.min(mouseY, targetCenterY) - 20}, ${targetCenterX} ${targetCenterY}`;
      wire.setAttribute("d", pathD);
    }

    function attachListeners() {
      const select = selectRef.current;
      const label = labelRef.current;
      const text = textRef.current;
      const lw = lwRef.current;
      if (!select || !label || !text || !lw) return;

      const elements = document.querySelectorAll<HTMLElement>("a, button, .k-interactive, [role='button']");
      elements.forEach((el) => {
        if (el.dataset.lwAttached) return;
        el.dataset.lwAttached = "true";

        el.addEventListener("mouseenter", () => {
          activeTarget = el;
          const rect = el.getBoundingClientRect();

          select.style.width = `${rect.width + 8}px`;
          select.style.height = `${rect.height + 8}px`;
          select.style.transform = `translate(${rect.left - 4}px, ${rect.top - 4}px)`;

          let tag = "ACTION";
          if (el.matches('a[href^="http"]')) tag = "EXTERNAL";
          else if (el.matches('a[href^="#"]')) tag = "SECTION";
          else if (el.classList.contains("k-project")) tag = "PROJECT";
          else if (el.classList.contains("k-set")) tag = "CAPABILITY";
          else if (el.classList.contains("k-flow")) tag = "SYSTEM FLOW";

          const labelContent =
            el.getAttribute("aria-label") ||
            el.dataset.label ||
            el.title ||
            el.innerText.trim().slice(0, 32) ||
            "Inspect";

          text.textContent = `${tag} // ${labelContent.replace(/\s+/g, " ")}`;

          const labelX = Math.max(8, rect.left);
          const labelY = Math.max(8, rect.top - 28);
          label.style.transform = `translate(${labelX}px, ${labelY}px)`;

          lw.classList.add("is-active");
          updateWire(el);
        });

        el.addEventListener("mouseleave", () => {
          if (activeTarget === el) {
            activeTarget = null;
            lw.classList.remove("is-active");
          }
        });
      });
    }

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    attachListeners();

    const interval = setInterval(attachListeners, 1500);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      clearInterval(interval);
    };
  }, []);

  return (
    <div ref={lwRef} className="k-lw" aria-hidden="true">
      <div ref={selectRef} className="k-lw__select">
        <span className="k-lw__corner k-lw__corner--tl" />
        <span className="k-lw__corner k-lw__corner--tr" />
        <span className="k-lw__corner k-lw__corner--bl" />
        <span className="k-lw__corner k-lw__corner--br" />
      </div>
      <svg className="k-lw__wires">
        <path ref={wireRef} className="k-lw__wire" />
      </svg>
      <div ref={labelRef} className="k-lw__label">
        <span className="k-lw__dot" />
        <span ref={textRef} />
      </div>
    </div>
  );
}
