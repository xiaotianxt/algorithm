import { ComponentProps, FC, useMemo, useState } from "react";
import Logo from "../Logo";
import { MenuList } from "../Menu";
import { ALGORITHM, MENU_NAME } from "@/constants";
import { Menu } from "../Menu/types";
import { useConfigStore } from "@/store/config";
import Control from "@/components/Control";

export const Index: FC<ComponentProps<"div">> = () => {
  const { algorithm, updateAlgorithm } = useConfigStore();
  const [hidden, setHidden] = useState(true);
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
    <div className="flex flex-col w-full bg-slate-700 p-2 sm:flex-row sm:justify-between">
      <div className="duration-100 flex flex-col items-center justify-around mx-2 sm:flex-row sm:space-x-3">
        <Logo
          className="aspect-square w-10"
          onClick={(e) => setHidden((v) => !v)}
        />
        <MenuList
          items={menu}
          className={`transition-all ease-in-out ${hidden && "hidden"} sm:flex`}
        />
      </div>
      <div className="flex items-center">
        <Control />
      </div>
    </div>
  );
};

export default Index;
