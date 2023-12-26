/* eslint-disable complexity */
"use client";
import classNames from "classnames";
import { Button } from "@/components/elements/Button/Button";
import { AlignmentType, ContentPieceType, HeroType } from "@/helpers/types";
import { RichText2 } from "@/components/elements/RichText/RichText2";
import { MediaItem } from "@/components/elements/MediaItem/MediaItem";
import { MediaCarousel } from "@/components/elements/MediaCarousel/MediaCarousel";
import { Container } from "@/components/elements/Container/Container";
import { useOnLoaded } from "@/helpers/hooks/useOnLoaded";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "@/app/custom-swiper.css";

const HeroMediaPart: React.FC<{ data: ContentPieceType }> = ({ data }) => {
  return (
    <>
      {data.embeddedMediaUrl && (
        <iframe
          src={data.embeddedMediaUrl}
          width="100%"
          title={data.embeddedMediaTitle ?? ""}
          className="aspect-video"
        />
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
            delay: 5000,
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
const Section: React.FC<{
  data: ContentPieceType;
  onLoaded: boolean;
  textAlignment: AlignmentType;
}> = ({ data, onLoaded, textAlignment }) => {
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
            {data.label && (
              <div
                className={classNames(
                  "relative",
                  { "-left-20 opacity-0": !onLoaded },
                  {
                    "opacity-100 left-0 transition-all duration-500 delay-200":
                      onLoaded,
                  },
                  "tracking-widest font-semibold lg:text-lg xl:text-xl max-w-2xl"
                )}
              >
                {data.label}
              </div>
            )}
            {data.heading && (
              <div
                className={classNames(
                  "relative",
                  { "-left-20 opacity-0": !onLoaded },
                  {
                    "opacity-100 left-0 transition-all ease-out duration-500 delay-300":
                      onLoaded,
                  },
                  "text-super-heading leading-[1.1] font-heading max-w-3xl mt-2"
                )}
              >
                <RichText2 data={data.heading} />
              </div>
            )}
            {data.description && (
              <div
                className={classNames(
                  "relative",
                  { "-left-20 opacity-0": !onLoaded },
                  {
                    "opacity-100 left-0 transition-all ease-out duration-500 delay-200":
                      onLoaded,
                  },
                  "prose-lg lg:prose-xl mt-10 max-w-2xl"
                )}
              >
                <RichText2 data={data.description} />
              </div>
            )}
            <div
              className={classNames(
                "flex flex-row flex-wrap gap-6 mt-12",
                "relative",
                { "-left-20 opacity-0": !onLoaded },
                {
                  "opacity-100 left-0 transition-all ease-out duration-500 delay-500":
                    onLoaded,
                },
                { "justify-center": textAlignment === "center" },
                { "justify-end": textAlignment === "reverse" }
              )}
            >
              {data.buttons.length > 0 &&
                data.buttons.map((button) => (
                  <Button
                    key={button.text}
                    variant={button.buttonVariant}
                    size="lg"
                    url={button.url}
                    openNewTab={button.openNewTab}
                  >
                    {button.text}
                  </Button>
                ))}
            </div>
          </Container>
        </div>
      )}
    </div>
  );
};
export const HeroOverlay: React.FC<{ data: HeroType }> = ({ data }) => {
  const { content, textAlignment } = data;
  // @TODO refactor onLoaded ?
  const onLoaded = useOnLoaded();

  if (content.length === 0) {
    return null
  }
  return (
    <section className={classNames("relative")}>
      {content.length === 1 && (
        <Section
          data={content[0]}
          onLoaded={onLoaded}
          textAlignment={textAlignment}
        />
      )}

      {content.length > 1 && (
        <Swiper
          slidesPerView={1}
          autoplay={{
            delay: 3500,
          }}
          pagination={{
            enabled: true,
            clickable: true,
          }}
          navigation={{
            enabled: true,
          }}
          loop={true}
          modules={[Navigation, Pagination]}
        >
          {content.map((section) => (
            <SwiperSlide key={section.id}>
              <Section
                data={section}
                onLoaded={onLoaded}
                textAlignment={textAlignment}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </section>
  );
};
