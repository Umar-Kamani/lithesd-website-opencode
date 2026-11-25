/**
 * Minimal Lexical document builder.
 *
 * Used by seed data and any server-side content generation. Payload stores
 * rich text as a Lexical `root` node — this helper keeps hand-written seed
 * content readable without pulling in the editor bundle.
 */

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "quote"; text: string };

const textNode = (text: string) => ({
  type: "text",
  text,
  detail: 0,
  format: 0,
  mode: "normal",
  style: "",
  version: 1,
});

const base = {
  format: "",
  indent: 0,
  version: 1,
  direction: "ltr" as const,
};

function blockNode(block: Block) {
  switch (block.type) {
    case "h2":
    case "h3":
      return {
        ...base,
        type: "heading",
        tag: block.type,
        children: [textNode(block.text)],
      };
    case "ul":
      return {
        ...base,
        type: "list",
        listType: "bullet",
        tag: "ul",
        start: 1,
        children: block.items.map((item, index) => ({
          ...base,
          type: "listitem",
          value: index + 1,
          checked: undefined,
          children: [textNode(item)],
        })),
      };
    case "quote":
      return {
        ...base,
        type: "quote",
        children: [textNode(block.text)],
      };
    case "p":
    default:
      return {
        ...base,
        type: "paragraph",
        textFormat: 0,
        textStyle: "",
        children: [textNode(block.text)],
      };
  }
}

export function lexical(blocks: Block[]) {
  return {
    root: {
      type: "root",
      format: "",
      indent: 0,
      version: 1,
      direction: "ltr" as const,
      children: blocks.map(blockNode),
    },
  };
}
