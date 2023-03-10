import { LEFT_MOUSE_BUTTON, RIGHT_MOUSE_BUTTON } from "@/constants";
import { ThreeElements, useFrame } from "@react-three/fiber";
import { useRef, useReducer, useEffect, useMemo } from "react";
import { CellState, defaultCellState } from "../types";
import { animated, useSpring } from "@react-spring/web";
import { Vector3 } from "three";

export function SimpleBox({
  state,
  ...props
}: ThreeElements["mesh"] & { state: CellState }) {
  return (
    <mesh {...props}>
      <boxGeometry args={[0.9, 0.9, 0.9]} />
      <meshStandardMaterial
        color={state.hover ? "hotpink" : state.wall ? "crimson" : "darkorange"}
      />
    </mesh>
  );
}

const AnimatedBox = animated(SimpleBox);

export function Cell({
  row,
  col,
  ...props
}: ThreeElements["mesh"] & { row: number; col: number }) {
  const [state, dispatch] = useReducer(
    (state: CellState, newState: Partial<CellState>) => ({
      ...state,
      ...newState,
    }),
    defaultCellState
  );

  const { position } = useSpring({
    position: state.wall ? [col, row, 1] : [col, row, 0],
  });

  return (
    <AnimatedBox
      castShadow
      receiveShadow
      state={state}
      position={position as unknown as Vector3}
      {...props}
      onPointerOver={(event) => {
        event.stopPropagation();
        dispatch({ hover: true });
      }}
      onPointerOut={(event) => {
        event.stopPropagation();
        dispatch({ hover: false });
      }}
      onPointerDown={(event) => {
        event.stopPropagation();
        event.button == RIGHT_MOUSE_BUTTON && dispatch({});
        event.button == LEFT_MOUSE_BUTTON && dispatch({ wall: !state.wall });
      }}
    />
  );
}
