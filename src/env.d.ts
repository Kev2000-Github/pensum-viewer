/// <reference types="astro/client" />

type CourseBasicData = {
  code: string;
  name: string;
};

type CourseMeta = CourseBasicData & {
  requirements: CourseBasicData[];
  unlocks: CourseBasicData[];
};

type PensumMeta = Array<{
  semester: number;
  courses: CourseMeta[];
}>;
