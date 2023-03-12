import { ThreeElements, useFrame } from "@react-three/fiber";
import { FC, useEffect, useMemo, useRef, useState } from "react";
import { animated, useSpring } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import { Mesh, MeshBasicMaterial, Plane, Ray, Vector3 } from "three";
import { useGameStore } from "@/store/game";
import ObjToPrimitive from "@/utils/three";

const plane = new Plane(new Vector3(0, 0, 0.5));

const Star: FC<ThreeElements["mesh"]> = ({ ...props }) => {
  const [hover, toggle] = useState(false);
  const mat = useMemo(
    () => new MeshBasicMaterial({ color: hover ? "hotpink" : "DodgerBlue" }),
    [hover]
  );
  return (
    <mesh
      {...props}
      scale={[0.05, 0.05, 0.15]}
      castShadow
      receiveShadow
      onPointerOver={(e) => {
        e.stopPropagation();
        toggle(true);
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        toggle(false);
      }}
    >
      <ObjToPrimitive url="/star.obj" mat={mat} />
    </mesh>
  );
};

export const AnimatedStar = animated(Star);

export const JumpingStar: FC<{
  drag: boolean;
  setDrag: (v: boolean) => void;
}> = ({ drag, setDrag, ...props }) => {
  const [pos, setPos] = useState([0, 0, 1]);
  const ref = useRef<Mesh>(null!);
  const [{ position }, api] = useSpring(() => ({
    position: pos,
  }));

  const { over, updateTarget } = useGameStore();

  useEffect(() => {
    !drag && over && api.start({ position: [over[1] - 5, over[0] - 5, 1] });
  }, [drag]);

  const plainIntersectPoint = new Vector3();
  const bind = useDrag(({ active, timeStamp, event }) => {
    if (active) {
      const ray = (event as any).ray as Ray;
      ray.intersectPlane(plane, plainIntersectPoint);
      setPos([plainIntersectPoint.x, plainIntersectPoint.y, pos[2]]);
    } else {
      over && updateTarget(...over);
    }

    setDrag(active);

    api.start({
      position: pos,
    });

    return timeStamp;
  });
  const bindEventsHandler = bind();

  return (
    <AnimatedStar
      position={position}
      {...(bindEventsHandler as any)}
      {...props}
      ref={ref}
      onPointerUp={(e, ...args) => {
        e.stopPropagation();
        bindEventsHandler.onPointerUp?.call(this, e as any, ...args);
      }}
      onPointerDown={(e, ...args) => {
        e.stopPropagation();
        bindEventsHandler.onPointerDown?.call(this, e as any, ...args);
      }}
    />
  );
};
