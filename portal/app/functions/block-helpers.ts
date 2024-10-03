import { get, has, memoize } from "lodash-es";
import { getBlockComponent } from "@chaibuilder/runtime";

type BlockDefinition = {
  canAcceptBlock?: (target: string) => boolean;
  canDelete?: () => boolean;
  canDuplicate?: () => boolean;
  canMove?: () => boolean;
  canBeNested?: (target: string) => boolean;
};

export const canAcceptChildBlock = memoize((parentType: string, childType: string) => {
  if (!parentType) return true; // this is root
  const blockDefinition = getBlockComponent(parentType) as BlockDefinition;
  if (!blockDefinition) return false;
  return has(blockDefinition, "canAcceptBlock") ? blockDefinition.canAcceptBlock(childType) : false; //defaults to false
});

export const canBeNestedInside = memoize((parentType: string, childType: string) => {
  const blockDefinition = getBlockComponent(childType) as BlockDefinition;
  if (!blockDefinition) return true;
  return has(blockDefinition, "canBeNested") ? blockDefinition.canBeNested(parentType) : true;
});

export const canDuplicateBlock = memoize((type: string) => {
  const blockDefinition = getBlockComponent(type) as BlockDefinition;
  if (!blockDefinition) return true;
  return has(blockDefinition, "canDuplicate") ? blockDefinition.canDuplicate() : true;
});

export const canDeleteBlock = memoize((type: string) => {
  const blockDefinition = getBlockComponent(type) as BlockDefinition;
  if (!blockDefinition) return true;
  return has(blockDefinition, "canDelete") ? blockDefinition.canDelete() : true;
});

export const canDropBlock = (_currentTree: any, { dragSource, dropTarget }: any) => {
  const dragSourceType = get(dragSource, "data._type", "");
  const dropTargetType = get(dropTarget, "data._type", "");
  return canAcceptChildBlock(dropTargetType, dragSourceType);
};
