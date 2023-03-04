import { Menu } from "@/components/Menu/types";

export enum MENU_NAME {
  ALGORITHMS = "ALGORITHMS",
  CONFIG = "CONFIG",
}

export enum ALGORITHMS {
  DIJSKTRA = "DIJSKTRA",
  ASTAR = "ASTAR",
}

export const menu: Menu[] = [
  { name: MENU_NAME.ALGORITHMS, children: ["Dijsktra", "A Star"] },
  { name: MENU_NAME.CONFIG, children: [] },
];

export const RIGHT_MOUSE_BUTTON = 2;
