import { Cell, useGameStore } from "@/store/game";
import { Pile, PileGraph, Solution } from "./types";

export abstract class Algorithm {
  abstract solve(start: Pile, target: Pile, graph: PileGraph): Solution;
}


function isConnected(x: Cell, y: Cell) {
  if (x.wall || y.wall) return false;
  return Math.abs(x.row - y.row) + Math.abs(x.col - y.col) == 1;
}

export function convertGridToGraph(): PileGraph {
  const grid = useGameStore.getState().grid;
  const m = grid.length, n = grid[0].length;
  const graph: PileGraph = Object.fromEntries([...Array(m * n)].map((_, i) => [i, []]));
  for (let i = 0; i < m - 1; i++) {
    for (let j = 0; j < n - 1; j++) {
      const id = i * n + j;
      if (isConnected(grid[i][j], grid[i + 1][j])) {
        const another = (i + 1) * n + j;
        graph[id].push(another);
        graph[another].push(id);
      }
      if (isConnected(grid[i][j], grid[i][j + 1])) {
        const another = i * n + j + 1;
        graph[id].push(another);
        graph[another].push(id);
      }
    }
  }
  return graph;
}

export { BFSAlgorithm } from "./bfs";
export { DFSAlgorithm } from "./dfs";
export { IDDFSAlgorithm } from "./iddfs";
