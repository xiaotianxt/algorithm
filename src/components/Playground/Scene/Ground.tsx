import { FC, useMemo } from "react";
import { Cell } from "./Cell";

export const Ground: FC<{
  row: number;
  col: number;
}> = ({ row, col }) => {
  const nodes = useMemo(
    () =>
      new Array(row).fill(0).map((_, rowid) =>
        new Array(col).fill(0).map((_, colid) => {
          return <Cell key={`${rowid}-${colid}`} colid={colid} rowid={rowid} />;
        })
      ),
    [row, col]
  );

  return <>{nodes}</>;
};
