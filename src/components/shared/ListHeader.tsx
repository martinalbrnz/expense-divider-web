import { addMonths, format, subMonths } from "date-fns";
import {
  RiArrowsArrowLeftCircleLine,
  RiArrowsArrowRightCircleLine,
  RiDesignGridFill,
  RiEditorListCheck,
} from "solid-icons/ri";
import { JSX, Show } from "solid-js";

export interface HeaderProps {
  selectedDate?: number;
  setSelectedDate?: (n: number) => void;
  takeItems?: number;
  setTakeItems?: (n: number) => void;
  gridView?: boolean;
  setGridView?: (b: boolean) => void;
  children?: JSX.Element;
}

const ListHeader = (props: HeaderProps) => {
  const takeOptions = [5, 10, 20, 50];

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
      <div
        class="flex items-center justify-between gap-2
        bg-primary-300 dark:bg-primary-950 text-gray-800 dark:text-gray-300
        p-4 rounded shadow"
      >
        <Show when={props.selectedDate}>
          <div class="flex items-center justify-center gap-3">
            <RiArrowsArrowLeftCircleLine
              onclick={previousMonth}
              class="cursor-pointer text-2xl rounded-full"
            />
            <input
              type="month"
              class="px-2 py-1 rounded outline-none shadow
                bg-gray-100 dark:bg-gray-700"
              value={formatSelectedDate(props.selectedDate!)}
              onChange={handleSelectedDateChange}
            />
            <RiArrowsArrowRightCircleLine
              onclick={nextMonth}
              class="cursor-pointer text-2xl rounded-full"
            />
          </div>
        </Show>

        <Show when={props.takeItems}>
          <select
            class="px-2 py-1 rounded outline-none shadow
                bg-gray-100 dark:bg-gray-700"
          >
            {takeOptions.map((opt) => {
              return (
                <option onClick={() => props.setTakeItems!(opt)}>
                  {opt} por página
                </option>
              );
            })}
          </select>
        </Show>

        <Show when={props.gridView !== undefined}>
          <div class="flex rounded bg-gray-500 p-0 text-gray-200 cursor-pointer">
            <div
              class="flex items-center text-3xl justify-center rounded-s"
              classList={{ "bg-primary-700": !props.gridView }}
              onclick={() => props.setGridView!(false)}
            >
              <RiEditorListCheck />
            </div>

            <div
              class="flex items-center text-3xl justify-center rounded-e"
              classList={{
                "bg-primary-700": props.gridView,
              }}
              onclick={() => props.setGridView!(true)}
            >
              <RiDesignGridFill />
            </div>
          </div>
        </Show>

        <Show when={props.children}>{props.children}</Show>
      </div>
    </>
  );
};

export default ListHeader;
