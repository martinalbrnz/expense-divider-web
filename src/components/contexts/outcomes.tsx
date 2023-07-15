import { JSX, createContext, createSignal, useContext } from "solid-js";
import { Outcome } from "~/models/outcome.model";

const OutcomesContext = createContext();

export interface OutcomesProviderI {
  outcomes: Outcome[];
  children: JSX.Element;
}

export const OutcomesProvider = (props: OutcomesProviderI) => {
  const [outcomes, setOutcomes] = createSignal(props.outcomes || []);
  const outcomesList = [
    outcomes,
    {
      setOutcomes(incomes: Outcome[]) {
        setOutcomes(incomes);
      },
    },
  ];
  return (
    <OutcomesContext.Provider value={outcomesList}>
      {props.children}
    </OutcomesContext.Provider>
  );
};

export function useOutcomes() {
  return useContext(OutcomesContext);
}
