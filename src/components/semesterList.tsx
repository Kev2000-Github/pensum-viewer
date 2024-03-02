import { useStore } from "@nanostores/preact";
import {
  pensumMeta,
  addSemester,
  removeSemester,
  isCartOpen,
} from "../stores/pensum";

function SemesterList() {
  const pensum = useStore(pensumMeta);
  const cart = useStore(isCartOpen);

  const onAddSemester = () => {
    const semesters = [...pensum];
    semesters.push({ semester: semesters.length + 1, courses: [] });
    pensumMeta.set(semesters);
  };

  const onRemoveSemester = (semester: number) => {
    const semesters = [...pensum];
    const semesterIndex = semesters.findIndex(
      (obj) => obj.semester === semester
    );
    semesters.splice(semesterIndex, 1);
    pensumMeta.set(semesters);
  };

  return (
    <div class="p-4">
      <header class="flex flex-row gap-4 items-center">
        <h1>Semesters</h1>
        <button
          onClick={onAddSemester}
          class="px-4 py-2 rounded-sm bg-purple-600 hover:bg-purple-400 transition duration-200"
        >
          Add +
        </button>
      </header>
      <ul>
        {pensum.map((semester) => (
          <li class="flex flex-row gap-4 py-4">
            <h2>Semester {semester.semester}</h2>
            <button
              onClick={() => onRemoveSemester(semester.semester)}
              class="px-4 py-2 rounded-sm bg-purple-600 hover:bg-purple-400 transition duration-200"
            >
              Remove -
            </button>
          </li>
        ))}
      </ul>
      <h1>Testing...</h1>
      <button
        onClick={() => isCartOpen.set(!cart)}
        class="px-4 py-2 rounded-sm bg-purple-600 hover:bg-purple-400 transition duration-200"
      >
        Cart Toggle
      </button>
      <div>isCartOpen: {cart ? "true" : "false"}</div>
    </div>
  );
}

export default SemesterList;
