import { validateRequest } from "@/auth";
import { storage } from "@/config/firebase.config";
import  prisma from "@/lib/prisma";
import { deleteObject, ref } from "firebase/storage";
import { NextResponse } from "next/server";
import { URLSearchParams } from "url";

export const DELETE = async (
  req: Request,
  { params }: { params: { projectId: string; attachment: string }}
) => {
  try {
    const { user } = await validateRequest();

    const { projectId, attachment } = (await params); 

    if (!user) {
      return new NextResponse("Un-Authorized", { status: 401 });
    }

    if (!projectId || !attachment) { // Make sure both IDs are present
      return new NextResponse("ID Is missing", { status: 401 });
    }

    const foundAttachment = await prisma.attachment.findUnique({
      where: {
        id: attachment, // Use the correct `attachment` variable
      },
    });

    if (!foundAttachment || foundAttachment.projectId !== projectId) {
      return new NextResponse("Attachment not found", { status: 404 });
    }

    // delete from Firebase storage
    const storageRef = ref(storage, foundAttachment.url);
    await deleteObject(storageRef);

    // delete from Prisma
    await prisma.attachment.delete({
      where: {
        id: attachment, // Use the correct `attachment` variable
      },
    });

    return NextResponse.json({ message: "Attachment deleted successfully" });
  } catch (error) {
    console.log(`[ATTACHMENT_DELETE] : ${error}`);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
