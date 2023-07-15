import {
  RiBuildingsHome4Line,
  RiBusinessLineChartLine,
  RiFinanceMoneyDollarCircleLine,
  RiFinanceShoppingCart2Line,
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
    path: RoutesEnum.Incomes,
    label: "Ingresos",
    icon: RiBusinessLineChartLine,
    role: ["user"],
  },
  {
    path: RoutesEnum.Outcomes,
    label: "Compras",
    icon: RiFinanceShoppingCart2Line,
    role: ["user"],
  },
  {
    path: RoutesEnum.Payments,
    label: "Pagos",
    icon: RiFinanceMoneyDollarCircleLine,
    role: ["user"],
  },
];
