import { HiOutlineLockOpen, HiSolidHome, HiSolidUser } from "solid-icons/hi";
import { NavItemI } from "~/models/navItem.model";
export const navRoutes: NavItemI[] = [
  {
    path: "",
    label: "Inicio",
    icon: HiSolidHome,
  },
  {
    path: "login",
    label: "Ingresar",
    icon: HiOutlineLockOpen,
  },
  {
    path: "user",
    label: "Usuario",
    icon: HiSolidUser,
  },
];
