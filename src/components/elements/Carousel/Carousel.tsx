'use client'
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, EffectCoverflow, EffectCube, Navigation, Pagination } from "swiper";
import 'swiper/css';
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import classNames from "classnames";

interface CarouselProps {
  slides: Array<React.ReactElement>
  effect: "fade" | "coverflow" | "cube"
  pagination: boolean
  aspectRatio?: "video" | "square" | "3/4" | "4/3" | "3/2"
}

const Carousel: React.FC<CarouselProps>= ({slides, effect, pagination, aspectRatio}) => {
  return (
    <Swiper
      className="w-full"
      spaceBetween={30}
      loop={true}
      navigation={true}
      pagination={{
        enabled: pagination
      }}
      effect={effect}
      fadeEffect={{
        crossFade: true
      }}
      modules={[EffectFade, EffectCoverflow, EffectCube, Navigation, Pagination]}
    >
      {slides.map((slide) => (
        <SwiperSlide key={slide?.key} className={classNames(
          { "aspect-video" : aspectRatio === "video"},
          { "aspect-3/4" : aspectRatio === "3/4"},
          { "aspect-4/3" : aspectRatio === "4/3"},
          { "aspect-3/2" : aspectRatio === "3/2"},
          "bg-white"
        )}>
          {slide}
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default Carousel