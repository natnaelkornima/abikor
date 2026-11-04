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
              <span className="group inline-flex items-center gap-1 decoration-[#525252] underline-offset-4 group-hover:underline text-[#ededed] font-serif font-medium text-[15px]">
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
                <div className="font-mono text-xs text-[#ededed]">
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
