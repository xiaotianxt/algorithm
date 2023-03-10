import { LEFT_MOUSE_BUTTON, RIGHT_MOUSE_BUTTON } from "@/constants";
import { ThreeElements } from "@react-three/fiber";
import { animated, useSpring } from "@react-spring/web";
import { Vector3 } from "three";
import { useConfigStore } from "@/store/config";
import { Cell, useGameStore } from "@/store/game";
import { useMemo, useState } from "react";

export function SimpleBox({
  state,
  hover,
  ...props
}: ThreeElements["mesh"] & { state: Cell; hover: boolean }) {
  return (
    <mesh {...props}>
      <boxGeometry args={[0.9, 0.9, 0.9]} />
      <meshStandardMaterial
        color={hover ? "hotpink" : state.wall ? "crimson" : "darkorange"}
      />
    </mesh>
  );
}

const AnimatedBox = animated(SimpleBox);

export function Cell({
  rowid,
  colid,
  ...props
}: ThreeElements["mesh"] & { rowid: number; colid: number }) {
  const [hover, setHover] = useState(false);

  const { row, col } = useConfigStore();
  const { update, grid } = useGameStore();

  const { position } = useSpring({
    position: grid[rowid][colid].wall
      ? [colid - col / 2, rowid - row / 2, 1]
      : [colid - col / 2, rowid - row / 2, 0],
  });

  const state = grid[rowid][colid];

  return (
    <AnimatedBox
      castShadow
      receiveShadow
      state={state}
      hover={hover}
      position={position as unknown as Vector3}
      onPointerOver={(event) => {
        event.stopPropagation();
        setHover(true);
      }}
      onPointerOut={(event) => {
        event.stopPropagation();
        setHover(false);
      }}
      onPointerDown={(event) => {
        event.stopPropagation();
        switch (event.button) {
          case RIGHT_MOUSE_BUTTON:
            break;
          case LEFT_MOUSE_BUTTON:
            update(rowid, colid, "wall", !state.wall);
            break;
        }
      }}
      {...props}
    />
  );
}
