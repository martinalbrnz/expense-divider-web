import { FileRoutes, Routes } from "solid-start";
import { useTheme } from "./components/contexts/theme";
import Header from "./components/layout/header";
import Nav from "./components/layout/nav";

const App = () => {
  const [isDark, { toggleTheme }]: any = useTheme();
  return (
    <div
      class="flex h-[100svh] md:h-screen w-screen ring ring-red-600"
      classList={{ dark: isDark() }}
    >
      <Nav />
      <div class="flex flex-col flex-1">
        <Header />
        <main class="flex justify-center flex-grow-[1] overflow-y-auto bg-slate-100 dark:bg-slate-900 custom-scrollbar">
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
