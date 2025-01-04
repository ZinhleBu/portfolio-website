import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma"
import { redirect } from "next/navigation";

interface ProjectDetailsPageProps {
    params: { projectId: string };
  }

const ProjectPage = async (  { params }: { params: Promise<{ projectId: string }> }) => {

    const projectId = (await params).projectId; 
  const validprojectIdRegex = /^c[^\s]{24}$/;

  if (!validprojectIdRegex.test(projectId)) {
    return redirect("/admin/projects");
  }
  const userId = await validateRequest();
  if (!userId) {
    return redirect("/");
  }
  const project = await prisma.project.findUnique({
    where: {
      id: projectId,
      userId: userId.user?.id,
    },
    include: {
      attachments: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
   
  });
  return (
    <div>

        <h1>{project?.title}</h1>
    </div>
  )
}
export default ProjectPage;
