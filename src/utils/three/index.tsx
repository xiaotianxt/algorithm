import { useEffect, useState } from "react";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { Group, Material, Matrix4, Mesh } from "three";
import { useGameStore } from "@/store/game";
import { useConfigStore } from "@/store/config";

export default function ObjToPrimitive({
  url,
  mat,
}: {
  url: string;
  mat: Material;
}) {
  const [obj, setObj] = useState<Group>();
  useEffect(() => {
    const rotationMatrix = new Matrix4().makeRotationX(Math.PI / 2);

    new OBJLoader().load(url, (obj) => {
      if (obj) {
        obj.traverse((child) => {
          if (child instanceof Mesh) {
            child.material = mat;
            child.castShadow = true;
            child.receiveShadow = true;
            child.geometry.computeVertexNormals();
          }
        });
        obj.applyMatrix4(rotationMatrix);
        obj.castShadow = true;
        obj.receiveShadow = true;
        setObj(obj);
      }
    });
  }, [url, mat]);

  return obj ? <primitive object={obj} /> : <></>;
}

export function stateOfCell(state: StateLocation): CellType;
export function stateOfCell(row: number, col: number): CellType;
export function stateOfCell(
  rowOrState: number | StateLocation,
  col?: number
): CellType {
  if (typeof rowOrState === "object") {
    col = rowOrState.col;
    rowOrState = rowOrState.row;
  } else {
    col = col!;
  }
  const { target, source, grid } = useGameStore.getState();
  if (target.row === rowOrState && target.col === col) {
    return "target";
  } else if (source.row === rowOrState && source.col === col) {
    return "source";
  }

  return grid[rowOrState][col].wall ? "wall" : "cell";
}

export type CellType = "cell" | "target" | "source" | "wall";
export type GeoLocation = [x: number, y: number, z?: number];
export type StateLocation = { row: number; col: number };

export function transform(state: StateLocation): GeoLocation;
export function transform(geo: GeoLocation): StateLocation;
export function transform(
  loc: StateLocation | GeoLocation
): StateLocation | GeoLocation {
  const { row, col } = useConfigStore.getState();
  if (Array.isArray(loc)) {
    return { row: loc[0] + col / 2, col: loc[1] + row / 2 };
  } else {
    return [loc.col - col / 2, loc.row - row / 2];
  }
}
