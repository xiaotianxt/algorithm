import { CameraControls } from "@react-three/drei";
import Control from "../../Control";
import { Canvas } from "@react-three/fiber";
import { ComponentProps, FC, useMemo, useState } from "react";
import { Ground } from "./Ground";
import { JumpingBall } from "./JumpingBall";
import { OrthographicCamera } from "three";
import { useGameStore } from "@/store/game";

export const Scene = () => {
  const [drag, setDrag] = useState(false);
  const { toggleActive } = useGameStore();
  const camera = useMemo(() => {
    const camera = new OrthographicCamera();
    camera.zoom = 40;
    camera.position.set(1, -1, 10);
    return camera;
  }, []);

  return (
    <Canvas
      camera={camera}
      orthographic
      style={{ background: "rgb(203 213 225)" }}
    >
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Ground row={10} col={10} />
      <JumpingBall drag={drag} setDrag={setDrag} />
      <CameraControls
        makeDefault
        onStart={(e) => toggleActive()}
        onEnd={(e) => toggleActive()}
        minPolarAngle={Math.PI / 2 + 0.1}
        maxPolarAngle={(Math.PI / 3) * 2}
        maxAzimuthAngle={Math.PI / 3}
        minAzimuthAngle={-Math.PI / 3}
        maxZoom={50}
        minZoom={30}
        enabled={!drag}
      />
    </Canvas>
  );
};

export const Playground: FC<ComponentProps<"div">> = ({ ...rest }) => {
  return (
    <div {...rest}>
      <Scene />
      <Control className="fixed right-0 bottom-0 m-4" />
    </div>
  );
};

export default Playground;
