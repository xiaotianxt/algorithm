import { ALGORITHMS } from "@/constants";
import { ConfigType } from "@/types/config";
import { create } from "zustand";

export const useConfigStore = create<ConfigType>((set) => ({
  algorithm: ALGORITHMS.DIJSKTRA,
  row: 10,
  col: 10,
}));
