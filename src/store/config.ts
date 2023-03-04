import { ALGORITHMS } from "@/constants";
import { ConfigType } from "@/types/config";
import { create } from "zustand";

const useConfigStore = create<ConfigType>((set) => ({
  algorithm: ALGORITHMS.DIJSKTRA,
}));
