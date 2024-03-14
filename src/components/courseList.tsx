import { useStore } from "@nanostores/react";
import { courses, removeCourse } from "../stores/courses";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMounted } from "@/hooks/use-mounted";

function CourseList() {
  const allCourses = useStore(courses);
  const mounted = useMounted();

  if (!mounted) return null;

  return (
    <ScrollArea className="w-96 h-60">
      {allCourses.reverse().map((course) => (
        <div
          key={course.code}
          className="flex flex-row gap-4 py-4 hover:bg-cyan-600 items-center justify-between px-2"
        >
          <div>
            <h2 className="text-lg font-semibold">{course.name}</h2>
            <h3 className="text-base font-light dark:text-gray-400">
              {course.code}
            </h3>
          </div>
          <button
            onClick={() => removeCourse(course.code)}
            className="px-4 py-2 rounded-md bg-purple-600 hover:bg-purple-400 transition duration-200"
          >
            Remove
          </button>
        </div>
      ))}
    </ScrollArea>
  );
}

export default CourseList;
