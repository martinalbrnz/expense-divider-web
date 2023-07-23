import { A } from "@solidjs/router";
import { Record } from "pocketbase";
import { RiUserFacesUser3Line } from "solid-icons/ri";
import { Show } from "solid-js";
import { pb } from "~/services/pocketbase";
import { useCurrentUser } from "../contexts/user";

const Avatar = () => {
  const [user] = useCurrentUser();

  return (
    <Show when={user()}>
      <A
        href="/user"
        class="flex items-center justify-center select-none h-14 w-14
          border border-black border-opacity-30 bg-gray-200
          rounded-full overflow-hidden shadow-sm"
      >
        <Show
          when={user() && user()?.avatar}
          fallback={<RiUserFacesUser3Line class="text-4xl text-gray-400" />}
        >
          <img
            src={pb.getFileUrl(user() as Record, user()?.avatar)}
            alt={user()?.name}
          />
        </Show>
      </A>
    </Show>
  );
};

export default Avatar;
