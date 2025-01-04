/** @format */

import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { URLSearchParams } from "url";

export const PATCH = async (
  req: Request,
  { params }: { params: { projectId: string; attachment: string }}

) => {
  try {
    const { user } = await validateRequest();
    const { projectId } = (await params);
 
    if (!user) return new NextResponse("Unauthorized", { status: 401 });
    if (!projectId) return new NextResponse("ID is missing", { status: 401 });
    const project = await prisma.project.findUnique({
      where: {
        id: projectId,
        userId: user.id,
      },
    });

    if (!project) {
      return new NextResponse("project not found", { status: 404 });
    }

    const publishproject = await prisma.project.update({
      where: {
        id: projectId,
        userId: user.id,
      },
      data: {
        isPublished: false,
      },
    });
    return NextResponse.json(publishproject);
  } catch (error) {
    console.log(`[PROJECT_PATCH] ${error}`);
    return new NextResponse("Internal server error", { status: 500 });
  }
};
