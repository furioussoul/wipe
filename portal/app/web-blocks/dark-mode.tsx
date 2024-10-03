import { MoonIcon } from "@radix-ui/react-icons";

const DarkMode = () => {
  return null;
};

const Config = {
  type: "Dark Mode",
  label: "Dark Mode",
  category: "core",
  icon: MoonIcon,
  group: "advanced",
  props: {},
  blocks: () => [
    { _id: "ultqCh", _type: "Span", tag: "span", styles: "#styles:,", _name: "Dark Mode Switcher" },
    {
      _id: "vroabi",
      _parent: "ultqCh",
      _type: "Button",
      // @ts-ignore
      styles_attrs: { type: "button", "x-on:click": "darkMode = 'dark'", "x-show": "darkMode === 'light'" },
      styles:
        "#styles:,bg-white dark:bg-black font-medium text-gray-800 rounded-full hover:bg-gray-200 focus:outline-none focus:bg-gray-200 dark:text-neutral-200 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800",
      _name: "Dark Mode Btn",
    },
    {
      _id: "eweibk",
      _parent: "vroabi",
      _type: "Span",
      tag: "span",
      styles: "#styles:,group inline-flex shrink-0 justify-center items-center size-9",
    },
    {
      _id: "nltBrv",
      _parent: "eweibk",
      _type: "Icon",
      styles: "#styles:, shrink-0 size-4",
      icon: "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z'></path></svg>",
    },
    {
      _id: "gesydi",
      _parent: "ultqCh",
      _type: "Button",
      // @ts-ignore
      styles_attrs: { type: "button", "x-on:click": "darkMode = 'light'", "x-show": "darkMode === 'dark'" },
      styles:
        "#styles:,bg-white dark:bg-black font-medium text-gray-800 rounded-full hover:bg-gray-200 focus:outline-none focus:bg-gray-200 dark:text-neutral-200 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800",
      _name: "Light Mode Btn",
    },
    {
      _id: "sgbhDo",
      _parent: "gesydi",
      _type: "Span",
      tag: "span",
      styles: "#styles:,group inline-flex shrink-0 justify-center items-center size-9",
    },
    {
      _id: "AdDwBC",
      _parent: "sgbhDo",
      _type: "Icon",
      styles: "#styles:, shrink-0 size-4",
      icon: "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><circle cx='12' cy='12' r='4'></circle><path d='M12 2v2'></path><path d='M12 20v2'></path><path d='m4.93 4.93 1.41 1.41'></path><path d='m17.66 17.66 1.41 1.41'></path><path d='M2 12h2'></path><path d='M20 12h2'></path><path d='m6.34 17.66-1.41 1.41'></path><path d='m19.07 4.93-1.41 1.41'></path></svg>",
    },
  ],
};

export { DarkMode as Component, Config };
