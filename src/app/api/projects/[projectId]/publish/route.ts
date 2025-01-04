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
    const job = await prisma.project.findUnique({
      where: {
        id: projectId,
        userId: user.id,
      },
    });

    if (!job) {
      return new NextResponse("Job not found", { status: 404 });
    }

    const publishJob = await prisma.project.update({
      where: {
        id: projectId,
        userId: user.id,
      },
      data: {
        isPublished: true,
      },
    });
    return NextResponse.json(publishJob);
  } catch (error) {
    console.log(`[PROJECT_PATCH] ${error}`);
    return new NextResponse("Internal server error", { status: 500 });
  }
};
