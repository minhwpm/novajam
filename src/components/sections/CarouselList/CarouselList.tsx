'use client';
import classNames from 'classnames';
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import { AlignmentType, Content, ItemSize } from '@/helpers/types';
import { ContentMapping } from '@/components/sections/ContentList/ContentMapping';
import { useIntersecting } from '@/helpers/hooks/useIntersecting';
import { GoArrowLeft, GoArrowRight } from 'react-icons/go';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '@/app/styles/custom-swiper.css';
import '@/app/styles/padding.css';
import './styles.css';

export const CarouselList: React.FC<{
  listItems: Content[];
  itemSize: ItemSize;
  itemAlignment: AlignmentType;
  itemLayout: 'horizontal' | 'vertical';
}> = ({ listItems, itemSize, itemAlignment, itemLayout }) => {
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
        {listItems.map((item, idx) => (
          <SwiperSlide
            key={idx}
            className={classNames('px-4 basis-11/12', {
              'xl:basis-4/5 2xl:basis-3/4 lg:px-5 xl:px-6': itemSize === '2XL',
              'lg:basis-[50%] lg:px-5 xl:px-6': itemSize === 'XL',
              'md:basis-[50%] xl:basis-[33.33%] lg:px-5': itemSize === 'L',
              'sm:basis-[50%] lg:basis-[33.33%] xl:basis-[25%]':
                itemSize === 'M',
              'basis-[50%] sm:basis-[33.33%] md:basis-[25%] xl:basis-[20%]':
                itemSize === 'S',
            })}
          >
            <ContentMapping
              data={item}
              alignment={itemAlignment}
              layout={itemLayout}
              index={idx}
              animate={false}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
