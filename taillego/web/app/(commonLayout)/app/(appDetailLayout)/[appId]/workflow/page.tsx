'use client'

import { memo, useMemo } from "react";
import TextUpdaterNode from '@/app/components/workflow/nodes/demo/TextUpdaterNode'
import { ReactFlow } from "@xyflow/react";

const Page = () => {
  const nodeTypes = useMemo(() => ({ textUpdater: TextUpdaterNode }), []);
  const nodes = [
    {
      id: 'node-1',
      type: 'textUpdater',
      position: { x: 0, y: 0 },
      data: { value: 123 },
    },
  ];
 
  return <ReactFlow nodeTypes={nodeTypes} nodes={nodes}/>;
}

export default memo(Page)
