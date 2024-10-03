import { useTranslation } from "react-i18next";
import { useAskAi } from "@/app/hooks/useAskAi";
import { useEffect, useRef, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
  Skeleton,
  Textarea,
  useToast,
} from "@/app/ui";
import { EditIcon, Loader, SparklesIcon } from "lucide-react";
import { useBuilderProp, useSelectedBlockIds } from "../hooks";
import { first, noop } from "lodash-es";
import { FaSpinner } from "react-icons/fa";
import { QuickPrompts } from "./QuickPrompts";
import { Cross2Icon } from "@radix-ui/react-icons";

export const AIUserPrompt = ({ blockId }: { blockId: string | undefined }) => {
  const { t } = useTranslation();
  const { askAi, loading, error } = useAskAi();
  const [prompt, setPrompt] = useState("");
  const promptRef = useRef(null);
  useEffect(() => {
    promptRef.current?.focus();
  }, []);

  const onComplete = () => {
    if (!error) setPrompt("");
  };

  if (!blockId)
    return (
      <div className="p-4 text-center">
        <div className="space-y-4 rounded-xl p-4">
          <SparklesIcon className="mx-auto text-3xl" />
          <h1>{t("no_block_selected_for_ask_ai")}</h1>
        </div>
      </div>
    );

  return (
    <div className="mt-4">
      <h2 className="mb-2 text-xs font-semibold leading-none tracking-tight text-gray-500">
        {t("Ask AI")} (GPT-4o mini)
      </h2>
      <Textarea
        ref={promptRef}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder={t("Ask AI to edit content")}
        className="w-full border border-gray-400 focus:border-0"
        rows={3}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            askAi("content", blockId, prompt, onComplete);
          }
        }}
      />

      <div className="my-2 flex items-center gap-2">
        {!loading ? (
          <Button
            disabled={prompt.trim().length < 5 || loading}
            onClick={() => askAi("content", blockId, prompt, onComplete)}
            variant="default"
            className="w-fit"
            size="sm">
            {loading ? (
              <>
                <Loader className="h-5 w-5 animate-spin" />
                {t("Generating... Please wait")}
              </>
            ) : (
              t("Edit with AI")
            )}
          </Button>
        ) : null}
        {loading ? (
          <div className="flex flex-col gap-2">
            <Skeleton className="flex w-full items-center space-x-1 px-4 py-1 pl-2">
              <FaSpinner className="h-4 w-4 animate-spin text-gray-500" />
              <p className="text-xs">{t("Generating... Please wait")}</p>
            </Skeleton>
            <Button variant="destructive" onClick={() => stop()} className="hidden w-fit" size="sm">
              {t("Stop")}
            </Button>
          </div>
        ) : null}
      </div>
      <div className="max-w-full">
        {error && (
          <p className="break-words rounded border border-red-500 bg-red-100 p-1 text-xs text-red-500">
            {error.message}
          </p>
        )}
      </div>
      <QuickPrompts onClick={(prompt: string) => askAi("content", blockId, prompt, onComplete)} />
    </div>
  );
};

export const AISetContext = () => {
  const { t } = useTranslation();
  const aiContext = useBuilderProp("aiContext", "");
  const [context, setContext] = useState(aiContext);
  const promptRef = useRef(null);
  const savePageContext = useBuilderProp("saveAiContextCallback", noop);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [opened, setOpened] = useState(false);
  const { toast } = useToast();
  const btnRef = useRef(null);

  useEffect(() => {
    if (aiContext) {
      setContext(aiContext);
    }
  }, [aiContext]);

  const saveContext = async () => {
    try {
      setLoading(true);
      setError(null);
      await savePageContext(context);
      toast({
        title: t("AI Context updated"),
        description: t("You can now ask AI to edit your content"),
        variant: "default",
      });
      btnRef.current.click();
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Accordion
      onValueChange={(value) => {
        setOpened(value !== "");
      }}
      type="single"
      collapsible
      className="rounded-md border bg-gray-100 px-2">
      <AccordionItem value="set-context">
        {/*  @ts-ignore */}
        <AccordionTrigger ref={btnRef} hideArrow className="py-1 hover:no-underline">
          <div className="flex w-full items-center justify-between">
            <span className="font-semibold">{t("AI Context")}</span>
            <Button variant="default" size={"sm"}>
              <span>{t(opened ? "Cancel" : "Edit")}</span> &nbsp;
              {opened ? <Cross2Icon className="h-4 w-4" /> : <EditIcon className="h-4 w-4" />}
            </Button>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          {/*<h2 className="mb-1 text-sm font-semibold leading-none tracking-tight"> {t("Enter page details")}</h2>*/}
          <Textarea
            ref={promptRef}
            value={context}
            onChange={(e) => setContext(e.target.value)}
            placeholder={t("Tell about this page. Eg: This page is about ...")}
            className="w-full border border-gray-400 bg-background focus:border"
            rows={10}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                saveContext();
              }
            }}
          />
          {aiContext.trim().length === 0 ? (
            <p className="mt-2 text-xs text-gray-500">
              {t(
                "Eg: This page is about an AI assistant app called Chai Studio. It allows users to create beautiful webpages and edit content with AI.",
              )}
            </p>
          ) : null}
          <div className="mt-2 flex items-center">
            <Button
              disabled={context.trim().length < 5}
              onClick={() => saveContext()}
              variant="default"
              className="w-fit"
              size="sm">
              {loading ? (
                <>
                  <Loader className="h-5 w-5 animate-spin" />
                  {t("Generating... Please wait")}
                </>
              ) : (
                t("Save")
              )}
            </Button>
            {aiContext.trim().length > 0 ? (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button disabled={aiContext.trim().length === 0} variant="ghost" className="w-fit" size="sm">
                    {loading ? (
                      <>
                        <Loader className="h-5 w-5 animate-spin" />
                        {t("Generating... Please wait")}
                      </>
                    ) : (
                      t("Delete")
                    )}
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>{t("Remove context?")}</AlertDialogTitle>
                    <AlertDialogDescription></AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>{t("Cancel")}</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => {
                        setContext("");
                        saveContext();
                      }}>
                      Yes, Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            ) : null}
          </div>
          <div className="mt-2 max-w-full">
            {error && (
              <p className="break-words rounded border border-red-500 bg-red-100 p-1 text-xs text-red-500">
                {error.message}
              </p>
            )}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export const AskAI = () => {
  const [ids] = useSelectedBlockIds();
  return (
    <div className="absolute inset-0 z-50 h-full w-full bg-background p-2">
      <AISetContext />
      <AIUserPrompt blockId={first(ids)} />
    </div>
  );
};
