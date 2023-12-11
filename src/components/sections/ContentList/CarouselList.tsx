'use client'
import classNames from "classnames";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Pagination } from "swiper/modules";
import { AlignmentType, Content, ContentSize } from "@/helpers/types";
import { ContentItem } from "./ContentItem";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "@/app/custom-swiper.css"

export const CarouselList: React.FC<{
  content: Content[];
  size: ContentSize;
  alignment: AlignmentType;
}> = ({ content, size, alignment }) => {
  return (
    <Swiper
      spaceBetween={25}
      navigation={{
        enabled: true,
      }}
      pagination={{
        enabled: true,
      }}
      slidesPerView="auto"
      freeMode={true}
      modules={[Pagination, Navigation, FreeMode]}
    >
      {content.map((item, idx) => (
        <SwiperSlide
          key={item.id}
          style={{
            width: "80%",
            maxWidth: classNames(
              { "460px": size === "XL" },
              { "368px": size === "L" },
              { "276px": size === "M" },
              { "184px": size === "S" }
            ),
          }}
        >
          <ContentItem data={item} alignment={alignment} index={idx} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};