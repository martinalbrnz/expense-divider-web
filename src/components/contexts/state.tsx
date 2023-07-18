import { JSX } from "solid-js";
import { AuthProvider } from "./auth";
import { RegistersProvider } from "./registers";
import { ThemeProvider } from "./theme";

export interface StateProviderI {
  children: JSX.Element;
}

export const StateProvider = (props: StateProviderI) => {
  return (
    <RegistersProvider registers={[]}>
      <AuthProvider auth={undefined}>
        <ThemeProvider isDark={false}>{props.children}</ThemeProvider>
      </AuthProvider>
    </RegistersProvider>
  );
};

// This is a component to wrap all providers
