import { AlignmentType, ContentPieceType } from "@/helpers/types";
import classNames from "classnames";
import RichText from "../RichText/RichText";
import Button from "../Button/Button";
import { MediaCarousel } from "../MediaCarousel/MediaCarousel";
import { MediaItem } from "../MediaItem/MediaItem";

export const ContentPiece: React.FC<{
  data: ContentPieceType;
  alignment: AlignmentType
}> = ({
  data, alignment
}) => {
  const { heading, label, content, media, buttons } = data;
  return (
    <div className="flex flex-col rounded-assets bg-white">
      <div
        className={classNames("flex", 
          { "justify-center": alignment === "center" },
          { "justify-end": alignment === "reverse" },
        )}
      >
        {media.length === 1 && <MediaItem data={media[0]} />}
        {media.length > 1 && <MediaCarousel data={media} />}
      </div>
      {(heading || label || content || buttons) && (
        <div
          className={classNames(
            "p-5 flex-1 flex flex-col justify-between",
            { "text-center": alignment === "center" },
            { "text-end": alignment === "reverse" }
          )}
        >
          <div>
            <div className={classNames("text-sm font-semibold text-neutral-500 tracking-widest")}>
              {label}
            </div>
            <div className="text-lg lg:text-2xl font-semibold mt-1">
              <RichText htmlString={heading} />
            </div>
            <div className="py-3 prose lg:prose-lg">
              <RichText htmlString={content} />
            </div>
          </div>
          {buttons && buttons.length > 0 && (
            <div
              className={classNames("mt-8", {
                "flex justify-center": alignment === "center",
              })}
            >
              {buttons.map(button => (
                <Button
                  key={button.id}
                  url={button.url}
                  variant={button.buttonVariant}
                >
                  {button.text}
                </Button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
