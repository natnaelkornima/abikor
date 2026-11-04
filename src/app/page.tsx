import React from "react";
import Link from "next/link";
import { portfolio } from "@/data/portfolio";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProjectSection } from "@/components/project-modal";
import { ArchitectureStage } from "@/components/architecture-stage";
import { CopyEmailButton } from "@/components/copy-email-button";
import {
  BookOpen,
  Layers,
  FileText,
  ArrowUpRight,
  Github,
  Linkedin,
} from "lucide-react";

export default function Home() {
  const { profile, articles, sets, principles } = portfolio;

  return (
    <>
      {/* Top Header */}
      <header className="k-rule-b flex items-center justify-between gap-6 pb-3">
        <Link
          href="/"
          className="k-interactive font-mono text-[11px] uppercase tracking-[0.08em] text-[#ededed] select-none [-webkit-tap-highlight-color:transparent]"
          data-label="Home // Natnael.dev"
        >
          {profile.brand}
          <span className="text-[#6e6e6e]">{profile.domain}</span>
        </Link>
        <nav aria-label="Main" className="flex items-center gap-5 sm:gap-7 text-[14px]">
          <a
            href="#about"
            className="k-interactive text-[#ededed] transition-colors duration-150 hover:text-[#ededed]"
            data-label="Nav // 00 About"
          >
            Home
          </a>
          <a
            href="#notes"
            className="k-interactive text-[#929292] transition-colors duration-150 hover:text-[#ededed]"
            data-label="Nav // 01 Notes"
          >
            Notes
          </a>
          <a
            href="#projects"
            className="k-interactive text-[#929292] transition-colors duration-150 hover:text-[#ededed]"
            data-label="Nav // 02 Projects"
          >
            Projects
          </a>
          <a
            href="#sets"
            className="k-interactive text-[#929292] transition-colors duration-150 hover:text-[#ededed]"
            data-label="Nav // 03 Sets"
          >
            Sets
          </a>
          <a
            href="#flow"
            className="k-interactive text-[#929292] transition-colors duration-150 hover:text-[#ededed]"
            data-label="Nav // 04 Flow"
          >
            Flow
          </a>
        </nav>
      </header>

      {/* Main Content */}
      <main id="content" className="flex-1 pb-24 pt-12 sm:pt-16">
        
        {/* Section 00: Intro & Profile */}
        <section id="about" className="pt-2">
          <p className="k-label">
            <span className="text-[#6e6e6e]">{profile.roleIndex}</span>
            <span aria-hidden="true" className="mx-1.5 text-[#4a4a4a]">/</span>
            <span>{profile.roleTitle}</span>
          </p>

          <h1 className="mt-3 text-2xl sm:text-[28px] font-medium tracking-[-0.025em] text-[#ededed]">
            {profile.name}
          </h1>

          <ul className="mt-3 flex flex-wrap gap-2" aria-label="At a glance">
            <li className="inline-flex items-center gap-1.5 rounded-[5px] border border-white/5 bg-[#262626] px-2 py-0.5 font-mono text-[11px] text-[#b7b7b7] select-none">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500 shadow-[0_0_6px_#22c55e] animate-pulse" />
              {profile.status}
            </li>
            <li className="inline-flex items-center gap-1.5 rounded-[5px] border border-white/5 bg-[#262626] px-2 py-0.5 font-mono text-[11px] text-[#b7b7b7] select-none">
              Full-Stack &amp; Systems
            </li>
            <li className="inline-flex items-center gap-1.5 rounded-[5px] border border-white/5 bg-[#262626] px-2 py-0.5 font-mono text-[11px] text-[#b7b7b7] select-none">
              {profile.location}
            </li>
          </ul>

          <div className="mt-6 space-y-4 leading-7 text-[#b7b7b7]">
            {profile.bio.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>

          {/* Action Buttons using shadcn Button with optical alignment and press scales */}
          <div className="mt-8 flex flex-wrap gap-3">
            <Button variant="primary" asChild>
              <a href="#projects" data-label="View Selected Projects">
                <BookOpen className="w-3.5 h-3.5 stroke-[1.5]" />
                Explore Projects
              </a>
            </Button>
            <Button variant="default" asChild>
              <a href="#flow" data-label="Inspect Systems Architecture">
                <Layers className="w-3.5 h-3.5 stroke-[1.5] text-[#929292]" />
                Architecture Flow
              </a>
            </Button>
            <Button variant="default" asChild>
              <a
                href={profile.contact.cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-label="Download CV (PDF)"
              >
                <FileText className="w-3.5 h-3.5 stroke-[1.5] text-[#929292]" />
                Curriculum Vitae
              </a>
            </Button>
          </div>

          {/* Stats Bar (3 Columns with Dashed Rules) */}
          <div className="k-rule-b k-rule-t mt-8 grid grid-cols-1 divide-y divide-dashed divide-[#353535] sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {profile.stats.map((stat) => (
              <div
                key={stat.label}
                className="k-interactive flex flex-col py-4 sm:px-4 first:sm:pl-0 select-none"
                data-label={`${stat.label} // ${stat.value}`}
              >
                <span className="text-xl sm:text-2xl font-medium tracking-tight text-[#ededed]">
                  {stat.value}
                </span>
                <span className="mt-1 font-mono text-[11px] uppercase tracking-wider text-[#6e6e6e]">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Section 01: Writing & Notes */}
        <section id="notes" className="mt-14 sm:mt-16">
          <div className="k-rule-b flex items-center justify-between pb-2 mb-4">
            <h2 className="k-label">
              <span className="text-[#6e6e6e]">01</span>
              <span aria-hidden="true" className="mx-1.5 text-[#4a4a4a]">/</span>
              <span className="text-[#ededed]">Writing &amp; Deep Dives</span>
            </h2>
            <span className="font-mono text-[11px] text-[#6e6e6e]">
              5 Technical Notes
            </span>
          </div>

          <ul className="flex flex-col">
            {articles.map((article) => (
              <li
                key={article.slug}
                className="k-interactive group border-b border-dashed border-[#262626] py-4 transition-[background-color,border-color] duration-150 ease-out hover:bg-white/[0.015]"
                data-label={article.title}
              >
                <div className="flex items-baseline justify-between gap-4">
                  <span className="inline-flex items-center gap-1.5 text-[15px] font-medium text-[#ededed] group-hover:underline decoration-[#525252] underline-offset-4">
                    {article.title}
                    <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-[#6e6e6e] stroke-[1.5] transition-transform duration-150 ease-out motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:translate-x-0.5 group-hover:text-[#ededed]" />
                  </span>
                  <time className="shrink-0 font-mono text-[11px] text-[#6e6e6e] tabular-nums">
                    {article.date}
                  </time>
                </div>
                <p className="mt-1.5 max-w-[62ch] text-[13.5px] leading-relaxed text-[#929292]">
                  {article.summary}
                </p>
                <div className="mt-2.5 flex items-center gap-2">
                  <Badge variant="default" className="text-[10px]">
                    {article.category}
                  </Badge>
                  <span className="font-mono text-[11px] text-[#6e6e6e]">
                    {article.readTime}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Section 02: Projects Showcase with shadcn Dialog Deep-Dive */}
        <section id="projects" className="mt-14 sm:mt-16">
          <div className="k-rule-b flex items-center justify-between pb-2 mb-4">
            <h2 className="k-label">
              <span className="text-[#6e6e6e]">02</span>
              <span aria-hidden="true" className="mx-1.5 text-[#4a4a4a]">/</span>
              <span className="text-[#ededed]">Featured Projects</span>
            </h2>
            <span className="font-mono text-[11px] text-[#6e6e6e]">
              Click project to inspect
            </span>
          </div>

          <ProjectSection projects={portfolio.projects} />
        </section>

        {/* Section 03: Sets & Capabilities ("my own sets") */}
        <section id="sets" className="mt-14 sm:mt-16">
          <div className="k-rule-b flex items-center justify-between pb-2 mb-4">
            <h2 className="k-label">
              <span className="text-[#6e6e6e]">03</span>
              <span aria-hidden="true" className="mx-1.5 text-[#4a4a4a]">/</span>
              <span className="text-[#ededed]">Sets &amp; Capabilities</span>
            </h2>
            <span className="font-mono text-[11px] text-[#6e6e6e]">
              4 Domain Stacks
            </span>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 mt-4">
            {sets.map((set) => (
              <div
                key={set.index}
                className="k-interactive k-set rounded-[6px] border border-[#2a2a2a] bg-[#1a1a1a] p-5 transition-[border-color,background-color] duration-150 ease-out hover:border-white/15 hover:bg-[#222222]"
                data-label={`Set ${set.index} // ${set.title}`}
              >
                <div className="flex items-center justify-between">
                  <span className="k-label">
                    <span className="text-[#6e6e6e]">{set.index}</span>
                    <span aria-hidden="true" className="mx-1.5 text-[#4a4a4a]">/</span>
                    <span>SET</span>
                  </span>
                  <Badge variant="secondary" className="text-[10px]">
                    {set.count}
                  </Badge>
                </div>
                <h3 className="mt-2 text-[14.5px] font-medium text-[#ededed]">
                  {set.title}
                </h3>
                <p className="mt-1 text-[12.5px] leading-relaxed text-[#929292]">
                  {set.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {set.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-[3px] border border-white/5 bg-[#242424] px-2 py-0.5 font-mono text-[11px] text-[#b7b7b7] select-none transition-[border-color,background-color,color] duration-150 ease-out hover:border-white/15 hover:bg-[#2e2e2e] hover:text-[#ededed]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 04: Systems Architecture Flow Stage */}
        <section id="flow" className="mt-14 sm:mt-16">
          <div className="k-rule-b flex items-center justify-between pb-2 mb-4">
            <h2 className="k-label">
              <span className="text-[#6e6e6e]">04</span>
              <span aria-hidden="true" className="mx-1.5 text-[#4a4a4a]">/</span>
              <span className="text-[#ededed]">Systems Architecture Flow</span>
            </h2>
            <span className="font-mono text-[11px] text-[#6e6e6e]">
              Interactive Blueprint
            </span>
          </div>

          <ArchitectureStage />
        </section>

        {/* Section 05: Engineering Tenets & Contact */}
        <section className="mt-14 sm:mt-16">
          <div className="k-rule-b flex items-center justify-between pb-2 mb-4">
            <h2 className="k-label">
              <span className="text-[#6e6e6e]">05</span>
              <span aria-hidden="true" className="mx-1.5 text-[#4a4a4a]">/</span>
              <span className="text-[#ededed]">Engineering Tenets</span>
            </h2>
            <span className="font-mono text-[11px] text-[#6e6e6e]">
              Core Principles
            </span>
          </div>

          <div className="mt-4 space-y-3">
            {principles.map((principle) => (
              <div
                key={principle.title}
                className="k-interactive rounded-[6px] border border-[#2a2a2a] bg-[#1a1a1a] p-4 transition-[border-color,background-color] duration-150 ease-out hover:border-white/15"
                data-label={`Principle // ${principle.title}`}
              >
                <h3 className="text-[14px] font-medium text-[#ededed]">
                  {principle.title}
                </h3>
                <p className="mt-1 text-[13px] leading-relaxed text-[#929292]">
                  {principle.description}
                </p>
              </div>
            ))}
          </div>

          {/* Social Channels & Copy Email */}
          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[11px] text-[#b7b7b7]">
            <a
              href={profile.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="k-inline inline-flex items-center gap-1 hover:text-[#ededed] select-none transition-colors duration-150"
              data-label="GitHub // natnaelkornima"
            >
              <Github className="w-3.5 h-3.5 stroke-[1.5] text-[#6e6e6e]" />
              GitHub
              <ArrowUpRight className="w-3 h-3 stroke-[1.5] text-[#6e6e6e]" />
            </a>

            <a
              href={profile.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="k-inline inline-flex items-center gap-1 hover:text-[#ededed] select-none transition-colors duration-150"
              data-label="LinkedIn // natnaelkornima"
            >
              <Linkedin className="w-3.5 h-3.5 stroke-[1.5] text-[#6e6e6e]" />
              LinkedIn
              <ArrowUpRight className="w-3 h-3 stroke-[1.5] text-[#6e6e6e]" />
            </a>

            <CopyEmailButton email={profile.contact.email} />
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="k-rule-t flex flex-wrap items-center justify-between gap-4 py-5 font-mono text-[11px] text-[#6e6e6e]">
        <span>
          © 2026 {profile.name}
          <span aria-hidden="true" className="mx-2 text-[#4a4a4a]">·</span>
          Taste &amp; Systems Craft
        </span>
        <div className="flex gap-5">
          <a
            href={profile.contact.github}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors duration-150 hover:text-[#ededed]"
            data-label="Footer // GitHub"
          >
            GitHub
          </a>
          <a
            href={profile.contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors duration-150 hover:text-[#ededed]"
            data-label="Footer // LinkedIn"
          >
            LinkedIn
          </a>
          <a
            href={profile.contact.cvUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors duration-150 hover:text-[#ededed]"
            data-label="Footer // Resume PDF"
          >
            Resume
          </a>
        </div>
      </footer>
    </>
  );
}
