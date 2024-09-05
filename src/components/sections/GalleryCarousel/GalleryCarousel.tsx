"use client"
import classNames from "classnames";
import { useContext, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { TextAlignmentType, Content, ContentSize, ContentOrientationType } from "@/helpers/types";
import { ContentMapping } from "../Gallery/ContentMapping";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import { DarkModeContext } from "@/components/sections/Gallery/Gallery";
import { useInView } from "react-hook-inview";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./styles.css"
import "@/app/styles/custom-swiper.css"
import "@/app/styles/padding.css"

export const CarouselLayout: React.FC<{
  contentItems: Content[];
  size: ContentSize;
  alignment: TextAlignmentType;
  layout: ContentOrientationType;
}> = ({ contentItems, size, alignment, layout }) => {
  const darkMode = useContext(DarkModeContext);
  const [carouselState, setState] = useState({
    isBeginning: true,
    isEnd: false,
  });
  const [ref, isIntersecting] = useInView({
    threshold: 0.4,
    unobserveOnEnter: true,
  });
  return (
    <div
      ref={ref}
      className={classNames("relative -bottom-10 opacity-0", {
        "animate-slidingUpContent animation-delay-300": isIntersecting,
      })}
    >
      <Swiper
        className={classNames("CarouselLayout relative w-screen !pt-16 !pb-4")}
        slidesPerView={"auto"}
        navigation={{
          enabled: true,
          nextEl: ".CarouselLayout-btn-next",
          prevEl: ".CarouselLayout-btn-prev",
        }}
        modules={[Navigation, Autoplay]}
        onSlideChange={(swiper) => {
          setState({
            isBeginning: swiper.isBeginning,
            isEnd: swiper.isEnd,
          });
        }}
      >
        <div className="absolute top-0 right-0 z-10 w-full flex justify-end gap-4 custom-padding-right">
          <GoArrowLeft
            size={50}
            className={classNames(
              "CarouselLayout-btn-prev cursor-pointer flex justify-center items-center rounded-full p-2.5 bg-opacity-20 hover:bg-primary-600 hover:text-neutral-100 transition-colors duration-300 ease-in-out",
              {
                "opacity-10 pointer-events-none cursor-not-allowed":
                  carouselState.isBeginning,
              },
              { "text-primary-600": !darkMode },
              { "text-neutral-50": darkMode }
            )}
          />
          <GoArrowRight
            size={50}
            className={classNames(
              "CarouselLayout-btn-next cursor-pointer flex justify-center items-center rounded-full p-2.5 bg-opacity-20 hover:bg-primary-600 hover:text-neutral-100 transition-colors duration-300 ease-in-out",
              {
                "opacity-10 pointer-events-none cursor-not-allowed":
                  carouselState.isEnd,
              },
              { "text-primary-600": !darkMode },
              { "text-neutral-50": darkMode }
            )}
          />
        </div>
        {contentItems.map((item, idx) => (
          <SwiperSlide
            key={item.id}
            className={classNames(
              "px-4 !w-11/12",
              { "lg:max-w-[50%] lg:px-5 xl:px-6": size === "XL" },
              { "md:max-w-[50%] xl:max-w-[33.33%] lg:px-5": size === "L" },
              {
                "sm:max-w-[50%] lg:max-w-[33.33%] xl:max-w-[25%]": size === "M",
              },
              {
                "max-w-[50%] sm:max-w-[33.33%] md:max-w-[25%] xl:max-w-[20%]":
                  size === "S",
              }
            )}
          >
            <ContentMapping
              data={item}
              alignment={alignment}
              layout={layout}
              index={idx}
              animate={false}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};