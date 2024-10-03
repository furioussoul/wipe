import { registerChaiBlock } from "@chaibuilder/runtime";

const ColComponent = () => {
  return <div>Column</div>;
};

const RowComponent = () => {
  return <div className={"w-full border p-4"}>Row</div>;
};

registerChaiBlock(ColComponent, {
  type: "Col",
  label: "Col",
  category: "custom",
  group: "layout",
  preview: "https://placehold.it/200x50",
});

registerChaiBlock(RowComponent, {
  type: "Row",
  label: "Row",
  category: "custom",
  group: "layout",
  preview: "https://placehold.it/400x50",
});
