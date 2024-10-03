import { FieldProps } from "@rjsf/utils";
import { map } from "lodash-es";
import { useEffect, useState } from "react";
import { useBuilderProp } from "../hooks";

const LinkField = ({ schema, formData, onChange }: FieldProps) => {
  const [pages, setPages] = useState([]);
  const getPages = useBuilderProp("getPages", () => []);
  const { type = "page", href = "", target = "self" } = formData;

  useEffect(() => {
    (async () => {
      const _pages = await getPages();
      setPages(_pages || []);
    })();
  }, []);

  return (
    <div>
      <span className="text-xs font-medium">{schema?.title ?? "Link"}</span>
      <div className="flex flex-col gap-y-1.5">
        <select name="type" value={type} onChange={(e) => onChange({ ...formData, type: e.target.value })}>
          {[
            { const: "page", title: "Open Page" },
            { const: "url", title: "Open URL" },
            { const: "email", title: "Compose Email" },
            { const: "telephone", title: "Call Phone" },
            { const: "scroll", title: "Scroll to element" },
          ].map((opt) => (
            <option key={opt.const} value={opt.const}>
              {opt.title}
            </option>
          ))}
        </select>
        {type === "page" ? (
          <select name="href" value={href} onChange={(e) => onChange({ ...formData, href: e.target.value || "#" })}>
            <option value="">Choose page</option>
            {map(pages, (page: any) => (
              <option key={page.uuid} value={page.slug}>
                {page.name}
              </option>
            ))}
          </select>
        ) : (
          <input
            autoCapitalize={"off"}
            autoCorrect={"off"}
            spellCheck={"false"}
            name="href"
            type="text"
            value={href}
            onChange={(e) => onChange({ ...formData, href: e.target.value || "#" })}
            placeholder={
              type === "page" || type === "url" ? "Enter URL" : type === "scroll" ? "#ElementID" : "Enter detail"
            }
          />
        )}
        {(type === "page" || type === "url") && (
          <div className="flex items-center gap-x-2">
            <input
              autoCapitalize={"off"}
              autoCorrect={"off"}
              spellCheck={"false"}
              type="checkbox"
              defaultChecked={target === "_blank"}
              className="cursor-pointer rounded-md border border-border"
              onChange={() => onChange({ ...formData, target: target === "_blank" ? "_self" : "_blank" })}
            />
            <span className="pt-1 text-xs">Open in new tab</span>
          </div>
        )}
      </div>
    </div>
  );
};

export { LinkField };
