/** @format */

"use client";
import React from "react";

import { Project } from "@prisma/client";
import Image from "next/image";
import error from "@/assets/404.svg";
import { AnimatePresence, motion } from "framer-motion";
import { ProjectCardItem } from "./ProjectCardItem";
import { fadeInOut } from "@/animations";
interface PageContentProps {
  projects: Project[];
  userId: string | null;
}
export const PageContent = ({ projects, userId }: PageContentProps) => {
  if (projects.length === 0) {
    return (
      <div className="flex items-center justify-center flex-col">
          <h2 className="text-4xl text-muted-foreground font-semibold">
            No Projects Found
          </h2>
        <div className="w-[60vh] h-[60vh] relative flex items-center justify-center">
          <Image
            fill
            alt="Not found"
            src={error}
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    );
  }
  return (
    <div className="pt-6">
      <AnimatePresence>
        <motion.div
          {...fadeInOut}
          layout
          className="grid grid-col-1 md:grid-cols-2 lg:grid-cols-3 3xl:grid-cols-6 gap-2"
        >
          {projects.map((project) => (
            <ProjectCardItem key={project.id} project={project} userId={userId} />
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
