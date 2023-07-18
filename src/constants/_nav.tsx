import {
  RiBuildingsHome4Line,
  RiBusinessLineChartLine,
  RiSystemLoginBoxLine,
} from "solid-icons/ri";
import { NavItemI } from "~/models/navItem.model";
import { RoutesEnum } from "./routes";
export const navRoutes: NavItemI[] = [
  {
    path: "",
    label: "Inicio",
    icon: RiBuildingsHome4Line,
  },
  {
    path: RoutesEnum.Login,
    label: "Ingresar",
    icon: RiSystemLoginBoxLine,
    role: ["guest"],
  },
  {
    path: RoutesEnum.Registers,
    label: "Registros",
    icon: RiBusinessLineChartLine,
    role: ["user"],
  },
];
