import { Show } from "solid-js";
import { A } from "solid-start";
import { NavItemI } from "~/models/navItem.model";

export interface NavItemProps {
  route: NavItemI;
  extendSidebar: boolean;
  role?: string;
  fullPath?: string;
}

const NavItem = (props: NavItemProps) => {
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
        activeClass="bg-secondary-600"
        end={true}
        class="relative flex flex-col md:flex-row items-center justify-start gap-2 p-2 rounded-full md:rounded text-white font-medium hover:bg-secondary-700 transition-all duration-100"
        classList={{
          [props.route.extraClass!]: !!props.route.extraClass,
        }}
      >
        <props.route.icon class="text-3xl h-9 w-9" />
        <span
          class="select-none"
          classList={{
            "hidden md:flex": props.extendSidebar,
            hidden: !props.extendSidebar,
          }}
        >
          {props.route.label}
        </span>
      </A>
    </Show>
  );
};

export default NavItem;
