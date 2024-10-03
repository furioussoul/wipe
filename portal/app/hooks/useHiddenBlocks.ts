import { atom, useAtom } from "jotai";
import { includes, without } from "lodash-es";
import { useCallback } from "react";

const hiddenBlockIdsAtom = atom<Array<string>>([]);

export const useHiddenBlockIds = () => {
  const [blockIds, setBlockIds] = useAtom(hiddenBlockIdsAtom);

  const toggleHidden = useCallback(
    (blockId: string) => {
      setBlockIds((prevIds) => (includes(prevIds, blockId) ? without(prevIds, blockId) : [...prevIds, blockId]));
    },
    [setBlockIds],
  );

  return [blockIds, setBlockIds, toggleHidden];
};
