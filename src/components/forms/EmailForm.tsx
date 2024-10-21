/** @format */

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { EmailValues, emailSchema } from "../../lib/validations";
import LoadingButton from "../LoadingButton";
import axios from "axios"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
export const EmailForm = () => {
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Rendering the Login Form JSX content
  const methods = useForm<EmailValues>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  });

  const { control, reset, handleSubmit, register } = methods;

  const onSubmitHandler: SubmitHandler<EmailValues> = async (values) => {
    try {
      setSubmitting(true);
    
      const res = await axios.post(
        `/api/emails/contact`,
        values
      );
      setSubmitting(false);
      if (!res.data.error) {
        toast.success("Email sent");
      } else {
        reset({ email: "" });
        const message = "invalid email";
        toast.error(message);
        setError(message);
      }
    } catch (error: any) {
      toast.error(error.message);
      setError(error.message);
    } finally {
      toast.success("Email sent");
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className=" rounded-lg">
        <Form {...methods}>
          <form
            onSubmit={handleSubmit(onSubmitHandler)}
            className="w-full flex gap-4 justify-center items-center"
            noValidate
          >
            <FormField
              control={control}
              {...register("email")}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Enter your email"
                      type="email"
                      className="w-full rounded-md"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <LoadingButton
              className="w-full"
              type="submit"
              disabled={submitting}
              loading={false}
            >
              {submitting ? "loading..." : "Send"}
            </LoadingButton>
          </form>
        </Form>
      </div>
    </>
  );
};
