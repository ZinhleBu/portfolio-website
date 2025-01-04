/** @format */

import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const { user } = await validateRequest();
    const { title } = await req.json();

    if (!user) return new NextResponse("Unauthorized", { status: 401 });
    if (!title) return new NextResponse("Missing title", { status: 401 });
    const project = await prisma.project.create({
        data: {
          userId: user.id,
          title
        }
      });

    return NextResponse.json(project);
  } catch (error) {
    console.log(`[PROJECT_POST] ${error}`);
    return new NextResponse("Internal server error", { status: 500 });
  }
};
