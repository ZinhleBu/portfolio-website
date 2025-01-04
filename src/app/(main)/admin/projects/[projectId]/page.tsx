/** @format */

import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { ArrowLeft, Building2, File, LayoutDashboard, ListChecks } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ProjectPublishAction } from "./_components/project-publish-action";
import { Banner } from "@/components/Banner";
import { IconBadge } from "@/components/IconBadge";
import { TitleForm } from "./_components/title-form";
import { CategoryForm } from "./_components/category-form";
import { ImageForm } from "./_components/image-form";
import { TagsForm } from "./_components/tags-form";
import { ProjectDescription } from "./_components/project-description";
import { AttachmentsForm } from "@/components/attachments-form";

interface ProjectDetailsPageProps {
  params: { projectId: string };
}
const ProjectDetailsPage = async (  { params }: { params: Promise<{ projectId: string }> }) => {
 
  const projectId = (await params).projectId; 
  //verify if the id is valid
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

  const categories = await prisma.category.findMany({
    orderBy: {
      name: "asc",
    },

  });


  if (!project) {
    return redirect("/admin/projects");
  }
  const requiredFields = [
    project.title,
    project.description,
    project.imageUrl,
    project.categoryId,
    project.tags,
    
  ];
  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;
  const completedText = `${completedFields} / ${totalFields}`;
  const isComplete = requiredFields.every(Boolean);

  return (
    <div className="p-6 w-full">
      <Link href="/admin/projects">
        <div className="flex items-center gap-3 text-sm text-neutral-500">
          <ArrowLeft className="w-4 h-4 " />
          Back
        </div>
      </Link>
      <div className="flex items-center justify-between my-4">
        <div className="flex flex-col gap-y-2 ">
          <h1 className="text-2xl font-medium"> Project Setup</h1>
          <span className="text-sm text-neutral-500">
            Complete All Fields {completedText}
          </span>
        </div>
        <ProjectPublishAction
          disabled={!isComplete}
          projectId={projectId}
          isPublished={project.isPublished}
        />
      </div>
      {!project.isPublished && (
        <Banner
          variant={"warning"}
          label="This project is unpublished, it will not be displayed in the projects list."
        />
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
        {/* left container */}
        <div>
          <div className="flex items-center gap-x-2">
            <IconBadge icon={LayoutDashboard} />
            <h1 className="text-xl text-neutral-700">Customize your project</h1>
          </div>
          <TitleForm initialData={project} projectId={project.id} />
          <CategoryForm
            initialData={project}
            projectId={project.id}
            options={categories.map((category) => ({
              label: category.name,
              value: category.id,
            }))}
          />

          <ImageForm initialData={project} projectId={project.id} />
        </div>

        {/* right container */}
        <div className="space-y-6 ">
         <div>
          <div className="flex items-center gap-x-2">
           <IconBadge icon={ListChecks} />
           <h2 className="text-xl text-neutral-700">Project Requirements</h2>
           
          </div>
          <TagsForm initialData={project} projectId={project.id}/>
         
         </div> 
    
         <div>
          <div className="flex items-center gap-x-2">
           <IconBadge icon={File} />
           <h2 className="text-xl text-neutral-700">Resources & Attatchments</h2>
           
          </div>
          <AttachmentsForm initialData={project} projectId={project.id} />
         </div> 
        </div>
        {/* description */}

        <div className="col-span-2 ">
         <ProjectDescription initialData={project} projectId={project.id} />
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailsPage;
