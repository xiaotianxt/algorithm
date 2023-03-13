import { ALGORITHM } from "@/constants";
import { create } from "zustand";

export const useConfigStore = create<{
  algorithm: ALGORITHM;
  row: number;
  col: number;
  updateAlgorithm: (v: ALGORITHM) => void;
}>((set) => ({
  algorithm: ALGORITHM.DIJSKTRA,
  row: 10,
  col: 10,
  updateAlgorithm(algorithm: ALGORITHM) {
    set((state) => ({ ...state, algorithm }));
  },
}));
