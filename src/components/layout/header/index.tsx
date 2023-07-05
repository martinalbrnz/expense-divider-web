import { HiOutlineBars3 } from "solid-icons/hi";
import { For, createSignal } from "solid-js";
import { navRoutes } from "~/constants/_nav";
import NavItem from "./nav-item";

const Header = () => {
  const [openRoutes, setOpenRoutes] = createSignal<string[]>([]);
  const [extendSidebar, setExtendSidebar] = createSignal<boolean>(true);

  const role = "user";

  const toggleOpenRoute = (path: string) => {
    if (openRoutes().includes(path)) {
      setOpenRoutes(openRoutes().filter((route) => route !== path));
    } else {
      setOpenRoutes([...openRoutes(), path]);
    }
  };

  return (
    <nav
      class="flex flex-col justify-between gap-1 px-2 bg-primary-800 h-full py-2"
      classList={{ "w-96": extendSidebar() }}
    >
      <div
        onclick={() => setExtendSidebar(!extendSidebar())}
        class="flex items-center justify-center self-start cursor-pointer
         bg-primary-700 rounded text-white"
      >
        <HiOutlineBars3 class="text-3xl h-12 w-12" />
      </div>

      <div class="flex flex-col gap-1">
        <For each={navRoutes}>
          {(route) => (
            <NavItem
              route={route}
              toggleOpen={toggleOpenRoute}
              openRoutes={openRoutes()}
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

export default Header;
