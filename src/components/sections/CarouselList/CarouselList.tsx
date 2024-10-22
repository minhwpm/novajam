'use client';
import classNames from 'classnames';
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import { BlockType, ItemsPerViewType } from '@/helpers/types';
import { BlockMapping } from '@/components/sections/ContentList/BlockMapping';
import { useIntersecting } from '@/helpers/hooks/useIntersecting';
import { GoArrowLeft, GoArrowRight } from 'react-icons/go';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '@/app/styles/custom-swiper.css';
import '@/app/styles/padding.css';
import './styles.css';

export const CarouselList: React.FC<{
  blocks: BlockType[];
  itemsPerView: ItemsPerViewType;
}> = ({ blocks, itemsPerView }) => {
  const [carouselState, setState] = useState({
    isBeginning: true,
    isEnd: false,
  });
  const [ref, isIntersecting] = useIntersecting();

  return (
    <div
      ref={ref}
      className={classNames('relative -bottom-10 opacity-0', {
        'animate-slidingUpContent animation-delay-300': isIntersecting,
      })}
    >
      <Swiper
        className={classNames('CarouselLayout relative w-screen !pt-16 !pb-4')}
        slidesPerView={'auto'}
        navigation={{
          enabled: true,
          nextEl: '.CarouselLayout-btn-next',
          prevEl: '.CarouselLayout-btn-prev',
        }}
        modules={[Navigation, Autoplay]}
        onSlideChange={(swiper) => {
          setState({
            isBeginning: swiper.isBeginning,
            isEnd: swiper.isEnd,
          });
        }}
      >
        <div className="absolute top-0 right-0 z-10 w-full flex justify-end gap-4 custom-padding-right">
          <GoArrowLeft
            size={50}
            className={classNames(
              'CarouselLayout-btn-prev cursor-pointer flex justify-center items-center rounded-full p-2.5 bg-opacity-20 hover:bg-primary-600 hover:text-slate-100 transition-colors duration-300 ease-in-out dark:text-slate-100 dark:text-primary-600',
              {
                'opacity-10 pointer-events-none cursor-not-allowed':
                  carouselState.isBeginning,
              },
            )}
          />
          <GoArrowRight
            size={50}
            className={classNames(
              'CarouselLayout-btn-next cursor-pointer flex justify-center items-center rounded-full p-2.5 bg-opacity-20 hover:bg-primary-600 hover:text-slate-100 transition-colors duration-300 ease-in-out dark:text-slate-100 dark:text-primary-600',
              {
                'opacity-10 pointer-events-none cursor-not-allowed':
                  carouselState.isEnd,
              },
            )}
          />
        </div>
        {blocks.map((item, idx) => (
          <SwiperSlide
            key={idx}
            className={classNames('px-4', {
              'basis-11/12 xl:basis-4/5 2xl:basis-3/4 lg:px-5 xl:px-6':
                itemsPerView === 1,
              'basis-11/12 lg:basis-[50%] lg:px-5 xl:px-6': itemsPerView === 2,
              'basis-11/12 md:basis-[50%] xl:basis-[33.33%] lg:px-5':
                itemsPerView === 3,
              'basis-11/12 sm:basis-[50%] lg:basis-[33.33%] xl:basis-[25%]':
                itemsPerView === 4,
              'basis-[50%] sm:basis-[33.33%] md:basis-[25%] xl:basis-[20%]':
                itemsPerView === 5,
            })}
          >
            <BlockMapping data={item} index={idx} animate={false} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
