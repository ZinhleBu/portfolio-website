/** @format */

import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { Project } from "@prisma/client";

type GetProjects = {
  title?: string;
  categoryId?: string;

};

export const getProjects = async ({
  title,
  categoryId,

}: GetProjects): Promise<Project[]> => {
  try {
    //initialize the query object with common options
    const user = await validateRequest();
    let query: any = {
      where: {
        isPublished: true,
      },
      include: {
        category: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 10,
    };

    if (typeof title !== "undefined" || typeof categoryId !== "undefined") {
      query.where = {
        AND: [
          typeof title !== "undefined" && {
            title: { contains: title, mode: "insensitive" },
          },
          typeof categoryId !== "undefined" && {
            categoryId: {
              equals: categoryId,
            },
          },
        ].filter(Boolean),
      };
    }

 
    //excecute the query to fetch the projects based on the constructed parameters
    const projects = await prisma.project.findMany(query);
    return projects;
  } catch (error) {
    console.log("[GET_PROJECTS] ", error);
    return [];
  }
};
