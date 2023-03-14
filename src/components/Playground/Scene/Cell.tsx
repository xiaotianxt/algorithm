import { LEFT_MOUSE_BUTTON, RIGHT_MOUSE_BUTTON } from "@/constants";
import { ThreeElements } from "@react-three/fiber";
import { animated, useSpring } from "@react-spring/web";
import { Vector3 } from "three";
import { CellState, useGameStore } from "@/store/game";
import { FC, memo, useState } from "react";
import { stateOfCell, transform } from "@/utils/three";

export const SimpleBox: FC<
  ThreeElements["mesh"] & { state: CellState; hover: boolean; color: string }
> = ({ state, hover, color, ...props }) => {
  return (
    <mesh {...props}>
      <boxGeometry args={[0.9, 0.9, 0.9]} />
      <meshStandardMaterial color={hover ? "hotpink" : color} />
    </mesh>
  );
};

const AnimatedBox = animated(SimpleBox);

export const Cell: FC<
  ThreeElements["mesh"] & { rowid: number; colid: number; color: string }
> = ({ rowid, colid, color, ...props }) => {
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
      color={color}
    />
  );
};

export default memo(Cell);