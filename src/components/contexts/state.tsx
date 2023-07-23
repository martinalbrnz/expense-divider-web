import { Record } from "pocketbase";
import { JSX } from "solid-js";
import { pb } from "~/services/pocketbase";
import { RegistersProvider } from "./registers";
import { ThemeProvider } from "./theme";
import { UserProvider } from "./user";

export interface StateProviderI {
  children: JSX.Element;
}

export const StateProvider = (props: StateProviderI) => {
  const prefersDark =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  return (
    <UserProvider user={pb.authStore.model as Record}>
      <RegistersProvider registers={[]}>
        <ThemeProvider isDark={prefersDark}>{props.children}</ThemeProvider>
      </RegistersProvider>
    </UserProvider>
  );
};

// This is a component to wrap all providers
