import { Show } from "solid-js";
import { useAuth } from "~/components/contexts/auth";

const User = () => {
  const [auth, { setAuth }]: any = useAuth();

  return (
    <>
      <Show when={auth()} fallback={<div>Cargando...</div>}>
        <div class="flex gap-4 items-center bg-slate-50 p-2 rounded">
          <img
            class="w-20 rounded-full"
            src={`${import.meta.env.VITE_API_URL}/api/files/${
              auth().model.collectionId
            }/${auth().model.id}/${auth().model.avatar}`}
            alt={auth().model.name}
          />
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
