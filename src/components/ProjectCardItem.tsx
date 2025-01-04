/** @format */

"use client";

import { Project } from "@prisma/client";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import Box from "@/components/Box";

import Image from "next/image";
import Link from "next/link";

interface ProjectCardItemProps {
  project: Project;
  userId: string | null;
}

export const ProjectCardItem = ({ project, userId }: ProjectCardItemProps) => {
  return (
    <motion.div layout>
      <Link href={`/portfolio/${project.id}`} className="w-full rounded-lg">
        <Card className="shadow-none border-none">
          <div className="max-w-[400px] h-full p-0 flex flex-col items-start justify-start gap-y-4">
            <Image
              alt="project title"
              src={project.imageUrl || ""}
              width={500}
              height={500}
              objectPosition="left"
              className="w-[400px] h-[500px] rounded-lg object-cover"
            />
            {project.tags.length > 0 && (
              <Box className="flex-wrap justify-start gap-1 ">
                {project.tags.slice(0, 6).map((tag, i) => (
                  <p
                    key={i}
                    className="bg-gray-100 text-xs px-2 py-[2px] rounded-md font-semibold text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400"
                  >
                    {tag}
                  </p>
                ))}
              </Box>
            )}
            <h1 className="text-3xl font-semibold">{project.title}</h1>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
};
