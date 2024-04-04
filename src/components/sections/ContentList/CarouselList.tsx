"use client"
import classNames from "classnames";
import { useContext, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { AlignmentType, Content, ContentSize } from "@/helpers/types";
import { ContentMapping } from "./ContentMapping";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { DarkModeContext } from "@/components/sections/ContentList/ContentList";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./carousel-list-styles.css"
import "@/app/css/custom-swiper.css"
import "@/app/css/padding.css"

export const CarouselList: React.FC<{
  list: Content[];
  size: ContentSize;
  alignment: AlignmentType;
}> = ({ list, size, alignment }) => {
  const darkMode = useContext(DarkModeContext);
  const [carouselState, setState] = useState({
    isBeginning: true,
    isEnd: false,
  });
  return (
    <Swiper
      className={classNames("carousel-list w-screen !pt-16 relative")}
      slidesPerView={"auto"}
      autoplay={{
        delay: 5000,
      }}
      navigation={{
        enabled: true,
        nextEl: ".carouselList-btn-next",
        prevEl: ".carouselList-btn-prev",
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
        <div
          className={classNames(
            "carouselList-btn-prev cursor-pointer flex justify-center items-center rounded-full w-12 h-12 bg-opacity-20 hover:bg-primary-600 hover:text-neutral-100 transition-colors duration-500 ease",
            {
              "opacity-10 pointer-events-none cursor-not-allowed":
                carouselState.isBeginning,
            },
            { "text-neutral-50": darkMode }
          )}
        >
          <IoIosArrowBack size={35} />
        </div>
        <div
          className={classNames(
            "carouselList-btn-next cursor-pointer flex justify-center items-center rounded-full w-12 h-12 bg-opacity-20 hover:bg-primary-600 hover:text-neutral-100 transition-colors duration-500 ease",
            {
              "opacity-10 pointer-events-none cursor-not-allowed":
                carouselState.isEnd,
            },
            { "text-neutral-50": darkMode }
          )}
        >
          <IoIosArrowForward size={35} />
        </div>
      </div>
      {list.map((item, idx) => (
        <SwiperSlide
          key={item.id}
          className={classNames(
            "px-2 lg:px-3.5 2xl:px-4 !w-11/12",
            { "lg:max-w-[50%]": size === "XL" },
            { "md:max-w-[50%] lg:max-w-[33.33%]": size === "L" },
            { "sm:max-w-[50%] md:max-w-[33.5%] lg:max-w-[25%]": size === "M" },
            {
              "max-w-[50%] sm:max-w-[33.3%] md:max-w-[25%] lg:max-w-[20%]":
                size === "S",
            }
          )}
        >
          <ContentMapping data={item} alignment={alignment} index={idx} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};