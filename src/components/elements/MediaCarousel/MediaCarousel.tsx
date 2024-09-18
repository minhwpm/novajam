'use client';
import classNames from 'classnames';
import { MediaAspectRatioType, MediaType } from '@/helpers/types';
import { MediaItem } from '../MediaItem/MediaItem';
import { Swiper, SwiperSlide } from 'swiper/react';
import {
  Autoplay,
  EffectFade,
  EffectCoverflow,
  FreeMode,
  Navigation,
  Pagination,
} from 'swiper/modules';
import {
  AutoplayOptions,
  PaginationOptions,
  NavigationOptions,
  FreeModeOptions,
} from 'swiper/types';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '@/app/styles/custom-swiper.css';

export const MediaCarousel: React.FC<{
  data: Array<MediaType>;
  aspectRatio?: MediaAspectRatioType;
  videoAutoplay?: boolean;
  dimensionBase?: 'width' | 'height';
  priority?: boolean;
  rounded?: 'theme' | 'full' | 'none';
  loop?: boolean;
  effect?: 'fade' | 'coverflow' | 'cube';
  freeMode?: FreeModeOptions;
  pagination?: PaginationOptions;
  navigation?: NavigationOptions;
  slidesPerView?: number;
  autoplay?: AutoplayOptions;
}> = ({
  data,
  aspectRatio = 'auto',
  videoAutoplay = false,
  dimensionBase = 'width',
  priority = false,
  rounded = 'theme',
  loop,
  effect,
  freeMode,
  pagination,
  navigation,
  slidesPerView,
  autoplay,
}) => {
  return (
    <Swiper
      className={classNames('w-full')}
      spaceBetween={30}
      loop={loop}
      navigation={navigation}
      pagination={pagination}
      slidesPerView={slidesPerView ?? 'auto'}
      autoplay={autoplay}
      effect={effect ?? 'fade'}
      fadeEffect={{
        crossFade: true,
      }}
      freeMode={freeMode}
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
  );
};
