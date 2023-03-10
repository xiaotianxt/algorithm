import { ComponentProps, FC } from "react";

export const Index: FC<ComponentProps<"div">> = ({ ...rest }) => {
  return <div {...rest}>Control Panel</div>;
};

export default Index;
