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
  autoplay?: boolean
  freeMode?: boolean
  pagination: boolean
  slidesPerView?: number
}

const Carousel: React.FC<CarouselProps>= ({slides, effect, autoplay = false, pagination = false, freeMode, slidesPerView = 1}) => {
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
      autoplay={autoplay ? {
        delay: 3000
      } : false}
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
          "bg-white"
        )}>
          {slide}
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default Carousel