'use client'
import { useEffect, useState } from "react";
import classNames from "classnames";
import type { Swiper as SwiperType } from 'swiper'
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, EffectCoverflow, FreeMode, Navigation, Pagination, Thumbs } from "swiper/modules";
import { AutoplayOptions, PaginationOptions, NavigationOptions, FreeModeOptions } from "swiper/types";
import 'swiper/css';
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface CarouselProps {
  slides: Array<React.ReactElement>
  children?: React.ReactNode
  effect?: "fade" | "coverflow" | "cube"
  autoplay?: AutoplayOptions
  loop?: boolean
  freeMode?: FreeModeOptions
  pagination?: PaginationOptions
  navigation?: NavigationOptions
  slidesPerView?: number
  thumbsEnable?: boolean
}

const Carousel: React.FC<CarouselProps>= ({slides, children, effect, loop, autoplay, pagination, navigation, freeMode, thumbsEnable = false}) => {
  const [thumbsSwiper, setThumbsSwiper ] = useState<SwiperType | null>(null);
  const [isLoaded, setLoaded] = useState(false)
  useEffect(() => setLoaded(true), [])

  return (
    <>
      <Swiper
        className={classNames("w-full")}
        spaceBetween={30}
        loop={loop}
        navigation={navigation}
        pagination={pagination}
        slidesPerView="auto"
        // breakpoints={{
        //   320: {
        //     slidesPerView: "auto",
        //   },
        //   768: {
        //     slidesPerView:
        //       slidesPerView && slidesPerView >= 3
        //         ? slidesPerView - 1
        //         : slidesPerView,
        //   },
        //   1024: {
        //     slidesPerView:
        //       slidesPerView && slidesPerView >= 4
        //         ? slidesPerView - 1
        //         : slidesPerView,
        //   },
        //   1280: {
        //     slidesPerView: slidesPerView,
        //   },
        // }}
        // breakpoints={{
        //   320: {
        //     slidesPerView: "auto"
        //   },
        //   768: {
        //     slidesPerView: 2,
        //   },
        // }}
        autoplay={autoplay}
        effect={effect}
        fadeEffect={{
          crossFade: true,
        }}
        thumbs={{ swiper: thumbsSwiper }}
        freeMode={freeMode}
        modules={[
          Autoplay,
          EffectFade,
          EffectCoverflow,
          Navigation,
          Pagination,
          FreeMode,
          Thumbs,
        ]} //@TODO: refactor - only include if props enabled
      >
        {slides.map((slide, idx) => (
          <SwiperSlide
            key={idx}
            className={classNames(
              // for partly-SSR components ("use client") html is rendered on Server-side while the Swiper script which calculates the width of slide (base on sliderPerView) happens on browsers. Therefore, when the component is loading on browser, at first the slide width is still full width, then it will be injected inline CSS width by Swiper - which makes an UI bug "width shrinking moment"
              { invisible: !isLoaded }
            )}
          >
            {slide}
          </SwiperSlide>
        ))}
        {children}
      </Swiper>
      {thumbsEnable && (
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
            <SwiperSlide key={idx} className={classNames("bg-white")}>
              {slide}
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </>
  );
}

export default Carousel