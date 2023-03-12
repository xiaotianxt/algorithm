import { useEffect, useState } from "react";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { Group, Material, Matrix4, Mesh } from "three";

export default function ObjToPrimitive({
  url,
  mat,
}: {
  url: string;
  mat: Material;
}) {
  const [obj, setObj] = useState<Group>();
  useEffect(() => {
    const rotationMatrix = new Matrix4().makeRotationX(Math.PI / 2);

    new OBJLoader().load(url, (obj) => {
      if (obj) {
        obj.traverse((child) => {
          if (child instanceof Mesh) {
            child.material = mat;
            child.castShadow = true;
            child.receiveShadow = true;
            child.geometry.computeVertexNormals();
          }
        });
        obj.applyMatrix4(rotationMatrix);
        obj.castShadow = true;
        obj.receiveShadow = true;
        setObj(obj);
      }
    });
  }, [url, mat]);

  return obj ? <primitive object={obj} /> : <></>;
}
