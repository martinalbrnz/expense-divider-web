import { HiOutlineBars3 } from "solid-icons/hi";
import { createSignal } from "solid-js";
import { For } from "solid-js/web";
import { navRoutes } from "~/constants/_nav";
import NavItem from "./nav-item";

const Nav = () => {
  const [extendSidebar, setExtendSidebar] = createSignal<boolean>(false);

  const role = "user";

  return (
    <nav
      class="absolute md:relative
        bottom-6 md:bottom-0
        left-1/2 md:left-0
        -translate-x-1/2 md:translate-x-0
        rounded-e-full rounded-s-full md:rounded-none
        flex md:flex-col justify-between gap-1
        bg-secondary-800 md:h-full
        px-2 py-2"
      classList={{ "md:w-52": extendSidebar() }}
    >
      <div
        onclick={() => setExtendSidebar(!extendSidebar())}
        class="hidden md:flex items-center justify-center self-start cursor-pointer
         bg-secondary-700 rounded text-white"
      >
        <HiOutlineBars3 class="text-3xl h-12 w-12" />
      </div>

      <div class="flex md:flex-col gap-1">
        <For each={navRoutes}>
          {(route) => (
            <NavItem
              route={route}
              extendSidebar={extendSidebar()}
              role={role}
            />
          )}
        </For>
      </div>

      <div class="flex flex-col"></div>
    </nav>
  );
};

export default Nav;
