import { ComponentProps, FC } from "react";

export const Index: FC<ComponentProps<"div">> = ({ ...rest }) => {
  return <div {...rest}></div>;
};

export default Index;
