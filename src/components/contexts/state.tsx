import { JSX } from "solid-js";
import { AuthProvider } from "./auth";
import { IncomesProvider } from "./incomes";
import { ThemeProvider } from "./theme";

export interface StateProviderI {
  children: JSX.Element;
}

export const StateProvider = (props: StateProviderI) => {
  return (
    <IncomesProvider incomes={[]}>
      <AuthProvider auth={undefined}>
        <ThemeProvider isDark={false}>{props.children}</ThemeProvider>
      </AuthProvider>
    </IncomesProvider>
  );
};

// This is a component to wrap all providers
