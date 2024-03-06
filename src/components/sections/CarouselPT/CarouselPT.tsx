"use client"
import classNames from "classnames";
import { Section } from "@/components/elements/Section/Section";
import { ButtonGroup } from "@/components/elements/ButtonGroup/ButtonGroup";
import { AlignmentType, ContentPieceType, ContentPTType } from "@/helpers/types";
import { RichText2 } from "@/components/elements/RichText/RichText2";
import { FlexibleContentMediaPart } from "@/components/elements/FlexibleContentMediaPart/FlexibleContentMediaPart";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "@/app/css/custom-swiper.css"

const TextPart: React.FC<{
  data: ContentPieceType;
  alignment?: AlignmentType;
  darkMode: boolean;
}> = ({ data, alignment, darkMode }) => {
  const { heading, eyebrow, description, buttons } = data;
  return (
    <>
      {eyebrow && (
        <div
          className={classNames(
            "text-sm font-semibold tracking-widest",
            { "text-neutral-500": !darkMode },
            { "text-neutral-200": darkMode },
          )}
        >
          {eyebrow}
        </div>
      )}
      {heading && (
        <div className={classNames("text-2xl lg:text-3xl leading-snug lg:leading-snug font-bold max-w-4xl",
          { "text-neutral-50": darkMode },
        )}>
          <RichText2 data={heading} />
        </div>
      )}
      {description && (
        <div className={classNames("mt-5 prose 2xl:prose-lg",
          { "text-neutral-100": darkMode },
        )}>
          <RichText2 data={description} />
        </div>
      )}
      {buttons && buttons.length > 0 && (
        <div className="mt-4">
          <ButtonGroup data={buttons} alignment={alignment} />
        </div>
      )}
    </>
  );
};

export const CarouselPT: React.FC<{ data: ContentPTType }> = ({ data }) => {
  const { eyebrow, heading, summary, content, alignment, backgroundColor, backgroundImage, darkMode } = data
  return (
    <Section
      eyebrow={eyebrow}
      heading={heading}
      summary={summary}
      className={classNames(
        `${backgroundColor}-${darkMode ? "dark-" : ""}section-bg-color`
      )}
      backgroundImage={backgroundImage}
      darkMode={darkMode}
    >
      <Swiper
        slidesPerView={1}
        navigation={{
          enabled: true,
          nextEl: ".carouselPT-btn-next",
          prevEl: ".carouselPT-btn-prev"
        }}
        autoplay={{
          delay: 5000
        }}
        loop={true}
        modules={[Navigation, Autoplay]}
      >
        {content.map((item) => (
          <SwiperSlide key={item.id}>
            <div className={classNames(
              "h-full flex flex-col-reverse lg:flex-row lg:items-center gap-x-16 gap-y-5 px-5 pt-5 pb-10 md:px-10 md:pt-10 lg:px-16 lg:pt-12 lg:pb-12 rounded-assets"
            )}>
            {(item.heading || item.description || item.buttons) && (
              <div className={classNames(
                "flex flex-col",
                { "text-center": alignment === "center" },
                { "text-end": alignment === "reverse" }
              )}>
                {/* @TODO modify arrows in mobile */}
                <div className="flex items-center justify-center gap-8 py-6 lg:hidden">
                  <IoIosArrowBack className="carouselPT-btn-prev cursor-pointer" size={40} />
                  <IoIosArrowForward className="carouselPT-btn-next cursor-pointer" size={40} />
                </div>
                <TextPart data={item} alignment={alignment} darkMode={darkMode} />
              </div>
            )}
            { (item.media.length > 0 || item.embeddedMediaUrl)&&  
              <div className={classNames(
                { "lg:w-1/2 shrink-0 ": (item.heading || item.description) },
                { "w-full": (!item.heading && !item.description) },
              )}>
                <FlexibleContentMediaPart data={item} alignment={alignment} />
              </div>
            }
            </div>
          </SwiperSlide>
        ))}
        <div className={classNames("carouselPT-btn-prev cursor-pointer absolute left-0 top-1/2 -translate-y-1/2 z-10 hidden lg:flex justify-center items-center rounded-assets w-14 h-14 hover:bg-primary-100 bg-opacity-80 transition-colors duration-500 ease",
          {"text-neutral-100 hover:text-primary-600": darkMode}
        )}>
          <IoIosArrowBack size={35} />
        </div>
        <div className={classNames("carouselPT-btn-next cursor-pointer absolute right-0 top-1/2 -translate-y-1/2 z-10 hidden lg:flex justify-center items-center rounded-assets w-14 h-14 hover:bg-primary-100 bg-opacity-80 transition-colors duration-500 ease",
          {"text-neutral-100 hover:text-primary-600": darkMode}
        )}>
          <IoIosArrowForward size={35} />
        </div>
      </Swiper>
    </Section>
  )
}