import { usePathResolver } from "@/utils/algorithms/hooks";
import { transform } from "@/utils/three";
import { Line } from "@react-three/drei";
import { ThreeElements } from "@react-three/fiber";
import { FC } from "react";
import { Rig } from "./Rig";

export const Path: FC<ThreeElements["mesh"]> = () => {
  const path = usePathResolver();
  const geoLocations = path.map((state) => transform(state, 1));
  return (
    <>
      <mesh>
        {path.length > 0 ? (
          <Line
            points={geoLocations as [number, number][]}
            color="ForestGreen"
          />
        ) : (
          <Rig interval={500} />
        )}
      </mesh>
    </>
  );
};
