/// <reference types="astro/client" />

type CourseBasicData = {
  code: string;
  name: string;
  description?: string;
};

type CourseMeta = CourseBasicData & {
  requirements: string[];
  unlocks: string[];
};

type PensumMeta = Array<{
  semester: number;
  courses: CourseMeta[];
}>;

type Course = {
  code: string;
  name: string;
  semester: number;
  description?: string;
  depends?: string[];
};
