import { useConfigStore } from "@/store/config";
import { useGameStore } from "@/store/game";
import { useMemo } from "react";
import { convertGridToGraph, factory } from ".";
import { Solution } from "./types";

export function usePathResolver(): Solution {
  const { source, target, grid } = useGameStore();
  const { algorithm, col } = useConfigStore();

  const path = useMemo<Solution>(() => {
    const graph = convertGridToGraph();
    const solver = factory.getAlgorithm(algorithm);
    if (solver) {
      const ans = solver.solve(
        col * source.row + source.col,
        col * target.row + target.col,
        graph
      );
      return ans;
    } else {
      return [];
    }
  }, [source, target, grid, algorithm]);

  return path;
}
