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
          style={{
            width: "80vw",
            maxWidth: classNames(
              { "480px": size === "XL" },
              { "384px": size === "L" },
              { "288px": size === "M" },
              { "192px": size === "S" }
            ),
          }}
          className="px-2 md:px-3 lg:px-4 xl:px-5"
        >
          <ContentMapping data={item} alignment={alignment} index={idx} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};