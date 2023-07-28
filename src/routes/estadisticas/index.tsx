import { endOfMonth, format, startOfMonth } from "date-fns";
import es from "date-fns/locale/es";
import {
  For,
  Show,
  createEffect,
  createMemo,
  createSignal,
  on,
  onMount,
} from "solid-js";
import { Title } from "solid-start";
import ListHeader from "~/components/shared/ListHeader";
import { UserRecord } from "~/models/authUser.model";
import { CategoryRecord } from "~/models/category.model";
import { RegisterRecord } from "~/models/register.model";
import { currency } from "~/pipes/currency";
import { pb } from "~/services/pocketbase";

export interface RelevantValues {
  income: number;
  outcome: number;
  total: number;
}

export default function Estadisticas() {
  const [registers, setRegisters] = createSignal<RegisterRecord[]>([]);
  const [users, setUsers] = createSignal<UserRecord[]>([]);
  const [categories, setCategories] = createSignal<CategoryRecord[]>([]);
  const [selectedDate, setSelectedDate] = createSignal(Date.now());

  const monthValues = () =>
    registers().reduce(
      (prev: RelevantValues, curr: RegisterRecord) => {
        if (curr.type === "income") {
          return {
            ...prev,
            income: prev.income + curr.amount,
            total: prev.total + curr.amount,
          };
        } else {
          return {
            ...prev,
            outcome: prev.outcome + curr.amount,
            total: prev.total - curr.amount,
          };
        }
      },
      { income: 0, outcome: 0, total: 0 }
    );

  const data = () =>
    registers().map((register) => {
      return {
        type: register.type,
        user: register.expand.user_id,
        user_id: register.user_id,
        category: register.expand.category,
        category_id: register.category,
        amount: register.amount,
      };
    });

  const usersId = () => users().map((i) => i.id);
  const categoriesId = () => categories().map((i) => i.id);

  const classifiedDataObject = createMemo(() => {
    if (!users().length || !categories().length) return;
    console.count();
    const initialValues = [...usersId(), ...categoriesId()]
      .map((item) => {
        return {
          [item]: {
            income: 0,
            outcome: 0,
            total: 0,
          },
        };
      })
      .reduce((prev: any, curr: any) => {
        return { ...prev, ...curr };
      }, {});

    return data().reduce((prev, curr): any => {
      const value = curr.type === "income" ? curr.amount : -curr.amount;
      return {
        ...prev,
        [curr.user_id]: {
          ...prev[curr.user_id],
          income:
            value > 0
              ? prev[curr.user_id].income + value
              : prev[curr.user_id].income,
          outcome:
            value > 0
              ? prev[curr.user_id].outcome
              : prev[curr.user_id].outcome - value,
          total: (prev[curr.user_id].total += value),
        },
        [curr.category_id]: {
          ...prev[curr.category_id],
          income:
            value > 0
              ? prev[curr.category_id].income + value
              : prev[curr.category_id].income,
          outcome:
            value > 0
              ? prev[curr.category_id].outcome
              : prev[curr.category_id].outcome - value,
          total: (prev[curr.category_id].total += value),
        },
      };
    }, initialValues);
  });

  const fetchRecords = async () => {
    const records: RegisterRecord[] = await pb
      .collection("registers")
      .getFullList({
        filter: `
		date >= "${format(startOfMonth(selectedDate()), "yyyy-MM-dd")}"
		&& date <= "${format(endOfMonth(selectedDate()), "yyyy-MM-dd")}"`,
        expand: "user_id,category",
        sort: "-date",
      });

    setRegisters(records);
  };
  const fetchUsers = async () => {
    const records: UserRecord[] = await pb.collection("users").getFullList();

    setUsers(records);
  };
  const fetchCategories = async () => {
    const records: CategoryRecord[] = await pb
      .collection("register_category")
      .getFullList({});

    setCategories(records);
  };

  createEffect(on(selectedDate, fetchRecords));

  onMount(() => {
    fetchUsers();
    fetchCategories();
  });
  return (
    <>
      <Title>
        Estadísticas de {format(selectedDate(), "MMMM", { locale: es })}
      </Title>

      <div class="flex flex-col gap-4 m-4 text-gray-800 dark:text-gray-300">
        <ListHeader
          selectedDate={selectedDate()}
          setSelectedDate={(date: number) => setSelectedDate(date)}
        />

        <div
          class="flex flex-col gap-2
					bg-gray-200 dark:bg-gray-800
					p-4 rounded shadow"
        >
          <h1 class="text-green-600 font-bold text-4xl">
            Ingresos: ${currency(monthValues().income)}
          </h1>
          <h1 class="text-red-600 font-bold text-4xl">
            Egresos: ${currency(monthValues().outcome)}
          </h1>
          <h1 class="text-white font-bold text-4xl">
            TOTAL: ${currency(monthValues().total)}
          </h1>
        </div>

        <div
          class="flex flex-col gap-2
					bg-gray-200 dark:bg-gray-800
					p-4 rounded shadow"
        >
          <For each={users()}>
            {(user) => (
              <div class="flex justify-between">
                <span>{user.name}</span>
                <Show
                  when={Object.keys(classifiedDataObject() ?? {}).includes(
                    user.id
                  )}
                >
                  <span>
                    {currency(classifiedDataObject()[user.id].income)}
                  </span>
                  <span>
                    {currency(classifiedDataObject()[user.id].outcome)}
                  </span>
                  <span
                    classList={{
                      "text-green-600":
                        classifiedDataObject()[user.id].total >= 0,
                      "text-red-500": classifiedDataObject()[user.id].total < 0,
                    }}
                  >
                    {currency(classifiedDataObject()[user.id].total)}
                  </span>
                </Show>
              </div>
            )}
          </For>

          <For each={categories()}>
            {(category) => (
              <div class="flex justify-between">
                <span>{category.label}</span>
                <Show
                  when={Object.keys(classifiedDataObject() ?? {}).includes(
                    category.id
                  )}
                >
                  <span>
                    {currency(classifiedDataObject()[category.id].income)}
                  </span>
                  <span>
                    {currency(classifiedDataObject()[category.id].outcome)}
                  </span>
                  <span
                    classList={{
                      "text-green-600":
                        classifiedDataObject()[category.id].total >= 0,
                      "text-red-500":
                        classifiedDataObject()[category.id].total < 0,
                    }}
                  >
                    {currency(classifiedDataObject()[category.id].total)}
                  </span>
                </Show>
              </div>
            )}
          </For>
        </div>
      </div>
    </>
  );
}
