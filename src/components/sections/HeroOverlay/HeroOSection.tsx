// @TODO
/* eslint-disable complexity */
import classNames from "classnames";
import { MediaCarousel } from "@/components/elements/MediaCarousel/MediaCarousel";
import { MediaItem } from "@/components/elements/MediaItem/MediaItem";
import { AlignmentType, ContentPieceType } from "@/helpers/types";
import { RichText2 } from "@/components/elements/RichText/RichText2";
import { Container } from "@/components/elements/Container/Container";
import { ButtonGroup } from "@/components/elements/ButtonGroup/ButtonGroup";

export const HeroOSection: React.FC<{
  data: ContentPieceType;
  textAlignment: AlignmentType;
}> = ({ data, textAlignment }) => {
  return (
    <div
      key={data.id}
      className={classNames("relative w-screen h-auto lg:min-h-max")}
    >
      {(data.media.length > 0 || data.embeddedMediaUrl) && (
        <div
          className={classNames("absolute w-full h-full lg:w-auto lg:static")}
        >
          <HeroMediaPart data={data} />
        </div>
      )}
      {(data.heading || data.description || data.buttons.length) && (
        <div
          className={classNames(
            "w-full h-full px-4 pt-40 pb-20 text-white drop-shadow-lg overflow-hidden",
            {
              "bg-gradient-to-b from-primary-800 via-primary-500 to-primary-300":
                data.media.length === 0 && !data.embeddedMediaUrl,
            },
            {
              "lg:absolute lg:top-0 lg:left-0 bg-neutral-900/20":
                data.media.length > 0 || data.embeddedMediaUrl,
            }
          )}
        >
          <Container
            className={classNames(
              "h-full flex flex-col justify-center bg-transparent",
              {
                "items-center text-center": textAlignment === "center",
              },
              { "items-end text-end": textAlignment === "reverse" }
            )}
          >
            {data.eyebrow && (
              <div
                className={classNames(
                  "animate-slidingHeroContent animation-delay-200",
                  "tracking-widest font-semibold lg:text-lg xl:text-xl max-w-xl"
                )}
              >
                {data.eyebrow}
              </div>
            )}
            {data.heading && (
              <div
                className={classNames(
                  "relative animate-slidingHeroContent",
                  "text-super-heading leading-tight font-heading max-w-2xl mt-2"
                )}
              >
                <RichText2 data={data.heading} />
              </div>
            )}
            {data.description && (
              <div
                className={classNames(
                  "animate-slidingHeroContent",
                  "prose md:prose-lg lg:prose-xl text-white mt-10 max-w-xl"
                )}
              >
                <RichText2 data={data.description} />
              </div>
            )}
            <div
              className={classNames(
                "mt-12 animate-slidingHeroContent",
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
          </Container>
        </div>
      )}
    </div>
  );
};

const HeroMediaPart: React.FC<{ data: ContentPieceType }> = ({ data }) => {
  return (
    <>
      {data.embeddedMediaUrl && (
        <div
          className={classNames(
            "overflow-hidden h-full lg:aspect-video",
          )}
        >
          <iframe
            src={data.embeddedMediaUrl}
            title={data.embeddedMediaTitle ?? ""}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      {data.media.length === 1 && (
        <MediaItem
          data={data.media[0]}
          dimensionBase="height"
          videoAutoplay={true}
          priority={true}
          rounded="none"
        />
      )}
      {data.media.length > 1 && (
        <MediaCarousel
          data={data.media}
          dimensionBase="height"
          videoAutoplay={true}
          priority={true}
          rounded="none"
          autoplay={{
            delay: 3500,
          }}
          pagination={{
            enabled: true,
            type: 'fraction',
          }}
        />
      )}
    </>
  );
};