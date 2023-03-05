import { Algorithm } from ".";
import { PileGraph, Solution } from "./types";

export class BFSAlgorithm implements Algorithm {
  solve(start: number, target: number, graph: PileGraph): Solution {
    // Keep track of visited nodes and the path to each node
    const visited = new Set<number>();

    // Initialize the queue with the start node and its path
    const queue = [[start, [start]]];

    while (queue.length > 0) {
      // Get the next node and its path from the queue
      const [currentNode, currentPath] = queue.shift() as [number, number[]];

      if (currentNode == target) {
        return currentPath;
      }

      // Visit the node if it hasn't been visited yet
      if (!visited.has(currentNode)) {
        visited.add(currentNode);

        // Add the neighbors of the current node to the queue with their paths
        for (let neighbor of graph[currentNode]) {
          if (!visited.has(neighbor)) {
            const newPath = [...currentPath, neighbor];
            queue.push([neighbor, newPath]);
          }
        }
      }
    }
    return [];
  }
}
