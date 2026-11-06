"use client";

import React, { useState } from "react";
import { Project } from "@/data/portfolio";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { getTechLogoComponent } from "@/components/tech-logos";
import { ArrowUpRight, Github } from "lucide-react";

interface ProjectSectionProps {
  projects: Project[];
}

export function ProjectSection({ projects }: ProjectSectionProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <>
      <ul className="k-rows">
        {projects.map((project) => (
          <li
            key={project.id}
            onClick={() => setSelectedProject(project)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setSelectedProject(project);
              }
            }}
            tabIndex={0}
            role="button"
            className="group py-3.5 transition-colors duration-150 ease-out hover:bg-white/[0.015] cursor-pointer focus:outline-none select-none [-webkit-tap-highlight-color:transparent]"
          >
            <div className="flex items-center justify-between gap-4">
              <span className="group inline-flex items-center gap-1 decoration-[#525252] underline-offset-4 group-hover:underline text-[#ededed] font-serif-regular font-medium text-[15px]">
                {project.title}
                <ArrowUpRight className="size-3.5 shrink-0 text-[#6e6e6e] transition-colors group-hover:text-[#ededed]" />
              </span>
              <span className="k-chip shrink-0">{project.role}</span>
            </div>

            <p className="mt-1.5 max-w-[60ch] font-sans text-[14px] leading-relaxed text-[#929292]">
              {project.description}
            </p>

            <div className="k-label mt-2 flex flex-wrap items-center justify-between gap-x-4 gap-y-1 !font-light text-[#6e6e6e]">
              <span>★ {project.metrics}</span>
              <span className="text-[10px] text-[#929292] group-hover:text-[#ededed] transition-colors">
                Click to inspect architecture →
              </span>
            </div>
          </li>
        ))}
      </ul>

      {/* Deep-Dive Inspection Dialog - Clean shadcn style */}
      <Dialog
        open={!!selectedProject}
        onOpenChange={(open) => {
          if (!open) setSelectedProject(null);
        }}
      >
        <DialogContent className="max-w-[680px] p-6 space-y-5 rounded-md border border-[#27272a] bg-[#09090b]">
          {selectedProject && (() => {
            const metricsList = selectedProject.metrics.split("·").map((m) => m.trim());

            return (
              <div className="space-y-5">
                {/* Header */}
                <div className="space-y-1.5 pr-6">
                  <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-[#71717a]">
                    <span>{selectedProject.role}</span>
                    <span>·</span>
                    <span>Project Architecture</span>
                  </div>
                  <h2 className="text-lg font-semibold tracking-tight text-[#ededed]">
                    {selectedProject.title}
                  </h2>
                  <p className="text-xs text-[#a1a1aa] leading-relaxed">
                    {selectedProject.tagline}
                  </p>
                </div>

                <div className="border-b border-[#27272a]" />

                {/* Challenge & Problem */}
                <div className="space-y-1.5">
                  <div className="font-mono text-[11px] uppercase tracking-wider text-[#71717a]">
                    Challenge &amp; Engineering Problem
                  </div>
                  <p className="text-[13px] leading-relaxed text-[#d4d4d8]">
                    {selectedProject.problem}
                  </p>
                </div>

                {/* Architectural Solution */}
                <div className="space-y-1.5">
                  <div className="font-mono text-[11px] uppercase tracking-wider text-[#71717a]">
                    Architectural Solution
                  </div>
                  <p className="text-[13px] leading-relaxed text-[#d4d4d8]">
                    {selectedProject.solution}
                  </p>
                </div>

                {/* Schematic Data Flow */}
                <div className="space-y-2">
                  <div className="font-mono text-[11px] uppercase tracking-wider text-[#71717a]">
                    Schematic Data Flow
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
                    {selectedProject.flow.map((f, i) => (
                      <div
                        key={f}
                        className="rounded-md border border-[#27272a] bg-[#121214] p-2.5 flex flex-col justify-between"
                      >
                        <span className="font-mono text-[10px] text-[#71717a]">0{i + 1}</span>
                        <div className="font-mono text-xs text-[#ededed] mt-1 leading-snug">
                          {f}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Verified Performance */}
                <div className="space-y-2">
                  <div className="font-mono text-[11px] uppercase tracking-wider text-[#71717a]">
                    Verified Performance
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {metricsList.map((m) => (
                      <div
                        key={m}
                        className="inline-flex items-center gap-1.5 rounded-md border border-[#27272a] bg-[#121214] px-2.5 py-1 text-xs font-mono text-[#ededed]"
                      >
                        <span className="size-1 rounded-sm bg-[#71717a]" />
                        <span>{m}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Production Tech Stack with Icons */}
                <div className="space-y-2">
                  <div className="font-mono text-[11px] uppercase tracking-wider text-[#71717a]">
                    Production Tech Stack
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedProject.techStack.map((tech) => {
                      const Logo = getTechLogoComponent(tech);
                      return (
                        <div
                          key={tech}
                          className="inline-flex items-center gap-1.5 rounded-md border border-[#27272a] bg-[#121214] px-2.5 py-1 text-xs font-mono text-[#ededed] hover:border-[#3f3f46] transition-colors select-none"
                        >
                          <Logo className="size-3.5 text-[#71717a]" />
                          <span>{tech}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Footer Action Bar */}
                <div className="border-t border-[#27272a] pt-4 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-[#71717a]">
                    Press ESC to close
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedProject(null)}
                      className="h-8 rounded-md border border-[#27272a] px-3 text-xs font-medium text-[#ededed] hover:bg-[#18181b] transition-colors"
                    >
                      Close
                    </button>
                    {selectedProject.github && (
                      <a
                        href={selectedProject.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-8 items-center gap-1.5 rounded-md bg-[#ededed] px-3 text-xs font-medium text-[#09090b] hover:bg-white transition-colors"
                      >
                        <Github className="size-3.5" />
                        <span>View Source</span>
                        <ArrowUpRight className="size-3 text-[#71717a]" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })()}
        </DialogContent>
      </Dialog>
    </>
  );
}
