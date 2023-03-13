import { CameraShake } from "@react-three/drei";
import { useThree, useFrame } from "@react-three/fiber";
import { FC, useEffect, useState } from "react";
import { Vector3 } from "three";

export const Rig: FC<{ interval: number }> = ({ interval }) => {
  const [vec] = useState(() => new Vector3());
  const { camera, mouse } = useThree();
  // useFrame(() => camera.position.lerp(vec.set(mouse.x * 2, 1, 60), 0.05));
  const node = (
    <CameraShake
      maxYaw={0.02}
      maxPitch={0.02}
      maxRoll={0.02}
      yawFrequency={10}
      pitchFrequency={10}
      rollFrequency={10}
    />
  );
  const [shake, setShake] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setShake(false);
    }, interval);
    return () => clearTimeout(timer);
  }, []);
  return shake ? node : null;
};
