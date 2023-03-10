import { ThreeElements } from "@react-three/fiber";
import { FC, useEffect, useReducer } from "react";
import { BallState, defaultBallState } from "../types";
import { animated, useSpring } from "@react-spring/web";

export const Ball: FC<
  ThreeElements["mesh"] & {
    speed?: number;
    height?: number;
    state: BallState;
  }
> = ({ speed = 8, state, height = 1, ...props }) => {
  return (
    <mesh {...props}>
      <sphereGeometry args={[0.35, 32, 32]} />
      <meshStandardMaterial
        color={state?.hover ? "hotpink" : "LightSeaGreen"}
      />
    </mesh>
  );
};

export const AnimatedBall = animated(Ball);

export const JumpingBall = () => {
  const [state, setState] = useReducer(
    (state: BallState, newState: Partial<BallState>) => ({
      ...state,
      ...newState,
    }),
    { ...defaultBallState, position: [0, 0, 1] }
  );

  const { scale } = useSpring({ scale: state.hover ? 1.2 : 1 });

  useEffect(() => {
    document.body.style.cursor = state.hover ? "pointer" : "auto";
  }, [state.hover]);

  return (
    <AnimatedBall
      height={0.5}
      scale={scale}
      position={state.position}
      state={state}
      onPointerEnter={(e) => {
        e.stopPropagation();
        setState({ hover: true });
      }}
      onPointerLeave={(e) => {
        e.stopPropagation();
        setState({ hover: false });
      }}
      onPointerDown={(e) => {
        e.stopPropagation();
      }}
      onPointerUp={(e) => {
        e.stopPropagation();
      }}
    />
  );
};
