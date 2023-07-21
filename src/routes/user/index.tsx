import { Record } from "pocketbase";
import { RiUserFacesUser3Line } from "solid-icons/ri";
import { Show, createSignal, onMount } from "solid-js";
import { Navigate, Title } from "solid-start";
import { pb } from "~/services/pocketbase";

const User = () => {
  const [user] = createSignal(pb.authStore.model as Record);

  onMount(() => {
    console.log(user());
  });

  if (!user()) return <Navigate href={"/"}></Navigate>;
  return (
    <>
      <Title>{user().name}</Title>

      <div class="flex flex-col gap-4 m-4">
        <Show when={user()} fallback={<div>Cargando...</div>}>
          <div
            class="flex flex-col sm:flex-row gap-4 items-center 
            bg-gray-200 dark:bg-gray-800 p-4 rounded shadow"
          >
            <div class="flex items-center justify-center border-4 border-opacity-60 border-secondary-600 rounded max-w-xs aspect-square">
              <Show
                when={user().avatar}
                fallback={
                  <RiUserFacesUser3Line class="text-9xl text-gray-400 p-10 bg-gray-600 w-full h-full" />
                }
              >
                <img
                  src={pb.getFileUrl(user() as Record, user().avatar)}
                  alt={user()?.name}
                  class="h-full w-full"
                />
              </Show>
            </div>
            <div
              class="relative flex flex-col gap-2 flex-1
              text-center sm:text-start text-gray-800 dark:text-gray-300"
            >
              <span class="font-bold text-4xl">{user().name}</span>
              <span class="font-medium text-lg">{user().username}</span>
              {/* <div
                class="flex items-center justify-center h-8 w-8
                text-2xl hover:bg-black hover:bg-opacity-10
                rounded-full cursor-pointer"
              >
                <RiDesignEditLine />
              </div> */}
            </div>
          </div>
        </Show>
      </div>
    </>
  );
};

export default User;
