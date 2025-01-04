/** @format */

import { deleteObject } from "firebase/storage";
import { validateRequest } from "@/auth";
import { storage } from "@/config/firebase.config";
import prisma from "@/lib/prisma";
import { Attachment } from "@prisma/client";
import { ref } from "firebase/storage";
import { NextResponse } from "next/server";
import { URLSearchParams } from "url";

export const PATCH = async (
  req: Request,
  { params }: { params: { projectId: string } }

) => {
  try {
    const { user } = await validateRequest();
    const updatedValues = await req.json();
    const { projectId } = (await params);

    if (!user) return new NextResponse("Unauthorized", { status: 401 });
    if (!projectId) return new NextResponse("ID is missing", { status: 401 });
    const project = await prisma.project.update({
      where: {
        id: projectId,
        userId: user.id,
      },
      data: {
        ...updatedValues,
      },
    });
    return NextResponse.json(project);
  } catch (error) {
    console.log(`[PROJECT_PATCH] ${error}`);
    return new NextResponse("Internal server error", { status: 500 });
  }
};

//delete project

export const DELETE = async (
  req: Request,
) => {
  try {
    const { user } = await validateRequest();
    const url = new URL(req.url);
    const params = new URLSearchParams(url.search);
    const projectId = params.get('projectId');    

    if (!user) return new NextResponse("Unauthorized", { status: 401 });
    if (!projectId) return new NextResponse("ID is missing", { status: 401 });

    const project = await prisma.project.findUnique({
      where: {
        id: projectId,
        userId: user.id,
      },
      include: {
        attachments: {
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    if (!project) {
      return new NextResponse("project not found", { status: 404 });
    }

    if (project.imageUrl) {
      // delete from Firebase storage
      const storageRef = ref(storage, project.imageUrl);
      await deleteObject(storageRef);
    }

    if (Array.isArray(project.attachments) && project.attachments.length > 0) {
      await Promise.all(
        project.attachments.map(async (attachment: Attachment) => {
          const attachmentStorageRef = ref(storage, attachment.url);
          await deleteObject(attachmentStorageRef);
        })
      );
    }

    await prisma.attachment.deleteMany({
      where: {
        projectId: project.id,
      },
    });

    const deleteproject = await prisma.project.delete({
      where: {
        id: projectId,
        userId: user.id,
      },
    });
    return NextResponse.json(deleteproject);
  } catch (error) {
    console.log(`[PROJECT_DELETE] ${error}`);
    return new NextResponse("Internal server error", { status: 500 });
  }
};
