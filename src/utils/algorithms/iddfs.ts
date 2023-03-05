import { Algorithm } from ".";
import { DFSAlgorithm } from "./dfs";
import { PileGraph, Solution } from "./types";

const MAX_DEPTH = 100;
export class IDDFSAlgorithm implements Algorithm {
  solve(start: number, target: number, graph: PileGraph): Solution {
    if (start === target) return [];
    const dfsAlgorithm = new DFSAlgorithm();
    for (let depth = 0; depth < MAX_DEPTH; depth++) {
      const path = dfsAlgorithm.solveWithDepth(start, target, graph, depth);
      if (path.length) {
        return path;
      }
    }
    return [];
  }
}
