import { JSX } from "solid-js";
import { RegistersProvider } from "./registers";
import { ThemeProvider } from "./theme";

export interface StateProviderI {
  children: JSX.Element;
}

export const StateProvider = (props: StateProviderI) => {
  return (
    <RegistersProvider registers={[]}>
      <ThemeProvider isDark={false}>{props.children}</ThemeProvider>
    </RegistersProvider>
  );
};

// This is a component to wrap all providers
