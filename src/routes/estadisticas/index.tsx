import { endOfMonth, format, startOfMonth } from "date-fns";
import es from "date-fns/locale/es";
import { createEffect, createSignal, on } from "solid-js";
import { Title } from "solid-start";
import ListHeader from "~/components/shared/ListHeader";
import { RegisterRecord } from "~/models/register.model";
import { pb } from "~/services/pocketbase";

export interface RelevantValues {
  income: number;
  outcome: number;
  total: number;
}

export default function Estadisticas() {
  const [registers, setRegisters] = createSignal<RegisterRecord[]>([]);
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

    console.log(records);

    setRegisters(records);
  };

  createEffect(on(selectedDate, fetchRecords));
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
            Ingresos: {monthValues().income}
          </h1>
          <h1 class="text-red-600 font-bold text-4xl">
            Egresos: {monthValues().outcome}
          </h1>
          <h1 class="text-white font-bold text-4xl">
            TOTAL: {monthValues().total}
          </h1>
        </div>
      </div>
    </>
  );
}
