import * as React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { DayPicker } from "react-day-picker";
import {ptBR} from 'date-fns/locale';
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      locale={ptBR}
      showOutsideDays={showOutsideDays}
      className={cn("p-3 text-white", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0 bg-zinc-950",
        month: "space-y-4 bg-zinc-950",
        caption: "flex justify-center pt-1 relative items-center bg-zinc-950",
        caption_label: "text-sm font-medium bg-zinc-950",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 hover:bg-purple-800"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1 bg-zinc-950",
        head_row: "flex",
        head_cell:
          "text-purple-500 rounded-md w-8 font-normal text-[0.8rem] dark:text-zinc-400  bg-zinc-950",
        row: "flex w-full mt-2  bg-zinc-950",
        cell: cn(
          "relative p-0 text-center  bg-zinc-950 text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-zinc-950 [&:has([aria-selected].day-outside)]:bg-zinc-900 [&:has([aria-selected].day-range-end)]:rounded-r-md dark:[&:has([aria-selected])]:bg-zinc-800 dark:[&:has([aria-selected].day-outside)]:bg-zinc-800/50",
          props.mode === "range"
            ? "[&:has(>.day-range-end)]:rounded-r-sm  bg-zinc-950 [&:has(>.day-range-start)]:rounded-l-sm first:[&:has([aria-selected])]:rounded-l-sm last:[&:has([aria-selected])]:rounded-r-sm "
            : "[&:has([aria-selected])]:rounded-sm bg-zinc-950"
        ),
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-8 w-8 p-0 font-normal aria-selected:bg-purple-700  bg-zinc-950"
        ),
        day_range_start: "day-range-start  bg-zinc-950",
        day_range_end: "day-range-end  bg-zinc-950",
        day_selected:
          "bg-zinc-900 text-zinc-50 hover:bg-zinc-900  bg-zinc-950 hover:text-zinc-50 focus:bg-zinc-900 focus:text-zinc-50 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-50 dark:hover:text-zinc-900 dark:focus:bg-zinc-50 dark:focus:text-zinc-900",
        day_today:
          "bg-purple-800 text-zinc-900  dark:bg-zinc-800 dark:text-zinc-50",
        day_outside:
          "day-outside text-purple-500 opacity-50   bg-zinc-950 aria-selected:bg-zinc-100/50 aria-selected:text-zinc-500 aria-selected:opacity-30 dark:text-zinc-400 dark:aria-selected:bg-zinc-800/50 dark:aria-selected:text-zinc-400",
        day_disabled: "text-zinc-900 opacity-50 dark:text-zinc-400",
        day_range_middle:
          "aria-selected:bg-purple-600 aria-selected:text-zinc-300 dark:aria-selected:bg-zinc-800 dark:aria-selected:text-zinc-50",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => <ChevronLeftIcon className="h-4 w-4" />,
        IconRight: ({ ...props }) => <ChevronRightIcon className="h-4 w-4" />,
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
