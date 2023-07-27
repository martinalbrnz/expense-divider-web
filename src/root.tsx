// @refresh reload
import { Suspense } from "solid-js/web";
import {
  Body,
  ErrorBoundary,
  Head,
  Html,
  Link,
  Meta,
  Scripts,
  Title,
} from "solid-start";
import App from "./app";
import { StateProvider } from "./components/contexts/state";
import "./root.css";

export default function Root() {
  return (
    <Html lang="en">
      <Head>
        <Title>Divisor de expensas</Title>
        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
        <Link rel="icon" type="image/x-icon" href="favicon.png" />
      </Head>
      <StateProvider>
        <Body>
          <Suspense>
            <ErrorBoundary>
              <App />
            </ErrorBoundary>
          </Suspense>
          <Scripts />
        </Body>
      </StateProvider>
    </Html>
  );
}
