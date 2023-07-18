import PocketBase from "pocketbase";
import { For, Show, createSignal, onMount } from "solid-js";
import { Title } from "solid-start";
import { useRegisters } from "~/components/contexts/registers";
import Paginator, { PaginatorData } from "~/components/shared/Paginator";

const Registros = () => {
  const [registers, { setRegisters }]: any = useRegisters();
  const pb = new PocketBase(import.meta.env.VITE_API_URL);
  const [paginatorData, setPaginatorData] = createSignal<PaginatorData>({
    page: 1,
    perPage: 10,
  });

  const fetchRecords = async (pagination: PaginatorData) => {
    const records = await pb
      .collection("registers")
      .getList(pagination.page, pagination.perPage, {
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

  onMount(() => {
    fetchRecords(paginatorData());
  });

  return (
    <>
      <Title>Registros</Title>

      <div class="flex flex-col gap-4 m-4">
        <Show
          when={registers().length > 0}
          fallback={
            <div class="p-4 m-4">
              <span>No hay registros</span>
            </div>
          }
        >
          <div class="flex flex-col gap-2 bg-gray-200 dark:bg-gray-800 p-4 rounded shadow">
            <For each={registers()}>
              {(register, i) => (
                <div class="flex gap-4 items-center justify-between py-2 px-4 bg-white dark:bg-gray-600 rounded shadow-sm hover:shadow transition-all duration-200 text-black dark:text-gray-300">
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
                        "text-red-600": register.type === "outcome",
                      }}
                    >
                      <span>$</span>
                      <span>
                        {register.type === "outcome" && "-"}
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

        <Paginator
          data={paginatorData()}
          setPage={setPage}
          setPerPage={setPerPage}
        />
      </div>
    </>
  );
};

export default Registros;
