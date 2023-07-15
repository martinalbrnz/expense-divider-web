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
              <div class="flex h-screen ">
                <Nav />
                <div class="w-full bg-slate-100 dark:bg-slate-900">
                  <Routes>
                    <FileRoutes />
                  </Routes>
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
