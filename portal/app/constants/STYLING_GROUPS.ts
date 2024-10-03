import { ManualClasses } from "../components/settings/new-panel/ManualClasses";

const BASIC_UNITS: string[] = ["px", "%", "em", "rem", "ch", "vh", "vw"];

export const FLEX_CHILD_SECTION = {
  heading: "flex.heading",
  items: [
    { type: "arbitrary", label: "flex.basis", units: BASIC_UNITS, property: "flexBasis" },
    { type: "range", label: "flex.order", property: "order" },
    { type: "dropdown", label: "flex.flex", property: "flexGrowShrink" },
    { type: "dropdown", label: "flex.grow", property: "flexGrow" },
    { type: "dropdown", label: "flex.shrink", property: "flexShrink" },
  ],
};

export const GRID_CHILD_SECTION = {
  heading: "grid.heading",
  items: [
    { type: "range", label: "grid.col_span", property: "gridColSpan" },
    { type: "range", label: "grid.col_start", property: "gridColStart" },
    { type: "range", label: "grid.col_end", property: "gridColEnd" },
    { type: "range", label: "grid.row_span", property: "gridRowSpan" },
    { type: "range", label: "grid.row_start", property: "gridRowStart" },
    { type: "range", label: "grid.row_end", property: "gridRowEnd" },
    { type: "range", label: "grid.order", property: "order" },
  ],
};

export const SETTINGS_SECTIONS = [
  {
    heading: "Styles",
    items: [
      { component: ManualClasses },
      { type: "arbitrary", label: "layout.width", units: BASIC_UNITS.concat("auto"), property: "width" },
      { type: "arbitrary", label: "layout.height", units: BASIC_UNITS.concat("auto"), property: "height" },
      {
        styleType: "multiple",
        label: "layout.margin",
        negative: true,
        units: [...BASIC_UNITS, "auto"],
        options: [
          { key: "margin", label: "layout.margin_all" },
          { key: "marginX", label: "layout.margin_lr" },
          { key: "marginY", label: "layout.margin_tb" },
          { key: "marginTop", label: "layout.margin_top" },
          { key: "marginRight", label: "layout.margin_right" },
          { key: "marginBottom", label: "layout.margin_bottom" },
          { key: "marginLeft", label: "layout.margin_left" },
        ],
      },
      {
        styleType: "multiple",
        label: "layout.padding",
        options: [
          { key: "padding", label: "layout.padding_all" },
          { key: "paddingX", label: "layout.padding_lr" },
          { key: "paddingY", label: "layout.padding_tb" },
          { key: "paddingTop", label: "layout.padding_top" },
          { key: "paddingRight", label: "layout.padding_right" },
          { key: "paddingBottom", label: "layout.padding_bottom" },
          { key: "paddingLeft", label: "layout.padding_left" },
        ],
      },
      {
        styleType: "accordion",
        heading: "Typography",
        items: [
          { type: "dropdown", property: "textAlign", label: "typography.align" },
          { type: "dropdown", property: "fontFamily", label: "typography.font" },
          { type: "arbitrary", property: "fontSize", label: "typography.size", units: BASIC_UNITS },
          { type: "arbitrary", property: "lineHeight", label: "typography.height", units: BASIC_UNITS.concat("-") },
          { type: "range", property: "fontWeight", label: "typography.weight" },
          { type: "color", property: "textColor", label: "typography.color" },
        ],
      },
      {
        styleType: "accordion",
        heading: "Background",
        items: [
          { type: "color", label: "background.bgcolor", property: "backgroundColor" },
          { type: "dropdown", label: "background.attachment", property: "backgroundAttachment" },
          { type: "dropdown", label: "background.clipping", property: "backgroundClip" },
          { type: "dropdown", label: "background.origin", property: "backgroundOrigin" },
          { type: "dropdown", label: "background.position", property: "backgroundPosition" },
          { type: "dropdown", label: "background.repeat", property: "backgroundRepeat" },
          { type: "dropdown", label: "background.size", property: "backgroundSize" },
        ],
      },
    ],
  },
];

