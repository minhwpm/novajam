'use client'
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, EffectCoverflow, EffectCube, FreeMode, Navigation, Pagination } from "swiper";
import 'swiper/css';
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import classNames from "classnames";

interface CarouselProps {
  slides: Array<React.ReactElement>
  effect?: "fade" | "coverflow" | "cube"
  freeMode?: boolean
  pagination: boolean
  aspectRatio?: "video" | "square" | "3/4" | "4/3" | "3/2"
  slidesPerView?: number
}

const Carousel: React.FC<CarouselProps>= ({slides, effect, pagination, freeMode, aspectRatio, slidesPerView}) => {
  return (
    <Swiper
      className="w-full"
      spaceBetween={30}
      loop={true}
      navigation={true}
      slidesPerView={1}
      breakpoints={{
        320: {
          slidesPerView: slidesPerView && slidesPerView >=2 ? 2 : 1
        },
        768: {
          slidesPerView: slidesPerView && slidesPerView >=4 ? (slidesPerView - 2) : slidesPerView
        },
        1024: {
          slidesPerView: slidesPerView && slidesPerView >=4 ? (slidesPerView - 1) : slidesPerView
        },
        1280: {
          slidesPerView: slidesPerView
        }
      }}
      pagination={{
        enabled: pagination
      }}
      effect={effect}
      fadeEffect={{
        crossFade: true
      }}
      freeMode={{
        enabled: freeMode
      }}
      modules={[EffectFade, EffectCoverflow, EffectCube, Navigation, Pagination, FreeMode]}
    >
      {slides.map((slide, idx) => (
        <SwiperSlide key={idx} className={classNames(
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