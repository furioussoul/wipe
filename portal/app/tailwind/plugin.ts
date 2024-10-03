import plugin from "tailwindcss/plugin";

export default plugin(function ({ addBase, theme }) {
  addBase({
    "h1,h2,h3,h4,h5,h6": {
      fontFamily: theme("fontFamily.heading"),
    },
    body: {
      fontFamily: theme("fontFamily.body"),
      color: theme("colors.text-light"),
      backgroundColor: theme("colors.bg-light"),
    },
    ".dark body": {
      color: theme("colors.text-dark"),
      backgroundColor: theme("colors.bg-dark"),
    },
  });
});
