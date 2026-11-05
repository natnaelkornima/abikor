import React from "react";
import Link from "next/link";
import { portfolio } from "@/data/portfolio";
import { ProjectSection } from "@/components/project-modal";
import { ArchitectureStage } from "@/components/architecture-stage";
import { CopyEmailButton } from "@/components/copy-email-button";
import {
  BookOpen,
  ArrowRight,
  ArrowUpRight,
  Github,
  Linkedin,
  GitBranch,
  Layers,
  Gauge,
} from "lucide-react";

export default function Home() {
  const { profile, articles, sets, principles } = portfolio;

  return (
    <>
      {/* Hero / Intro Section */}
      <section>
        <p className="k-label">
          <span className="text-[#6e6e6e]">{profile.roleIndex}</span>
          <span aria-hidden="true" className="mx-1.5 text-[#4a4a4a]">/</span>
          <span>{profile.roleTitle}</span>
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
          <li className="k-chip font-mono">{profile.location}</li>
        </ul>

        <div className="mt-6 space-y-4 font-sans leading-7 text-[#b7b7b7]">
          {profile.bio.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>

        {/* Action Buttons matching kinfish.dev .k-btn specification */}
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/articles" className="k-btn k-btn--primary">
            <BookOpen className="k-btn__icon" />
            Read the blog
          </Link>
          <a
            href={profile.contact.github}
            target="_blank"
            rel="noopener noreferrer"
            className="k-btn"
          >
            <Github className="k-btn__icon" />
            GitHub
          </a>
          <a
            href={profile.contact.cvUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="k-btn"
          >
            Curriculum Vitae
          </a>
        </div>

        {/* Metric Highlight Bar (3 Columns with dashed division matching original) */}
        <div className="mt-8 border-y border-dashed border-[#333333] grid grid-cols-1 divide-y divide-dashed divide-[#333333] sm:grid-cols-3 sm:divide-y-0 sm:divide-x select-none">
          {profile.stats.map((stat, idx) => {
            const icons = [
              <GitBranch key="repos" className="size-3.5 text-[#8a8a92] shrink-0" strokeWidth={1.8} />,
              <Layers key="stack" className="size-3.5 text-[#8a8a92] shrink-0" strokeWidth={1.8} />,
              <Gauge key="latency" className="size-3.5 text-[#8a8a92] shrink-0" strokeWidth={1.8} />,
            ];
            return (
              <div
                key={stat.label}
                className="flex flex-col justify-between py-4 sm:py-5 px-3 sm:px-6 first:sm:pl-1 last:sm:pr-1"
              >
                {/* Icon & Label with identical matching color */}
                <div className="flex items-center gap-1.5 text-[#8a8a92]">
                  {icons[idx]}
                  <span className="font-mono text-[10.5px] uppercase tracking-[0.08em] font-medium text-[#8a8a92]">
                    {stat.label}
                  </span>
                </div>

                {/* Big Stat Value */}
                <div className="mt-2.5 mb-1">
                  <span
                    className={`font-bold tracking-tight text-[#ededed] ${
                      stat.value.length > 10
                        ? "text-lg sm:text-[20px]"
                        : "text-2xl sm:text-[28px]"
                    }`}
                  >
                    {stat.value}
                  </span>
                </div>

                {/* Description Subtitle */}
                <span className="font-sans text-[12px] sm:text-[12.5px] text-[#6e6e6e] leading-snug">
                  {stat.detail}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Section 01: Writing */}
      <section className="mt-16">
        <div className="k-rule-b flex min-h-10 items-center justify-between gap-4">
          <h2 className="k-label flex gap-1.5">
            <span className="text-[#6e6e6e]">01</span>
            <span aria-hidden="true" className="text-[#4a4a4a]">/</span>
            <span className="text-[#ededed]">Writing</span>
          </h2>
          <Link
            href="/articles"
            className="k-label group inline-flex items-center gap-1.5 transition-colors hover:text-[#ededed]"
          >
            All 5 notes
            <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <ul className="k-rows">
          {articles.map((article) => (
            <li key={article.slug}>
              <Link
                href={`/articles#${article.slug}`}
                className="group flex items-baseline justify-between gap-6 py-3.5"
              >
                <span className="font-serif-regular text-[15px] text-[#ededed] decoration-[#525252] underline-offset-4 group-hover:underline">
                  {article.title}
                </span>
                <time className="shrink-0 font-mono text-[11px] text-[#6e6e6e]">
                  {article.date}
                </time>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Section 02: Projects */}
      <section className="mt-16">
        <div className="k-rule-b flex min-h-10 items-center justify-between gap-4">
          <h2 className="k-label flex gap-1.5">
            <span className="text-[#6e6e6e]">02</span>
            <span aria-hidden="true" className="text-[#4a4a4a]">/</span>
            <span className="text-[#ededed]">Projects</span>
          </h2>
          <a
            href={profile.contact.github}
            target="_blank"
            rel="noopener noreferrer"
            className="k-label group inline-flex items-center gap-1.5 transition-colors hover:text-[#ededed]"
          >
            All projects
            <ArrowUpRight className="size-3 transition-transform group-hover:-translate-y-px group-hover:translate-x-px" />
          </a>
        </div>

        <ProjectSection projects={portfolio.projects} />
      </section>

      {/* Section 03: Sets & Capabilities */}
      <section className="mt-16">
        <div className="k-rule-b flex min-h-10 items-center justify-between gap-4">
          <h2 className="k-label flex gap-1.5">
            <span className="text-[#6e6e6e]">03</span>
            <span aria-hidden="true" className="text-[#4a4a4a]">/</span>
            <span className="text-[#ededed]">Sets &amp; Capabilities</span>
          </h2>
          <span className="k-label text-[#6e6e6e]">4 Domain Stacks</span>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 mt-4">
          {sets.map((set) => (
            <div
              key={set.index}
              className="rounded-[6px] border border-[#2a2a2a] bg-[#1a1a1a] p-4 transition-[border-color,background-color] duration-150 ease-out hover:border-white/15 hover:bg-[#202020]"
            >
              <div className="flex items-center justify-between">
                <span className="k-label">
                  <span className="text-[#6e6e6e]">{set.index}</span>
                  <span aria-hidden="true" className="mx-1.5 text-[#4a4a4a]">/</span>
                  <span>SET</span>
                </span>
                <span className="k-chip">{set.count}</span>
              </div>
              <h3 className="mt-2 font-serif-square text-[14px] font-medium text-[#ededed]">
                {set.title}
              </h3>
              <p className="mt-1 font-sans text-[12.5px] leading-relaxed text-[#929292]">
                {set.description}
              </p>
              <div className="mt-3.5 flex flex-wrap gap-1.5">
                {set.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-[3px] border border-white/5 bg-[#242424] px-2 py-0.5 font-mono text-[10.5px] text-[#b7b7b7] select-none"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 04: Systems Architecture Flow */}
      <section className="mt-16">
        <div className="k-rule-b flex min-h-10 items-center justify-between gap-4">
          <h2 className="k-label flex gap-1.5">
            <span className="text-[#6e6e6e]">04</span>
            <span aria-hidden="true" className="text-[#4a4a4a]">/</span>
            <span className="text-[#ededed]">Systems Architecture Flow</span>
          </h2>
          <span className="k-label text-[#6e6e6e]">Interactive Blueprint</span>
        </div>

        <div className="mt-4">
          <ArchitectureStage />
        </div>
      </section>

      {/* Section 05: Engineering Tenets */}
      <section className="mt-16">
        <div className="k-rule-b flex min-h-10 items-center justify-between gap-4">
          <h2 className="k-label flex gap-1.5">
            <span className="text-[#6e6e6e]">05</span>
            <span aria-hidden="true" className="text-[#4a4a4a]">/</span>
            <span className="text-[#ededed]">Engineering Tenets</span>
          </h2>
          <span className="k-label text-[#6e6e6e]">Core Principles</span>
        </div>

        <div className="mt-4 space-y-3">
          {principles.map((principle) => (
            <div
              key={principle.title}
              className="rounded-[6px] border border-[#2a2a2a] bg-[#1a1a1a] p-4 transition-colors duration-150 ease-out hover:border-white/15"
            >
              <h3 className="font-serif-regular text-[14px] font-medium text-[#ededed]">
                {principle.title}
              </h3>
              <p className="mt-1 font-sans text-[13px] leading-relaxed text-[#929292]">
                {principle.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Connect / Social Row matching kinfish.dev */}
      <div className="k-label mt-16 flex flex-wrap gap-x-6 gap-y-2">
        <a
          href={profile.contact.github}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-1 decoration-[#525252] underline-offset-4 hover:underline text-[#b7b7b7] hover:text-[#ededed] transition-colors"
        >
          Follow on GitHub
          <ArrowUpRight className="size-3.5 shrink-0 text-[#6e6e6e] transition-colors group-hover:text-[#ededed]" />
        </a>
        <a
          href={profile.contact.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-1 decoration-[#525252] underline-offset-4 hover:underline text-[#b7b7b7] hover:text-[#ededed] transition-colors"
        >
          Connect on LinkedIn
          <ArrowUpRight className="size-3.5 shrink-0 text-[#6e6e6e] transition-colors group-hover:text-[#ededed]" />
        </a>
        <CopyEmailButton email={profile.contact.email} />
      </div>
    </>
  );
}
