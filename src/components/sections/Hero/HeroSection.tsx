import classNames from "classnames";
import { AlignmentType, ContentPieceType, HeroLayoutType } from "@/helpers/types";
import { RichText2 } from "@/components/elements/RichText/RichText2";
import { MediaItem } from "@/components/elements/MediaItem/MediaItem";
import { MediaCarousel } from "@/components/elements/MediaCarousel/MediaCarousel";
import { ButtonGroup } from "@/components/elements/ButtonGroup/ButtonGroup";

export const HeroSection: React.FC<{
  data: ContentPieceType;
  onLoaded: boolean;
  textAlignment: AlignmentType;
  layout: HeroLayoutType;
}> = ({ data, onLoaded, textAlignment, layout }) => {
  return (
    <div
      key={data.id}
      className={classNames("flex flex-col items-center", {
        "lg:flex-row lg:gap-x-12": layout === "horizontal",
      })}
    >
      <div
        className={classNames(
          "flex flex-col gap-2 py-16",
          { "items-center text-center": textAlignment === "center" },
          { "items-end text-end": textAlignment === "reverse" }
        )}
      >
        {data.label && (
          <div
            className={classNames(
              "relative font-semibold text-primary-600 tracking-widest max-w-2xl",
              { "-left-20 opacity-0": !onLoaded },
              {
                "opacity-100 left-0 transition-all duration-500 delay-100":
                  onLoaded,
              }
            )}
          >
            {data.label}
          </div>
        )}
        {data.heading && (
          <div
            className={classNames(
              "relative text-heading leading-tight font-heading max-w-3xl",
              { "-left-20 opacity-0": !onLoaded },
              {
                "opacity-100 left-0 transition-all duration-500 delay-200":
                  onLoaded,
              }
            )}
          >
            <RichText2 data={data.heading} />
          </div>
        )}
        {data.description && (
          <div
            className={classNames(
              "relative prose-lg lg:prose-xl mt-3 max-w-2xl",
              { "-left-20 opacity-0": !onLoaded },
              {
                "opacity-100 left-0 transition-all duration-500 delay-150":
                  onLoaded,
              }
            )}
          >
            <RichText2 data={data.description} />
          </div>
        )}
        {data.buttons.length > 0 && (
          <div
            className={classNames(
              "relative mt-5",
              { "-left-20 opacity-0": !onLoaded },
              {
                "opacity-100 left-0 transition-all duration-500 delay-300":
                  onLoaded,
              }
            )}
          >
            {data.buttons.length > 0 && (
              <ButtonGroup
                data={data.buttons}
                alignment={textAlignment}
                size="lg"
              />
            )}
          </div>
        )}
      </div>
      {(data.media.length > 0 || data.embeddedMediaUrl) && (
        <div
          className={classNames(
            "relative w-full lg:basis-3/5 min-w-[0.55]",
            { "-left-20 opacity-0": !onLoaded },
            {
              "opacity-100 left-0 transition-all duration-500 delay-500":
                onLoaded,
            }
          )}
        >
          <HeroMediaPart data={data} />
        </div>
      )}
    </div>
  )
}

const HeroMediaPart: React.FC<{data: ContentPieceType}> = ({data}) => {
  return (
    <>
      {data.embeddedMediaUrl && (
        <iframe
          src={data.embeddedMediaUrl}
          width="100%"
          title={data.embeddedMediaTitle ?? ""}
          className="aspect-video"
          allowFullScreen={true}
        />
      )}
      {data.media.length === 1 && (
        <MediaItem
          data={data.media[0]}
          videoAutoplay={true}
          priority={true}
        />
      )}
      {data.media.length > 1 && (
        <MediaCarousel
          data={data.media}
          videoAutoplay={true}
          priority={true}
          autoplay={{
            delay: 5000,
          }}
          loop={true}
          pagination={{
            enabled: true,
            type: 'fraction',
          }}
        />
      )}
    </>
  )
}