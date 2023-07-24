import {
  SubmitHandler,
  createForm,
  minLength,
  required,
} from "@modular-forms/solid";
import { RiSystemCloseCircleFill } from "solid-icons/ri";
import { For, createSignal, onMount } from "solid-js";
import { RegisterCategory, RegisterType } from "~/models/register.model";
import { User } from "~/models/user.model";
import { pb } from "~/services/pocketbase";
import { useCurrentUser } from "./contexts/user";
import Modal from "./shared/Modal";

export interface RegisterFormProps {
  close: () => void;
}

type RegistersForm = {
  date: Date;
  description: string;
  type: RegisterType;
  amount: number;
  user_id: string;
  category: string;
  // receipt?: File;
};

export default function RegisterForm(props: RegisterFormProps) {
  const [currentUser] = useCurrentUser();
  const [registersForm, { Form, Field }] = createForm<RegistersForm>();

  const [registerCategories, setRegisterCategories] = createSignal<
    RegisterCategory[]
  >([]);
  const [users, setUsers] = createSignal<Record<string, User>[]>([]);

  const fetchRegisterCategory = async () => {
    const categories = (
      await pb.collection("register_category").getFullList()
    ).map((register) => {
      return {
        id: register.id,
        label: register.label,
      };
    });

    setRegisterCategories(categories as RegisterCategory[]);
  };

  const fetchUsers = async () => {
    const users = await pb.collection("users").getFullList();
    setUsers(users);
  };

  onMount(() => {
    fetchRegisterCategory();
    fetchUsers();
  });

  const submitRegister: SubmitHandler<RegistersForm> = async (
    values,
    event
  ) => {
    console.log(values);
    const record = await pb.collection("registers").create(values);
    if (record.id) props.close();
  };

  return (
    <>
      <Modal>
        <div
          class="relative w-96 flex flex-col gap-4 p-4 shadow rounded
            bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-300"
        >
          <RiSystemCloseCircleFill
            class="absolute text-2xl top-2 right-2 transition-colors duration-100 hover:text-red-600 cursor-pointer"
            onclick={props.close}
          />

          <h2 class="font-semibold text-2xl">Crear nuevo registro</h2>

          <Form onSubmit={submitRegister}>
            <Field
              name="date"
              type="Date"
              validate={[required("Este campo es requerido")]}
            >
              {(field, props) => (
                <div class="flex flex-col gap-0.5">
                  <label class="font-medium">Fecha</label>
                  <input
                    {...props}
                    name="date"
                    type="date"
                    class="px-2 py-1 border dark:border-gray-900 rounded outline-none shadow bg-gray-100 dark:bg-gray-700 focus:border-primary-600"
                    classList={{
                      "border-red-600 text-red-600": !!field.error,
                    }}
                  />
                  {field.error && (
                    <span class="text-sm text-red-600">{field.error}</span>
                  )}
                </div>
              )}
            </Field>

            <Field
              name="description"
              validate={[
                required("Este campo es requerido"),
                minLength(3, "Debe tener al menos 3 caracteres"),
              ]}
            >
              {(field, props) => (
                <div class="flex flex-col gap-0.5">
                  <label class="font-medium">Descripción</label>

                  <input
                    {...props}
                    name="description"
                    placeholder="Breve descripción del registro"
                    class="px-2 py-1 border dark:border-gray-900 rounded outline-none shadow bg-gray-100 dark:bg-gray-700 focus:border-primary-600"
                    classList={{
                      "border-red-600 text-red-600": !!field.error,
                    }}
                  />

                  {field.error && (
                    <span class="text-sm text-red-600">{field.error}</span>
                  )}
                </div>
              )}
            </Field>

            <Field
              name="amount"
              type="number"
              validate={[required("Este campo es requerido")]}
            >
              {(field, props) => (
                <div class="flex flex-col gap-0.5">
                  <label class="font-medium">Monto</label>

                  <input
                    {...props}
                    name="amount"
                    type="number"
                    placeholder="Monto del registro"
                    class="px-2 py-1 border dark:border-gray-900 rounded outline-none shadow bg-gray-100 dark:bg-gray-700 focus:border-primary-600"
                    classList={{
                      "border-red-600 text-red-600": !!field.error,
                    }}
                  />
                  {field.error && (
                    <span class="text-sm text-red-600">{field.error}</span>
                  )}
                </div>
              )}
            </Field>

            <Field
              name="category"
              type="string"
              validate={[
                required("Este campo es requerido"),
                minLength(2, "Este campo es requerido"),
              ]}
            >
              {(field, props) => (
                <div class="flex flex-col gap-0.5">
                  <label class="font-medium">Categoría de registro</label>
                  <select
                    {...props}
                    name="category"
                    class="px-2 py-1 border dark:border-gray-900 rounded outline-none shadow bg-gray-100 dark:bg-gray-700 focus:border-primary-600"
                    classList={{
                      "border-red-600": !!field.error,
                    }}
                  >
                    <option value="0" selected disabled>
                      Seleccione una opción
                    </option>
                    <For each={registerCategories()}>
                      {(category) => (
                        <option value={category.id}>{category.label}</option>
                      )}
                    </For>
                  </select>
                  {field.error && (
                    <span class="text-sm text-red-600">{field.error}</span>
                  )}
                </div>
              )}
            </Field>

            <Field name="type" type="string">
              {(field, props) => (
                <div class="flex flex-col gap-0.5">
                  <label class="font-medium">Tipo de registro</label>
                  <select
                    {...props}
                    name="type"
                    class="px-2 py-1 border dark:border-gray-900 rounded outline-none shadow bg-gray-100 dark:bg-gray-700 focus:border-primary-600"
                    classList={{
                      "border-red-600 text-red-600": !!field.error,
                    }}
                  >
                    <option value="income">Ingreso</option>
                    <option value="expense">Salida</option>
                  </select>
                  {field.error && (
                    <span class="text-sm text-red-600">{field.error}</span>
                  )}
                </div>
              )}
            </Field>

            <Field name="user_id">
              {(field, props) => (
                <div class="flex flex-col gap-0.5">
                  <label class="font-medium">Usuario</label>
                  <select
                    {...props}
                    name="user_id"
                    class="px-2 py-1 border dark:border-gray-900 rounded outline-none shadow bg-gray-100 dark:bg-gray-700 focus:border-primary-600"
                    classList={{
                      "border-red-600 text-red-600": !!field.error,
                    }}
                  >
                    <For each={users()}>
                      {(user) => (
                        <option value={user.id.toString()}>
                          {user.name.toString()}
                        </option>
                      )}
                    </For>
                  </select>
                  {field.error && (
                    <span class="text-sm text-red-600">{field.error}</span>
                  )}
                </div>
              )}
            </Field>

            {/* <Field name="receipt" type="File">
              {(field, props) => (
                <div class="flex flex-col gap-0.5">
                  <label class="font-medium">Foto del recibo (opcional)</label>
                  <input
                    {...props}
                    name="receipt"
                    type="file"
                    class="px-2 py-1 border dark:border-gray-900 rounded outline-none shadow bg-gray-100 dark:bg-gray-700 focus:border-primary-600"
                    classList={{
                      "border-red-600 text-red-600": !!field.error,
                    }}
                  />
                  {field.error && (
                    <span class="text-sm text-red-600">{field.error}</span>
                  )}
                </div>
              )}
            </Field> */}

            <button
              type="submit"
              class="w-full py-1 px-2 mt-4 bg-green-600 text-gray-100 text-center font-medium rounded"
            >
              Agregar registro
            </button>
          </Form>
        </div>
      </Modal>
    </>
  );
}
