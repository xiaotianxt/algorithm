import { Pile, PileGraph, Solution } from "./types";

export abstract class Algorithm {
  abstract solve(start: Pile, target: Pile, graph: PileGraph): Solution;
}

export function convertGridToGraph(grid: any): PileGraph {
  return {};
}

export { DFSAlgorithm } from "./dfs";
export { IDDFSAlgorithm } from "./iddfs";
export { BFSAlgorithm } from "./bfs";
