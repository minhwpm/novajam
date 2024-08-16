"use client";
import classNames from "classnames";
import { useInView } from "react-hook-inview";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { MediaCarousel } from "@/components/elements/MediaCarousel/MediaCarousel";
import { MediaItem } from "@/components/elements/MediaItem/MediaItem";
import { RichText } from "@/components/elements/RichText/RichText";
import { Container } from "@/components/elements/Container/Container";
import { ButtonGroup } from "@/components/elements/ButtonGroup/ButtonGroup";
import { HeroType, TextAlignmentType, FlexibleContentType } from "@/lib/types";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "@/app/styles/custom-swiper.css";
import "@/app/styles/bg-color.css";

export const HeroOverlay: React.FC<{ data: HeroType }> = ({ data }) => {
  const { content, contentTextAlignment, backgroundColor, backgroundImage, darkMode } = data;
  const [ref, isIntersecting] = useInView({
    threshold: 0.4,
    unobserveOnEnter: true
  });
  if (content.length === 0) {
    return null
  }
  return (
    <section
      ref={ref}
      className={classNames(
        "relative",
        `${backgroundColor}-${darkMode ? "dark-" : ""}section-bg-color`,
        {
          "lg:bg-fixed bg-center bg-no-repeat bg-cover bg-blend-multiply":
            backgroundImage,
        }
      )}
      style={
        backgroundImage
          ? {
              backgroundImage: `url(${backgroundImage?.url})`,
            }
          : {}
      }
    >
      {content.length === 1 && (
        <HeroOverlaySection
          data={content[0]}
          alignment={contentTextAlignment}
          darkMode={darkMode}
          isIntersecting={isIntersecting}
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
            nextEl: ".hero-next",
            prevEl: ".hero-prev",
          }}
          loop={true}
          modules={[Navigation, Pagination, Autoplay]}
        >
          {content.map((section) => (
            <SwiperSlide key={section.id}>
              <HeroOverlaySection
                data={section}
                alignment={contentTextAlignment}
                darkMode={darkMode}
                isIntersecting={isIntersecting}
              />
            </SwiperSlide>
          ))}
          <div className="absolute bottom-4 right-4 flex justify-center gap-4">
            <GoArrowLeft
              size={45}
              className={classNames(
                "hero-prev cursor-pointer z-10 flex justify-center items-center rounded-full p-2.5 bg-neutral-500/20 hover:text-primary-600 hover:bg-neutral-200/80 transition-colors duration-300 ease-in-out",
                { "text-neutral-50": darkMode }
              )}
            />
            <GoArrowRight
              size={45}
              className={classNames(
                "hero-next cursor-pointer z-10 flex justify-center items-center rounded-full p-2.5 bg-neutral-500/20 hover:text-primary-600 hover:bg-neutral-200/80 transition-colors duration-300 ease-in-out",
                { "text-neutral-50": darkMode }
              )}
            />
          </div>
        </Swiper>
      )}
    </section>
  );
}

export const HeroOverlaySection: React.FC<{
  data: FlexibleContentType;
  alignment: TextAlignmentType;
  darkMode: boolean;
  isIntersecting: boolean;
}> = ({ data, alignment, darkMode, isIntersecting }) => {
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
            "w-full h-full px-4 py-36 overflow-hidden",
            {
              "lg:absolute lg:top-0 lg:left-0":
                data.media.length > 0 || data.embeddedMediaUrl,
            }
          )}
        >
          <Container
            className={classNames(
              "h-full flex flex-col justify-center",
              {
                "items-center text-center": alignment === "center",
              },
              { "items-end text-end": alignment === "end" }
            )}
          >
            {data.eyebrow && (
              <div
                className={classNames(
                  "text-sm lg:text-base xl:text-lg tracking-widest font-medium  max-w-xl opacity-0",
                  {
                    "animate-slidingHeroContent animation-delay-500":
                      isIntersecting,
                  },
                  { "text-primary-500": !darkMode },
                  { "text-primary-400 drop-shadow-lg": darkMode }
                )}
              >
                {data.eyebrow}
              </div>
            )}
            {data.heading && (
              <div
                className={classNames(
                  "relative text-super-heading leading-tight font-heading max-w-3xl mt-2 opacity-0",
                  { "animate-slidingHeroContent": isIntersecting },
                  { "text-white drop-shadow-lg": darkMode }
                )}
              >
                <RichText data={data.heading} />
              </div>
            )}
            {data.description && (
              <div
                className={classNames(
                  "prose md:prose-lg lg:prose-xl mt-6 lg:mt-10 max-w-3xl opacity-0",
                  { "animate-slidingHeroContent animation-delay-200 ": isIntersecting },
                  { "text-neutral-100 drop-shadow-lg": darkMode }
                )}
              >
                <RichText data={data.description} />
              </div>
            )}
            {data.buttons.length > 0 && (
              <div
                className={classNames(
                  "mt-8 lg:mt-12 opacity-0",
                  { "animate-slidingHeroContent animation-delay-400 ": isIntersecting },
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

const HeroMediaPart: React.FC<{ data: FlexibleContentType }> = ({ data }) => {
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