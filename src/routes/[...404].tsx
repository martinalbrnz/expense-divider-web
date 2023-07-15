import { A } from "solid-start";

export default function NotFound() {
  return (
    <main class="text-center mx-auto text-gray-700 p-4">
      <h1 class="max-6-xs text-3xl text-sky-700 font-medium uppercase my-16">
        Página no encontrada
      </h1>
      <p class="my-4">
        <A href="/" class="text-sky-600 hover:underline">
          Volver a inicio
        </A>
      </p>
    </main>
  );
}
