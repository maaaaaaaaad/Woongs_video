import { Hashs } from "./VideoForm";

export const hashForm = (item: any): Hashs => {
  return item.split(",").map((tag: string) => `#${tag}`);
};
