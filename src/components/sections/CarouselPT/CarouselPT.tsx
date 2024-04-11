"use client"
import classNames from "classnames";
import { Section } from "@/components/elements/Section/Section";
import { ButtonGroup } from "@/components/elements/ButtonGroup/ButtonGroup";
import { TextAlignmentType, ContentPieceType, ContentPTType } from "@/helpers/types";
import { RichText2 } from "@/components/elements/RichText/RichText";
import { FlexibleContentMediaPart } from "@/components/elements/FlexibleContentMediaPart/FlexibleContentMediaPart";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "@/app/css/custom-swiper.css"
import "@/app/css/padding.css"

export const CarouselPT: React.FC<{ data: ContentPTType }> = ({ data }) => {
  const { eyebrow, heading, summary, content, contentAlignment, headingAlignment, backgroundColor, backgroundImage, darkMode } = data
  return (
    <Section
      eyebrow={eyebrow}
      heading={heading}
      summary={summary}
      alignment={headingAlignment}
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
            nextEl: ".carouselpt-next",
            prevEl: ".carouselpt-prev"
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
                "h-full flex flex-col-reverse lg:flex-row lg:items-center gap-x-16 gap-y-5 rounded-assets px-4 lg:px-10"
              )}>
              {(item.heading || item.description || item.buttons) && (
                <div className={classNames(
                  "flex flex-col",
                  { "text-center": contentAlignment === "center" },
                  { "text-end": contentAlignment === "end" }
                )}>
                  <TextPart data={item} alignment={contentAlignment} darkMode={darkMode} />
                </div>
              )}
              { (item.media.length > 0 || item.embeddedMediaUrl)&&  
                <div className={classNames(
                  { "lg:w-1/2 shrink-0 ": (item.heading || item.description) },
                  { "w-full": (!item.heading && !item.description) },
                )}>
                  <FlexibleContentMediaPart data={item} alignment={contentAlignment} />
                </div>
              }
              </div>
            </SwiperSlide>
          ))}
          <div className="mt-4 lg:mt-0 w-full flex justify-center gap-4">
            <div className={classNames("carouselpt-prev cursor-pointer lg:absolute lg:left-0 lg:top-1/2 lg:-translate-y-1/2 z-10 flex justify-center items-center rounded-assets w-12 h-12 bg-neutral-200 bg-opacity-20 hover:text-primary-600 hover:bg-opacity-80 transition-all duration-500 ease",
              {"text-neutral-50": darkMode}
            )}>
              <GoArrowLeft size={30} />
            </div>
            <div className={classNames("carouselpt-next cursor-pointer lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2 z-10 flex justify-center items-center rounded-assets w-12 h-12 bg-neutral-200 bg-opacity-20 hover:text-primary-600 hover:bg-opacity-80 transition-all duration-500 ease",
              {"text-neutral-50": darkMode}
            )}>
              <GoArrowRight size={30} />
            </div>
          </div>
        </Swiper>
      
    </Section>
  )
}

const TextPart: React.FC<{
  data: ContentPieceType;
  alignment?: TextAlignmentType;
  darkMode: boolean;
}> = ({ data, alignment, darkMode }) => {
  const { heading, eyebrow, description, buttons } = data;
  return (
    <>
      {eyebrow && (
        <div
          className={classNames(
            "text-sm font-medium tracking-widest",
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
  )
}