import { A } from "@solidjs/router";
import { RiUserFacesUser3Line } from "solid-icons/ri";

const Avatar = () => {
  return (
    <A
      href="/user"
      class="flex items-center justify-center bg-gray-200 h-14 w-14 rounded-full"
    >
      <RiUserFacesUser3Line class="text-4xl text-gray-400" />
    </A>
  );
};

export default Avatar;
