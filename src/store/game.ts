import { create } from "zustand";
import { useConfigStore } from "./config";

export type Cell = {
  x: number;
  y: number;
  wall: boolean;
  start: boolean;
  target: boolean;
};

const createNewGrid = (row: number, col: number) => {
  return [...Array(row)].map((_, i) =>
    [...Array(col)].map((_, j) => ({
      x: j,
      y: i,
      wall: false,
      start: false,
      target: false,
    }))
  );
};

export const useGameStore = create<{
  grid: Cell[][];
  update(
    x: number,
    y: number,
    property: "wall" | "start" | "target",
    value: boolean
  ): void;
}>((set) => {
  return {
    grid: createNewGrid(10, 10),
    update(x, y, property, value) {
      set((state) => {
        state.grid[x][y][property] = value;
        return {
          ...state,
          grid: [...state.grid],
        };
      });
    },
    reset() {
      set((state) => {
        const { row, col } = useConfigStore.getState();
        return {
          ...state,
          grid: createNewGrid(row, col),
        };
      });
    },
  };
});
