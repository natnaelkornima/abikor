"use client";

import React, { useState } from "react";
import { Project } from "@/data/portfolio";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Github } from "lucide-react";

interface ProjectSectionProps {
  projects: Project[];
}

export function ProjectSection({ projects }: ProjectSectionProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <>
      <ul className="flex flex-col">
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
            className="k-interactive k-project group border-b border-dashed border-[#262626] py-5 transition-[background-color,border-color] duration-150 ease-out hover:bg-white/[0.015] cursor-pointer focus:outline-none select-none [-webkit-tap-highlight-color:transparent]"
            data-label={project.title}
          >
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <div className="flex flex-wrap items-baseline gap-2">
                <span className="inline-flex items-center gap-1.5 text-[15px] font-medium text-[#ededed] group-hover:underline decoration-[#525252] underline-offset-4">
                  {project.title}
                  <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-[#6e6e6e] stroke-[1.5] transition-transform duration-150 ease-out motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:translate-x-0.5 group-hover:text-[#ededed]" />
                </span>
                <Badge variant="default" className="text-[10px]">
                  {project.role}
                </Badge>
              </div>
              <span className="font-mono text-[11px] text-teal-400">
                {project.metrics.split("·")[0].trim()}
              </span>
            </div>

            <p className="mt-1.5 max-w-[62ch] text-[13.5px] leading-relaxed text-[#929292]">
              {project.description}
            </p>

            <div className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[11px] text-[#6e6e6e]">
              <span className="inline-flex items-center gap-1.5">
                ★ {project.metrics}
              </span>
              <div className="ml-auto flex flex-wrap gap-1">
                {project.techStack.slice(0, 4).map((tech) => (
                  <span
                    key={tech}
                    className="rounded-[3px] border border-white/5 bg-[#202020] px-1.5 py-0.5 text-[10px] text-[#b7b7b7]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </li>
        ))}
      </ul>

      {/* Deep-Dive Inspection Dialog */}
      <Dialog
        open={!!selectedProject}
        onOpenChange={(open) => {
          if (!open) setSelectedProject(null);
        }}
      >
        <DialogContent>
          {selectedProject && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedProject.title}</DialogTitle>
                <DialogDescription>{selectedProject.tagline}</DialogDescription>
              </DialogHeader>

              <div className="border-t border-[#282828] pt-3.5 mt-2">
                <div className="font-mono text-[11px] uppercase tracking-wider text-[#6e6e6e] mb-1.5">
                  Challenge &amp; Engineering Problem
                </div>
                <p className="text-[13.5px] leading-relaxed text-[#b7b7b7]">
                  {selectedProject.problem}
                </p>
              </div>

              <div className="border-t border-[#282828] pt-3.5 mt-2">
                <div className="font-mono text-[11px] uppercase tracking-wider text-[#6e6e6e] mb-1.5">
                  Architectural Solution
                </div>
                <p className="text-[13.5px] leading-relaxed text-[#b7b7b7]">
                  {selectedProject.solution}
                </p>
              </div>

              <div className="border-t border-[#282828] pt-3.5 mt-2">
                <div className="font-mono text-[11px] uppercase tracking-wider text-[#6e6e6e] mb-2">
                  Schematic Data Flow
                </div>
                <div className="flex flex-col gap-1.5">
                  {selectedProject.flow.map((f, i) => (
                    <div
                      key={f}
                      className="flex items-center gap-2 rounded-[4px] border border-[#2d2d2d] bg-[#202020] px-2.5 py-1.5 font-mono text-[11px] text-[#ededed]"
                    >
                      <span className="text-[#6e6e6e]">0{i + 1}</span>
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-[#282828] pt-3.5 mt-2">
                <div className="font-mono text-[11px] uppercase tracking-wider text-[#6e6e6e] mb-1.5">
                  Verified Performance
                </div>
                <div className="font-mono text-xs text-teal-400">
                  {selectedProject.metrics}
                </div>
              </div>

              <div className="border-t border-[#282828] pt-3.5 mt-2">
                <div className="font-mono text-[11px] uppercase tracking-wider text-[#6e6e6e] mb-2">
                  Production Tech Stack
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {selectedProject.techStack.map((tech) => (
                    <Badge key={tech} variant="default">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              {selectedProject.github && (
                <div className="mt-4 flex justify-end">
                  <Button variant="primary" asChild>
                    <a
                      href={selectedProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2"
                    >
                      <Github className="w-3.5 h-3.5" />
                      View Source Repository
                    </a>
                  </Button>
                </div>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
