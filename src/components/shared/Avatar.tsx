import { A } from "@solidjs/router";
import { Record } from "pocketbase";
import { RiUserFacesUser3Line } from "solid-icons/ri";
import { Show, createSignal } from "solid-js";
import { pb } from "~/services/pocketbase";

const Avatar = () => {
  const [user] = createSignal<Record>(pb.authStore.model as Record);

  return (
    <A
      href="/user"
      class="flex items-center justify-center
      bg-gray-200 h-14 w-14 border border-green-600 border-opacity-60 rounded-full overflow-hidden shadow-sm"
    >
      <Show
        when={pb.getFileUrl(user() as Record, user().avatar)}
        fallback={<RiUserFacesUser3Line class="text-4xl text-gray-400" />}
      >
        <img
          src={pb.getFileUrl(user() as Record, user().avatar)}
          alt={user()?.name}
        />
      </Show>
    </A>
  );
};

export default Avatar;
