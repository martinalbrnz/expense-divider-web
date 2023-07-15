import { FileRoutes, Routes } from "solid-start";
import { useTheme } from "./components/contexts/theme";
import Header from "./components/layout/header";
import Nav from "./components/layout/nav";

const App = () => {
  const [isDark, { toggleTheme }]: any = useTheme();
  return (
    <div
      class="flex flex-col h-[100svh] md:h-screen w-screen"
      classList={{ dark: isDark() }}
    >
      <Header />
      <div class="flex flex-1">
        <Nav />
        <main class="flex justify-center flex-grow-[1] overflow-y-scroll bg-slate-100 dark:bg-slate-900 custom-scrollbar">
          <div class="w-full max-w-6xl">
            <Routes>
              <FileRoutes />
            </Routes>
            <div class="block md:hidden h-24"></div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
