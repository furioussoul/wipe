import { useEffect, useState } from "react";
import { isEmpty, map } from "lodash-es";
import { atom, useAtom } from "jotai";
import { ScrollArea } from "@/app/ui";
import { useBuilderProp } from "../../../../hooks";
import { useTranslation } from "react-i18next";
import { Loader, Upload } from "lucide-react";

const uploadedMediaAtom = atom<
  {
    id: string;
    url: string;
    thumbUrl: string;
    name: string;
  }[]
>([]);

// @TODO: Loading media and showing skeleton for uploaded images and unsplash images
const UploadImages = ({ isModalView, onSelect }: { isModalView: boolean; onSelect: (_url: string) => void }) => {
  const { t } = useTranslation();
  const uploadImage = useBuilderProp("uploadMediaCallback");
  const fetchImages = useBuilderProp("fetchMediaCallback");

  const [images, setImages] = useAtom(uploadedMediaAtom);
  const [isUploading, setIsUploading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [, setFile] = useState<File>();
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      if (!fetchImages) return;
      setIsFetching(true);
      // @ts-ignore
      const uploadedImages = await fetchImages();
      setImages(uploadedImages || []);
      setIsFetching(false);
    })();
  }, []);

  const onChange = (e: any) => {
    setError("");
    // check if the file is an image else set error
    if (e && e?.target?.files?.length > 0) {
      const file = e.target.files[0];
      if (file.type.startsWith("image")) {
        onUpload(file);
      } else {
        setError(t("Please select an image"));
      }
    }
  };

  const onUpload = async (file: File) => {
    if (!uploadImage) return;
    setIsUploading(true);
    try {
      // @ts-ignore
      const { url } = await uploadImage(file);
      onSelect(url);
      setFile(undefined);
      // @ts-ignore
      const uploadedImages = await fetchImages();
      setImages(uploadedImages);
    } catch (err: any) {
      setImages([]);
      setError(err?.message || "Something went wrong.");
    }
    setIsUploading(false);
  };

  return (
    <div>
      <label htmlFor={isModalView ? "upload-in-modal" : "upload-in-panel"}>
        <div className="flex flex-col items-center rounded-lg">
          <label
            htmlFor="image-upload"
            className="flex w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100">
            <div className="flex flex-col items-center justify-center pb-6 pt-5">
              <Upload className="mb-3 h-10 w-10 text-gray-400" />
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">{t("Click to upload")}</span>
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{t("SVG, PNG, JPG or GIF (Max. 2mb)")}</p>
            </div>
            {isUploading ? (
              <div className="flex h-full w-full items-center justify-center">
                <Loader className="h-6 w-6 animate-spin" />
                <span className="ml-2 text-sm text-gray-500">{t("Uploading...")}</span>
              </div>
            ) : null}
            {error && <p className="pb-2 text-xs text-red-500">{error || t("Something went wrong")}</p>}
          </label>
        </div>
        <input
          type="file"
          id={isModalView ? "image-upload" : "image-upload"}
          accept="image/*"
          hidden
          onChange={onChange}
        />
      </label>
      <ScrollArea className={`-mx-2 flex h-full flex-col pb-8 pt-2 ${isModalView ? "px-2" : ""} pt-2`}>
        {isEmpty(images) && isFetching && (
          <div className="flex flex-col items-center justify-center py-6">
            <div className="animate-pulse font-medium">{t("Fetching...")}</div>
          </div>
        )}
        {isEmpty(images) && !isFetching && (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <div className="mb-4 h-12 rounded-full p-6"></div>
            <h3 className="mb-2 text-sm font-semibold">{t("No images found")}</h3>
            <p className="mb-4 max-w-sm text-muted-foreground">
              {t("It looks like you haven't uploaded any images yet. Start by clicking the upload button above.")}
            </p>
          </div>
        )}
        {isModalView ? (
          <div className="h-full columns-5 py-2">
            {map(images, (pic) => (
              <div role="button" tabIndex={0} className="my-1 flex" key={pic.id} onClick={() => onSelect(pic.url)}>
                <div className="relative overflow-hidden rounded-md bg-cover bg-no-repeat">
                  <img
                    className="h-auto flex-1 cursor-pointer rounded-md transition duration-300 ease-in-out hover:scale-105"
                    alt={pic.name}
                    src={pic.thumbUrl}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          map(images, (pic) => (
            // TODO: Drag and Drop Image to Canvas from Here use `pic.url` for image quality
            <div role="button" tabIndex={0} className="px-2 py-1" key={pic.id} onClick={() => onSelect(pic.url)}>
              <div className="relative overflow-hidden rounded-md bg-cover bg-no-repeat">
                <img
                  className="h-auto w-full cursor-pointer transition duration-300 ease-in-out hover:scale-105"
                  alt={pic.name}
                  src={pic.url}
                />
              </div>
            </div>
          ))
        )}
        {/* TODO: Update logic here for limit and offset. fetchImages(limit, offset) already support */}
        {/* {!isEmpty(images) && (
          <Button size="sm" variant="link" className="w-full" onClick={() => {}}>
            Load More
          </Button>
        )} */}
      </ScrollArea>
    </div>
  );
};

export default UploadImages;
