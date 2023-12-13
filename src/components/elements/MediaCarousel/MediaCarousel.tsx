"use client"
import classNames from "classnames";
import { AspectRatioType, MediaType } from "@/helpers/types";
import { MediaItem } from "../MediaItem/MediaItem";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, EffectCoverflow, FreeMode, Navigation, Pagination } from "swiper/modules";
import { AutoplayOptions, PaginationOptions, NavigationOptions, FreeModeOptions } from "swiper/types";
import 'swiper/css';
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "@/app/custom-swiper.css"

export const MediaCarousel: React.FC<{
  data: Array<MediaType>;
  aspectRatio?: AspectRatioType;
  videoAutoplay?: boolean;
  dimensionBase?: "width" | "height";
  priority?: boolean;
  rounded?: "assets" | "full" | "none";
  loop?: boolean
  effect?: "fade" | "coverflow" | "cube"
  freeMode?: FreeModeOptions
  pagination?: PaginationOptions
  navigation?: NavigationOptions
  slidesPerView?: number
  autoplay?: AutoplayOptions
}> = ({
  data,
  aspectRatio = "auto",
  videoAutoplay = false,
  dimensionBase = "width",
  priority = false,
  rounded = "assets",
  loop,
  effect,
  freeMode,
  pagination,
  navigation,
  slidesPerView,
  autoplay,
}) => {
  // return (
  //   <div className="relative">
  //     <Carousel
  //       effect="fade"
  //       loop={true}
  //       navigation={{
  //         enabled: true,
  //         nextEl: ".media-carousel-btn-next",
  //         prevEl: ".media-carousel-btn-prev",
  //       }}
  //       pagination={{
  //         enabled: true,
  //         type: "fraction",
  //       }}
  //       autoplay={autoplay}
  //       slides={data.map((item, index) => (
  //         <MediaItem
  //           key={item.id}
  //           data={item}
  //           aspectRatio={aspectRatio}
  //           videoAutoplay={videoAutoplay}
  //           dimensionBase={dimensionBase}
  //           priority={index === 0 && priority}
  //           rounded={rounded}
  //         />
  //       ))}
  //     >
  //       <div className="media-carousel-btn-prev absolute right-2 bottom-4 z-10 cursor-pointer w-12 h-12 rounded-full bg-white bg-opacity-80 shadow items-center justify-center flex">
  //         <AiOutlineArrowLeft size={25} />
  //       </div>
  //       <div className="media-carousel-btn-next absolute right-2 bottom-20 z-10 cursor-pointer w-12 h-12 rounded-full bg-white bg-opacity-80 shadow items-center justify-center flex">
  //         <AiOutlineArrowRight size={25} />
  //       </div>
  //     </Carousel>
  //   </div>
  // );

  return (
    <Swiper
      className={classNames("w-full")}
      spaceBetween={30}
      loop={loop}
      navigation={navigation ?? true}
      pagination={pagination ?? true}
      slidesPerView={slidesPerView ?? "auto"}
      autoplay={autoplay ?? false}
      effect={effect ?? "fade"}
      fadeEffect={{
        crossFade: true,
      }}
      freeMode={freeMode ?? false}
      modules={[
        Autoplay,
        EffectFade,
        EffectCoverflow,
        Navigation,
        Pagination,
        FreeMode,
      ]}
    >
      {data.map((item, index) => (
        <SwiperSlide key={item.id}>
          <MediaItem
            data={item}
            aspectRatio={aspectRatio}
            videoAutoplay={videoAutoplay}
            dimensionBase={dimensionBase}
            priority={index === 0 && priority}
            rounded={rounded}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  )
};
