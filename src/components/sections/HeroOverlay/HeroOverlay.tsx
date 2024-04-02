"use client";
import classNames from "classnames";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { MediaCarousel } from "@/components/elements/MediaCarousel/MediaCarousel";
import { MediaItem } from "@/components/elements/MediaItem/MediaItem";
import { RichText2 } from "@/components/elements/RichText/RichText";
import { Container } from "@/components/elements/Container/Container";
import { ButtonGroup } from "@/components/elements/ButtonGroup/ButtonGroup";
import { HeroType, AlignmentType, ContentPieceType } from "@/helpers/types";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "@/app/css/custom-swiper.css";

export const HeroOverlay: React.FC<{ data: HeroType }> = ({ data }) => {
  const { content, alignment } = data;

  if (content.length === 0) {
    return null
  }
  return (
    <section className={classNames("relative")}>
      {content.length === 1 && (
        <HeroOverlaySection
          data={content[0]}
          alignment={alignment}
        />
      )}

      {content.length > 1 && (
        <Swiper
          slidesPerView={1}
          autoplay={{
            delay: 5000,
          }}
          pagination={{
            enabled: true,
            clickable: true,
          }}
          navigation={{
            enabled: true,
          }}
          loop={true}
          modules={[Navigation, Pagination, Autoplay]}
        >
          {content.map((section) => (
            <SwiperSlide key={section.id}>
              <HeroOverlaySection
                data={section}
                alignment={alignment}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </section>
  );
}

export const HeroOverlaySection: React.FC<{
  data: ContentPieceType;
  alignment: AlignmentType;
}> = ({ data, alignment }) => {
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
            "w-full h-full px-4 pt-48 pb-20 text-white drop-shadow-lg overflow-hidden",
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
                "items-center text-center": alignment === "center",
              },
              { "items-end text-end": alignment === "end" }
            )}
          >
            {data.eyebrow && (
              <div
                className={classNames(
                  "opacity-0 animate-slidingHeroContent animation-delay-500",
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
                  "opacity-0 animate-slidingHeroContent animation-delay-200",
                  "prose md:prose-lg lg:prose-xl text-white mt-6 lg:mt-10 max-w-xl"
                )}
              >
                <RichText2 data={data.description} />
              </div>
            )}
            {data.buttons.length > 0 && (
              <div
                className={classNames(
                  "mt-8 lg:mt-12 opacity-0 animate-slidingHeroContent animation-delay-400",
                )}
              >
                <ButtonGroup
                  data={data.buttons}
                  alignment={alignment}
                  size="lg"
                />
              </div>
            )}
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