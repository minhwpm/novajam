import { AlignmentType, ContentPieceType } from "@/helpers/types";
import classNames from "classnames";
import { MediaItem } from "@/components/elements/MediaItem/MediaItem";
import { MediaCarousel } from "@/components/elements/MediaCarousel/MediaCarousel";

export const MediaPart: React.FC<{
  data: ContentPieceType;
  alignment?: AlignmentType
}> = ({ data, alignment }) => {
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
        <iframe
          src={embeddedMediaUrl}
          width="100%"
          title={embeddedMediaTitle ?? ""}
          className="aspect-video"
          allowFullScreen={true}
        />
      )}
      {!embeddedMediaUrl && media && media.length === 1 && (
        <MediaItem data={media[0]} />
      )}
      {!embeddedMediaUrl && media && media.length > 1 && (
        <MediaCarousel
          data={media}
          autoplay={{
            delay: 5000,
          }}
          pagination={{
            enabled: true
          }}
        />
      )}
    </div>
  );
};