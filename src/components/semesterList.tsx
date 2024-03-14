import { useStore } from "@nanostores/react";
import { pensumMeta, addSemester, removeSemester } from "../stores/pensum";
import { useState } from "react";
import { ScrollArea } from "./ui/scroll-area";
import { Card } from "./ui/card";

function SemesterList() {
  const pensum = useStore(pensumMeta);
  const [semesterNumber, setSemesterNumber] = useState<number>();

  const onChangeNumber = (val: string) => {
    const number = +val;
    setSemesterNumber(number);
  };

  const onAddSemester = () => {
    if (!semesterNumber || isNaN(semesterNumber))
      return alert("Invalid semester number");
    try {
      addSemester(semesterNumber);
    } catch (error) {
      if (error instanceof Error) alert(error.message);
    } finally {
      setSemesterNumber(undefined);
    }
  };

  const onRemoveSemester = (semester: number) => {
    removeSemester(semester);
  };

  return (
    <div className="p-2">
      <header className="flex flex-row gap-4 items-center">
        <label
          htmlFor="large-input"
          className="block mb-2 text-lg font-semibold text-white"
        >
          Semester #
        </label>
        <input
          value={semesterNumber || ""}
          onInput={(e) => onChangeNumber(e.currentTarget.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") onAddSemester();
          }}
          type="text"
          maxLength={2}
          className="block w-9 h-9 py-3 text-sm font-semibold text-center rounded-lg focus:ring-primary-500 focus:border-primary-500 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500"
          required
        />
        <button
          onClick={onAddSemester}
          className="px-4 py-2 rounded-md bg-purple-600 hover:bg-purple-400 transition duration-200"
        >
          Add
        </button>
      </header>
      <hr className="my-4" />
      <Card className="w-fit">
        <ScrollArea className="w-96 h-72 pt-6">
          {pensum.map((semester) => (
            <a
              href={`/config/${semester.semester}`}
              className="flex flex-row gap-4 py-4 hover:bg-cyan-600 items-center justify-between px-2"
            >
              <h2>Semester {semester.semester}</h2>
              <button
                onClick={() => onRemoveSemester(semester.semester)}
                className="px-4 py-2 rounded-md bg-purple-600 hover:bg-purple-400 transition duration-200"
              >
                Remove
              </button>
            </a>
          ))}
        </ScrollArea>
      </Card>
    </div>
  );
}

export default SemesterList;
