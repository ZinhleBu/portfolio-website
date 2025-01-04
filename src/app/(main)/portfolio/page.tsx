/** @format */

import H1 from "@/components/ui/h1";
import { CategoriesList } from "@/components/CategoriesList";
import { PageContent } from "@/components/PageContent";
import { validateRequest } from "@/auth";
import { getProjects } from "../../../actions/get-projects";
import prisma from "@/lib/prisma";
interface SearchProps {
  searchParams: Promise<{
    title: string;
    categoryId: string;
  }>;
}
const PortfolioPage = async ({ searchParams }: SearchProps) => {
  const resolvedSearchParams = await searchParams;

  const categories = await prisma.category.findMany({
    
    orderBy: {
      name: "asc",
    },
  });
  const user = await validateRequest();
  const projects = await getProjects({
    ...resolvedSearchParams,
  });
  return (
    <div className="w-full min-w-0 space-y-5">
      {" "}
      <div className="flex flex-col m-auto items-center justify-center gap-5 pt-9">
        <H1 className=" text-5xl md:text-6xl  font-medium text-center max-w-[64rem]">
          <span>Discover My Creative Projects</span>
        </H1>
        <p className="font-light text-center">
          Check Out Some of My Latest Projects. Unveilling Innovation,
          Creativity and Excellence.
        </p> 
        <div className="p-6 overflow-x-hidden">
          <CategoriesList categories={categories} />
          <PageContent projects={projects} userId={user.user?.id ?? null} />
        </div>
      </div>
    </div>
  );
};

export default PortfolioPage;
