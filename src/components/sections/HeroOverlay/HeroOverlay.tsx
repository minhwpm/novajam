"use client";
import classNames from "classnames";
import { HeroOSection } from "./HeroOSection";
import { HeroType } from "@/helpers/types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "@/app/css/custom-swiper.css";


export const HeroOverlay: React.FC<{ data: HeroType }> = ({ data }) => {
  const { content, alignment } = data;

  if (content.length === 0) {
    return null
  }
  return (
    <section className={classNames("relative")}>
      {content.length === 1 && (
        <HeroOSection
          data={content[0]}
          alignment={alignment}
        />
      )}

      {content.length > 1 && (
        <Swiper
          slidesPerView={1}
          autoplay={{
            delay: 5000,
          }}
          pagination={{
            enabled: true,
            clickable: true,
          }}
          navigation={{
            enabled: true,
          }}
          loop={true}
          modules={[Navigation, Pagination, Autoplay]}
        >
          {content.map((section) => (
            <SwiperSlide key={section.id}>
              <HeroOSection
                data={section}
                alignment={alignment}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </section>
  );
}