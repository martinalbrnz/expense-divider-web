import { Show } from "solid-js";
import { useAuth } from "~/components/contexts/auth";
import Avatar from "~/components/shared/avatar";

const User = () => {
  const [auth, { setAuth }]: any = useAuth();

  return (
    <>
      <Show when={auth()} fallback={<div>Cargando...</div>}>
        <div class="flex gap-4 items-center bg-slate-50 p-2 rounded">
          <Avatar
            id={auth().model.id}
            collectionId={auth().model.collectionId}
            filename={auth().model.avatar}
            extraClass="rounded-full w-20 h-20"
          />
          <Avatar extraClass="rounded-full w-20 h-20" />
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
