import { Menu } from "@/components/Menu/types";

export enum MENU_NAME {
  ALGORITHMS = "ALGORITHMS",
  CONFIG = "CONFIG",
}

export enum ALGORITHMS {
  DFS = "DFS",
  BFS = "BFS",
  IDDFS = "IDDFS",
  DIJSKTRA = "DIJSKTRA",
  ASTAR = "ASTAR",
}

export const menu: Menu[] = [
  {
    name: MENU_NAME.ALGORITHMS,
    children: ["DFS", "BFS", "IDDFS", "Dijsktra", "A Star"],
  },
  { name: MENU_NAME.CONFIG, children: [] },
];

export const LEFT_MOUSE_BUTTON = 0;
export const RIGHT_MOUSE_BUTTON = 2;
