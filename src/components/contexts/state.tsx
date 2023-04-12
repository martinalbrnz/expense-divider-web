import { JSX } from "solid-js";
import { AuthProvider } from "./auth";
import { IncomesProvider } from "./incomes";

export interface StateProviderI {
  children: JSX.Element;
}

export const StateProvider = (props: StateProviderI) => {
  return (
    <IncomesProvider incomes={[]}>
      <AuthProvider auth={undefined}>{props.children}</AuthProvider>
    </IncomesProvider>
  );
};

// This is a component to wrap all providers
