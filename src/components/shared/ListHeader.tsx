import { addMonths, format, subMonths } from "date-fns";
import {
  RiArrowsArrowLeftCircleLine,
  RiArrowsArrowRightCircleLine,
  RiDesignGridFill,
  RiEditorListCheck,
} from "solid-icons/ri";
import { Show } from "solid-js";

export interface HeaderProps {
  selectedDate?: number;
  setSelectedDate?: (d: number) => void;
  gridView?: boolean;
  setGridView?: (b: boolean) => void;
}

const ListHeader = (props: HeaderProps) => {
  const formatSelectedDate = (date: number): string => {
    return format(date, "yyyy-MM");
  };

  const handleSelectedDateChange = (e: Event) => {
    e.preventDefault();
    const MS_IN_MINUTE = 1000 * 60;

    if (props.setSelectedDate) {
      // To avoid strange Timezone bugs (:
      const offset = new Date(
        (e?.target as HTMLInputElement).value
      ).getTimezoneOffset();
      const correction = offset >= 0 ? (offset + 1) * MS_IN_MINUTE : 0;

      props.setSelectedDate(
        new Date((e?.target as HTMLInputElement).value).getTime() + correction
      );
    }
  };

  const previousMonth = () => {
    props.setSelectedDate!(subMonths(props.selectedDate!, 1).getTime());
  };

  const nextMonth = () => {
    props.setSelectedDate!(addMonths(props.selectedDate!, 1).getTime());
  };

  return (
    <>
      <div class="flex items-center justify-between gap-2 bg-gray-200 dark:bg-gray-800 p-4 rounded shadow">
        <Show when={props.selectedDate}>
          <div class="flex items-center justify-center gap-2 ">
            <RiArrowsArrowLeftCircleLine
              onclick={previousMonth}
              class="cursor-pointer text-2xl rounded-full"
            />
            <input
              type="month"
              class="px-2 py-1 rounded outline-none shadow
              bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300"
              value={formatSelectedDate(props.selectedDate!)}
              onChange={handleSelectedDateChange}
            />
            <RiArrowsArrowRightCircleLine
              onclick={nextMonth}
              class="cursor-pointer text-2xl rounded-full"
            />
          </div>
        </Show>

        <Show when={props.gridView !== undefined}>
          <div class="flex rounded bg-gray-500 p-0">
            <div
              class="flex items-center text-3xl justify-center text-gray-200 rounded-s"
              classList={{ "bg-primary-600": !props.gridView }}
              onclick={() => props.setGridView!(false)}
            >
              <RiEditorListCheck />
            </div>

            <div
              class="flex items-center text-3xl justify-center text-gray-200 rounded-e"
              classList={{ "bg-primary-600": props.gridView }}
              onclick={() => props.setGridView!(true)}
            >
              <RiDesignGridFill />
            </div>
          </div>
        </Show>
      </div>
    </>
  );
};

export default ListHeader;
