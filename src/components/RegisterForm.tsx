import { RiSystemCloseCircleFill } from "solid-icons/ri";
import { createSignal, onMount } from "solid-js";
import { RegisterCategory } from "~/models/register.model";
import { pb } from "~/services/pocketbase";
import Modal from "./shared/Modal";

export interface RegisterFormProps {
  close: () => void;
}

export default function RegisterForm(props: RegisterFormProps) {
  const [registerCategories, setRegisterCategories] = createSignal<
    RegisterCategory[]
  >([]);

  const fetchRegisterCategory = async () => {
    const categories = (
      await pb.collection("register_category").getFullList({})
    ).map((register) => {
      return {
        id: register.id,
        label: register.label,
      };
    });

    setRegisterCategories(categories as RegisterCategory[]);
  };

  onMount(() => {
    fetchRegisterCategory();
  });

  return (
    <>
      <Modal>
        <div class="relative w-96 h-96 flex flex-col gap-4 p-4 bg-white shadow rounded">
          <RiSystemCloseCircleFill
            class="absolute text-2xl top-2 right-2 transition-colors duration-100 hover:text-red-600 cursor-pointer"
            onclick={props.close}
          />

          <h2 class="font-semibold text-2xl">Crear nuevo registro</h2>

          <form class="flex flex-col gap-3">
            <div class="flex flex-col gap-2">
              <label>Fecha</label>
              <input
                type="date"
                class="border px-2 py-1 rounded shadow outline-none"
              />
            </div>

            <div class="flex flex-col gap-2">
              <label>Descripción</label>
              <input
                type="text"
                class="border px-2 py-1 rounded shadow outline-none"
              />
            </div>

            <div class="flex flex-col gap-2">
              <label>Categoría</label>
              <select class="border px-2 py-1 rounded shadow outline-none">
                {registerCategories().map((cat) => {
                  return <option value={cat.id}>{cat.label}</option>;
                })}
              </select>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}
