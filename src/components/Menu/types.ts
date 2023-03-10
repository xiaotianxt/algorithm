export type Menu = {
  name: string;
  children: string[];
  selectedChildren?: string;
  onChange?: (value: any) => void;
};
