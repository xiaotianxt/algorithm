import { CameraControls } from "@react-three/drei";
import Control from "../../Control";
import { Canvas } from "@react-three/fiber";
import { ComponentProps, FC } from "react";
import { Ground } from "./Ground";
import { JumpingBall } from "./JumpingBall";

export const Scene = () => {
  return (
    <Canvas
      orthographic
      camera={{
        zoom: 50,
        position: [0, 0, 10],
      }}
      style={{ background: "rgb(203 213 225)" }}
    >
      <ambientLight />
      {/* <directionalLight position={[10, 10, 10]} /> */}
      <pointLight position={[10, 10, 10]} />
      <Ground row={10} col={10} />
      <JumpingBall />
      <CameraControls
        makeDefault
        onUpdate={(self) => {
          self.polarAngle = Math.PI / 2 + 0.3;
          self.azimuthAngle = -Math.PI / 8;
        }}
        minPolarAngle={Math.PI / 2 + 0.1}
        maxPolarAngle={(Math.PI / 3) * 2}
        maxAzimuthAngle={Math.PI / 3}
        minAzimuthAngle={-Math.PI / 3}
        maxZoom={50}
        minZoom={30}
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
