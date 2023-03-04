import { ComponentProps, FC } from "react";
import Logo from "./components/Logo";
import { MenuList } from "./components/Menu";
import { menu } from "./constants";

export const Index: FC<ComponentProps<"div">> = () => {
  return (
    <div className="w-full h-16 bg-slate-700 flex items-center space-x-3">
      <Logo />
      <MenuList items={menu} />
    </div>
  );
};

export default Index;
