import { A } from "@solidjs/router";
import { Admin, Record } from "pocketbase";
import { RiUserFacesUser3Line } from "solid-icons/ri";
import { Show, createSignal, onMount } from "solid-js";
import { pb } from "~/services/pocketbase";

const Avatar = () => {
  const [user, setUser] = createSignal<Record | Admin | null>(
    pb.authStore.model
  );

  onMount(() => {
    console.log(user());
    console.log(pb.getFileUrl(user() as Record, user()?.avatar));
  });

  return (
    <A
      href="/user"
      class="flex items-center justify-center bg-gray-200 h-14 w-14 rounded-full overflow-hidden"
    >
      <Show
        when={pb.getFileUrl(user() as Record, user()?.avatar)}
        fallback={<RiUserFacesUser3Line class="text-4xl text-gray-400" />}
      >
        <img src={pb.getFileUrl(user() as Record, user()?.avatar)} alt="" />
      </Show>
    </A>
  );
};

export default Avatar;
