import { Img } from "@react-email/components";
import { registerChaiBlock } from "@chaibuilder/runtime";
import { Image, SingleLineText, Styles } from "@chaibuilder/runtime/controls";
import { ImageIcon } from "@radix-ui/react-icons";

const ImageBlock = ({ blockProps, styles, alt, image, width, height }: any) => {
  return <Img {...blockProps} {...styles} src={image} alt={alt} width={width} height={height} />;
};

const ImageBuilder = ({ blockProps, styles, alt, image, width, height }: any) => {
  return <img {...blockProps} {...styles} src={image} alt={alt} width={width} height={height} />;
};

registerChaiBlock(ImageBlock, {
  type: "Email/Image",
  label: "Image",
  group: "basic",
  category: "core",
  icon: ImageIcon,
  builderComponent: ImageBuilder,
  props: {
    styles: Styles({ default: "w-full" }),
    image: Image({
      title: "Image",
      default: "https://fakeimg.pl/400x200?text=Choose&font=bebas",
    }),
    alt: SingleLineText({ title: "Alt", default: "" }),
    width: SingleLineText({ title: "Width", default: "" }),
    height: SingleLineText({ title: "Height", default: "" }),
  },
});

export default ImageBlock;
