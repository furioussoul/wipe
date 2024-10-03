import { Label, Switch } from "@/app/ui";
import { useAtom } from "jotai";
import { aiAssistantActiveAtom } from "../../../atoms/ui";
import { SparklesIcon } from "lucide-react";
import { useBuilderProp } from "../../../hooks";

export const AiAssistant = () => {
  const [active, setAiAssistantActive] = useAtom(aiAssistantActiveAtom);
  const askAiCallBack = useBuilderProp("askAiCallBack", null);
  if (!askAiCallBack) return null;
  return (
    <div className="flex items-center space-x-2">
      <Label htmlFor="ai-assistant" className="flex items-center gap-x-1 text-sm text-yellow-600">
        <SparklesIcon className="w-4" />
        {"AI Assistant"}
      </Label>
      <Switch
        className={"scale-90"}
        checked={active}
        onCheckedChange={(state) => {
          setAiAssistantActive(state);
        }}
        id="ai-assitantt"
      />
    </div>
  );
};
