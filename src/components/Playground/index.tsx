import { CameraControls } from "@react-three/drei";
import Control from "../Control";
import { Canvas, ThreeElements, useFrame } from "@react-three/fiber";
import {
  ComponentProps,
  FC,
  useCallback,
  useMemo,
  useReducer,
  useRef,
} from "react";
import { CellState, defaultCellState } from "./types";
import { RIGHT_MOUSE_BUTTON } from "@/constants";

function Cell(props: ThreeElements["mesh"]) {
  const ref = useRef<THREE.Mesh>(null!);

  const [{ hover, wall }, dispatch] = useReducer(
    (state: CellState, newState: Partial<CellState>) => ({
      ...state,
      ...newState,
    }),
    defaultCellState
  );

  useFrame((state, delta) => {
    if (wall && ref.current.position.z < 0.2) {
      ref.current.position.z += delta;
    } else if (!wall && ref.current.position.z > 0) {
      ref.current.position.z -= delta;
    }
  });

  return (
    <mesh
      {...props}
      ref={ref}
      onClick={(event) => {
        event.stopPropagation();
        dispatch({ wall: !wall });
      }}
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
      }}
    >
      <boxGeometry args={[0.9, 0.9, 0.9]} />
      <meshStandardMaterial
        color={hover ? "hotpink" : wall ? "crimson" : "darkorange"}
      />
    </mesh>
  );
}

const Grid: FC<{
  row: number;
  col: number;
}> = ({ row, col }) => {
  const nodes = useMemo(
    () =>
      new Array(row).fill(0).map((_, rowid) =>
        new Array(col).fill(0).map((_, colid) => {
          return (
            <Cell
              key={`${rowid}-${colid}`}
              position={[colid - col / 2, rowid - row / 2, 0]}
            />
          );
        })
      ),
    [row, col]
  );

  return <> {nodes}</>;
};

const Scene = () => {
  // init camera
  const measuredRef = useCallback((node: any) => {
    if (node !== null) {
      console.log(node);
      node.rotate(-0.2, 0.2, 0);
    }
  }, []);

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
      <Grid row={10} col={10} />
      <CameraControls
        ref={measuredRef}
        makeDefault
        onStart={(e) => {
          console.log(e);
        }}
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
