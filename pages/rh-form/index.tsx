import React from "react";
import { Controller, useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { Input } from "antd";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const index = () => {
  const sss = z
    .object({
      userName: z
        .string({ message: "name or email is must" })
        .trim()
        .min(1, { message: "name or email is must" })
        .optional(),
      userEmail: z
        .string({ message: "name or email is must" })
        .trim()
        .min(1, { message: "name or email is must" })
        .optional(),
      storyTime: z.string({ message: "story time is a must" }).trim().min(1, {
        message: "story time is a must",
      }),
    })
    .refine(
      (data) => {
        console.log(data);
        return data.userName || data.userEmail;
      },
      {
        message: "Passwords don't match",
        path: ["sdsadsadad"],
      }
    );

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof sss>>({
    mode: "all",
    resolver: zodResolver(sss),
  });
  function onSubmit(d) {
    console.log("form submitted the valsss");
    console.log(d);
  }
  console.log("errors", errors);
  return (
    <div suppressHydrationWarning>
      <div onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="userName"
          control={control}
          render={({ field }) => <Input {...field} placeholder="userName" />}
        />
        {errors?.userName?.message}

        <Controller
          name="userEmail"
          control={control}
          render={({ field }) => <Input {...field} placeholder="userEmail" />}
        />
        {errors.userEmail?.message}
        <input type="text" {...register("storyTime")} />
        {errors.storyTime?.message}
        <button onClick={handleSubmit((d) => console.log(d))}>submit</button>
      </div>
      <div suppressHydrationWarning>
        <DevTool control={control} />
      </div>
    </div>
  );
};

export default index;
