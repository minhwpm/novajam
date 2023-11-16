import { AspectRatioType, MediaType } from "@/helpers/types";
import classNames from "classnames";
import Image from "next/image";

export const MediaItem: React.FC<{
  data: MediaType | null;
  altText?: string;
  aspectRatio?: AspectRatioType;
  videoAutoplay?: boolean;
  dimensionBase?: "width" | "height";
}> = ({
  data,
  altText,
  aspectRatio = "auto",
  videoAutoplay = false,
  dimensionBase = "width",
}) => {
  if (!data) {
    return (
      <div
        className={classNames(
          `aspect-${aspectRatio}`,
          { "w-full": dimensionBase === "width" },
          { "h-full": dimensionBase === "height" }
        )}
      >
        <Image
          className={classNames(
            "object-cover w-full h-full",
          )}
          src="/bluebiz_square.webp"
          width={500}
          height={500}
          alt={altText ?? "No image"}
        />
      </div>
    );
  }

  const { url, width, height, title, contentType } = data;
  return (
    <div
      className={classNames(
        { [`aspect-${aspectRatio}`]: width >= 160 },
        { "w-full": dimensionBase === "width" },
        { "h-full": dimensionBase === "height" }
      )}
    >
      {contentType.includes("image") && (
        <Image
          className={classNames(
            { "object-cover w-full h-full": width >= 160 },
            { "w-20 mx-5 object-contain": width < 160 }
          )}
          src={url ?? "/bluebiz_square.webp"}
          alt={altText ?? title}
          width={width}
          height={height}
        />
      )}
      {contentType.includes("video") && (
        <video
          className="object-cover w-full h-full"
          src={url}
          autoPlay={videoAutoplay}
          loop={videoAutoplay}
          muted={videoAutoplay}
        >
          <track kind="captions" label={title} />
          {/* @TODO add video poster */}
        </video>
      )}
    </div>
  );
};
