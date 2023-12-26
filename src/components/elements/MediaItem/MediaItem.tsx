"use client"
import { MediaAspectRatioType, MediaType } from "@/helpers/types";
import classNames from "classnames";
import Image from "next/image";

export const MediaItem: React.FC<{
  data: MediaType | null;
  altText?: string;
  aspectRatio?: MediaAspectRatioType;
  videoAutoplay?: boolean;
  videoControls?: boolean;
  dimensionBase?: "width" | "height";
  priority?: boolean
  rounded?: "assets" | "full" | "none"
}> = ({
  data,
  altText,
  aspectRatio = "auto",
  videoAutoplay = false,
  videoControls = false,
  dimensionBase = "width",
  priority = false,
  rounded = "assets",
}) => {
  if (!data) {
    return (
      <div
        className={classNames(
          "overflow-hidden",
          `aspect-${aspectRatio}`,
          { "w-full": dimensionBase === "width" },
          { "h-full": dimensionBase === "height" },
          `rounded-${rounded}`,
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
          priority={priority}
        />
      </div>
    );
  }

  const { url, width, height, title, contentType } = data;
  return (
    <div
      className={classNames(
        "overflow-hidden",
        { [`aspect-${aspectRatio}`]: width >= 160 },
        { "w-full": dimensionBase === "width" },
        { "h-full": dimensionBase === "height" },
        `rounded-${rounded}`,
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
          priority={priority}
        />
      )}
      {contentType.includes("video") && (
        <video
          className="object-cover w-full h-full"
          src={url}
          autoPlay={videoAutoplay}
          loop={videoAutoplay}
          muted={videoAutoplay}
          controls={videoControls}
        >
          <track kind="captions" label={title} />
        </video>
      )}
    </div>
  );
};
