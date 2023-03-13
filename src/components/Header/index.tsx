import { ComponentProps, FC, useMemo } from "react";
import Logo from "../Logo";
import { MenuList } from "../Menu";
import { ALGORITHM, MENU_NAME } from "@/constants";
import { Menu } from "../Menu/types";
import { useConfigStore } from "@/store/config";
import Control from "@/components/Control";

export const Index: FC<ComponentProps<"div">> = () => {
  const { algorithm, updateAlgorithm } = useConfigStore();
  const menu = useMemo<Menu[]>(() => {
    return [
      {
        name: MENU_NAME.ALGORITHMS,
        children: Object.keys(ALGORITHM),
        onChange: updateAlgorithm,
        selectedChildren: algorithm,
      },
      { name: MENU_NAME.CONFIG, children: [] },
    ];
  }, [algorithm]);
  return (
    <div className="flex w-full h-16 bg-slate-700 justify-between">
      <div className="flex items-center space-x-3">
        <Logo />
        <MenuList items={menu} />
      </div>
      <div className="flex items-center">
        <Control />
      </div>
    </div>
  );
};

export default Index;
