import {
  RiBuildingsHome4Line,
  RiBusinessLineChartLine,
  RiFinanceCoinsLine,
  RiSystemLoginBoxLine,
} from "solid-icons/ri";
import { NavItemI } from "~/models/navItem.model";
import { RoutesEnum } from "./routes";
export const navRoutes: NavItemI[] = [
  {
    path: RoutesEnum.Home,
    label: "Inicio",
    icon: RiBuildingsHome4Line,
    role: ["user"],
  },
  {
    path: "",
    label: "Inicio",
    icon: RiBuildingsHome4Line,
    role: ["guest"],
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
    icon: RiFinanceCoinsLine,
    role: ["user"],
  },
  {
    path: RoutesEnum.Statistics,
    label: "Estadísticas",
    icon: RiBusinessLineChartLine,
    role: ["user"],
  },
];
