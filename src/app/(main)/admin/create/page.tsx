/** @format */

"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import H1 from "@/components/ui/h1";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
const formSchema = z.object({
  title: z.string().min(1, { message: "Job title is required." }),
});
const ProjectCreatePage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;
  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      const response = await axios.post("/api/projects", values);
      router.push(`/admin/projects/${response.data.id}`);
      toast.success("Project submitted");
    } catch (error) {
      console.log((error as Error)?.message);
      //toast notification
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-5xl flex flex-col ">
      <div>
        <H1 className="text-2xl">Create Project</H1>
        <p className="text-sm text-neutral-500">
          What would you like to name your project?
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project Title</FormLabel>
                <FormControl>
                  <Input
                    disabled={isSubmitting}
                    placeholder="e.g 'Job board ux'"
                    {...field}
                  />
                </FormControl>
                <FormDescription>Role of this project.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center gap-x-2">
            <Link href="/admin/projects">
              <Button type="button" variant={"ghost"}>
                Cancel
              </Button>
            </Link>
            <Button type="submit" disabled={isSubmitting || !isValid}>
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ProjectCreatePage;
