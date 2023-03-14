import { CellState, useGameStore } from "@/store/game";
import { Pile, PileGraph, Solution } from "./types";
import { BFSAlgorithm } from "./bfs";
import { DFSAlgorithm } from "./dfs";
import { IDDFSAlgorithm } from "./iddfs";
import { ALGORITHM } from "@/constants";

export abstract class Algorithm {
  abstract solve(start: Pile, target: Pile, graph: PileGraph): Solution;
}

function isConnected(x: CellState, y: CellState) {
  if (x.wall || y.wall) return false;
  return Math.abs(x.row - y.row) + Math.abs(x.col - y.col) == 1;
}

export function convertGridToGraph(): PileGraph {
  const grid = useGameStore.getState().grid;
  const m = grid.length,
    n = grid[0].length;
  const graph: PileGraph = Object.fromEntries(
    [...Array(m * n)].map((_, i) => [i, []])
  );
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      const id = i * n + j;
      if (i + 1 < m && isConnected(grid[i][j], grid[i + 1][j])) {
        const another = (i + 1) * n + j;
        graph[id].push(another);
        graph[another].push(id);
      }
      if (j + 1 < n && isConnected(grid[i][j], grid[i][j + 1])) {
        const another = i * n + j + 1;
        graph[id].push(another);
        graph[another].push(id);
      }
    }
  }
  return graph;
}

class AlgorithmFactory {
  private algorithms: Partial<Record<ALGORITHM, Algorithm>>;
  constructor() {
    this.algorithms = {
      [ALGORITHM.BFS]: new BFSAlgorithm(),
      [ALGORITHM.DFS]: new DFSAlgorithm(),
      [ALGORITHM.IDDFS]: new IDDFSAlgorithm(),
    };
  }

  getAlgorithm(algorithm: ALGORITHM) {
    if (algorithm in this.algorithms) {
      return this.algorithms[algorithm];
    }
  }
}

export const factory = new AlgorithmFactory();

export { BFSAlgorithm } from "./bfs";
export { DFSAlgorithm } from "./dfs";
export { IDDFSAlgorithm } from "./iddfs";
