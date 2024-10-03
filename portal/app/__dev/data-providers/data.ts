import { registerChaiDataProvider } from "@chaibuilder/runtime";

registerChaiDataProvider("blogs", {
  name: "Blogs",
  description: "This is a description",
  // @ts-ignore
  dataFn: async () => [
    {
      heading: "First Blog Heading",
      subheading: "First Blog Subheading",
    },
    {
      heading: "Second Blog Heading",
      subheading: "Second Blog Subheading",
    },
  ],
});

registerChaiDataProvider("hero", {
  name: "Hero",
  description: "This is a description",
  // @ts-ignore
  dataFn: async () => ({
    heading: "Hello World",
    subheading:
      "Lorem Ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
    items: [{ item: "home" }, { item: "about" }, { item: "contact" }],
    meta: {
      height: 10,
      visible: true,
      language: ["en", "fs"],
      offset: {
        x: 10,
        y: 20,
      },
    },
  }),
});
