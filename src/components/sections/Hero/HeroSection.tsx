import classNames from "classnames";
import { AlignmentType, ContentPieceType, HeroLayoutType } from "@/helpers/types";
import { RichText2 } from "@/components/elements/RichText/RichText2";
import { MediaItem } from "@/components/elements/MediaItem/MediaItem";
import { MediaCarousel } from "@/components/elements/MediaCarousel/MediaCarousel";
import { ButtonGroup } from "@/components/elements/ButtonGroup/ButtonGroup";

export const HeroSection: React.FC<{
  data: ContentPieceType;
  alignment: AlignmentType;
  layout: HeroLayoutType;
}> = ({ data, alignment, layout }) => {
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
          { "items-center text-center": alignment === "center" },
          { "items-end text-end": alignment === "reverse" }
        )}
      >
        {data.eyebrow && (
          <div
            className={classNames(
              "font-semibold text-primary-600 tracking-widest max-w-2xl animate-slidingHeroContent",
            )}
          >
            {data.eyebrow}
          </div>
        )}
        {data.heading && (
          <div
            className={classNames(
              "text-heading leading-tight font-heading max-w-3xl animate-slidingHeroContent",
            )}
          >
            <RichText2 data={data.heading} />
          </div>
        )}
        {data.description && (
          <div
            className={classNames(
              "prose xl:prose-lg 2xl:prose-xl text-neutral-700 mt-3 max-w-2xl animate-slidingHeroContent",
            )}
          >
            <RichText2 data={data.description} />
          </div>
        )}
        {data.buttons.length > 0 && (
          <div
            className={classNames(
              "mt-5 animate-slidingHeroContent",
            )}
          >
            {data.buttons.length > 0 && (
              <ButtonGroup
                data={data.buttons}
                alignment={alignment}
                size="lg"
              />
            )}
          </div>
        )}
      </div>
      {(data.media.length > 0 || data.embeddedMediaUrl) && (
        <div
          className={classNames(
            "w-full lg:basis-3/5 min-w-[0.55] animate-slidingHeroContent",
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