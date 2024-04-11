"use client";
import classNames from "classnames";
import { useInView } from "react-hook-inview";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { RichText2 } from "@/components/elements/RichText/RichText";
import { MediaItem } from "@/components/elements/MediaItem/MediaItem";
import { MediaCarousel } from "@/components/elements/MediaCarousel/MediaCarousel";
import { ButtonGroup } from "@/components/elements/ButtonGroup/ButtonGroup";
import {
  HeroType,
  TextAlignmentType,
  ContentPieceType,
  HeroLayoutVariant,
} from "@/helpers/types";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import "@/app/css/padding.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "@/app/css/custom-swiper.css";

export const Hero: React.FC<{ data: HeroType }> = ({ data }) => {
  const {
    content,
    appearanceVariant,
    contentAlignment,
    backgroundImage,
    darkMode,
  } = data;
  const [ref, isIntersecting] = useInView({
    threshold: 0.3,
    unobserveOnEnter: true,
  });
  console.log("isIntersecting", isIntersecting);
  if (content.length === 0) {
    return null;
  }
  return (
    <section
      ref={ref}
      style={
        backgroundImage
          ? {
              backgroundImage: `url(${backgroundImage?.url})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundBlendMode: "multiply",
            }
          : {}
      }
    >
      {content.length === 1 && (
        <HeroSection
          data={content[0]}
          alignment={contentAlignment}
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
                alignment={contentAlignment}
                appearanceVariant={appearanceVariant}
                darkMode={darkMode}
                isIntersecting={isIntersecting}
              />
            </SwiperSlide>
          ))}
          <div className="absolute bottom-4 right-4 flex justify-center gap-4">
            <div
              className={classNames(
                "hero-prev cursor-pointer z-10 flex justify-center items-center rounded-full w-10 h-10 lg:w-12 lg:h-12 bg-neutral-500/20 hover:text-primary-600 hover:bg-neutral-200/80 transition-all duration-500 ease-in-out",
                { "text-neutral-50": darkMode }
              )}
            >
              <GoArrowLeft size={30} />
            </div>
            <div
              className={classNames(
                "hero-next cursor-pointer z-10 flex justify-center items-center rounded-full w-10 h-10 lg:w-12 lg:h-12 bg-neutral-500/20 hover:text-primary-600 hover:bg-neutral-200/80 transition-all duration-500 ease-in-out",
                { "text-neutral-50": darkMode }
              )}
            >
              <GoArrowRight size={30} />
            </div>
          </div>
        </Swiper>
      )}
    </section>
  );
};

const HeroSection: React.FC<{
  data: ContentPieceType;
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
        { "lg:flex-row lg:gap-x-12 ": appearanceVariant === "horizontal" }
      )}
    >
      <div
        className={classNames(
          "flex flex-col gap-2 py-16 lg:py-20 xl:py-24",
          { "px-4 custom-padding-left": appearanceVariant === "horizontal" },
          { "items-center text-center": alignment === "center" },
          { "items-end text-end": alignment === "end" }
        )}
      >
        {data.eyebrow && (
          <div
            className={classNames(
              "font-medium tracking-widest max-w-2xl opacity-0",
              {
                "animate-slidingHeroContent animation-delay-500":
                  isIntersecting,
              },
              { "text-primary-600": !darkMode },
              { "text-neutral-100": darkMode }
            )}
          >
            {data.eyebrow}
          </div>
        )}
        {data.heading && (
          <div
            className={classNames(
              "text-hero-heading leading-tighter font-heading max-w-3xl opacity-0",
              { "animate-slidingHeroContent": isIntersecting },
              { "text-neutral-50": darkMode }
            )}
          >
            <RichText2 data={data.heading} />
          </div>
        )}
        {data.description && (
          <div
            className={classNames(
              "prose xl:prose-lg 2xl:prose-xl  mt-3 max-w-2xl opacity-0",
              {
                "animate-slidingHeroContent animation-delay-200":
                  isIntersecting,
              },
              { "text-neutral-600": !darkMode },
              { "text-neutral-200": darkMode }
            )}
          >
            <RichText2 data={data.description} />
          </div>
        )}
        {data.buttons.length > 0 && (
          <div
            className={classNames("mt-5 opacity-0", {
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
          className={classNames("w-full lg:basis-3/5 min-w-[50%] opacity-0", {
            "animate-slidingHeroContent animation-delay-300": isIntersecting,
          })}
        >
          <HeroMediaPart data={data} />
        </div>
      )}
    </div>
  );
};

const HeroMediaPart: React.FC<{ data: ContentPieceType }> = ({ data }) => {
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
