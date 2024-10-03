import { WidgetProps } from "@rjsf/utils";
import IconPicker, { IconPickerItem } from "react-icons-picker";
import ReactDOM from "react-dom";

const getSvgMarkup = (icon: string) => {
  try {
    const container = document.getElementById("icon-picker-field") as HTMLElement;
    const iconPickerContainer = document.createElement("div");
    ReactDOM.render(<IconPickerItem value={icon} />, iconPickerContainer);
    container.appendChild(iconPickerContainer);

    iconPickerContainer.hidden = true;
    let iconPickerMarkup = iconPickerContainer.innerHTML;
    setTimeout(() => container.removeChild(iconPickerContainer), 100);

    // // * Removing height and width from svg
    const parser = new DOMParser();
    const svgDoc = parser.parseFromString(iconPickerMarkup, "image/svg+xml");
    // remove width and height
    const svgElement = svgDoc.querySelector("svg");
    if (svgElement) {
      svgElement.removeAttribute("width");
      svgElement.removeAttribute("height");
    }
    return new XMLSerializer().serializeToString(svgDoc);
  } catch (err) {
    console.error(err);
    return "";
  }
};

const IconPickerField = ({ value, onChange }: WidgetProps) => {
  const handleIconChange = (icon: string) => {
    onChange("<svg />");
    const svgMarkup = getSvgMarkup(icon);
    onChange(svgMarkup);
  };

  return (
    <div className="mt-1 flex h-20 items-center gap-x-2" id="icon-picker-field">
      <div className="group relative h-12 w-12">
        <div
          dangerouslySetInnerHTML={{
            __html: value ? value.replace("<svg", `<svg class="h-5 w-5"`) : "<svg class='h-5 w-5' />",
          }}
          className="absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2 transform cursor-pointer bg-white"
        />
        <IconPicker
          value={value ? "BiSolidGrid" : null}
          onChange={handleIconChange}
          pickButtonStyle={{
            position: "relative",
            height: "48px",
            width: "48px",
            border: "1px solid #BBBBBB",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "6px",
            backgroundColor: "transparent",
            zIndex: 1,
          }}
          searchInputStyle={{
            backgroundColor: "transparent",
            width: "100%",
            border: "1px solid #BBBBBB",
            margin: "0px 10px",
            padding: "10px",
          }}
        />
      </div>
      <textarea
        autoCapitalize={"off"}
        autoCorrect={"off"}
        spellCheck={"false"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-full w-full rounded-sm border border-foreground/20 px-2 py-1 text-xs shadow-sm focus:border-gray-500/80 focus:outline-none focus:ring-0"
        placeholder="Choose icon or enter svg"
      />
    </div>
  );
};

export { IconPickerField };
