import { Algorithm } from ".";
import { Pile, PileGraph, Solution } from "./types";

export class DFSAlgorithm implements Algorithm {
  solve(start: number, target: number, graph: PileGraph): Solution {
    return this.solveWithDepth(start, target, graph);
  }

  solveWithDepth(
    start: number,
    target: number,
    graph: PileGraph,
    depth: number = 100
  ): Solution {
    if (start === target) return [];
    let ans: Pile[] = [];
    function dfs(cur: number, curDepth: number) {
      if (cur === target) {
        ans = [...path];
        return true;
      } else if (curDepth >= depth) {
        return false;
      }
      visited.add(cur);
      for (const neighbor of graph[cur]) {
        if (visited.has(neighbor)) continue;
        path.push(neighbor);
        if (dfs(neighbor, curDepth + 1)) {
          return true;
        }
        path.pop();
      }
      return false;
    }
    const path = [start];
    const visited = new Set();
    dfs(start, 0);
    return ans;
  }
}
