/** @format */
"use server";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Plus } from "lucide-react";
import Link from "next/link";
import { columns, ProjectsColumns } from "./_components/columns";
import { validateRequest } from "@/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { format } from "date-fns";
const ProjectsPageOverview = async () => {
  const session = await validateRequest();

  if (!session.user) {
    if (!session.user) redirect("/");
  }

  const projects = await prisma.project.findMany({
    where: {
      userId: session.user?.id,
    },
    include: {
      category: true,
    },
    orderBy: {
      createdAt: "desc",
    }
  });

  const formattProjects: ProjectsColumns[] = projects.map((project) => ({
    id: project.id,
    title: project.title,
    category: project.category ? project.category.name : "N/A",
    isPublished: project.isPublished,
    createdAt: project.createdAt
      ? format(project.createdAt.toLocaleDateString(), "MMM do, yyyy")
      : "N/A",
  }));

  return (
    <div className="p-6 w-full">
      <div className="flex items-end justify-end">
        <Link href="/admin/create">
          <Button>
            <Plus className="w-5 h-5 mr-2" />
            New Project
          </Button>
        </Link>
      </div>
      {/* data table */}
      <div className="mt-6">
        <DataTable columns={columns} data={formattProjects} searchKey="title" />
      </div>
    </div>
  );
};

export default ProjectsPageOverview;
