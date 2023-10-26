'use client'
import type { Swiper as SwiperType } from 'swiper'
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, EffectCoverflow, FreeMode, Navigation, Pagination, Thumbs } from "swiper/modules";
import classNames from "classnames";
import { useState } from "react";
import { PaginationOptions, NavigationOptions, FreeModeOptions } from "swiper/types";
import 'swiper/css';
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface CarouselProps {
  slides: Array<React.ReactElement>
  children?: React.ReactNode
  effect?: "fade" | "coverflow" | "cube"
  autoplay?: boolean
  loop?: boolean
  freeMode?: FreeModeOptions
  pagination?: PaginationOptions
  navigation?: NavigationOptions
  slidesPerView?: number
  thumbsEnable?: boolean
}

const Carousel: React.FC<CarouselProps>= ({slides, children, effect, loop, autoplay = false, pagination, navigation, freeMode, slidesPerView = 1, thumbsEnable = false}) => {
  const [thumbsSwiper, setThumbsSwiper ] = useState<SwiperType | null>(null);
  return (
    <>
      <Swiper
        className="w-full"
        spaceBetween={30}
        loop={loop}
        navigation={navigation}
        pagination={pagination}
        slidesPerView={slidesPerView}
        breakpoints={{
          320: {
            slidesPerView: 1
          },
          768: {
            slidesPerView: slidesPerView && slidesPerView >= 3 ? (slidesPerView - 1) : slidesPerView
          },
          1024: {
            slidesPerView: slidesPerView && slidesPerView >= 4 ? (slidesPerView - 1) : slidesPerView
          },
          1280: {
            slidesPerView: slidesPerView
          }
        }}
        autoplay={autoplay ? {
          delay: 3000
        } : false}
        effect={effect}
        fadeEffect={{
          crossFade: true
        }}
        thumbs={{ swiper: thumbsSwiper }}
        freeMode={freeMode}
        modules={[
          EffectFade,
          EffectCoverflow,
          Navigation,
          Pagination,
          FreeMode,
          Thumbs
        ]} //@TODO: refactor - only include if props enabled
      >
        {slides.map((slide, idx) => (
          <SwiperSlide key={idx} className={classNames(
            "bg-white"
          )}>
            {slide}
          </SwiperSlide>
        ))}
        {children}
      </Swiper>
      { thumbsEnable && (
        <Swiper
          onSwiper={(s) => setThumbsSwiper(s)}
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
    </>
  )
}

export default Carousel