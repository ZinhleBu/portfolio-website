/** @format */

import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { Attachment } from "@prisma/client";
import { NextResponse } from "next/server";
import { URLSearchParams } from "url";

export const POST = async (
  req: Request,
  { params }: { params: { projectId: string } }

) => {
  try {
    const url = new URL(req.url);
    const { projectId } = (await params);

    const { user } = await validateRequest();

    if (!user) {
      return new NextResponse("Un-Authorized", { status: 401 });
    }

    if (!projectId) {
      return new NextResponse("ID Is missing", { status: 401 });
    }

    const { attachments } = await req.json();

    if (
      !attachments ||
      !Array.isArray(attachments) ||
      attachments.length === 0
    ) {
      return new NextResponse("Invalid Attachment Format", { status: 400 });
    }

    const createdAttachments: Attachment[] = [];

    for (const attachment of attachments) {
      const { url, name } = attachment;

      //   check the attachment with the same url is already exists for this projectId

      const existingAttachment = await prisma.attachment.findFirst({
        where: {
          projectId,
          url,
        },
      });

      if (existingAttachment) {
        // skip the insertion
        console.log(
          `Attachment with URL ${url} already exists for projectId ${projectId}`
        );
        continue;
      }

      // create a new attachment

      const createdAttachment = await prisma.attachment.create({
        data: {
          id: crypto.randomUUID(),
          url,
          name,
          projectId,
        },
      });

      createdAttachments.push(createdAttachment);
    }

    return NextResponse.json(createdAttachments);
  } catch (error) {
    console.log(`[JOB_ATTACHMENT_POST] : ${error}`);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
