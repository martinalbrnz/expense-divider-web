import { Show, createSignal } from "solid-js";
import { Navigate } from "solid-start";
import { pb } from "~/services/pocketbase";

const User = () => {
  const [user, setUser] = createSignal(pb.authStore.model);

  if (!user()) return <Navigate href={"/"}></Navigate>;
  return (
    <>
      <Show when={user()} fallback={<div>Cargando...</div>}>
        <div class="flex gap-4 items-center bg-slate-50 p-2 rounded">
          <div class="flex flex-col">
            <p class="text-slate-800 text-lg">{user()?.name}</p>
            <p class="text-slate-400 text-sm">{user()?.username}</p>
          </div>
        </div>
      </Show>
    </>
  );
};

export default User;
