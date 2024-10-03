import React, { Suspense } from "react";
import { useBuilderProp, usePreviewMode } from "../hooks";
import { Button, Skeleton } from "@/app/ui";
import { cn } from "../functions/Functions";
import { useTranslation } from "react-i18next";
import { EyeClosedIcon } from "@radix-ui/react-icons";

export const PreviewScreen = () => {
  const [isPreviewOn, setPreviewMode] = usePreviewMode();
  const { t } = useTranslation();
  const previewComponent = useBuilderProp("previewComponent", null);
  if (!isPreviewOn) return null;
  return (
    <div className={cn("fixed inset-0 z-[999] bg-background", isPreviewOn ? "block" : "hidden")}>
      <Button size="sm" className="absolute right-0 top-0 m-4 space-x-2" onClick={() => setPreviewMode(false)}>
        <EyeClosedIcon />
        <span>{t("Close Preview")}</span>
      </Button>
      <div>
        {previewComponent ? (
          <Suspense fallback={<Skeleton className="h-96 w-full" />}>{React.createElement(previewComponent)}</Suspense>
        ) : null}
      </div>
    </div>
  );
};
