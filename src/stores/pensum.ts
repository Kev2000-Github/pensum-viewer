import { persistentAtom } from "@nanostores/persistent";
import { atom } from "nanostores";

export const isCartOpen = atom(false);

export const pensumMeta = persistentAtom<PensumMeta>("pensumMeta", [], {
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

export function getSemestersNumber() {
  return pensumMeta.get().length;
}

export function addCourse(course: CourseMeta, semester: number) {
  const pensum = pensumMeta.get();
  const semesterFound = pensum.findIndex(
    (course) => course.semester === semester
  );
  if (semesterFound === -1) return false;
  pensum[semesterFound].courses.push(course);
  pensumMeta.set(pensum);
  return true;
}

export function removeCourse(course: CourseMeta, semester: number) {
  const pensum = pensumMeta.get();
  const semesterFound = pensum.findIndex(
    (course) => course.semester === semester
  );
  if (semesterFound === -1) return false;
  pensum[semesterFound].courses = pensum[semesterFound].courses.filter(
    (course) => course.code !== course.code
  );
  pensumMeta.set(pensum);
  return true;
}

export function addSemester() {
  const pensum = pensumMeta.get();
  pensum.push({ semester: pensum.length + 1, courses: [] });
  pensumMeta.set(pensum);
}

export function removeSemester(semester: number) {
  const pensum = pensumMeta.get();
  pensum.splice(semester - 1, 1);
  pensumMeta.set(pensum);
}

export function clearPensum() {
  pensumMeta.set([]);
}
