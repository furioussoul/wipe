import { ChaiBlock } from "./ChaiBlock";

export interface CoreBlock {
  blocks?: ChaiBlock[];
  data: any;
  props: { [key: string]: any };
  type: string;
}
