import { HiOutlineChevronUp } from "solid-icons/hi";
import { For, Show, createUniqueId } from "solid-js";
import { A } from "solid-start";
import { NavItemI } from "~/models/navItem.model";

export interface NavItemProps {
  route: NavItemI;
  toggleOpen: (id: string) => void;
  openRoutes: string[];
  role?: string;
  fullPath?: string;
}

const NavItem = (props: NavItemProps) => {
  const id = createUniqueId();
  const extraClass = props.route.extraClass ?? "";

  return (
    <Show
      when={
        !props.route.role ||
        props.route.role?.includes(props.role!) ||
        props.route.role.includes("*")
      }
    >
      <A
        href={`${props.fullPath ?? ""}${props.route.path}`}
        activeClass="bg-sky-400"
        end={true}
        class="relative flex items-center justify-start gap-2 p-2 rounded text-white font-medium hover:bg-sky-700 transition-all duration-100"
        classList={{
          extraClass: !!props.route.extraClass,
        }}
      >
        <>{props.route.icon}</>
        <>{props.route.label}</>
        <Show when={props.route.children}>
          <div
            class="group absolute flex items-center justify-center right-3 transition-all duration-300
						 bg-slate-600 h-6 w-6 rounded-full hover:animate-wiggle z-10"
            classList={{
              "rotate-180":
                props.route.children && props.openRoutes.includes(id),
            }}
            onclick={() => props.toggleOpen(id)}
          >
            <HiOutlineChevronUp />
          </div>
        </Show>
      </A>
      <Show when={props.route.children && props.openRoutes.includes(id)}>
        <For each={props.route.children}>
          {(child) => (
            <NavItem
              route={child}
              toggleOpen={props.toggleOpen}
              openRoutes={props.openRoutes}
              role={props.role}
              fullPath={`${props.fullPath ?? ""}${props.route.path}/`}
            />
          )}
        </For>
      </Show>
    </Show>
  );
};

export default NavItem;
