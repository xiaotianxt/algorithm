import { BFSAlgorithm } from "./bfs";
import { DFSAlgorithm } from "./dfs";
import { IDDFSAlgorithm } from "./iddfs";
import { PileGraph } from "./types";

describe("Algorithms", () => {
  describe("fullConnectedGraph", () => {
    const fullConnctedGraph: PileGraph = {
      ...[...Array(10)].map((_, i) =>
        [...Array(10)].map((_, j) => j).filter((item) => item !== i)
      ),
    };
    test("dfs", () => {
      const dfs = new DFSAlgorithm();
      let path = dfs.solve(0, 9, fullConnctedGraph);
      expect(path).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);

      path = dfs.solve(0, 0, fullConnctedGraph);
      expect(path).toEqual([]);

      path = dfs.solve(1, 0, fullConnctedGraph);
      expect(path).toEqual([1, 0]);

      expect(dfs.solve(5, 3, fullConnctedGraph)).toEqual([5, 0, 1, 2, 3]);
    });

    test("iddfs", () => {
      const iddfs = new IDDFSAlgorithm();
      let path = iddfs.solve(0, 9, fullConnctedGraph);
      expect(path).toEqual([0, 9]);

      path = iddfs.solve(0, 0, fullConnctedGraph);
      expect(path).toEqual([]);
    });

    test("bfs", () => {
      const bfs = new BFSAlgorithm();
      let path = bfs.solve(0, 9, fullConnctedGraph);
      expect(path).toEqual([0, 9]);

      path = bfs.solve(3, 2, fullConnctedGraph);
      expect(path).toEqual([3, 2]);
    });
  });

  describe("oneLineGraph", () => {
    const graph: PileGraph = {
      0: [1],
      1: [2],
      2: [3],
      3: [4],
      4: [5],
      5: [0],
      6: [],
    };

    test("dfs", () => {
      const algorithm = new DFSAlgorithm();
      expect(algorithm.solve(0, 5, graph)).toEqual([0, 1, 2, 3, 4, 5]);
      expect(algorithm.solve(0, 6, graph)).toEqual([]);
    });

    test("iddfs", () => {
      const algorithm = new IDDFSAlgorithm();
      expect(algorithm.solve(0, 5, graph)).toEqual([0, 1, 2, 3, 4, 5]);
      expect(algorithm.solve(3, 2, graph)).toEqual([3, 4, 5, 0, 1, 2]);
      expect(algorithm.solve(0, 6, graph)).toEqual([]);
    });

    test("bfs", () => {
      const algorithm = new BFSAlgorithm();
      expect(algorithm.solve(0, 6, graph)).toEqual([]);
      expect(algorithm.solve(0, 5, graph)).toEqual([0, 1, 2, 3, 4, 5]);
    });
  });
});
