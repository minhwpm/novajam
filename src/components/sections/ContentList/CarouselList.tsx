"use client"
import classNames from "classnames";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { AlignmentType, Content, ContentSize } from "@/helpers/types";
import { ContentMapping } from "./ContentMapping";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./carousel-list-styles.css"
import "@/app/css/custom-swiper.css"

export const CarouselList: React.FC<{
  list: Content[];
  size: ContentSize;
  alignment: AlignmentType;
}> = ({ list, size, alignment }) => {
  return (
    <Swiper
      className={classNames("carousel-list w-screen")}
      slidesPerView={"auto"}
      autoplay={{
        delay: 5000
      }}
      pagination={{
        enabled: true,
        clickable: true
      }}
      modules={[Pagination, Autoplay]}
    >
      {list.map((item, idx) => (
        <SwiperSlide
          key={item.id}
          className={classNames("px-2 lg:px-3.5 2xl:p-4 !w-11/12",
            {"lg:max-w-[50%]": size === "XL"},
            {"md:max-w-[50%] lg:max-w-[33.33%]": size === "L"},
            {"sm:max-w-[50%] md:max-w-[33.5%] lg:max-w-[25%]": size === "M"},
            {"max-w-[50%] sm:max-w-[33.3%] md:max-w-[25%] lg:max-w-[20%]": size === "S"},
          )}
        >
          <ContentMapping data={item} alignment={alignment} index={idx} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};