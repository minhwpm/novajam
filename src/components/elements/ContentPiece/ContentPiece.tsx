import { ContentPieceType } from "@/helpers/types";
import classNames from "classnames";
import RichText from "../RichText/RichText";
import Button from "../Button/Button";
import { MediaCarousel } from "../MediaCarousel/MediaCarousel";
import { MediaItem } from "../MediaItem/MediaItem";

export const ContentPiece: React.FC<{ data: ContentPieceType }> = ({
  data,
}) => {
  const { heading, content, media, ctaButton, alignment } = data;
  return (
    <div className="flex flex-col">
      <div
        className={classNames({
          "flex justify-center": alignment === "center",
        })}
      >
        {media.length === 1 && <MediaItem data={media[0]} />}
        {media.length > 1 && <MediaCarousel data={media} />}
      </div>
      {(heading || content || ctaButton) && (
        <div
          className={classNames(
            "py-5 pr-5 flex-1 flex flex-col justify-between",
            { "text-center": alignment === "center" }
          )}
        >
          <h4 className="text-lg lg:text-2xl font-semibold mt-1">
            {heading}
          </h4>
          <div className="py-3 prose lg:prose-lg">
            <RichText htmlString={content} />
          </div>
          {ctaButton && (
            <div
              className={classNames("mt-8", {
                "flex justify-center": alignment === "center",
              })}
            >
              <Button
                key={ctaButton.text}
                url={ctaButton.url}
                variant={ctaButton.buttonVariant}
              >
                {ctaButton.text}
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
