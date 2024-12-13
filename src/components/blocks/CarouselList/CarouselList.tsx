'use client';
import classNames from 'classnames';
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import { BlockType, ColumnsType, GapType } from '@/helpers/types';
import { ContentMapping } from '@/components/blocks/ContentMapping/ContentMapping';
import { useIntersecting } from '@/helpers/hooks/useIntersecting';
import { GoArrowLeft, GoArrowRight } from 'react-icons/go';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '@/app/styles/custom-swiper.css';

export const CarouselList: React.FC<{
  contentItems: BlockType[];
  columns: ColumnsType;
  gap?: GapType;
}> = ({ contentItems, columns, gap = 'base' }) => {
  const [carouselState, setState] = useState({
    isBeginning: true,
    isEnd: false,
  });
  const [ref, isIntersecting] = useIntersecting();

  return (
    <div
      ref={ref}
      className={classNames('max-w-full relative -bottom-10 opacity-0', {
        'animate-slidingUpContent animation-delay-300': isIntersecting,
      })}
    >
      <Swiper
        className={classNames('relative !pt-4 !pb-16')}
        slidesPerView={1}
        spaceBetween={classNames({
          '8px': gap === 'xs',
          '16px': gap === 'sm',
          '24px': gap === 'base',
          '40px': gap === 'lg',
          '64px': gap === 'xl',
        })}
        breakpoints={{
          640: {
            slidesPerView: parseInt(
              classNames({
                3: columns === 5,
                2: columns === 4,
                1: columns === 1 || columns === 2 || columns === 3,
              }),
            ),
          },
          768: {
            slidesPerView: parseInt(
              classNames({
                4: columns === 5,
                3: columns === 4,
                2: columns === 3,
                1: columns === 1 || columns === 2,
              }),
            ),
            spaceBetween: classNames({
              '10px': gap === 'xs',
              '20px': gap === 'sm',
              '32px': gap === 'base',
              '48px': gap === 'lg',
              '80px': gap === 'xl',
            }),
          },
          1024: {
            slidesPerView: parseInt(
              classNames({
                5: columns === 5,
                4: columns === 4,
                3: columns === 3,
                2: columns === 2,
                1: columns === 1,
              }),
            ),
            spaceBetween: classNames({
              '12px': gap === 'xs',
              '24px': gap === 'sm',
              '36px': gap === 'base',
              '60px': gap === 'lg',
              '96px': gap === 'xl',
            }),
          },
        }}
        navigation={{
          enabled: true,
          nextEl: '.custom-btn-next',
          prevEl: '.custom-btn-prev',
        }}
        modules={[Navigation, Autoplay]}
        onSlideChange={(swiper) => {
          setState({
            isBeginning: swiper.isBeginning,
            isEnd: swiper.isEnd,
          });
        }}
      >
        {contentItems.map((item, idx) => (
          <SwiperSlide key={idx}>
            <ContentMapping data={item} index={idx} animate={false} />
          </SwiperSlide>
        ))}
        <div className="absolute bottom-0 right-0 z-10 w-full flex justify-end gap-4">
          <GoArrowLeft
            size={50}
            className={classNames(
              'custom-btn-prev cursor-pointer flex justify-center items-center rounded-full p-2.5 bg-opacity-20 hover:bg-primary-600  border-2 border-slate-200 hover:text-slate-100 hover:border-primary-600 transition-colors duration-300 dark:text-slate-100 dark:border-slate-100/30 dark:hover:border-primary-600',
              {
                'opacity-20 pointer-events-none cursor-not-allowed':
                  carouselState.isBeginning,
              },
            )}
          />
          <GoArrowRight
            size={50}
            className={classNames(
              'custom-btn-next cursor-pointer flex justify-center items-center rounded-full p-2.5 bg-opacity-20 hover:bg-primary-600 border-2 border-slate-200 hover:text-slate-100 hover:border-primary-600 transition-colors duration-300 dark:text-slate-100 dark:border-slate-100/30 dark:hover:border-primary-600',
              {
                'opacity-20 pointer-events-none cursor-not-allowed':
                  carouselState.isEnd,
              },
            )}
          />
        </div>
      </Swiper>
    </div>
  );
};