export const SETTINGS_SECTIONS_ALL = [
  {
    heading: "layout.heading",
    items: [
      { type: "arbitrary", label: "layout.width", units: BASIC_UNITS.concat("auto"), property: "width" },
      { type: "arbitrary", label: "layout.height", units: BASIC_UNITS.concat("auto"), property: "height" },
      {
        styleType: "multiple",
        label: "layout.margin",
        negative: true,
        units: [...BASIC_UNITS, "auto"],
        options: [
          { key: "margin", label: "layout.margin_all" },
          { key: "marginX", label: "layout.margin_lr" },
          { key: "marginY", label: "layout.margin_tb" },
          { key: "marginTop", label: "layout.margin_top" },
          { key: "marginRight", label: "layout.margin_right" },
          { key: "marginBottom", label: "layout.margin_bottom" },
          { key: "marginLeft", label: "layout.margin_left" },
        ],
      },
      {
        styleType: "multiple",
        label: "layout.padding",
        options: [
          { key: "padding", label: "layout.padding_all" },
          { key: "paddingX", label: "layout.padding_lr" },
          { key: "paddingY", label: "layout.padding_tb" },
          { key: "paddingTop", label: "layout.padding_top" },
          { key: "paddingRight", label: "layout.padding_right" },
          { key: "paddingBottom", label: "layout.padding_bottom" },
          { key: "paddingLeft", label: "layout.padding_left" },
        ],
      },
      {
        styleType: "multiple",
        label: "layout.space_bt",
        options: [
          { key: "spaceX", label: "layout.space_lr" },
          { key: "spaceY", label: "layout.space_tb" },
        ],
      },
    ],
  },
  {
    heading: "size.heading",
    items: [
      {
        styleType: "accordion",
        heading: "size.min_width_height",
        items: [
          { type: "arbitrary", label: "size.min_width", units: BASIC_UNITS.concat("auto"), property: "minWidth" },
          { type: "arbitrary", label: "size.min_height", units: BASIC_UNITS.concat("auto"), property: "minHeight" },
        ],
      },
      {
        styleType: "accordion",
        heading: "size.max_width_height",
        items: [
          { type: "arbitrary", label: "size.max_width", units: BASIC_UNITS.concat("auto"), property: "maxWidth" },
          { type: "arbitrary", label: "size.max_height", units: BASIC_UNITS.concat("auto"), property: "maxHeight" },
        ],
      },
      {
        styleType: "accordion",
        heading: "size.object_options_aspect_ratio",
        items: [
          { type: "dropdown", label: "size.aspect", property: "aspectRatio" },
          { type: "dropdown", label: "size.fit", property: "objectFit" },
          { type: "dropdown", label: "size.position", property: "objectPosition" },
        ],
      },
    ],
  },
  {
    heading: "display.heading",
    items: [
      { type: "dropdown", label: "display.display", property: "display", units: BASIC_UNITS },
      {
        styleType: "accordion",
        heading: "display.flex_options",
        items: [
          { type: "dropdown", label: "display.flex_direction", property: "flexDirection" },
          { type: "dropdown", label: "display.flex_wrap", property: "flexWrap" },
          { type: "dropdown", label: "display.justify_content", property: "justifyContent" },
          { type: "dropdown", label: "display.align_content", property: "alignContent" },
          { type: "dropdown", label: "display.align_items", property: "alignItems" },
          {
            styleType: "multiple",
            label: "display.gap",
            options: [
              { key: "gap", label: "display.gap_all" },
              { key: "gapX", label: "display.gap_lr" },
              { key: "gapY", label: "display.gap_tb" },
            ],
          },
        ],
        conditions: { display: "flex" },
      },
      {
        styleType: "accordion",
        heading: "display.grid_options",
        items: [
          { type: "range", label: "display.grid_columns", property: "gridColumns" },
          { type: "range", label: "display.grid_rows", property: "gridRows" },
          { type: "dropdown", label: "display.grid_auto_flow", property: "gridAutoFlow" },
          { type: "dropdown", label: "display.grid_auto_cols", property: "gridAutoColumns" },
          { type: "dropdown", label: "display.grid_auto_rows", property: "gridAutoRows" },
          { type: "dropdown", label: "display.justify_content", property: "justifyContent" },
          { type: "dropdown", label: "display.align_content", property: "alignContent" },
          { type: "dropdown", label: "display.align_items", property: "alignItems" },
          {
            styleType: "multiple",
            label: "display.gap",
            units: ["px", "rem"],
            options: [
              { key: "gap", label: "display.gap_all" },
              { key: "gapX", label: "display.gap_lr" },
              { key: "gapY", label: "display.gap_tb" },
            ],
          },
        ],
        conditions: { display: "grid" },
      },
      {
        styleType: "accordion",
        heading: "display.visibility_opacity",
        items: [
          { type: "dropdown", label: "display.visibility", property: "visibility", units: BASIC_UNITS },
          { type: "arbitrary", label: "display.opacity", property: "opacity", units: ["-"] },
        ],
      },
    ],
  },
  {
    heading: "position.heading",
    items: [
      { type: "icons", label: "position.position", property: "position" },
      {
        styleType: "accordion",
        heading: "position.options",
        items: [
          {
            styleType: "multiple",
            label: "position.direction",
            options: [
              { key: "top", label: "position.top" },
              { key: "right", label: "position.right" },
              { key: "bottom", label: "position.bottom" },
              { key: "left", label: "position.left" },
            ],
          },
          {
            styleType: "multiple",
            label: "position.inset",
            options: [
              { key: "inset", label: "position.all" },
              { key: "insetX", label: "position.lr" },
              { key: "insetY", label: "position.tb" },
            ],
          },
          { type: "arbitrary", label: "position.z_index", units: ["-", "auto"], property: "zIndex" },
        ],
      },
      {
        styleType: "accordion",
        heading: "position.float_clear",
        items: [
          { type: "icons", label: "position.float", property: "float" },
          { type: "dropdown", label: "position.clear", property: "clear" },
        ],
      },

      {
        styleType: "accordion",
        heading: "position.overflow_overscroll",
        items: [
          {
            styleType: "multiple",
            type: "dropdown",
            label: "position.overflow",
            options: [
              { key: "overflow", label: "position.all" },
              { key: "overflowX", label: "position.lr" },
              { key: "overflowY", label: "position.tb" },
            ],
          },
          {
            styleType: "multiple",
            type: "dropdown",
            label: "position.overscroll",
            options: [
              { key: "overscroll", label: "position.all" },
              { key: "overscrollX", label: "position.lr" },
              { key: "overscrollY", label: "position.tb" },
            ],
          },
        ],
      },
    ],
  },
  {
    heading: "typography.heading",
    items: [
      { type: "dropdown", property: "fontFamily", label: "typography.font" },
      { type: "arbitrary", property: "fontSize", label: "typography.size", units: BASIC_UNITS },
      { type: "arbitrary", property: "lineHeight", label: "typography.height", units: BASIC_UNITS.concat("-") },
      { type: "range", property: "fontWeight", label: "typography.weight" },
      { type: "color", property: "textColor", label: "typography.color" },
      {
        styleType: "accordion",
        heading: "typography.alignments",
        items: [
          { type: "dropdown", property: "textAlign", label: "typography.align" },
          { type: "dropdown", property: "verticalAlign", label: "typography.valign" },
        ],
      },
      {
        styleType: "accordion",
        heading: "typography.spacing_decoration_more",
        items: [
          { type: "dropdown", property: "letterSpacing", label: "typography.spacing" },
          { type: "dropdown", property: "textDecoration", label: "typography.decoration" },
          { type: "range", property: "textDecorationThickness", label: "typography.thickness" },
          { type: "dropdown", property: "textTransform", label: "typography.transform" },
        ],
      },
      {
        styleType: "accordion",
        heading: "typography.whitespace_breaks",
        items: [
          { type: "dropdown", property: "whitespace", label: "typography.whitespace" },
          { type: "dropdown", property: "wordbreak", label: "typography.wordbreak" },
        ],
      },
    ],
  },
  {
    heading: "background.heading",
    items: [
      { type: "color", label: "background.bgcolor", property: "backgroundColor" },
      {
        styleType: "accordion",
        heading: "background.position_size_more",
        items: [
          { type: "dropdown", label: "background.attachment", property: "backgroundAttachment" },
          { type: "dropdown", label: "background.clipping", property: "backgroundClip" },
          { type: "dropdown", label: "background.origin", property: "backgroundOrigin" },
          { type: "dropdown", label: "background.position", property: "backgroundPosition" },
          { type: "dropdown", label: "background.repeat", property: "backgroundRepeat" },
          { type: "dropdown", label: "background.size", property: "backgroundSize" },
        ],
      },
      { type: "dropdown", label: "background.gradient", property: "backgroundGradient" },
      {
        styleType: "accordion",
        heading: "background.gradient_colors",
        items: [
          { type: "color", label: "background.from_color", property: "fromColor" },
          { type: "color", label: "background.via_color", property: "viaColor" },
          { type: "color", label: "background.to_color", property: "toColor" },
        ],
      },
    ],
  },
  {
    heading: "border.heading",
    items: [
      {
        styleType: "multiple",
        type: "dropdown",
        label: "border.width",
        options: [
          { key: "border", label: "border.all" },
          { key: "borderX", label: "border.lr" },
          { key: "borderY", label: "border.tb" },
          { key: "borderTop", label: "border.top" },
          { key: "borderRight", label: "border.right" },
          { key: "borderBottom", label: "border.bottom" },
          { key: "borderLeft", label: "border.left" },
        ],
      },
      {
        styleType: "multiple",
        type: "dropdown",
        label: "border.corners",
        options: [
          { key: "borderRadius", label: "border.all" },
          { key: "borderRadiusTop", label: "border.top" },
          { key: "borderRadiusRight", label: "border.right" },
          { key: "borderRadiusBottom", label: "border.bottom" },
          { key: "borderRadiusLeft", label: "border.left" },
          { key: "borderRadiusTopLeft", label: "border.top_left" },
          { key: "borderRadiusTopRight", label: "border.top_right" },
          { key: "borderRadiusBottomRight", label: "border.bottom_right" },
          { key: "borderRadiusBottomLeft", label: "border.bottom_left" },
        ],
      },
      { type: "color", label: "border.color", property: "borderColor" },
      { type: "dropdown", label: "border.style", property: "borderStyle" },
      {
        styleType: "accordion",
        heading: "border.divide_options",
        items: [
          {
            styleType: "multiple",
            type: "range",
            label: "border.width",
            options: [
              { key: "divideXWidth", label: "border.lr" },
              { key: "divideYWidth", label: "border.tb" },
            ],
          },
          { type: "color", label: "border.divide_color", property: "divideColor" },
          { type: "dropdown", label: "border.divide_style", property: "divideStyle" },
        ],
      },
      {
        styleType: "accordion",
        heading: "border.outline_styling",
        items: [
          { type: "range", label: "border.outline_width", property: "outlineWidth" },
          { type: "range", label: "border.outline_offset", property: "outlineOffset" },
          { type: "dropdown", label: "border.outline_style", property: "outlineStyle" },
        ],
      },
      {
        styleType: "accordion",
        heading: "border.ring_options",
        items: [
          { type: "range", label: "border.ring_width", property: "ringWidth" },
          { type: "color", label: "border.ring_color", property: "ringColor" },
          { type: "range", label: "border.ring_offset_width", property: "ringOffsetWidth" },
          { type: "color", label: "border.ring_offset_color", property: "ringOffsetColor" },
        ],
      },
    ],
  },
  {
    heading: "effect.heading",
    items: [
      { type: "range", label: "effect.shadow", property: "boxShadow" },
      { type: "color", label: "effect.color", property: "boxShadowColor" },
      { type: "dropdown", label: "effect.cursor", property: "cursor" },
      {
        styleType: "accordion",
        heading: "effect.blend_cursor",
        items: [
          { type: "dropdown", label: "effect.mix_blend", property: "mixBlendMode" },
          { type: "dropdown", label: "effect.bg_blend", property: "bgBlendMode" },
        ],
      },
      {
        styleType: "accordion",
        heading: "effect.transform",
        items: [
          { type: "dropdown", label: "effect.origin", property: "transformOrigin" },
          {
            styleType: "multiple",
            label: "effect.scale",
            units: ["-"],
            options: [
              { key: "scale", label: "effect.all" },
              { key: "scaleX", label: "effect.lr" },
              { key: "scaleY", label: "effect.tb" },
            ],
          },
          {
            styleType: "multiple",
            label: "effect.skew",
            units: ["deg"],
            options: [
              { key: "skewX", label: "effect.lr" },
              { key: "skewY", label: "effect.tb" },
            ],
          },
          {
            styleType: "multiple",
            label: "effect.translate",
            negative: true,
            options: [
              { key: "translateX", label: "effect.lr" },
              { key: "translateY", label: "effect.tb" },
            ],
          },
          { type: "arbitrary", units: ["deg"], negative: true, label: "effect.rotate", property: "rotate" },
        ],
      },
      {
        styleType: "accordion",
        heading: "effect.animation",
        items: [
          { type: "dropdown", label: "effect.animation", property: "animation" },
          { type: "dropdown", label: "effect.transition", property: "transition" },
          { type: "dropdown", label: "effect.easing", property: "transitionEase" },
          { type: "arbitrary", units: ["ms"], label: "effect.duration", property: "duration" },
          { type: "arbitrary", units: ["ms"], label: "effect.delay", property: "delay" },
        ],
      },
    ],
  },
  {
    heading: "classes.heading",
    items: [{ component: ManualClasses }],
  },
];
