import { Block } from "./Block";

export interface Node {
  online: boolean;
  name: string;
  url: string;
  loading: boolean;
  expanded: boolean;
  blocks: Block[];
  loadingBlocks: boolean;
  loadingBlocksError: boolean;
}
