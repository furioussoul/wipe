import { registerChaiBlock } from "@chaibuilder/runtime";

import { Component as Box, Config as BoxConfig } from "./box";
import { Component as Button, Config as ButtonConfig } from "./button";
import { Component as CustomHTML, Config as CustomHTMLConfig } from "./custom-html";
import { Component as EmptyBox, Config as EmptyBoxConfig } from "./empty-box";
import { Component as HeadingBlock, Config as HeadingBlockConfig } from "./heading";
import { Component as ParagraphBlock, Config as ParagraphBlockConfig } from "./paragraph";
import { Component as SpanBlock, Config as SpanBlockConfig } from "./span";
import { Component as RichTextBlock, Config as RichTextConfig } from "./rte";
//
import { Component as LinkBlock, Config as LinkBlockConfig } from "./link";
import { Component as LightBoxLinkBlock, Config as LightBoxLinkBlockConfig } from "./lightbox-link";
import { Component as ListBlock, Config as ListBlockConfig } from "./list";
import { Component as ListItemBlock, Config as ListItemBlockConfig } from "./listitem";
import { Component as IconBlock, Config as IconBlockConfig } from "./icon";
import { Component as ImageBlock, Config as ImageBlockConfig } from "./image";
import { Component as VideoBlock, Config as VideoBlockConfig } from "./video";
import { Component as CustomScript, Config as CustomScriptConfig } from "./custom-script";
import { Component as DividerBlock, Config as DividerBlockConfig } from "./divider";
import { Component as DarkMode, Config as DarkModeConfig } from "./dark-mode";
import { Component as TextBlock, Config as LayersConfig } from "./text";
// import "./slot";
//
// // hidden
import { Component as BodyBlock, Config as BodyBlockConfig } from "./hidden/body";
import { Component as LineBreakBlock, Config as LineBreakBlockConfig } from "./hidden/line-break";
// import "./hidden/table";
import { Component as FormBlock, Config as FormBlockConfig } from "./hidden/form/form";
import { Component as FormButtonBlock, Config as FormButtonBlockConfig } from "./hidden/form/form-button";
import { Component as InputBlock, Config as InputBlockConfig } from "./hidden/form/input";
import { Component as RadioBlock, Config as RadioBlockConfig } from "./hidden/form/radio";
import { Component as SelectBlock, Config as SelectBlockConfig } from "./hidden/form/select";
import { Component as TextAreaBlock, Config as TextAreaBlockConfig } from "./hidden/form/textarea";
import { Component as CheckboxBlock, Config as CheckboxBlockConfig } from "./hidden/form/checkbox";

const loadWebBlocks = () => {
  registerChaiBlock(Box, BoxConfig);
  registerChaiBlock(EmptyBox, EmptyBoxConfig);
  registerChaiBlock(Button, ButtonConfig);
  registerChaiBlock(HeadingBlock, HeadingBlockConfig);
  registerChaiBlock(ParagraphBlock, ParagraphBlockConfig);
  registerChaiBlock(SpanBlock, SpanBlockConfig);
  registerChaiBlock(RichTextBlock, RichTextConfig);
  registerChaiBlock(LinkBlock, LinkBlockConfig);
  registerChaiBlock(LightBoxLinkBlock, LightBoxLinkBlockConfig);
  registerChaiBlock(ListBlock, ListBlockConfig);
  registerChaiBlock(ListItemBlock, ListItemBlockConfig);
  registerChaiBlock(IconBlock, IconBlockConfig);
  registerChaiBlock(ImageBlock, ImageBlockConfig);
  registerChaiBlock(VideoBlock, VideoBlockConfig);
  registerChaiBlock(CustomHTML, CustomHTMLConfig);
  registerChaiBlock(TextBlock, LayersConfig);

  //forms
  registerChaiBlock(FormBlock, FormBlockConfig);
  registerChaiBlock(FormButtonBlock, FormButtonBlockConfig);
  registerChaiBlock(InputBlock, InputBlockConfig);
  registerChaiBlock(CheckboxBlock, CheckboxBlockConfig);
  registerChaiBlock(RadioBlock, RadioBlockConfig);
  registerChaiBlock(SelectBlock, SelectBlockConfig);
  registerChaiBlock(TextAreaBlock, TextAreaBlockConfig);

  // hidden
  registerChaiBlock(LineBreakBlock, LineBreakBlockConfig);
  registerChaiBlock(BodyBlock, BodyBlockConfig);

  registerChaiBlock(CustomScript, CustomScriptConfig);
  registerChaiBlock(DividerBlock, DividerBlockConfig);
  // @ts-ignore
  registerChaiBlock(DarkMode, DarkModeConfig);
};

export { loadWebBlocks };
