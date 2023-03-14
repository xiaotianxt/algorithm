import { useConfigStore } from "@/store/config";
import { useGameStore } from "@/store/game";
import { useMemo } from "react";
import { convertGridToGraph, factory } from ".";
import { StateLocation } from "../three";

export function usePathResolver(): {
  path: StateLocation[];
  gridColor: string[][];
} {
  const { source, target, grid } = useGameStore();
  const { algorithm, col } = useConfigStore();

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

  const gridColor = useMemo<string[][]>(() => {
    const color: string[][] = grid.map((row) =>
      row.map((cell) => (cell.wall ? "crimson" : "darkorange"))
    );
    path.forEach(({ row, col }) => (color[row][col] = "ForestGreen"));
    return color;
  }, [path, grid]);

  return { path, gridColor };
}
