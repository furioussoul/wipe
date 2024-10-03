import { useState } from "react";
import { useAtom } from "jotai";
import { useTranslation } from "react-i18next";
import {
  Alert,
  AlertTitle,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  Label,
  Textarea,
} from "@/app/ui";
import { useAddBlock, useSelectedBlockIds } from "../../../../hooks";
import { activePanelAtom } from "../../../../atoms/ui";
import { first } from "lodash-es";
import { getBlocksFromHTML } from "../../../../import-html/html-to-json";
import { OUTLINE_KEY } from "../../../../constants/STRINGS";

const ImportHTML = () => {
  const { t } = useTranslation();
  const [code, setCode] = useState("");
  const { addPredefinedBlock } = useAddBlock();
  const [ids]: any = useSelectedBlockIds();
  const [, setActivePanel] = useAtom(activePanelAtom);

  const importComponents = () => {
    const blocks = getBlocksFromHTML(code);
    addPredefinedBlock([...blocks], first(ids) || null);
    setCode("");
    setActivePanel(OUTLINE_KEY);
  };

  return (
    <Card className="border-border/0 p-0 shadow-none">
      <CardHeader className="p-3">
        <CardDescription>{t("html_snippet_description")}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2 px-3 py-0">
        <div className="space-y-1">
          <Label htmlFor="current" className="text-sm">
            {t("tailwind_html_snippet")}
          </Label>
          <Textarea
            autoFocus
            tabIndex={1}
            ref={(el) => el && el.focus()}
            onChange={(evt) => setCode(evt.target.value)}
            rows={12}
            value={code}
            placeholder={t("enter_code_snippet")}
            className="resize-none overflow-x-auto whitespace-pre bg-gray-100 font-mono text-xs font-normal"
          />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col justify-end p-3">
        <Button disabled={code.trim() === ""} onClick={() => importComponents()} size="sm" className="w-full">
          {t("import_html")}
        </Button>
        <Alert variant="default" className="mt-2 border-none p-1 text-gray-400">
          <AlertTitle className="text-xs font-normal leading-4">{t("note_imported_html")}</AlertTitle>
        </Alert>
      </CardFooter>
    </Card>
  );
};

export default ImportHTML;
