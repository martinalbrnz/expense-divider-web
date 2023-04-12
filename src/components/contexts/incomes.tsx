import { JSX, createContext, createSignal, useContext } from "solid-js";
import { Income } from "~/models/income.model";

const IncomesContext = createContext();

export interface IncomesProviderI {
  incomes: Income[];
  children: JSX.Element;
}

export const IncomesProvider = (props: IncomesProviderI) => {
  const [incomes, setIncomes] = createSignal(props.incomes || []);
  const incomesList = [
    incomes,
    {
      setIncomes(incomes: Income[]) {
        setIncomes(incomes);
      },
    },
  ];
  return (
    <IncomesContext.Provider value={incomesList}>
      {props.children}
    </IncomesContext.Provider>
  );
};

export function useIncomes() {
  return useContext(IncomesContext);
}
