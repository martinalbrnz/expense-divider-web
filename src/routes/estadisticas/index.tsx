import { endOfMonth, format, startOfMonth } from "date-fns";
import es from "date-fns/locale/es";
import { RiUserFacesUser3Line } from "solid-icons/ri";
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

export type DivisionType = "equal" | "proportion";

export default function Estadisticas() {
  const [registers, setRegisters] = createSignal<RegisterRecord[]>([]);
  const [users, setUsers] = createSignal<UserRecord[]>([]);
  const [categories, setCategories] = createSignal<CategoryRecord[]>([]);
  const [selectedDate, setSelectedDate] = createSignal(Date.now());
  const [divisionType, setDivisionType] =
    createSignal<DivisionType>("proportion");

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
    if (!users().length || !categories().length) return {};
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

  const expenseDivider: any = createMemo(() => {
    if (
      !usersId().length ||
      !Object.keys(classifiedDataObject()).length ||
      !monthValues()
    ) {
      return {};
    }

    const balance = {};

    if (divisionType() === "equal") {
      const expectedOutcome = monthValues().outcome / users().length;

      users().map((user) => {
        Object.assign(balance, {
          [user.id]: classifiedDataObject()[user.id].outcome - expectedOutcome,
        });
      });
    }

    if (divisionType() === "proportion") {
      users().map((user) => {
        const expectedOutcome =
          (classifiedDataObject()[user.id].income / monthValues().income) *
          monthValues().outcome;

        Object.assign(balance, {
          [user.id]: classifiedDataObject()[user.id].outcome - expectedOutcome,
        });
      });
    }

    return balance;
  });

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
          class="flex flex-col font-medium text-end
					bg-gray-200 dark:bg-gray-800
					p-4 rounded shadow text-sm sm:text-base"
        >
          <div
            class="grid grid-cols-4 py-2 text-end
            border-b-2 border-gray-300 dark:border-gray-500"
          >
            <h1 class="text-start">Usuario</h1>
            <h1>Ingresos</h1>
            <h1>Egresos</h1>
            <h1>Balance</h1>
          </div>

          <For each={users()}>
            {(user, i) => (
              <div
                class="grid grid-cols-4 py-2 md:ps-2
                  border-b border-gray-300 dark:border-gray-500"
                classList={{ "border-b-0": i() + 1 === users().length }}
              >
                <span class="text-start">{user.name}</span>
                <Show
                  when={Object.keys(classifiedDataObject()).includes(user.id)}
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

          <div
            class="grid grid-cols-4 py-2 text-end mt-6
            border-b-2 border-gray-300 dark:border-gray-500"
          >
            <h1 class="text-start">Detalle</h1>
            <h1>Ingresos</h1>
            <h1>Egresos</h1>
            <h1>Balance</h1>
          </div>

          <For each={categories()}>
            {(category) => (
              <div
                class="grid grid-cols-4 py-2 md:ps-2
                border-b border-gray-300 dark:border-gray-500"
              >
                <span class="text-start">{category.label}</span>
                <Show
                  when={Object.keys(classifiedDataObject()).includes(
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

          <div class="grid grid-cols-4 py-2 text-end text-sm sm:text-xl">
            <h1 class="text-start">TOTAL</h1>
            <h1 class="text-green-600">${currency(monthValues().income)}</h1>
            <h1 class="text-red-600">${currency(monthValues().outcome)}</h1>
            <h1>${currency(monthValues().total)}</h1>
          </div>
        </div>

        <div
          class="flex flex-col font-medium
					bg-gray-200 dark:bg-gray-800
					p-4 rounded shadow"
        >
          <div class="flex items-center justify-between">
            <h2>Balances del mes</h2>

            <div class="flex items-center justify-end gap-2">
              <button
                onclick={() => setDivisionType("equal")}
                class="px-2 py-1 rounded"
                classList={{
                  "bg-primary-600 dark:bg-primary-800 text-gray-100 shadow":
                    divisionType() === "equal",
                  "text-gray-400 dark:text-gray-600":
                    divisionType() !== "equal",
                }}
              >
                Equitativo
              </button>
              <button
                onclick={() => setDivisionType("proportion")}
                class="px-2 py-1 rounded"
                classList={{
                  "bg-primary-600 dark:bg-primary-800 text-gray-100 shadow":
                    divisionType() === "proportion",
                  "text-gray-400 dark:text-gray-600":
                    divisionType() !== "proportion",
                }}
              >
                Proporcional
              </button>
            </div>
          </div>

          <div class="px-4">
            <For each={users()}>
              {(user) => (
                <Show
                  when={Object.keys(expenseDivider() ?? {}).includes(user.id)}
                >
                  <div
                    class="flex items-center justify-between gap-4 py-2 px-8
                  border-b border-gray-300 dark:border-gray-500 last-of-type:border-b-0"
                  >
                    <div class="flex items-center justify-start gap-4">
                      <div class="rounded-full overflow-hidden h-12 w-12">
                        <Show
                          when={user && user?.avatar}
                          fallback={
                            <RiUserFacesUser3Line class="text-4xl text-gray-400" />
                          }
                        >
                          <img
                            src={pb.getFileUrl(user, user.avatar!, {
                              thumb: "100x100",
                            })}
                            alt={user.name}
                            width={50}
                            height={50}
                          />
                        </Show>
                      </div>
                      <span>{user.name}</span>
                    </div>
                    <span
                      classList={{
                        "text-green-600": expenseDivider()[user.id] > 0,
                        "text-red-500": expenseDivider()[user.id] < 0,
                        "text-gray-500": expenseDivider()[user.id] === 0,
                      }}
                    >
                      {currency(expenseDivider()[user.id])}
                    </span>
                  </div>
                </Show>
              )}
            </For>
          </div>
        </div>
      </div>
    </>
  );
}
