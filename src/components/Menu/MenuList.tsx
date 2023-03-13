import { FC, HTMLAttributes, useMemo } from "react";
import { MenuItem } from ".";
import { Menu } from "./types";

export const Index: FC<
  HTMLAttributes<HTMLUListElement> & {
    items: Menu[];
  }
> = ({ items, ...props }) => {
  const menuComponents = useMemo(
    () => items.map((item) => <MenuItem key={item.name} {...item} />),
    [items]
  );
  return (
    <ul
      {...props}
      className={
        `text-white font-mono font-light z-50 flex flex-col items-center ` +
        `sm:flex-row sm:space-x-4` +
        props.className
      }
    >
      {menuComponents}
    </ul>
  );
};

export default Index;
