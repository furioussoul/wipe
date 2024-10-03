import { DragPreviewProps } from "react-arborist";
import { memo, useMemo } from "react";
import { useBlocksStore } from "../../../../../hooks";
import { ChaiBlock } from "../../../../../types/types";
import { TypeIcon } from "../TypeIcon";

const Overlay = memo(function Overlay({ children, isDragging }: { children: JSX.Element; isDragging: boolean }) {
  if (!isDragging) return null;

  return <div className="pointer-events-none fixed left-0 top-0 z-[100] h-full w-full">{children}</div>;
});

export const DefaultDragPreview = memo(({ id, isDragging, mouse }: Omit<DragPreviewProps, "dragIds" | "offset">) => {
  const [allBlocks] = useBlocksStore();

  const block: ChaiBlock | undefined = useMemo(() => {
    return allBlocks.find((block) => block._id === id);
  }, [allBlocks, id]);

  const style = useMemo(
    () => ({
      transform: `translate(${mouse?.x - 10}px, ${mouse?.y - 10}px)`,
    }),
    [mouse],
  );

  if (!mouse) {
    return <div className="hidden" />;
  }

  return (
    <div>
      <Overlay isDragging={isDragging}>
        <div
          className="pointer-events-none absolute z-50 rounded border border-gray-200 bg-gray-100/80 font-semibold text-blue-600 shadow-md dark:border-gray-700 dark:bg-gray-800"
          style={style}>
          <button type="button" className="flex !cursor-grab items-center p-0.5" aria-label={`Type: ${block?._type}`}>
            <div className="-mt-0.5 h-3 w-3">
              <TypeIcon type={block?._type} />
            </div>
            <div className="ml-2 truncate text-[11px]">{block?._name || block?._type}</div>
          </button>
        </div>
      </Overlay>
    </div>
  );
});
