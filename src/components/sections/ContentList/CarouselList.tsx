"use client"
import classNames from "classnames";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { AlignmentType, Content, ContentSize } from "@/helpers/types";
import { ContentItem } from "./ContentItem";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import styles from "./carousel-list-styles.module.css"
import "@/app/custom-swiper.css"

export const CarouselList: React.FC<{
  content: Content[];
  size: ContentSize;
  alignment: AlignmentType;
}> = ({ content, size, alignment }) => {
  return (
    <div className="">
      <Swiper
        className={classNames(styles["swiper"])}
        spaceBetween={25}
        navigation={{
          enabled: true,
        }}
        pagination={{
          enabled: true,
        }}
        slidesPerView="auto"
        modules={[Pagination, Navigation]}
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
    </div>
  );
};