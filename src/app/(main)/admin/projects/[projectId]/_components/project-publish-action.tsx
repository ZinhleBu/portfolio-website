/** @format */

"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface ProjectPublishActionProps {
  disabled: boolean;
  projectId: string;
  isPublished: boolean;
}

export const ProjectPublishAction = ({
  disabled,
  projectId,
  isPublished,
}: ProjectPublishActionProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const onClick = async () => {
    try {
      setIsLoading(true);
      if (isPublished) {
        // unpublish job
        await axios.patch(`/api/projects/${projectId}/unpublish`);
        toast.success("Project unpublished");
      } else {
        // publish job
        await axios.patch(`/api/projects/${projectId}/publish`);
        toast.success("Project published");
      }
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
      console.log((error as Error)?.message);
    } finally {
      setIsLoading(false);
    }
  };
  const onDelete = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/projects/${projectId}`);
      toast.success("Projects deleted");
      router.refresh();
      return router.push("/admin/projects");
    } catch (error) {
      toast.error("Something went wrong");
      console.log((error as Error)?.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex items-center gap-x-3 ">
      <Button
        variant={"outline"}
        disabled={isLoading}
        size={"sm"}
        onClick={onClick}
      >
        {isPublished ? "Unpublish" : "Publish"}{" "}
      </Button>
      <Button
        variant={"destructive"}
        size={"icon"}
        disabled={isLoading}
        onClick={onDelete}
      >
        <Trash className="w-4 h-4" />
      </Button>
    </div>
  );
};
