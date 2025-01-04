/** @format */

"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import getGenerativeAIResponse from "@/scripts/aistudio";
import { zodResolver } from "@hookform/resolvers/zod";
import { Project } from "@prisma/client";
import axios from "axios";
import { Lightbulb, Loader2, Pencil, X } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { object, z } from "zod";

interface TagsFormProps {
  initialData: Project;
  projectId: string;
}

const formSchema = z.object({
  tags: z.array(z.string()).min(1),
});

export const TagsForm = ({ initialData, projectId }: TagsFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [isPrompting, setIsPrompting] = useState(false);
  const [projectTags, setProjectTags] = useState<string[]>(initialData?.tags);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.patch(`/api/projects/${projectId}`, values);
      toast.success("Project updated");
      toggleEditting();
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const toggleEditting = () => setIsEditing((current) => !current);

  const handlePromtGeneration = async () => {
    try {
      setIsPrompting(true);
      const project_tags = `Generate an array of top 5 keywords related to my personal project: "${prompt}". These keywords should encompass various aspects of the project, including skills, responsibilities, tools, and technologies commonly associated with it. Aim for a diverse set of keywords that accurately represent the breadth of the project. Your output should be a list/array of keywords. Just return me the array alone.`;
      await getGenerativeAIResponse(project_tags).then((data) => {
        //check if data is an array
        if (Array.isArray(JSON.parse(data))) {
          setProjectTags((prevTags) => [...prevTags, ...JSON.parse(data)]);
        }
        setIsPrompting(false);
      });
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong...");
    }
  };
  const handleTagRemove = (index: number) => {
    const updatedTags = [...projectTags];
    updatedTags.splice(index, 1);
    setProjectTags(updatedTags);
  };
  return (
    <div className="mt-6 border bg-neutral-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between text-black">
        Project Tags
        <Button onClick={toggleEditting} variant={"ghost"}>
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="w-4 h-4 mr-2" />
              Edit
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <div className="flex items-center flex-wrap gap-2 my-2">
          {initialData.tags.length > 0 ? (
            initialData.tags.map((tag, index) => (
              <div
                key={index}
                className="text-xs flex items-center gap-1 whitespace-nowrap py-1 px-2 rounded-md bg-blue-100"
              >
                {tag}
              </div>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">No tags</p>
          )}
        </div>
      )}
      {isEditing && (
        <>
          <div className="flex items-center gap-2 my-2">
            <input
              type="text"
              placeholder="e.g 'Full-Stack Developer'"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full p-2 rounded-md"
            />
            {isPrompting ? (
              <>
                <Button>
                  <Loader2 className="w-4 h-4 animate-spin" />
                </Button>
              </>
            ) : (
              <>
                <Button onClick={handlePromtGeneration}>
                  <Lightbulb className="w-4 h-4" />
                </Button>
              </>
            )}
          </div>
          <p className="text-sm text-muted-foreground text-right">
            Note: Profession name alone is not enough to genetate tags.
          </p>
          <div className="flex items-center gap-2 flex-wrap">
            {projectTags.length > 0 ? (
              projectTags.map((tag, index) => (
                <div
                  className="text-xs flex items-center gap-1 whitespace-nowrap py-1 px-2 rounded-md bg-blue-100 "
                  key={index}
                >
                  {tag}
                  {isEditing && (
                    <Button
                      variant={"ghost"}
                      className="h-auto p-0"
                      onClick={() => handleTagRemove(index)}
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  )}
                </div>
              ))
            ) : (
              <p>No tags yet</p>
            )}
          </div>
          <div className="flex items-center gap-2 justify-end">
            <Button
              type="button"
              variant={"outline"}
              onClick={() => {
                setProjectTags([]);
                onSubmit({ tags: [] });
              }}
              disabled={isSubmitting}
            >
              Clear all
            </Button>
            <Button
              type="submit"
              onClick={() => onSubmit({ tags: projectTags })}
              disabled={isSubmitting}
            >
              Save
            </Button>
          </div>
        </>
      )}
    </div>
  );
};
