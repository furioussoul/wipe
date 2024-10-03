import { useKeyEventWatcher } from "../../hooks/useKeyEventWatcher";
import { useFrame } from "../../frame";

export const KeyboardHandler = () => {
  const { document: iframeDoc } = useFrame();
  useKeyEventWatcher(iframeDoc);
  return null;
};
