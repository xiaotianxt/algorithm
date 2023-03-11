import { ThreeElements } from "@react-three/fiber";
import { FC, useEffect, useState } from "react";
import { animated, useSpring } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import { Plane, Ray, Vector3 } from "three";
import { useGameStore } from "@/store/game";

const plane = new Plane(new Vector3(0, 0, 0.5));

const Ball: FC<ThreeElements["mesh"]> = ({ ...props }) => {
  const [hover, setHover] = useState(false);
  return (
    <mesh
      {...props}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHover(true);
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setHover(false);
      }}
    >
      <sphereGeometry args={[0.35, 32, 32]} />
      <meshStandardMaterial color={hover ? "hotpink" : "LightSeaGreen"} />
    </mesh>
  );
};

export const AnimatedBall = animated(Ball);

export const JumpingBall: FC<
  ThreeElements["mesh"] & {
    drag: boolean;
    setDrag: (v: boolean) => void;
  }
> = ({ drag, setDrag, ...props }) => {
  const [pos, setPos] = useState([0, 0, 1]);
  const [{ position }, api] = useSpring(() => ({
    position: pos,
  }));

  const { over } = useGameStore();

  useEffect(() => {
    !drag && over && api.start({ position: [over[1] - 5, over[0] - 5, 1] });
  }, [drag]);

  const plainIntersectPoint = new Vector3();
  const bind = useDrag(({ active, timeStamp, event }) => {
    if (active) {
      const ray = (event as any).ray as Ray;
      ray.intersectPlane(plane, plainIntersectPoint);
      setPos([plainIntersectPoint.x, plainIntersectPoint.y, pos[2]]);
    }

    setDrag(active);

    api.start({
      position: pos,
    });

    return timeStamp;
  });
  const bindEventsHandler = bind();

  return (
    <AnimatedBall
      position={position}
      {...(bindEventsHandler as any)}
      {...props}
      onPointerUp={(e, ...args) => {
        e.stopPropagation();
        bindEventsHandler.onPointerUp?.call(this, e as any, ...args);
      }}
      onPointerDown={(e, ...args) => {
        e.stopPropagation();
        bindEventsHandler.onPointerDown?.call(this, e as any, ...args);
      }}
    >
      <sphereGeometry args={[0.35, 32, 32]} />
      <meshStandardMaterial color={"hotpink"} />
    </AnimatedBall>
  );
};
