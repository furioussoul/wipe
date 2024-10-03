"use client";

import React, { Suspense, useState } from "react";
import { motion } from "framer-motion";
import { Image, Layers, Settings, Type } from "lucide-react";
import { BlockPropsEditor, ChaiBuilderCanvas, Outline, ScreenSizes, UndoRedo } from "../core/main";
import { ScrollArea, TooltipProvider } from "../ui";

const Toolbar = () => {
  return (
    <div className="flex h-10 w-full items-center justify-between border-b border-gray-300 bg-white p-2 shadow">
      <div className="flex items-center space-x-2">
        <div className="flex items-center space-x-2">
          <span className="text-xs text-gray-600">Selecione um componente para começar a editar</span>
        </div>
      </div>
    </div>
  );
};

export default function CustomLayout() {
  const [activePanelIndex, setActivePanelIndex] = useState<number | null>(null);

  const menuItems = [
    { icon: <Layers size={24} />, label: "Layers", component: Outline },
    { icon: <Settings size={24} />, label: "Settings", component: BlockPropsEditor },
    { icon: <Type size={24} />, label: "Typography", component: () => <div>Typography</div> },
    { icon: <Image size={24} />, label: "Images", component: () => <div>Images</div> },
  ];

  const handleMenuItemClick = (index: number) => {
    setActivePanelIndex(activePanelIndex === index ? null : index);
  };

  return (
    <TooltipProvider>
      <div className="flex h-screen flex-col overflow-hidden">
        {/* Topbar */}
        <div className="flex h-16 items-center justify-between bg-blue-600 px-4 text-white">
          <h1 className="ml-4 text-xl font-bold">Custom Layout</h1>
          <div className={`flex items-center space-x-2`}>
            <ScreenSizes />
            |
            <UndoRedo />
          </div>
          <div className="space-x-2">buttons</div>
        </div>

        <div className="flex flex-1">
          {/* Sidebar */}
          <div className="flex w-16 flex-col items-center bg-blue-600 py-4">
            {menuItems.map((item, index) => (
              <button
                key={index}
                className={`mb-4 rounded-lg p-2 transition-colors ${
                  activePanelIndex === index ? "bg-blue-500 text-white" : "hover:bg-gray-300"
                }`}
                onClick={() => handleMenuItemClick(index)}>
                {item.icon}
              </button>
            ))}
          </div>

          {/* Side Panel */}
          <motion.div
            className="h-full overflow-hidden border-r border-gray-300 bg-white"
            initial={{ width: 0 }}
            animate={{ width: activePanelIndex !== null ? 300 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}>
            {activePanelIndex !== null && (
              <ScrollArea className="h-full">
                <div className="flex flex-col p-4">
                  <h2 className="mb-4 h-10 text-base font-bold">{menuItems[activePanelIndex].label}</h2>

                  <div>
                    <Suspense fallback={<div>Loading...</div>}>
                      {React.createElement(menuItems[activePanelIndex].component, {})}
                    </Suspense>
                  </div>
                </div>
              </ScrollArea>
            )}
          </motion.div>

          {/* Main Content / Canvas */}
          <motion.div
            className="flex-1 bg-gray-100"
            animate={{ marginLeft: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}>
            <div className="flex h-full w-full flex-col items-center justify-center rounded-lg bg-transparent">
              <Toolbar />
              <div className="mt-1 w-full flex-1">
                <Suspense fallback={<div>Loading...</div>}>
                  <ChaiBuilderCanvas />
                </Suspense>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </TooltipProvider>
  );
}
