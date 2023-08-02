import { format } from "date-fns";
import { Show, createSignal, onMount } from "solid-js";
import { A, useParams } from "solid-start";
import RegisterForm from "~/components/RegisterForm";
import { RoutesEnum } from "~/constants/routes";
import { RegisterRecord } from "~/models/register.model";
import { currency } from "~/pipes/currency";
import { pb } from "~/services/pocketbase";

export default function ItemRegistro() {
  const params = useParams();
  const [register, setRegister] = createSignal<RegisterRecord>();
  const [openModal, setOpenModal] = createSignal<boolean>(false);

  const fetchItem = async () => {
    const record: RegisterRecord = await pb
      .collection("registers")
      .getOne(params.id, {
        expand: "user_id,category",
      });

    setRegister(record);
  };

  const editRegister = () => {
    setOpenModal(true);
  };

  const deleteRegister = async () => {
    await pb.collection("registers").delete(params.id);
  };

  const closeModal = (refresh?: boolean) => {
    if (refresh) {
      fetchItem();
    }
    setOpenModal(false);
  };

  onMount(() => fetchItem());

  return (
    <>
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
				bg-primary-300 dark:bg-primary-950
				p-4 rounded shadow"
          >
            <div class="flex gap-2 items-center justify-between px-8">
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
                  {format(
                    new Date(register()!.date).getTime() +
                      (new Date(register()!.date).getTimezoneOffset() + 1) *
                        1000 *
                        60,
                    "dd/MM/yyyy"
                  )}
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
                    {currency(register()!.amount)}
                  </span>
                </div>
              </div>
            </div>

            <div class="flex flex-col justify-between px-4">
              <Show when={register()!.created}>
                <div
                  class="flex items-center justify-between px-4 py-1
              border-b border-gray-300 dark:border-gray-500 last-of-type:border-b-0"
                >
                  <span>Creado: </span>
                  <span class="font-semibold">
                    {format(new Date(register()!.created), "hh:mm dd/MM/yyyy")}
                  </span>
                </div>
              </Show>

              <Show when={register()!.updated !== register()!.created}>
                <div
                  class="flex items-center justify-between px-4 py-1
              border-b border-gray-300 dark:border-gray-500 last-of-type:border-b-0"
                >
                  <span>Editado: </span>
                  <span class="font-semibold">
                    {format(new Date(register()!.updated), "hh:mm dd/MM/yyyy")}
                  </span>
                </div>
              </Show>

              <div
                class="flex items-center justify-between px-4 py-1
            border-b border-gray-300 dark:border-gray-500 last-of-type:border-b-0"
              >
                <span>Categoría: </span>
                <span class="font-semibold">
                  {register()!.expand.category.label}
                </span>
              </div>

              <div
                class="flex items-center justify-between px-4 py-1
            border-b border-gray-300 dark:border-gray-500 last-of-type:border-b-0"
              >
                <span>Descripción: </span>
                <span class="font-semibold">{register()!.description}</span>
              </div>
            </div>
          </div>
        </Show>

        <div
          class="flex items-center justify-evenly
          bg-primary-300 dark:bg-primary-950 text-gray-300
          p-4 rounded shadow"
        >
          <A
            href={`/${RoutesEnum.Registers}`}
            class="bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-300 px-4 py-1 rounded shadow font-medium"
          >
            Volver
          </A>
          <div class="flex gap-2">
            <button
              onclick={deleteRegister}
              class="bg-red-600 px-4 py-1 rounded shadow font-medium w-24"
            >
              Eliminar
            </button>

            <button
              onclick={editRegister}
              class="bg-primary-500 dark:bg-primary-800 px-4 py-1 rounded shadow font-medium w-24"
            >
              Editar
            </button>
          </div>
        </div>
      </div>

      <Show when={openModal()}>
        <RegisterForm close={closeModal} registerForEdit={register()!} />
      </Show>
    </>
  );
}
