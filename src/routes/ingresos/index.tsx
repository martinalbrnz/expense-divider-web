import PocketBase from "pocketbase";
import { For, Show, createEffect, onMount } from "solid-js";
import { Title } from "solid-start";
import { useIncomes } from "~/components/contexts/incomes";

const Ingresos = () => {
  const [incomes, { setIncomes }]: any = useIncomes();
  const pb = new PocketBase(import.meta.env.VITE_API_URL);

  const fetchRecords = async () => {
    const records = await pb.collection("income").getFullList({
      expand: "user_id,category_id",
      sort: "-date",
    });
    console.log(records);
    setIncomes(records);
  };

  onMount(() => {
    fetchRecords();
  });

  createEffect(() => {});

  return (
    <>
      <Title>Ingresos</Title>

      <Show when={incomes.length > 0}>
        <div class="flex flex-col gap-2 bg-gray-200 p-4 m-4 rounded shadow">
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
      <Show when={incomes.length < 1}>
        <div class="p-4 m-4">
          <span>No hay registros</span>
        </div>
      </Show>
    </>
  );
};

export default Ingresos;
