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
  target: { x: number; y: number };
  source: { x: number; y: number };
  over: [x: number, y: number] | undefined;
  setOver: (x: number, y: number) => void;
  update(
    x: number,
    y: number,
    property: "wall" | "start" | "target",
    value: boolean
  ): void;
  active: boolean;
  setActive: (v: boolean) => void;
  updateTarget: (x: number, y: number) => void;
  updateSource: (x: number, y: number) => void;
}>((set) => {
  return {
    grid: createNewGrid(10, 10),
    over: undefined,
    setOver(x, y) {
      set((state) => ({ ...state, over: [x, y] }));
    },
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
    active: true,
    setActive(v) {
      set((state) => ({ ...state, active: v }));
    },
    target: { x: 0, y: 0 },
    updateTarget(x, y) {
      set((state) => ({ ...state, target: { x, y } }));
    },
    source: { x: 9, y: 9 },
    updateSource(x, y) {
      set((state) => ({ ...state, target: { x, y } }));
    },
  };
});
