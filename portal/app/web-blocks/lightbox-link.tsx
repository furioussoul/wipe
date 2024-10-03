import * as React from "react";
import { isEmpty } from "lodash-es";
import { ImageIcon } from "@radix-ui/react-icons";
import { Checkbox, Numeric, SelectOption, SingleLineText, Styles } from "@chaibuilder/runtime/controls";
import EmptySlot from "./empty-slot";
import { addForcedClasses } from "./helper";
import { ChaiBlockStyles, ChaiRenderBlockProps } from "../types/types";

type LightBoxLinkProps = {
  href: string;
  hrefType: string;
  autoplay: boolean;
  maxWidth: number;
  backdropColor: string;
  content: string;
  galleryName: string;
  styles: ChaiBlockStyles;
};

const LightBoxLinkBlock = (props: ChaiRenderBlockProps<LightBoxLinkProps>) => {
  const { blockProps, children, styles, inBuilder, content, href } = props;
  const { hrefType, autoplay, maxWidth, backdropColor, galleryName } = props;
  const forcedStyles = addForcedClasses(styles, "cb-lightbox");
  if (!children && isEmpty(styles?.className) && isEmpty(content)) {
    return <EmptySlot inBuilder={inBuilder} />;
  }

  if (inBuilder) {
    if (children) {
      return (
        <span {...blockProps} {...forcedStyles}>
          {children}
        </span>
      );
    } else {
      return React.createElement("span", {
        ...blockProps,
        ...forcedStyles,
        dangerouslySetInnerHTML: { __html: content },
      });
    }
  }

  const lightBoxAttrs = {};
  lightBoxAttrs["data-vbtype"] = hrefType;
  if (autoplay) lightBoxAttrs["data-autoplay"] = "true";
  if (maxWidth) lightBoxAttrs["data-maxwidth"] = maxWidth + "px";
  if (backdropColor) lightBoxAttrs["data-overlay"] = backdropColor;
  if (galleryName) lightBoxAttrs["data-gall"] = galleryName;

  if (children) {
    return (
      <a {...lightBoxAttrs} href={href || "#/"} {...blockProps} {...forcedStyles}>
        {children}
      </a>
    );
  }

  return React.createElement("a", {
    ...blockProps,
    ...forcedStyles,
    ...lightBoxAttrs,
    href: href || "#",
    dangerouslySetInnerHTML: { __html: content },
  });
};

const Config = {
  type: "LightBoxLink",
  label: "LightBox Link",
  category: "core",
  icon: ImageIcon,
  group: "basic",
  props: {
    styles: Styles({ default: "" }),
    content: SingleLineText({ title: "Content", default: "Link text or drop blocks inside" }),
    href: SingleLineText({ title: "Href", default: "" }),
    hrefType: SelectOption({
      title: "Type",
      default: "video",
      options: [
        { value: "video", title: "video " },
        { value: "iframe", title: "iframe" },
        { value: "inline", title: "inline" },
        { value: "ajax", title: "ajax" },
      ],
    }),
    autoplay: Checkbox({ title: "Autoplay video", default: false }),
    maxWidth: Numeric({ title: "Max Width", default: "" }),
    backdropColor: SingleLineText({ title: "Backdrop Color", default: "" }),
    galleryName: SingleLineText({ title: "Gallery name", default: "" }),
  },
  canAcceptBlock: (type: string) => type !== "Link" && type !== "LightBoxLink",
};

export { LightBoxLinkBlock as Component, Config };
