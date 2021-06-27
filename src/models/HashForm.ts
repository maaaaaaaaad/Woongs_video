import { Hashs } from "./VideoForm";

export const hashForm = (item: string): Hashs => {
  return item.split(",").map((tag: string) => `#${tag}`);
};
