import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { portfolio } from "@/data/portfolio";
import { ArrowUpRight } from "lucide-react";

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
          <h1 className="mt-3 text-2xl font-medium tracking-[-0.025em] text-[#ededed]">
            Blog
          </h1>
          <div className="mt-4 max-w-[60ch] space-y-4 leading-7 text-[#b7b7b7]">
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

      {/* Isometric Typewriter Visualizer Widget */}
      <div className="mt-10">
        <figure className="k-iso">
          <div className="k-iso__bar">
            <span>Typewriter Terminal</span>
            <span className="text-[#6e6e6e]">KORNIMA · 01</span>
          </div>
          <div className="k-iso__stage">
            <div className="w-full max-w-lg rounded border border-[#333] bg-[#121212] p-5 shadow-2xl">
              <div className="flex items-center justify-between border-b border-[#222] pb-3 text-xs font-mono text-[#6e6e6e]">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>DISPATCH: READY</span>
                </div>
                <span>OCT 28, 2026 // LINE 04 · COL 1</span>
              </div>
              <div className="mt-4 font-mono text-[13px] leading-relaxed text-[#ededed]">
                <span className="text-teal-400 font-bold">&gt; </span>
                <span className="text-[#b7b7b7]">
                  &quot;Deterministic Over Clever: Why strict schema fences and decoupled queues outperform monolithic black boxes under load.&quot;
                </span>
                <span className="inline-block w-2 h-4 ml-1 bg-teal-400 align-middle animate-pulse" />
              </div>
              <div className="mt-5 grid grid-cols-10 gap-1 pt-3 border-t border-[#222] font-mono text-[10px] text-[#6e6e6e] text-center select-none">
                {["Q","W","E","R","T","Y","U","I","O","P","A","S","D","F","G","H","J","K","L",";","Z","X","C","V","B","N","M",",",".","↵"].map((key) => (
                  <span
                    key={key}
                    className="rounded border border-[#2a2a2a] bg-[#1c1c1c] py-1 transition-colors hover:border-white/20 hover:text-[#ededed]"
                  >
                    {key}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </figure>
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
                <span className="text-[15px] font-medium text-[#ededed] group inline-flex items-center gap-1 decoration-[#525252] underline-offset-4 hover:underline">
                  {article.title}
                  <ArrowUpRight className="size-3.5 text-[#6e6e6e]" />
                </span>
                <time className="shrink-0 font-mono text-[11px] text-[#6e6e6e] tabular-nums">
                  {article.date}
                </time>
              </div>
              <p className="mt-2 max-w-[62ch] text-[13.5px] leading-relaxed text-[#929292]">
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

