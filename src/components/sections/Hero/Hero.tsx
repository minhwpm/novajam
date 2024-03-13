"use client";
import classNames from "classnames";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { RichText2 } from "@/components/elements/RichText/RichText2";
import { MediaItem } from "@/components/elements/MediaItem/MediaItem";
import { MediaCarousel } from "@/components/elements/MediaCarousel/MediaCarousel";
import { ButtonGroup } from "@/components/elements/ButtonGroup/ButtonGroup";
import { HeroType, AlignmentType, ContentPieceType, HeroLayoutType } from "@/helpers/types";
import "@/app/css/padding.css"
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "@/app/css/custom-swiper.css"

export const Hero: React.FC<{ data: HeroType }> = ({ data }) => {
  const { content, layout, alignment, backgroundImage, darkMode } = data;

  if (content.length === 0) {
    return null
  }
  return (
    <section
      style={
        backgroundImage
          ? {
              backgroundImage: `url(${backgroundImage?.url})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundBlendMode: "overlay",
            }
          : {}
      }
    >
      {content.length === 1 && (
        <HeroSection
          data={content[0]}
          alignment={alignment}
          layout={layout}
          darkMode={darkMode}
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
              <HeroSection
                data={section}
                alignment={alignment}
                layout={layout}
                darkMode={darkMode}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </section>
  )
}

export const HeroSection: React.FC<{
  data: ContentPieceType;
  alignment: AlignmentType;
  layout: HeroLayoutType;
  darkMode: boolean;
}> = ({ data, alignment, layout, darkMode }) => {
  return (
    <div
      key={data.id}
      className={classNames("flex flex-col items-center",
        { "container mx-auto px-4 mt-12 mb-8": layout === "vertical" },
        { "lg:flex-row lg:gap-x-12 ": layout === "horizontal" },
      )}
    >
      <div
        className={classNames(
          "flex flex-col gap-2 py-16 lg:py-20 xl:py-24",
          { "px-4 custom-padding-left": layout === "horizontal" },
          { "items-center text-center": alignment === "center" },
          { "items-end text-end": alignment === "reverse" }
        )}
      >
        {data.eyebrow && (
          <div
            className={classNames(
              "font-semibold tracking-widest max-w-2xl opacity-0 animate-slidingHeroContent animation-delay-500",
              { "text-primary-600": !darkMode },
              { "text-primary-500": darkMode }
            )}
          >
            {data.eyebrow}
          </div>
        )}
        {data.heading && (
          <div
            className={classNames(
              "text-hero-heading leading-tight tracking-tight font-heading max-w-3xl animate-slidingHeroContent",
              { "text-neutral-50": darkMode }
            )}
          >
            <RichText2 data={data.heading} />
          </div>
        )}
        {data.description && (
          <div
            className={classNames(
              "prose xl:prose-lg 2xl:prose-xl  mt-3 max-w-2xl opacity-0 animate-slidingHeroContent animation-delay-200",
              { "text-neutral-700": !darkMode },
              { "text-neutral-100": darkMode }
            )}
          >
            <RichText2 data={data.description} />
          </div>
        )}
        {data.buttons.length > 0 && (
          <div
            className={classNames(
              "mt-5 opacity-0 animate-slidingHeroContent animation-delay-400",
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
            "w-full lg:basis-3/5 min-w-[50%] opacity-0 animate-slidingHeroContent animation-delay-300",
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