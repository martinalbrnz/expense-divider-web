import { Show } from "solid-js";
import { Navigate } from "solid-start";
import { useAuth } from "~/components/contexts/auth";

const User = () => {
  const [auth, { setAuth }]: any = useAuth();

  if (!auth()) return <Navigate href={"/"}></Navigate>;
  return (
    <>
      <Show when={auth()} fallback={<div>Cargando...</div>}>
        <div class="flex gap-4 items-center bg-slate-50 p-2 rounded">
          <div class="flex flex-col">
            <p class="text-slate-800 text-lg">{auth().model.name}</p>
            <p class="text-slate-400 text-sm">{auth().model.username}</p>
          </div>
        </div>
      </Show>
    </>
  );
};

export default User;
