"use client";
import classNames from "classnames";
import { useOnLoaded } from "@/helpers/hooks/useOnLoaded";
import { HeroOSection } from "./HeroOSection";
import { HeroType } from "@/helpers/types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "@/app/custom-swiper.css";


export const HeroOverlay: React.FC<{ data: HeroType }> = ({ data }) => {
  const { content, textAlignment } = data;
  // @TODO refactor onLoaded ?
  const onLoaded = useOnLoaded();

  if (content.length === 0) {
    return null
  }
  return (
    <section className={classNames("relative")}>
      {content.length === 1 && (
        <HeroOSection
          data={content[0]}
          onLoaded={onLoaded}
          textAlignment={textAlignment}
        />
      )}

      {content.length > 1 && (
        <Swiper
          slidesPerView={1}
          autoplay={{
            delay: 3500,
          }}
          pagination={{
            enabled: true,
            clickable: true,
          }}
          navigation={{
            enabled: true,
          }}
          loop={true}
          modules={[Navigation, Pagination]}
        >
          {content.map((section) => (
            <SwiperSlide key={section.id}>
              <HeroOSection
                data={section}
                onLoaded={onLoaded}
                textAlignment={textAlignment}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </section>
  );
}