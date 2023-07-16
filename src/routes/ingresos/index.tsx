import PocketBase from "pocketbase";
import { For, Show, createSignal, onMount } from "solid-js";
import { Title } from "solid-start";
import { useIncomes } from "~/components/contexts/incomes";
import Paginator, { PaginatorData } from "~/components/shared/Paginator";

const Ingresos = () => {
  const [incomes, { setIncomes }]: any = useIncomes();
  const pb = new PocketBase(import.meta.env.VITE_API_URL);
  const [paginatorData, setPaginatorData] = createSignal<PaginatorData>({
    page: 1,
    perPage: 10,
  });

  const fetchRecords = async (pagination: PaginatorData) => {
    const records = await pb
      .collection("income")
      .getList(pagination.page, pagination.perPage, {
        expand: "user_id,category_id",
        sort: "-date",
      });

    const { page, perPage, totalItems, totalPages, items } = records;
    setPaginatorData({
      page,
      perPage,
      totalItems,
      totalPages,
    });
    setIncomes(items);
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
      <Title>Ingresos</Title>

      <div class="flex flex-col gap-4 m-4">
        <Show
          when={incomes().length > 0}
          fallback={
            <div class="p-4 m-4">
              <span>No hay registros</span>
            </div>
          }
        >
          <div class="flex flex-col gap-2 bg-gray-200 p-4 rounded shadow">
            <For each={incomes()}>
              {(income, i) => (
                <div class="flex gap-4 items-center justify-between py-2 px-4 bg-white rounded shadow-sm hover:shadow transition-all duration-200">
                  <div class="rounded-full overflow-hidden">
                    <img
                      src={pb.getFileUrl(
                        income.expand.user_id,
                        income.expand.user_id.avatar,
                        { thumb: "100x100" }
                      )}
                      alt={income.expand.user_id.username}
                      width={50}
                      height={50}
                    />
                  </div>
                  <div class="flex flex-1 flex-col sm:flex-row items-center justify-between">
                    <div class="flex flex-col gap-1 align-start justify-start sm:justify-center w-full">
                      <span class="text-sm">
                        {new Date(income.date).toLocaleString().split(",")[0]}
                      </span>
                      <span>
                        ({income.expand.category_id.label}) {income.description}
                      </span>
                    </div>
                    <div class="flex items-center justify-start sm:justify-between w-full sm:w-28 text-xl ">
                      <span>$</span>
                      <span>{income.amount.toFixed(2)}</span>
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

export default Ingresos;
