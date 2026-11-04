import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { portfolio } from "@/data/portfolio";
import { ArrowUpRight } from "lucide-react";
import { TypewriterFigure } from "@/components/figures/typewriter-figure";

export const metadata: Metadata = {
  title: "Blog & Writing — Natnael Kornima",
  description:
    "Notes on runtimes, distributed systems, deterministic AI guardrails, and architecture by Natnael Kornima.",
};

export default function ArticlesPage() {
  const { articles } = portfolio;

  return (
    <div>
      <header className="grid items-start gap-10">
        <div>
          <p className="k-label">
            <span className="text-[#6e6e6e]">01</span>
            <span aria-hidden="true" className="mx-1.5 text-[#4a4a4a]">/</span>
            <span>Writing</span>
          </p>
          <h1 className="mt-3 font-serif text-2xl font-medium tracking-[-0.025em] text-[#ededed]">
            Blog
          </h1>
          <div className="mt-4 max-w-[60ch] font-sans space-y-4 leading-7 text-[#b7b7b7]">
            Notes on distributed systems, high-throughput queues, AI guardrails, and client-side ergonomics. Also available via{" "}
            <Link
              href="/feed.xml"
              className="text-[#ededed] underline decoration-[#525252] underline-offset-4 hover:decoration-[#ededed]"
            >
              RSS
            </Link>
            .
          </div>
        </div>
      </header>

      {/* Crafted Isometric Typewriter Figure from Anatomy Kit */}
      <div className="mt-10">
        <TypewriterFigure />
      </div>

      {/* Article Feed in .k-rows matching kinfish.dev */}
      <section className="mt-16">
        <div className="k-rule-b flex min-h-10 items-center justify-between gap-4">
          <h2 className="k-label flex gap-1.5">
            <span className="text-[#6e6e6e]">2026</span>
            <span aria-hidden="true" className="text-[#4a4a4a]">/</span>
            <span className="text-[#ededed]">Published Notes ({articles.length})</span>
          </h2>
          <span className="k-label text-[#6e6e6e]">Technical Deep Dives</span>
        </div>

        <ul className="k-rows">
          {articles.map((article) => (
            <li key={article.slug} id={article.slug} className="py-4">
              <div className="flex flex-wrap items-baseline justify-between gap-4">
                <span className="font-serif-regular text-[15.5px] font-medium text-[#ededed] group inline-flex items-center gap-1 decoration-[#525252] underline-offset-4 hover:underline">
                  {article.title}
                  <ArrowUpRight className="size-3.5 text-[#6e6e6e]" />
                </span>
                <time className="shrink-0 font-mono text-[11px] text-[#6e6e6e] tabular-nums">
                  {article.date}
                </time>
              </div>
              <p className="mt-2 max-w-[62ch] font-sans text-[13.5px] leading-relaxed text-[#929292]">
                {article.summary}
              </p>
              <div className="mt-2.5 flex items-center gap-2">
                <span className="k-chip">{article.category}</span>
                <span className="font-mono text-[10.5px] text-[#6e6e6e]">
                  {article.readTime}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

