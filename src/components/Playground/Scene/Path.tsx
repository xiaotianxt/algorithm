import { useConfigStore } from "@/store/config";
import { usePathResolver } from "@/utils/algorithms/hooks";
import { StateLocation, transform } from "@/utils/three";
import { Line } from "@react-three/drei";
import { ThreeElements, Vector2 } from "@react-three/fiber";
import { FC } from "react";

export const Path: FC<ThreeElements["mesh"]> = () => {
  const path = usePathResolver();
  const { col } = useConfigStore();
  const stateLocations: StateLocation[] = path.map((item) => ({
    row: Math.floor(item / col),
    col: item % col,
  }));
  const geoLocations = stateLocations.map((state) => transform(state, 1));
  return (
    <mesh>
      {path.length > 0 ? (
        <Line points={geoLocations as [number, number][]} />
      ) : null}
    </mesh>
  );
};
