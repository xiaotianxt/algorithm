import { FC, useMemo } from "react";
import { MenuItem } from ".";
import { Menu } from "./types";

export const Index: FC<{
  items: Menu[];
}> = ({ items }) => {
  const menuComponents = useMemo(
    () => items.map((item) => <MenuItem key={item.name} {...item} />),
    [items]
  );
  return (
    <div className="text-white flex font-mono font-light">{menuComponents}</div>
  );
};

export default Index;
