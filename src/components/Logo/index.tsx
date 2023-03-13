import { FC, HTMLAttributes } from "react";

export const Index: FC<HTMLAttributes<HTMLImageElement>> = ({ ...props }) => {
  return (
    <img
      {...props}
      src="/ai.svg"
      className={`border-content ${props.className}`}
      title="al logo"
    />
  );
};

export default Index;
