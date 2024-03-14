import { persistentAtom } from "@nanostores/persistent";

export const courses = persistentAtom<Array<Course>>("courses", [], {
  encode(value) {
    return JSON.stringify(value);
  },
  decode(value) {
    try {
      return JSON.parse(value);
    } catch (err) {
      console.error(err);
      return {};
    }
  },
});

export function getLastSemester() {
  return courses.get().reduce((acc, course) => {
    return Math.max(acc, course.semester);
  }, -1);
}

export function addCourse(newCourse: Course) {
  if (courses.get().find((course) => course.code === newCourse.code)) {
    throw new Error("Course already exists");
  }
  const newCourses = [...courses.get(), newCourse];
  courses.set(newCourses);
}

export function removeCourse(code: string) {
  const newCourses = courses.get().filter((course) => course.code !== code);
  courses.set(newCourses);
}

export function clear() {
  courses.set([]);
}
