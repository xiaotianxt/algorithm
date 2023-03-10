import { create } from "zustand";
import { useConfigStore } from "./config";
import { StateLocation } from "@/utils/three";

export type CellState = {
  row: number;
  col: number;
  wall: boolean;
  start: boolean;
  target: boolean;
  path: boolean;
};

const createNewGrid = (row: number, col: number) => {
  return [...Array(row)].map((_, i) =>
    [...Array(col)].map((_, j) => ({
      row: j,
      col: i,
      wall: false,
      start: false,
      target: false,
      path: false,
    }))
  );
};

export const useGameStore = create<{
  grid: CellState[][];
  target: { row: number; col: number };
  source: { row: number; col: number };
  over: { row: number; col: number } | undefined;
  setOver: (row: number, col: number) => void;
  update(
    x: number,
    y: number,
    property: Exclude<keyof CellState, "row" | "col">,
    value: boolean
  ): void;
  active: boolean;
  setActive: (v: boolean) => void;
  updateTarget: (over: { row: number; col: number }) => void;
  updateSource: (over: { row: number; col: number }) => void;
  updatePath: (path: StateLocation[]) => void;
}>((set) => {
  return {
    grid: createNewGrid(10, 10),
    over: undefined,
    setOver(row, col) {
      set((state) => ({ ...state, over: { row, col } }));
    },
    update(row, col, property, value) {
      set((state) => {
        state.grid[row][col][property] = value;
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
    target: { row: 0, col: 0 },
    updateTarget(over) {
      set((state) => ({ ...state, target: over }));
    },
    source: { row: 9, col: 9 },
    updateSource(over) {
      set((state) => ({ ...state, source: over }));
    },
    updatePath(path) {
      set((state) => {
        const grid = state.grid.map((row) =>
          row.map((item) => ({ ...item, path: false }))
        );
        path.forEach((item) => {
          grid[item.row][item.col].path = true;
        });
        return {
          ...state,
          grid,
        };
      });
    },
  };
});
