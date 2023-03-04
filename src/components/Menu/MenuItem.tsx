import { FC, useMemo } from "react";
import { capitalize } from "../../utils";
import { Menu } from "./types";
import "./index.css";

const SubMenuItem: FC<{ name: string; selected: boolean }> = ({
  name,
  selected = false,
}) => {
  return (
    <div className="bg-slate-500 hover:bg-slate-900">
      <button
        className={`h-full w-full block p-2 ${selected ? "bg-blue-800" : ""}`}
      >
        {capitalize(name)}
      </button>
    </div>
  );
};

const SubMenuList: FC<{ children: string[]; selected?: string }> = ({
  children,
  selected,
}) => {
  const subMenuNodes = useMemo(
    () =>
      children.map((child) => (
        <SubMenuItem key={child} name={child} selected={selected === child} />
      )),
    [children]
  );
  return (
    <div className="submenu absolute bg-slate-500 top-[-100%] hidden rounded">
      {subMenuNodes}
    </div>
  );
};

export const Index: FC<Menu> = ({ name, children, selectedChildren }) => {
  return (
    <div className="relative transition-all hover:scale-105 ease-in-out">
      <div className="hover:bg-slate-500 p-2 rounded relative menu-item">
        {capitalize(name)}
      </div>
      <SubMenuList children={children} selected={selectedChildren} />
    </div>
  );
};

export default Index;
