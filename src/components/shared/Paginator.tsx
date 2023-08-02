import {
  RiArrowsArrowLeftCircleLine,
  RiArrowsArrowRightCircleLine,
} from "solid-icons/ri";
import { Index, Show } from "solid-js";

export interface PaginatorData {
  page: number;
  perPage: number;
  totalItems?: number;
  totalPages?: number;
}

export interface PaginatorProps {
  data: PaginatorData;
  setPage: (n: number) => void;
  setPerPage: (n: number) => void;
}

const Paginator = (props: PaginatorProps) => {
  const getPages = (page: number, totalPages?: number): number[] => {
    if (!totalPages) return [];

    let pages = new Array(totalPages)
      .fill(null, 0, totalPages)
      .map((_, i) => i + 1);

    if (totalPages > 10) {
      if (page < 7) {
        pages = pages.slice(0, 8);
        pages.push(0);
        pages.push(totalPages);
      } else if (page + 5 >= totalPages) {
        pages = pages.slice(totalPages - 10, totalPages);
        pages.unshift(0);
        pages.unshift(1);
      } else {
        pages = pages.slice(page - 5, page + 4);
        pages.unshift(0);
        pages.unshift(1);
        pages.push(0);
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <Show when={props.data.totalPages && props.data.totalPages >= 2}>
      <div class="flex gap-2 items-center justify-between bg-primary-300 dark:bg-primary-950 text-black dark:text-gray-300 p-4 rounded shadow">
        <div class="flex items-center justify-center w-8 h-8">
          <Show when={props.data.page !== 1}>
            <RiArrowsArrowLeftCircleLine
              onclick={() => props.setPage(props.data.page - 1)}
              class="cursor-pointer text-2xl rounded-full"
            />
          </Show>
        </div>

        <div class="flex flex-1 items-center justify-start gap-1">
          <Index each={getPages(props.data.page, props.data.totalPages)}>
            {(page) => (
              <PageItem data={props.data} i={page()} setPage={props.setPage} />
            )}
          </Index>
        </div>

        <div class="flex items-center justify-center w-8 h-8">
          <Show when={props.data.page !== props.data.totalPages}>
            <RiArrowsArrowRightCircleLine
              onclick={() => props.setPage(props.data.page + 1)}
              class="cursor-pointer text-2xl rounded-full"
            />
          </Show>
        </div>
      </div>
    </Show>
  );
};

interface PageItemProps {
  i: number;
  data: PaginatorData;
  setPage: (n: number) => void;
}

const PageItem = (props: PageItemProps) => {
  return (
    <Show when={props.i !== 0} fallback={<span class="select-none">...</span>}>
      <div
        class="flex items-center justify-center rounded-full w-8 h-8 transition-all duration-200 select-none cursor-pointer hover:shadow font-medium text-black dark:text-gray-300"
        classList={{
          "bg-secondary-300 dark:bg-secondary-700": props.i === props.data.page,
        }}
        onclick={() => props.setPage(props.i)}
      >
        {props.i}
      </div>
    </Show>
  );
};

export default Paginator;
