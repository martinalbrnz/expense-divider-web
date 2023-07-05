import { For, createSignal } from "solid-js";
import { navRoutes } from "~/constants/_nav";
import NavItem from "./nav-item";

const Header = () => {
  const [openRoutes, setOpenRoutes] = createSignal<string[]>([
    "user",
    "user/movements",
  ]);

  const role = "user";

  const toggleOpenRoute = (path: string) => {
    if (openRoutes().includes(path)) {
      setOpenRoutes(openRoutes().filter((route) => route !== path));
    } else {
      setOpenRoutes([...openRoutes(), path]);
    }
  };

  return (
    <nav class="flex flex-col gap-1 px-2 bg-sky-800 h-full w-96">
      <For each={navRoutes}>
        {(route) => (
          <NavItem
            route={route}
            toggleOpen={toggleOpenRoute}
            openRoutes={openRoutes()}
            role={role}
          />
        )}
      </For>
    </nav>
  );
};

export default Header;
