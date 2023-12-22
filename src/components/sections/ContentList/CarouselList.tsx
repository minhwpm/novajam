"use client"
import classNames from "classnames";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { AlignmentType, Content, ContentSize } from "@/helpers/types";
import { ContentMapping } from "./ContentMapping";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "@/app/custom-swiper.css"
import "./carousel-list-styles.css"

export const CarouselList: React.FC<{
  content: Content[];
  size: ContentSize;
  alignment: AlignmentType;
}> = ({ content, size, alignment }) => {
  return (
    <Swiper
      className={classNames("carousel-list w-screen")}
      spaceBetween={24}
      navigation={{
        enabled: true,
      }}
      slidesPerView={"auto"}
      modules={[Pagination, Navigation]}
    >
      {content.map((item, idx) => (
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
        >
          <ContentMapping data={item} alignment={alignment} index={idx} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};