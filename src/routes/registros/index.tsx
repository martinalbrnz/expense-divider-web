import { endOfMonth, format, startOfMonth } from "date-fns";
import { RiSystemAddCircleFill } from "solid-icons/ri";
import { For, Show, createEffect, createSignal, on } from "solid-js";
import { Title } from "solid-start";
import RegisterForm from "~/components/RegisterForm";
import { useRegisters } from "~/components/contexts/registers";
import ListHeader from "~/components/shared/ListHeader";
import Paginator, { PaginatorData } from "~/components/shared/Paginator";
import { pb } from "~/services/pocketbase";

const Registros = () => {
  const [registers, { setRegisters }]: any = useRegisters();

  const [showForm, setShowForm] = createSignal<boolean>(true);
  const [selectedDate, setSelectedDate] = createSignal(Date.now());
  const [paginatorData, setPaginatorData] = createSignal<PaginatorData>({
    page: 1,
    perPage: 10,
  });

  const fetchRecords = async (pagination: PaginatorData) => {
    const records = await pb
      .collection("registers")
      .getList(pagination.page, pagination.perPage, {
        filter: `
        date >= "${format(startOfMonth(selectedDate()), "yyyy-MM-dd")}"
        && date <= "${format(endOfMonth(selectedDate()), "yyyy-MM-dd")}"`,
        expand: "user_id,category",
        sort: "-date",
      });

    const { page, perPage, totalItems, totalPages, items } = records;
    setPaginatorData({
      page,
      perPage,
      totalItems,
      totalPages,
    });
    setRegisters(items);
  };

  const setPage = (page: number) => {
    if (page === paginatorData().page) return;
    setPaginatorData({ ...(paginatorData() as PaginatorData), page });
    fetchRecords({ page, perPage: paginatorData().perPage });
  };

  const setPerPage = (perPage: number) => {
    if (perPage === paginatorData().perPage) return;
    setPaginatorData({ ...(paginatorData() as PaginatorData), perPage });
    fetchRecords({ page: paginatorData().page, perPage });
  };

  createEffect(
    on(selectedDate, () => {
      fetchRecords(paginatorData());
    })
  );

  return (
    <>
      <Title>Registros</Title>

      <div class="flex flex-col gap-4 m-4 text-gray-800 dark:text-gray-300">
        <ListHeader
          selectedDate={selectedDate()}
          setSelectedDate={(date: number) => setSelectedDate(date)}
        />
        <Show
          when={registers().length > 0}
          fallback={
            <div class=" p-4 m-4">
              <span>No hay registros</span>
            </div>
          }
        >
          <div
            class="flex flex-col gap-2
              bg-gray-200 dark:bg-gray-800
              p-4 rounded shadow"
          >
            <For each={registers()}>
              {(register) => (
                <div class="flex gap-4 items-center justify-between py-2 px-4 bg-white dark:bg-gray-600 rounded shadow-sm hover:shadow transition-all duration-200">
                  <div class="rounded-full overflow-hidden">
                    <img
                      src={pb.getFileUrl(
                        register.expand.user_id,
                        register.expand.user_id.avatar,
                        { thumb: "100x100" }
                      )}
                      alt={register.expand.user_id.username}
                      width={50}
                      height={50}
                    />
                  </div>
                  <div class="flex flex-1 flex-col sm:flex-row items-center justify-between">
                    <div class="flex flex-col gap-1 align-start justify-start sm:justify-center w-full">
                      <span class="text-sm">
                        {new Date(register.date).toLocaleString().split(",")[0]}
                      </span>
                      <span>
                        ({register.expand.category.label}){" "}
                        {register.description}
                      </span>
                    </div>
                    <div
                      class="flex items-center justify-start sm:justify-between w-full sm:w-40 text-xl"
                      classList={{
                        "text-green-600": register.type === "income",
                        "text-red-500": register.type === "expense",
                      }}
                    >
                      <span>$</span>
                      <span>
                        {register.type === "expense" && "-"}
                        {new Intl.NumberFormat("es", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        }).format(register.amount)}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </For>
          </div>
        </Show>

        <Show
          when={paginatorData().totalPages && paginatorData().totalPages! >= 2}
        >
          <Paginator
            data={paginatorData()}
            setPage={setPage}
            setPerPage={setPerPage}
          />
        </Show>

        <div
          class="absolute right-6 bottom-[34px]
            flex items-center justify-center text-4xl
            rounded-full w-12 h-12 shadow-lg
            bg-green-600 text-gray-200 cursor-pointer"
        >
          <Show when={showForm()}>
            <RegisterForm close={() => setShowForm(false)} />
          </Show>
          <RiSystemAddCircleFill onclick={() => setShowForm((show) => !show)} />
        </div>
      </div>
    </>
  );
};

export default Registros;
