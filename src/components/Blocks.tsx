import { Block as BlockType } from "../types/Block";
import Block from "./Block";

interface Props {
  blocks: BlockType[];
}

export default function Blocks(props: Props) {
  return (
    <div>
      {props.blocks.map((block) => {
        return <Block key={block.id} block={block} />;
      })}
    </div>
  );
}
