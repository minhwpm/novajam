'use client'
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, EffectCoverflow, EffectCube, FreeMode, Navigation, Pagination, Thumbs } from "swiper";
import 'swiper/css';
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import classNames from "classnames";
import { useState } from "react";
import { PaginationOptions } from "swiper/types";

interface CarouselProps {
  slides: Array<React.ReactElement>
  effect?: "fade" | "coverflow" | "cube"
  autoplay?: boolean
  freeMode?: boolean
  pagination?: PaginationOptions
  slidesPerView?: number
  thumbsEnable?: boolean
}

const Carousel: React.FC<CarouselProps>= ({slides, effect, autoplay = false, pagination = false, freeMode, slidesPerView = 1, thumbsEnable = false}) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  return (
    <div className="w-full">
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
        pagination={pagination}
        thumbs={{ swiper: thumbsSwiper }}
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
        modules={[EffectFade, EffectCoverflow, EffectCube, Navigation, Pagination, FreeMode, Thumbs]}
      >
        {slides.map((slide, idx) => (
          <SwiperSlide key={idx} className={classNames(
            "bg-white"
          )}>
            {slide}
          </SwiperSlide>
        ))}
      </Swiper>
      { thumbsEnable && (
        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={10}
          slidesPerView={4}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mt-2"
        >
          {slides.map((slide, idx) => (
            <SwiperSlide key={idx} className={classNames(
              "bg-white"
            )}>
              {slide}
            </SwiperSlide>
          ))}
        </Swiper>      
      )}
    </div>
  )
}

export default Carousel