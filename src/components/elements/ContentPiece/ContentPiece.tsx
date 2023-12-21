import { AlignmentType, ContentPieceType } from "@/helpers/types";
import classNames from "classnames";
import RichText2 from "@/components/elements/RichText/RichText2"
import { MediaCarousel } from "@/components/elements/MediaCarousel/MediaCarousel";
import { MediaItem } from "@/components/elements/MediaItem/MediaItem";
import { ButtonGroup } from "../ButtonGroup/ButtonGroup";

const MediaPart: React.FC<{
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
          navigation={{
            enabled: false,
          }}
        />
      )}
    </div>
  );
};

const TextPart: React.FC<{
  data: ContentPieceType;
}> = ({ data }) => {
  const { heading, label, description } = data;
  return (
    <div>
      {label && (
        <div className={classNames("text-sm font-semibold text-neutral-500 tracking-widest")}>
          {label}
        </div>
      )}
      {heading && (
        <div className="text-lg lg:text-2xl mt-1">
          <RichText2 data={heading} />
        </div>
      )}
      {description && (
        <div className="py-3 prose lg:prose-lg">
          <RichText2 data={description} />
        </div>
      )}
    </div>
  )
}

export const ContentPiece: React.FC<{
  data: ContentPieceType;
  alignment?: AlignmentType
}> = ({
  data, alignment = 'center'
}) => {
  const { heading, label, description, media, embeddedMediaUrl, buttons } = data;
  return (
    <div className="flex flex-col rounded-assets bg-white">
      {(media || embeddedMediaUrl) && <MediaPart data={data} alignment={alignment} /> }
      {(heading || label || description || buttons?.length > 0) && (
        <div
          className={classNames(
            "p-5 flex-1 flex flex-col justify-between",
            { "text-center": alignment === "center" },
            { "text-end": alignment === "reverse" }
          )}
        >
          <TextPart data={data} />
          {buttons && buttons.length > 0 && (
            <ButtonGroup data={buttons} alignment={alignment} />
          )}
        </div>
      )}
    </div>
  );
};
