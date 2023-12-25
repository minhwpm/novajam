"use client";
import classNames from "classnames";
import { Button } from "@/components/elements/Button/Button";
import { ContentPieceType, HeroType } from "@/helpers/types";
import { RichText2 } from "@/components/elements/RichText/RichText2";
import { MediaItem } from "@/components/elements/MediaItem/MediaItem";
import { MediaCarousel } from "@/components/elements/MediaCarousel/MediaCarousel";
import { Container }from "@/components/elements/Container/Container";
import { useIsLoaded } from "@/helpers/hooks/useIsLoaded";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "@/app/custom-swiper.css"

const HeroMediaPart: React.FC<{data: ContentPieceType}> = ({data}) => {
  return (
    <>
      {data.embeddedMediaUrl && (
        <iframe
          src={data.embeddedMediaUrl}
          width="100%"
          title={data.embeddedMediaTitle ?? ""}
          className="aspect-[4/5] lg:aspect-video"
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
          navigation={{
            enabled: false,
          }}
        />
      )}
    </>
  )
}

export const HeroOverlay: React.FC<{ data: HeroType }> = ({ data }) => {
  const { content, textAlignment } = data;
  const isLoaded = useIsLoaded();

  return (
    <section className={classNames("relative")}>
      <Swiper
        slidesPerView={1}
        autoplay={{
          delay: 3500,
        }}
        pagination={{
          enabled: true,
          clickable: true,
        }}
        loop={true}
        modules={[Navigation, Pagination]}
      >
        {content.map((section) => (
          <SwiperSlide key={section.id}>
            <div
              key={section.id}
              className={classNames("relative w-screen h-auto lg:min-h-max")}
            >
              {section.media.length > 0 && (
                <div
                  className={classNames(
                    "absolute w-full h-full lg:w-auto lg:static"
                  )}
                >
                  <HeroMediaPart data={section} />
                </div>
              )}
              {(section.heading ||
                section.description ||
                section.buttons.length) && (
                <div
                  className={classNames(
                    "w-full h-full px-4 pt-40 pb-20 text-white drop-shadow-lg overflow-hidden",
                    {
                      "bg-gradient-to-b from-primary-800 via-primary-500 to-primary-300":
                        section.media.length === 0,
                    },
                    {
                      "lg:absolute lg:top-0 lg:left-0 bg-neutral-900/20":
                        section.media.length > 0,
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
                    {section.label && (
                      <div
                        className={classNames(
                          "relative",
                          { "-left-20 opacity-0": !isLoaded },
                          {
                            "opacity-100 left-0 transition-all duration-500 delay-200":
                              isLoaded,
                          },
                          "tracking-widest font-semibold lg:text-lg xl:text-xl max-w-2xl"
                        )}
                      >
                        {section.label}
                      </div>
                    )}
                    {section.heading && (
                      <div
                        className={classNames(
                          "relative",
                          { "-left-20 opacity-0": !isLoaded },
                          {
                            "opacity-100 left-0 transition-all ease-out duration-500 delay-300":
                              isLoaded,
                          },
                          "text-super-heading leading-[1.1] font-heading max-w-3xl mt-2"
                        )}
                      >
                        <RichText2 data={section.heading} />
                      </div>
                    )}
                    {section.description && (
                      <div
                        className={classNames(
                          "relative",
                          { "-left-20 opacity-0": !isLoaded },
                          {
                            "opacity-100 left-0 transition-all ease-out duration-500 delay-200":
                              isLoaded,
                          },
                          "prose-lg lg:prose-xl mt-10 max-w-2xl"
                        )}
                      >
                        <RichText2 data={section.description} />
                      </div>
                    )}
                    <div
                      className={classNames(
                        "flex flex-row flex-wrap gap-6 mt-12",
                        "relative",
                        { "-left-20 opacity-0": !isLoaded },
                        {
                          "opacity-100 left-0 transition-all ease-out duration-500 delay-500":
                            isLoaded,
                        },
                        { "justify-center": textAlignment === "center" },
                        { "justify-end": textAlignment === "reverse" }
                      )}
                    >
                      {section.buttons.length > 0 &&
                        section.buttons.map((button) => (
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
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}