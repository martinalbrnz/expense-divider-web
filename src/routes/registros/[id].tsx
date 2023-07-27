import { format } from "date-fns";
import { Show, createSignal, onMount } from "solid-js";
import { useParams } from "solid-start";
import { UserRecord } from "~/models/authUser.model";
import { CategoryRecord } from "~/models/category.model";
import { RegisterType } from "~/models/register.model";
import { pb } from "~/services/pocketbase";

export interface RegisterRecord {
  amount: number;
  category: string;
  collectionId: string;
  collectionName: string;
  created: Date;
  date: Date;
  description: string;
  expand: { user_id: UserRecord; category: CategoryRecord };
  id: string;
  receipt_url?: string;
  type: RegisterType;
  updated: Date;
  user_id: string;
}

export default function ItemRegistro() {
  const params = useParams();
  const [register, setRegister] = createSignal<RegisterRecord>();

  const fetchItem = async () => {
    const record: RegisterRecord = await pb
      .collection("registers")
      .getOne(params.id, {
        expand: "user_id,category",
      });

    console.log({ ...record });

    setRegister(record);
  };

  onMount(() => fetchItem());
  return (
    <div class="flex flex-col gap-4 m-4 text-gray-800 dark:text-gray-300">
      <Show
        when={register()}
        fallback={
          <div class="p-4 m-4">
            <span>Registro no encontrado</span>
          </div>
        }
      >
        <div
          class="flex flex-col gap-8
				bg-gray-200 dark:bg-gray-800
				p-4 rounded shadow"
        >
          <div class="flex gap-2 items-center justify-between">
            <div class="flex flex-col gap-1 items-center justify-center">
              <div class="rounded-full overflow-hidden">
                <Show when={register()!.expand.user_id.avatar}>
                  <img
                    src={pb.getFileUrl(
                      register()!.expand.user_id,
                      register()!.expand.user_id.avatar!,
                      { thumb: "100x100" }
                    )}
                    alt={register()!.expand.user_id.username}
                    width={100}
                    height={100}
                  />
                </Show>
              </div>
              <span>{register()?.expand.user_id.name}</span>
            </div>

            <div class="flex flex-col gap-6 items-end justify-between">
              <span>
                {new Date(register()!.date).toLocaleString().split(",")[0]}
              </span>

              <div
                class="flex items-center justify-start sm:justify-between w-full sm:w-40 text-xl"
                classList={{
                  "text-green-600": register()!.type === "income",
                  "text-red-500": register()!.type === "expense",
                }}
              >
                <span>$</span>
                <span>
                  {register()!.type === "expense" && "-"}
                  {new Intl.NumberFormat("es", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }).format(register()!.amount)}
                </span>
              </div>
            </div>
          </div>

          <div class="flex justify-between">
            <div class="flex flex-col items-start gap-2 italic">
              <Show when={register()!.created}>
                <span>
                  Creado:{" "}
                  <span class="font-semibold">
                    {format(new Date(register()!.created), "hh:mm dd/MM/yyyy")}
                  </span>
                </span>
              </Show>

              <Show when={register()!.updated !== register()!.created}>
                <span>
                  Editado:{" "}
                  <span class="font-semibold">
                    {format(new Date(register()!.updated), "hh:mm dd/MM/yyyy")}
                  </span>
                </span>
              </Show>

              <span>
                Categoría:{" "}
                <span class="font-semibold">
                  {register()!.expand.category.label}
                </span>
              </span>

              <span>
                Descripción:{" "}
                <span class="font-semibold">{register()!.description}</span>
              </span>
            </div>
          </div>
        </div>
      </Show>
    </div>
  );
}
