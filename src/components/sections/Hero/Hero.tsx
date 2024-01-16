"use client";
import classNames from "classnames";
import { Container }from "@/components/elements/Container/Container";
import { HeroSection } from "./HeroSection";
import { HeroType } from "@/helpers/types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "@/app/css/custom-swiper.css"

export const Hero: React.FC<{ data: HeroType }> = ({ data }) => {
  const { content, layout, alignment, backgroundImage } = data;

  if (content.length === 0) {
    return null
  }
  return (
    <section
      style={
        backgroundImage
          ? {
              backgroundImage: `url(${backgroundImage?.url})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundBlendMode: "overlay",
            }
          : {}
      }
    >
      <Container className={classNames("mb-12")}>
        {content.length === 1 && (
          <HeroSection
            data={content[0]}
            alignment={alignment}
            layout={layout}
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
                <HeroSection
                  data={section}
                  alignment={alignment}
                  layout={layout}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </Container>
    </section>
  )
}