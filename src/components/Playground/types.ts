import { Color } from "@react-three/fiber";

export type Position = [x: number, y: number, z: number];

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

export type BallState = {
  direction: "up" | "down";
  hover: boolean;
  bounce: boolean;
  bounceSpeed: number;
  drag: boolean;
  position: Position;
  scale: number;
};

export const defaultBallState: BallState = {
  direction: "up",
  hover: false,
  bounce: true,
  bounceSpeed: 1,
  drag: false,
  position: [0, 0, 0],
  scale: 1,
};