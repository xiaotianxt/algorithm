import { useConfigStore } from "@/store/config";
import { useGameStore } from "@/store/game";
import { useEffect, useMemo } from "react";
import { convertGridToGraph, factory } from ".";
import { StateLocation } from "../three";

export function usePathResolver(): StateLocation[] {
  const { source, target, grid } = useGameStore();
  const { algorithm, col, row } = useConfigStore();

  const path = useMemo<StateLocation[]>(() => {
    const graph = convertGridToGraph();
    const solver = factory.getAlgorithm(algorithm);
    if (solver) {
      const ans = solver.solve(
        col * source.row + source.col,
        col * target.row + target.col,
        graph
      );
      const stateLocations: StateLocation[] = ans.map((item) => ({
        row: Math.floor(item / col),
        col: item % col,
      }));
      return stateLocations;
    } else {
      return [];
    }
  }, [source, target, grid, algorithm]);
  useEffect(() => {
    for (let i = 0; i < row; i++) {
      for (let j = 0; j < col; j++) {
        grid[i][j].path = false;
      }
    }
    for (const state of path) {
      grid[state.row][state.col].path = true;
    }
  }, [path]);

  return path;
}
