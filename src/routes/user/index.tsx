import { Record } from "pocketbase";
import { RiUserFacesUser3Line } from "solid-icons/ri";
import { Show } from "solid-js";
import { Title, useNavigate } from "solid-start";
import { useCurrentUser } from "~/components/contexts/user";
import { pb } from "~/services/pocketbase";

const User = () => {
  const [user, { logout }] = useCurrentUser();
  const navigate = useNavigate();

  if (!user()) {
    navigate("/", { replace: true });
  }

  return (
    <>
      <Title>{user()?.name}</Title>

      <div class="flex flex-col gap-4 m-4 text-gray-800 dark:text-gray-300">
        <Show when={user()} fallback={<div>Cargando...</div>}>
          <div
            class="flex flex-col sm:flex-row gap-4 items-center 
            bg-gray-200 dark:bg-gray-800 p-4 rounded shadow"
          >
            <div class="flex items-center justify-center border-4 border-opacity-60 border-secondary-600 rounded max-w-xs aspect-square">
              <Show
                when={user()?.avatar}
                fallback={
                  <RiUserFacesUser3Line class="text-9xl text-gray-400 p-10 bg-gray-600 w-full h-full" />
                }
              >
                <img
                  src={pb.getFileUrl(user() as Record, user()?.avatar)}
                  alt={user()?.name}
                  class="h-full w-full"
                />
              </Show>
            </div>
            <div
              class="relative flex flex-col gap-2 flex-1
              text-center sm:text-start"
            >
              <span class="font-bold text-4xl">{user()?.name}</span>
              <span class="font-medium text-lg">{user()?.username}</span>
            </div>
          </div>
        </Show>

        <div
          class="flex gap-4 items-center justify-end
            bg-gray-200 dark:bg-gray-800 p-4 rounded shadow"
        >
          <button
            class="bg-gray-600 text-gray-100 rounded px-2 py-1 font-medium"
            disabled
          >
            Editar perfil
          </button>

          <button
            onClick={logout}
            class="bg-red-600 text-gray-100 rounded px-2 py-1 font-medium"
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </>
  );
};

export default User;
