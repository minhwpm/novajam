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
import { useInView } from "react-hook-inview";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "@/app/css/custom-swiper.css"
import "@/app/css/padding.css"

export const CarouselPT: React.FC<{ data: ContentPTType }> = ({ data }) => {
  const { eyebrow, heading, summary, content, contentTextAlignment, headingTextAlignment, backgroundColor, backgroundImage, darkMode } = data
  const [ref, isIntersecting] = useInView({
    threshold: 0.4,
    unobserveOnEnter: true,
  });
  return (
    <Section
      eyebrow={eyebrow}
      heading={heading}
      summary={summary}
      alignment={headingTextAlignment}
      className={classNames(
        `${backgroundColor}-${darkMode ? "dark-" : ""}section-bg-color`
      )}
      backgroundImage={backgroundImage}
      darkMode={darkMode}
    >
      <div
        ref={ref}
        className={classNames("relative -bottom-10 opacity-0", {
          "animate-slidingUpContent animation-delay-300": isIntersecting,
        })}
      >
        <Swiper
          slidesPerView={1}
          navigation={{
            enabled: true,
            nextEl: ".carouselpt-next",
            prevEl: ".carouselpt-prev",
          }}
          autoplay={{
            delay: 5000,
          }}
          loop={true}
          modules={[Navigation, Autoplay]}
        >
          {content.map((item) => (
            <SwiperSlide key={item.id}>
              <div
                className={classNames(
                  "h-full flex flex-col-reverse lg:flex-row lg:items-center gap-x-16 gap-y-5 rounded-assets px-4 lg:py-4 lg:px-14 xl:px-16"
                )}
              >
                {(item.heading || item.description || item.buttons) && (
                  <div
                    className={classNames(
                      "flex flex-col",
                      { "text-center": contentTextAlignment === "center" },
                      { "text-end": contentTextAlignment === "end" }
                    )}
                  >
                    <TextPart
                      data={item}
                      alignment={contentTextAlignment}
                      darkMode={darkMode}
                    />
                  </div>
                )}
                {(item.media.length > 0 || item.embeddedMediaUrl) && (
                  <div
                    className={classNames(
                      {
                        "lg:w-1/2 shrink-0 ": item.heading || item.description,
                      },
                      { "w-full": !item.heading && !item.description }
                    )}
                  >
                    <FlexibleContentMediaPart
                      data={item}
                      alignment={contentTextAlignment}
                    />
                  </div>
                )}
              </div>
            </SwiperSlide>
          ))}
          <div className="mt-4 lg:mt-0 w-full flex justify-center gap-4">
            <GoArrowLeft
              size={30}
              className={classNames(
                "carouselpt-prev cursor-pointer lg:absolute lg:left-0 lg:top-1/2 lg:-translate-y-1/2 z-10 flex justify-center items-center rounded-full w-12 h-12 p-2 bg-opacity-20 hover:bg-primary-600 hover:text-neutral-100 transition-colors duration-300 ease-in-out",
                { "text-neutral-50": darkMode }
              )}
            />
            <GoArrowRight
              size={30}
              className={classNames(
                "carouselpt-next cursor-pointer lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2 z-10 flex justify-center items-center rounded-full w-12 h-12 p-2 bg-opacity-20 hover:bg-primary-600 hover:text-neutral-100 transition-colors duration-300 ease-in-out",
                { "text-neutral-50": darkMode }
              )}
            />
          </div>
        </Swiper>
      </div>
    </Section>
  );
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
        <div className={classNames("mt-5 prose xl:prose-lg",
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