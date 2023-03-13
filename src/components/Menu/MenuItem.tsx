import { FC, useMemo } from "react";
import { capitalize } from "../../utils";
import { Menu } from "./types";
import "./index.css";

const SubMenuItem: FC<{
  name: string;
  selectedChildren: boolean;
  handleClick?: (v: any) => void;
}> = ({ name, handleClick, selectedChildren = false }) => {
  return (
    <div className="bg-slate-500 hover:bg-slate-900">
      <button
        className={`h-full w-full block p-2 ${
          selectedChildren ? "bg-blue-800" : ""
        }`}
        onClick={() => handleClick && handleClick(name)}
      >
        {capitalize(name)}
      </button>
    </div>
  );
};

const SubMenuList: FC<{
  children: string[];
  selectedChildren?: string;
  handleClick?: (v: any) => void;
}> = ({ children, selectedChildren, handleClick }) => {
  const subMenuNodes = useMemo(
    () =>
      children.map((child) => (
        <SubMenuItem
          key={child}
          name={child}
          selectedChildren={selectedChildren === child}
          handleClick={handleClick}
        />
      )),
    [children]
  );
  return (
    <div className="submenu absolute bg-slate-500 top-[-100%] hidden rounded">
      {subMenuNodes}
    </div>
  );
};

export const Index: FC<Menu> = ({ name, onChange: handleClick, ...props }) => {
  return (
    <li className="relative transition-all hover:scale-105 ease-in-out">
      <div className="hover:bg-slate-500 p-2 rounded relative menu-item truncate">
        {capitalize(name)}
      </div>
      <SubMenuList handleClick={handleClick} {...props} />
    </li>
  );
};

export default Index;
