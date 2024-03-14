"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useStore } from "@nanostores/react";
import { courses } from "@/stores/courses";
import { useState } from "react";

type SelectedCourse = {
  code: string;
  name: string;
};

interface Props {
  onChange?: (selectedCourses: SelectedCourse[]) => void;
}

const ComboboxDemo = React.forwardRef<{ reset: () => void }, Props>(
  ({ onChange }, ref) => {
    const [selectedCourses, setSelectedCourses] = useState<SelectedCourse[]>(
      []
    );
    const allCourses = useStore(courses);
    const [open, setOpen] = React.useState(false);

    const reset = () => {
      setSelectedCourses([]);
    };

    React.useImperativeHandle(ref, () => ({ reset }));

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className=" justify-between whitespace-normal"
          >
            {selectedCourses.length > 0
              ? selectedCourses.map((course) => course.name).join(", ")
              : "Select Course..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className=" p-0">
          <Command>
            <CommandInput placeholder="Search Course..." />
            <CommandEmpty>No course found.</CommandEmpty>
            <CommandGroup>
              {allCourses.slice(0, 5).map((course: Course) => (
                <CommandItem
                  key={course.code}
                  value={course.code}
                  onSelect={(currentValue) => {
                    let newVal = [...selectedCourses];
                    if (
                      selectedCourses?.some(
                        (v) => v.code.toLocaleLowerCase() === currentValue
                      )
                    ) {
                      newVal = newVal.filter(
                        (v) => v.code.toLocaleLowerCase() !== currentValue
                      );
                    } else {
                      const course = allCourses.find(
                        (v) => v.code.toLowerCase() === currentValue
                      );
                      console.log(currentValue);
                      if (course) newVal = [...selectedCourses, course];
                    }
                    setSelectedCourses(newVal);
                    if (onChange) onChange(newVal);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedCourses.some((v) => v.code === course.code)
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  {course.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    );
  }
);
export default ComboboxDemo;
