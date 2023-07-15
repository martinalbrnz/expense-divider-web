import { JSX } from "solid-js";
import { AuthProvider } from "./auth";
import { IncomesProvider } from "./incomes";
import { OutcomesProvider } from "./outcomes";
import { ThemeProvider } from "./theme";

export interface StateProviderI {
  children: JSX.Element;
}

export const StateProvider = (props: StateProviderI) => {
  return (
    <IncomesProvider incomes={[]}>
      <OutcomesProvider outcomes={[]}>
        <AuthProvider auth={undefined}>
          <ThemeProvider isDark={false}>{props.children}</ThemeProvider>
        </AuthProvider>
      </OutcomesProvider>
    </IncomesProvider>
  );
};

// This is a component to wrap all providers
