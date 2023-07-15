// @refresh reload
import { Suspense } from "solid-js/web";
import {
  Body,
  ErrorBoundary,
  FileRoutes,
  Head,
  Html,
  Meta,
  Routes,
  Scripts,
  Title,
} from "solid-start";
import { StateProvider } from "./components/contexts/state";
import Header from "./components/layout/header";
import Nav from "./components/layout/nav";
import "./root.css";

export default function Root() {
  return (
    <Html lang="en">
      <Head>
        <Title>Divisor de expensas</Title>
        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <StateProvider>
        <Body>
          <Suspense>
            <ErrorBoundary>
              <div class="flex h-[100svh] md:h-screen w-screen">
                <Nav />
                <div class="flex flex-col flex-1">
                  <Header />
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
            </ErrorBoundary>
          </Suspense>
          <Scripts />
        </Body>
      </StateProvider>
    </Html>
  );
}
