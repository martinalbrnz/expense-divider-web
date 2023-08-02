import {
  SubmitHandler,
  createForm,
  minLength,
  required,
  reset,
} from "@modular-forms/solid";
import { startOfDay } from "date-fns";
import { RiSystemCloseCircleFill } from "solid-icons/ri";
import { For, createSignal, onMount } from "solid-js";
import {
  RegisterCategory,
  RegisterRecord,
  RegisterType,
} from "~/models/register.model";
import { User } from "~/models/user.model";
import { pb } from "~/services/pocketbase";
import { useTheme } from "./contexts/theme";
import { useCurrentUser } from "./contexts/user";
import Modal from "./shared/Modal";

export interface RegisterFormProps {
  registerForEdit?: RegisterRecord;
  close: (b?: boolean) => void;
}

type RegistersForm = {
  date: string;
  description: string;
  type: RegisterType;
  amount: number;
  user_id: string;
  category: string;
  // receipt?: File;
};

export default function RegisterForm(props: RegisterFormProps) {
  const [isDark]: any = useTheme();
  const [currentUser]: any = useCurrentUser();
  const [registersForm, { Form, Field }] = createForm<RegistersForm>({});

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
    if (props.registerForEdit) {
      const { amount, category, date, description, type, user_id } =
        props.registerForEdit;
      const MS_IN_MINUTE = 1000 * 60;
      const offset = new Date(props.registerForEdit.date).getTimezoneOffset();
      const correction = offset >= 0 ? (offset + 1) * MS_IN_MINUTE : 0;

      reset(
        registersForm,
        ["amount", "category", "date", "description", "type", "user_id"],
        {
          initialValues: {
            amount,
            category,
            description,
            type,
            user_id,
            date: startOfDay(new Date(date).getTime() + correction)
              .toISOString()
              .split("T")[0],
          },
        }
      );
    } else {
      reset(registersForm, ["user_id", "date"], {
        initialValues: {
          user_id: currentUser()!.id,
          date: startOfDay(new Date()).toISOString().split("T")[0],
        },
      });
    }
    fetchRegisterCategory();
    fetchUsers();
  });

  const submitRegister: SubmitHandler<RegistersForm> = async (values) => {
    if (props.registerForEdit) {
      const record = await pb
        .collection("registers")
        .update(props.registerForEdit.id, values);
      if (record.id) props.close(true);
    } else {
      const record = await pb.collection("registers").create(values);
      if (record.id) props.close(true);
    }
  };

  return (
    <>
      <Modal>
        <div
          classList={{ "dark bg-primary-950": isDark }}
          class="relative w-96 flex flex-col gap-4 p-4 shadow rounded
            bg-gray-300 text-gray-800 dark:text-gray-300"
        >
          <RiSystemCloseCircleFill
            class="absolute text-2xl top-2 right-2 transition-colors duration-100 hover:text-red-600 cursor-pointer"
            onclick={() => props.close()}
          />

          <h2 class="font-semibold text-2xl">
            {props.registerForEdit ? "Editar" : "Crear nuevo"} registro
          </h2>

          <Form onSubmit={submitRegister}>
            <Field name="date" validate={[required("Este campo es requerido")]}>
              {(field, props) => (
                <div class="flex flex-col gap-0.5">
                  <label class="font-medium">Fecha</label>

                  <input
                    {...props}
                    type="date"
                    value={field.value}
                    class="px-2 py-1 border dark:border-gray-900 rounded outline-none shadow bg-gray-100 dark:bg-gray-700 focus:border-primary-600"
                    classList={{
                      "border-red-600 text-red-600": !!field.error,
                    }}
                    required
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
                    value={field.value}
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
                    value={field.value}
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
                    value={field.value}
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
                    value={field.value}
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
                    value={field.value}
                    class="px-2 py-1 border dark:border-gray-900 rounded outline-none shadow bg-gray-100 dark:bg-gray-700 focus:border-primary-600"
                    classList={{
                      "border-red-600 text-red-600": !!field.error,
                    }}
                  >
                    <For each={users()}>
                      {(user) => (
                        <option
                          value={user.id.toString()}
                          selected={user.id.toString() === field.value}
                        >
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
              {props.registerForEdit ? "Editar" : "Crear"} registro
            </button>
          </Form>
        </div>
      </Modal>
    </>
  );
}
