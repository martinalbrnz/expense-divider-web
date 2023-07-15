import { JSX, createContext, createSignal, useContext } from "solid-js";

const ThemeContext = createContext();

export interface ThemeProviderI {
  children: JSX.Element;
  isDark: boolean;
}

export const ThemeProvider = (props: ThemeProviderI) => {
  const [isDark, setIsDark] = createSignal(props.isDark);
  const theme = [
    isDark,
    {
      toggleTheme() {
        setIsDark(!isDark());
      },
    },
  ];
  return (
    <ThemeContext.Provider value={theme}>
      {props.children}
    </ThemeContext.Provider>
  );
};

export function useTheme() {
  return useContext(ThemeContext);
}
