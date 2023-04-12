import { Show } from "solid-js";
import { A, useLocation } from "solid-start";
import { logout } from "~/services/pocketbase";

const Header = () => {
  const location = useLocation();
  const active = (path: string) =>
    path == location.pathname
      ? "border-sky-600"
      : "border-transparent hover:border-sky-600";

  return (
    <nav class="bg-sky-800">
      <ul class="container flex items-center p-3 text-gray-200">
        <li class={`border-b-2 ${active("/")} mx-1.5 sm:mx-6`}>
          <A href="/">Home</A>
        </li>
        <li class={`border-b-2 ${active("/about")} mx-1.5 sm:mx-6`}>
          <A href="/about">About</A>
        </li>
        <li class={`border-b-2 ${active("/user")} mx-1.5 sm:mx-6`}>
          <A href="/user">Usuario</A>
        </li>
        <li class={`border-b-2 ${active("/ingresos")} mx-1.5 sm:mx-6`}>
          <A href="/ingresos">Ingresos</A>
        </li>
        <Show when={!localStorage.getItem("pocketbase_auth")}>
          <li class={`border-b-2 ${active("/login")} mx-1.5 sm:mx-6`}>
            <A href="/login">Login</A>
          </li>
        </Show>
        <Show when={localStorage.getItem("pocketbase_auth")}>
          <button onclick={logout}>Cerrar sesión</button>
        </Show>
      </ul>
    </nav>
  );
};

export default Header;
