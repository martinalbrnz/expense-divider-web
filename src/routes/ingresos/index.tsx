import { For, onMount } from "solid-js";
import { useIncomes } from "~/components/contexts/incomes";
import { Income } from "~/models/income.model";

const initialIncomes: Income[] = [
  { amount: 6200, id: "asdfqwer" },
  { amount: 2490, id: "qwer1234" },
];

const Ingresos = () => {
  const [incomes, { setIncomes }]: any = useIncomes();
  onMount(() => {
    setIncomes(initialIncomes);
  });

  return (
    <div>
      <For each={incomes()}>{(income, i) => <div>{income.amount}</div>}</For>
    </div>
  );
};

export default Ingresos;
