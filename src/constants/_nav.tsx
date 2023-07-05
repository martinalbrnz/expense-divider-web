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
  {
    path: "users",
    label: "Usuarizado",
    icon: HiSolidUser,
    children: [
      {
        path: "",
        label: "Inicio",
        icon: HiSolidHome,
        extraClass: "ms-4",
      },
      {
        path: "login",
        label: "Ingresar",
        icon: HiOutlineLockOpen,
        extraClass: "ms-4",
      },
      {
        path: "user",
        label: "Usuario",
        icon: HiSolidUser,
        extraClass: "ms-4",
      },
    ],
  },
];
