import { Color } from "@react-three/fiber";

export type CellState = {
  color: Color;
  floating: boolean;
  falling: boolean;
  wall: boolean;
  hover: boolean;
};

export const defaultCellState: CellState = {
  color: "hotpink",
  floating: false,
  falling: false,
  hover: false,
  wall: false,
};
