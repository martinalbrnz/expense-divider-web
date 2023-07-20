import { RiDesignGridFill, RiEditorListCheck } from "solid-icons/ri";
import { Show } from "solid-js";

export interface HeaderProps {
  selectedDate?: Date;
  gridView?: boolean;
  setGridView?: (b: boolean) => void;
}

const ListHeader = (props: HeaderProps) => {
  return (
    <>
      <div class="flex items-center justify-between gap-2 bg-gray-200 dark:bg-gray-800 p-4 rounded shadow">
        <Show when={props.selectedDate}>
          <input type="month" class="px-2 py-1 rounded outline-none" />
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
