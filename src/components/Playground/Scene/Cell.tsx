import { LEFT_MOUSE_BUTTON, RIGHT_MOUSE_BUTTON } from "@/constants";
import { ThreeElements } from "@react-three/fiber";
import { animated, useSpring } from "@react-spring/web";
import { Vector3 } from "three";
import { Cell, useGameStore } from "@/store/game";
import { useEffect, useState } from "react";
import { stateOfCell, transform } from "@/utils/three";

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

const from = -1,
  to = 1;
const ShakingRange = [0, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 1];
const ShakingInterpolate = [from, to, from, to, from, to, from, 200];

export function Cell({
  rowid,
  colid,
  ...props
}: ThreeElements["mesh"] & { rowid: number; colid: number }) {
  const [hover, setHover] = useState(false);

  const { update, grid, setOver, active } = useGameStore();
  const state = grid[rowid][colid];

  // basic position
  const [x0, y0] = transform({ row: rowid, col: colid });

  // shake positioning
  const [{ position }, api] = useSpring(
    () => ({
      position: state.wall ? [x0, y0, 1] : [x0, y0, 0],
    }),
    [state.wall]
  );

  return (
    <AnimatedBox
      castShadow
      receiveShadow
      state={state}
      hover={hover}
      position={position as any as Vector3}
      onPointerOver={(event) => {
        if (!active) return;
        event.stopPropagation();
        setHover(true);
        setOver(rowid, colid);
      }}
      onPointerOut={(event) => {
        if (!active) return;
        event.stopPropagation();
        setHover(false);
      }}
      onPointerDown={(event) => {
        if (!active) return;
        event.stopPropagation();
        const cellState = stateOfCell(rowid, colid);
        if (cellState === "source" || cellState === "target") {
          return;
        }
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
