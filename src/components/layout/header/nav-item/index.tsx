import { HiOutlineChevronUp } from "solid-icons/hi";
import { For, Show, createUniqueId } from "solid-js";
import { A } from "solid-start";
import { NavItemI } from "~/models/navItem.model";

export interface NavItemProps {
  route: NavItemI;
  toggleOpen: (id: string) => void;
  openRoutes: string[];
  extendSidebar: boolean;
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
        activeClass="bg-primary-600"
        end={true}
        class="relative flex items-center justify-start gap-2 p-2 rounded text-white font-medium hover:bg-primary-700 transition-all duration-100"
        classList={{
          [props.route.extraClass!]: !!props.route.extraClass,
        }}
      >
        <props.route.icon class="text-3xl h-9 w-9" />
        <Show when={props.extendSidebar}>
          <span class="select-none">{props.route.label}</span>
        </Show>
        <Show when={props.route.children}>
          <div
            class="group absolute flex items-center justify-center right-3 transition-all duration-300
						 bg-primary-600 h-6 w-6 rounded-full hover:animate-wiggle z-10"
            classList={{
              "rotate-180":
                props.route.children && props.openRoutes.includes(id),
              "-right-0.5 -top-0.5 bg-transparent h-4 w-4":
                !props.extendSidebar,
            }}
            onclick={() => props.toggleOpen(id)}
          >
            <HiOutlineChevronUp />
          </div>
        </Show>
      </A>
      <Show when={props.route.children && props.openRoutes.includes(id)}>
        <div
          classList={{
            "border-b border-e rounded-b rounded-s-none border-primary-700":
              props.route.children && props.openRoutes.includes(id),
          }}
        >
          <For each={props.route.children}>
            {(child) => (
              <NavItem
                route={child}
                toggleOpen={props.toggleOpen}
                openRoutes={props.openRoutes}
                extendSidebar={props.extendSidebar}
                role={props.role}
                fullPath={`${props.fullPath ?? ""}${props.route.path}/`}
              />
            )}
          </For>
        </div>
      </Show>
    </Show>
  );
};

export default NavItem;
