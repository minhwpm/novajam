import { AlignmentType, ContentPieceType, MediaAspectRatioType } from "@/helpers/types";
import classNames from "classnames";
import { MediaItem } from "@/components/elements/MediaItem/MediaItem";
import { MediaCarousel } from "@/components/elements/MediaCarousel/MediaCarousel";

export const FlexibleContentMediaPart: React.FC<{
  data: ContentPieceType;
  alignment?: AlignmentType;
  aspectRatio?: MediaAspectRatioType,
  rounded?: "assets" | "full" | "none"
}> = ({ data, alignment, aspectRatio = "4/3", rounded = "assets"}) => {
  const { media, embeddedMediaUrl, embeddedMediaTitle } = data;
  return (
    <div
      className={classNames(
        "flex",
        { "justify-center": alignment === "center" },
        { "justify-end": alignment === "reverse" }
      )}
    >
      {embeddedMediaUrl && (
        <div
          className={classNames(
            "w-full overflow-hidden",
            `aspect-${aspectRatio === "auto" ? "3/2" : aspectRatio}`,
            `rounded-${rounded}`,
          )}
        >
          <iframe
            src={embeddedMediaUrl}
            width="100%"
            title={embeddedMediaTitle ?? ""}
            className="w-full h-full object-cover"
            allowFullScreen={true}
          />
        </div>
      )}
      {!embeddedMediaUrl && media && media.length === 1 && (
        <MediaItem data={media[0]} aspectRatio={aspectRatio} rounded={rounded} />
      )}
      {!embeddedMediaUrl && media && media.length > 1 && (
        <MediaCarousel
          data={media}
          autoplay={{
            delay: 3500,
          }}
          pagination={{
            enabled: true
          }}
          aspectRatio={aspectRatio}
          rounded={rounded}
        />
      )}
    </div>
  );
};