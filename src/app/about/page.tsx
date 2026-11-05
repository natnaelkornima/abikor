import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { portfolio } from "@/data/portfolio";
import { ScatterPortrait } from "@/components/scatter-portrait";
import { ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "About · Natnael Kornima",
  description:
    "Software engineer, distributed systems builder, and open source explorer based in Addis Ababa.",
};

export default function AboutPage() {
  const { profile } = portfolio;

  const links = [
    {
      label: "GitHub",
      handle: "natnaelkornima",
      href: profile.contact.github,
    },
    {
      label: "LinkedIn",
      handle: "natnael-kornima",
      href: profile.contact.linkedin,
    },
    {
      label: "Email",
      handle: profile.contact.email,
      href: `mailto:${profile.contact.email}`,
    },
  ];

  return (
    <div>
      <header className="grid items-start gap-10 sm:grid-cols-[minmax(0,1fr)_224px]">
        <div>
          <p className="k-label">
            <span className="text-[#6e6e6e]">05</span>
            <span aria-hidden="true" className="mx-1.5 text-[#4a4a4a]">/</span>
            <span>About</span>
          </p>

          <h1 className="mt-3 font-serif text-2xl font-medium tracking-[-0.025em] text-[#ededed]">
            {profile.name}
          </h1>

          <ul className="k-badges mt-3" aria-label="At a glance">
            <li className="k-chip font-mono">
              <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-[#ededed] shadow-[0_0_6px_rgba(255,255,255,0.4)]" />
              {profile.status}
            </li>
            <li className="k-chip font-mono">Full-Stack &amp; Systems</li>
          </ul>

          <div className="mt-4 max-w-[60ch] space-y-4 leading-7 text-[#b7b7b7] font-sans">
            <p>
              I&#39;m an Ethiopian full-stack engineer and distributed systems builder based in Addis Ababa, who turned a deep curiosity about how computers work into a relentless craft.
            </p>
            <p>
              I architect high-throughput backend services, reliable event-driven message pipelines, and high-performance client applications with strict typography, accessible ergonomics, and sub-second perceptual response.
            </p>
          </div>
        </div>

        {/* Interactive Scatter Dot Portrait */}
        <div className="sm:self-stretch">
          <figure className="m-0 flex h-full flex-col justify-between gap-2.5">
            <div className="relative aspect-square w-full overflow-hidden rounded-[4px] border border-white/5 bg-[#141416] opacity-[0.85]">
              <ScatterPortrait
                darkSrc="/portrait.jpg"
                lightSrc="/portrait.jpg"
                className="absolute inset-0 h-full w-full"
              />
            </div>
            <figcaption className="k-label flex justify-between">
              <span>Hover to scatter</span>
              <span className="normal-case tracking-normal text-[#929292]">Natnael</span>
            </figcaption>
          </figure>
        </div>
      </header>

      {/* Prose Editorial Bio */}
      <div className="k-prose-inline mt-12 space-y-5 text-[15px] leading-7 text-[#b7b7b7]">
        <p>
          My work spans everything from high-volume SMS gateway dispatch architectures (Nazazi platform) to real-time audio synthesis state machines for ancient Ethiopian chordophones (Enzira Begena LMS) and rigorous verification guardrails for generative neural search pipelines.
        </p>

        <p>
          I am a deeply technical person who enjoys peeling back the abstractions: dissecting runtime internals, profiling garbage collection behavior, optimizing database query plans, and engineering deterministic fallback pathways when non-deterministic models or flaky networks misbehave.
        </p>

        <p>
          Away from the terminal, I read voraciously—spanning systems architecture, cognitive science, and classic literature (some of my favorite reads live on my{" "}
          <Link href="/books" className="text-[#ededed] underline decoration-[#525252] underline-offset-4 hover:decoration-[#ededed]">
            books
          </Link>{" "}
          page). I also write about runtimes, frameworks, and engineering trade-offs over on my{" "}
          <Link href="/articles" className="text-[#ededed] underline decoration-[#525252] underline-offset-4 hover:decoration-[#ededed]">
            blog
          </Link>
          .
        </p>

        <p>
          I believe that good software, like good engineering, should be calm, resilient, and honest: doing exactly what it promises, failing gracefully when pushed to limits, and respecting the human on the other side of the glass.
        </p>

        <blockquote className="border-l-2 border-[#383838] pl-4 italic text-[#8a8a92]">
          <p>
            &ldquo;Simplicity is prerequisite for reliability.&rdquo; &mdash; Edsger W. Dijkstra
          </p>
        </blockquote>
      </div>

      {/* Section 05.1: Elsewhere */}
      <section className="mt-16">
        <div className="k-rule-b flex min-h-10 items-center justify-between gap-4">
          <h2 className="k-label flex gap-1.5">
            <span className="text-[#6e6e6e]">05.1</span>
            <span aria-hidden="true" className="text-[#4a4a4a]">/</span>
            <span className="text-[#ededed]">Elsewhere</span>
          </h2>
        </div>

        <ul className="k-rows">
          {links.map((link) => (
            <li key={link.label} className="flex items-baseline justify-between gap-6 py-3.5">
              <a
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group inline-flex items-center gap-1 decoration-[#525252] underline-offset-4 hover:underline text-[#ededed]"
              >
                {link.label}
                <ArrowUpRight className="size-3.5 shrink-0 text-[#6e6e6e] transition-colors group-hover:text-[#ededed]" />
              </a>
              <span className="k-label min-w-0 truncate normal-case tracking-normal">
                {link.handle}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
