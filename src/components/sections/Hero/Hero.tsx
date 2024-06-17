"use client";
import classNames from "classnames";
import { useInView } from "react-hook-inview";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { RichText } from "@/components/elements/RichText/RichText";
import { MediaItem } from "@/components/elements/MediaItem/MediaItem";
import { MediaCarousel } from "@/components/elements/MediaCarousel/MediaCarousel";
import { ButtonGroup } from "@/components/elements/ButtonGroup/ButtonGroup";
import {
  HeroType,
  TextAlignmentType,
  FlexibleContentType,
  HeroLayoutVariant,
} from "@/lib/types";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import "@/app/styles/padding.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "@/app/styles/custom-swiper.css";
import "@/app/styles/bg-color.css";

export const Hero: React.FC<{ data: HeroType }> = ({ data }) => {
  const {
    content,
    appearanceVariant,
    contentTextAlignment,
    backgroundColor,
    backgroundImage,
    darkMode,
  } = data;
  const [ref, isIntersecting] = useInView({
    threshold: 0.4,
    unobserveOnEnter: true,
  });
  if (content.length === 0) {
    return null;
  }
  return (
    <section
      ref={ref}
      className={classNames(
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
        <HeroSection
          data={content[0]}
          alignment={contentTextAlignment}
          appearanceVariant={appearanceVariant}
          darkMode={darkMode}
          isIntersecting={isIntersecting}
        />
      )}

      {content.length > 1 && (
        <Swiper
          className="relative"
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
              <HeroSection
                data={section}
                alignment={contentTextAlignment}
                appearanceVariant={appearanceVariant}
                darkMode={darkMode}
                isIntersecting={isIntersecting}
              />
            </SwiperSlide>
          ))}
          <div className="absolute bottom-4 right-4 flex justify-center gap-4">
            <GoArrowLeft
              size={45}
              className={classNames(
                "hero-prev cursor-pointer z-10 flex justify-center items-center rounded-full p-2.5 hover:bg-primary-600/80 transition-colors duration-300 ease-in-out",
                { "text-neutral-50": darkMode }
              )}
            />
            <GoArrowRight
              size={45}
              className={classNames(
                "hero-next cursor-pointer z-10 flex justify-center items-center rounded-full p-2.5 hover:bg-primary-600/80 transition-colors duration-300 ease-in-out",
                { "text-neutral-50": darkMode }
              )}
            />
          </div>
        </Swiper>
      )}
    </section>
  );
};

const HeroSection: React.FC<{
  data: FlexibleContentType;
  alignment: TextAlignmentType;
  appearanceVariant: HeroLayoutVariant;
  darkMode: boolean;
  isIntersecting: boolean;
}> = ({ data, alignment, appearanceVariant, darkMode, isIntersecting }) => {
  return (
    <div
      key={data.id}
      className={classNames(
        "flex flex-col items-center",
        {
          "container mx-auto px-4 mt-12 mb-8": appearanceVariant === "vertical",
        },
        { "lg:flex-row ": appearanceVariant === "horizontal" }
      )}
    >
      <div
        className={classNames(
          "flex flex-col gap-4 py-16 lg:py-20 xl:py-24",
          { "px-4 custom-padding-left": appearanceVariant === "horizontal" },
          { "items-center text-center": alignment === "center" },
          { "items-end text-end": alignment === "end" }
        )}
      >
        {data.eyebrow && (
          <div
            className={classNames(
              "text-sm xl:text-base tracking-widest max-w-2xl opacity-0",
              {
                "animate-slidingHeroContent animation-delay-500":
                  isIntersecting,
              },
              { "text-primary-500": !darkMode },
              { "text-primary-400": darkMode }
            )}
          >
            {data.eyebrow}
          </div>
        )}
        {data.heading && (
          <div
            className={classNames(
              "text-hero-heading leading-tight font-heading max-w-3xl opacity-0",
              { "animate-slidingHeroContent": isIntersecting },
              { "text-neutral-50": darkMode }
            )}
          >
            <RichText data={data.heading} />
          </div>
        )}
        {data.description && (
          <div
            className={classNames(
              "prose xl:prose-lg 2xl:prose-xl mt-4 max-w-2xl opacity-0",
              {
                "animate-slidingHeroContent animation-delay-200":
                  isIntersecting,
              },
              { "text-neutral-600": !darkMode },
              { "text-neutral-200": darkMode }
            )}
          >
            <RichText data={data.description} />
          </div>
        )}
        {data.buttons.length > 0 && (
          <div
            className={classNames("mt-6 opacity-0", {
              "animate-slidingHeroContent animation-delay-400": isIntersecting,
            })}
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
          className={classNames("w-full lg:basis-3/5 min-w-[55%] opacity-0", {
            "animate-slidingHeroContent animation-delay-300": isIntersecting,
          })}
        >
          <HeroMediaPart data={data} />
        </div>
      )}
    </div>
  );
};

const HeroMediaPart: React.FC<{ data: FlexibleContentType }> = ({ data }) => {
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
        <MediaItem data={data.media[0]} videoAutoplay={true} priority={true} />
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
            type: "fraction",
          }}
        />
      )}
    </>
  );
};
