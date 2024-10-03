import { TreeApi } from "react-arborist";

export const defaultShortcuts = [
  { key: "ArrowDown", command: "selectNext" },
  { key: "ArrowUp", command: "selectPrev" },
  { key: "ArrowLeft", command: "selectParent", when: "isLeaf || isClosed" },
  { key: "ArrowLeft", command: "close", when: "isOpen" },
  { key: "ArrowRight", command: "open", when: "isClosed" },
  { key: "ArrowRight", command: "selectNext", when: "isOpen" },
  { key: "Home", command: "selectFirst" },
  { key: "End", command: "selectLast" },
];

export function selectFirst(tree: TreeApi<any>) {
  if (tree.firstNode) tree.select(tree.firstNode.id);
}

export function selectLast(tree: TreeApi<any>) {
  if (tree.lastNode) tree.select(tree.lastNode.id);
}

export function selectNext(tree: TreeApi<any>) {
  const next = tree.selectedNodes[0].next || tree.firstNode;
  tree.select(next.id);
}

export function selectPrev(tree: TreeApi<any>) {
  const prev = tree.selectedNodes[0].prev || tree.lastNode;
  tree.select(prev.id);
}

export const selectParent = (tree: TreeApi<any>, when: boolean) => {
  const parent = tree.selectedIds[0]?.parent || null;

  if (parent && when) tree.select(parent.id);
};

export const open = (tree: TreeApi<any>, when: boolean) => {
  const selectedNode = tree.selectedNodes[0];

  if (selectedNode.isInternal && when) selectedNode.open();
};

export const close = (tree: TreeApi<any>, when: boolean) => {
  const selectedNode = tree.selectedNodes[0];

  if (selectedNode.isInternal && when) selectedNode.close();
};
