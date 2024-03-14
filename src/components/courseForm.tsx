import { addCourse } from "../stores/courses";
import { useRef, useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { z } from "astro:content";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorMessage } from "@/components/ErrorMessage";
import ComboboxDemo from "./ComboboxCourses";
import { Textarea } from "./ui/textarea";

type SelectedCourse = {
  code: string;
  name: string;
};

const courseSchema = z.object({
  code: z
    .string()
    .min(1, "No puede estar vacio")
    .max(10, "Debe ser menor a 10 caracteres"),
  name: z.string().min(1, "No puede estar vacio"),
  description: z.string(),
  semester: z
    .number({ invalid_type_error: "Debe ser un numero" })
    .max(20, "No debe ser mayor a 20"),
  depends: z.array(z.string()),
});
type CourseSchema = z.infer<typeof courseSchema>;
const defaultValues: CourseSchema = {
  code: "",
  name: "",
  description: "",
  semester: 1,
  depends: [],
};

function CourseForm() {
  const {
    register,
    handleSubmit,
    control,
    reset: RHFreset,
    formState: { errors },
  } = useForm<CourseSchema>({
    defaultValues,
    resolver: zodResolver(courseSchema),
  });
  const selectRef = useRef<{ reset: () => void }>(null);

  const reset = () => {
    RHFreset();
    selectRef.current?.reset();
  };

  const onCreateCourse = (data: CourseSchema) => {
    const result = courseSchema.safeParse(data);
    console.log(data);
    try {
      if (!result.success) {
        throw new Error("datos invalidos");
      }
      addCourse(result.data);
      reset();
    } catch (error) {
      if (error instanceof Error) alert(error.message);
      else console.error(error);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onCreateCourse)}>
      <div className="grid grid-cols-4 gap-x-2 gap-y-4 py-2">
        <div className="col-span-1 grid gap-1.5">
          <Label htmlFor="code">Code</Label>
          <Input id="code" {...register("code")} />
          <ErrorMessage errors={errors} name="code" />
        </div>
        <div className="col-span-1 grid gap-1.5">
          <Label htmlFor="semester">Semester</Label>
          <Input
            id="semester"
            {...register("semester", {
              valueAsNumber: true,
              validate: (value) => value > 0,
            })}
          />
          <ErrorMessage errors={errors} name="semester" />
        </div>
        <div className="col-span-2 grid gap-1.5 grid-cols-1">
          <Label htmlFor="name">Name</Label>
          <Input id="name" {...register("name")} />
          <ErrorMessage errors={errors} name="name" />
        </div>
        <div className="col-span-4 grid gap-1.5 grid-cols-1">
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" {...register("description")} />
          <ErrorMessage errors={errors} name="description" />
        </div>
        <div className="col-span-4 grid gap-1.5 grid-cols-1">
          <Label htmlFor="description">Cursos que lo prelan</Label>
          <Controller
            name="depends"
            control={control}
            render={({ field }) => (
              <ComboboxDemo
                ref={selectRef}
                onChange={(val) => field.onChange(val.map((v) => v.code))}
              />
            )}
          />
        </div>
      </div>

      <button className="px-4 py-2 rounded-md bg-purple-600 hover:bg-purple-400 transition duration-200">
        Create
      </button>
    </form>
  );
}

export default CourseForm;
