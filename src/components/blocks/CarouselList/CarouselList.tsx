'use client';
import classNames from 'classnames';
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import { BlockType, ContentListType, GapType } from '@/lib/types';
import { ContentMapping } from '@/components/blocks/ContentMapping/ContentMapping';
import { GoArrowLeft, GoArrowRight } from 'react-icons/go';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '@/app/styles/custom-swiper.css';

const columnBreakpoints = {
  320: [1, 1, 1, 1, 2, 2],
  640: [1, 1, 1, 2, 3, 3],
  768: [1, 1, 2, 2, 4, 4],
  1024: [1, 2, 2, 3, 4, 5],
  1280: [1, 2, 3, 4, 5, 6],
};

const gapSizes = {
  xs: [8, 10, 12, 16],
  sm: [16, 20, 24, 32],
  base: [24, 32, 36, 48],
  lg: [40, 48, 60, 80],
  xl: [64, 80, 96, 128],
};

const getBreakpoints = (columns: number, gap: GapType) => {
  return Object.entries(columnBreakpoints).reduce(
    (acc: { [key: string]: any }, [bp, values]) => {
      acc[bp] = {
        slidesPerView: values[columns - 1] || 1,
        spaceBetween:
          gapSizes[gap as keyof typeof gapSizes]?.[
            Math.floor(Number(bp) / 320) - 1
          ],
      };
      return acc;
    },
    {},
  );
};

export const CarouselList: React.FC<{
  contentItems: BlockType[];
  columns: ContentListType['columns'];
  gap?: GapType;
}> = ({ contentItems, columns, gap = 'base' }) => {
  const [carouselState, setState] = useState({
    isBeginning: true,
    isEnd: false,
  });

  return (
    <div className={classNames('max-w-full')}>
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
        breakpoints={getBreakpoints(columns ?? 1, gap)}
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
            <ContentMapping
              data={item}
              index={idx}
              animate={false}
              itemsPerRow={columns ?? 1}
            />
          </SwiperSlide>
        ))}
        <div className="absolute bottom-0 right-0 z-10 w-full flex justify-end gap-4">
          <NavigationButton
            direction="prev"
            disabled={carouselState.isBeginning}
          />
          <NavigationButton direction="next" disabled={carouselState.isEnd} />
        </div>
      </Swiper>
    </div>
  );
};

const NavigationButton = ({
  direction,
  disabled,
}: {
  direction: 'prev' | 'next';
  disabled: boolean;
}) => {
  const Icon = direction === 'prev' ? GoArrowLeft : GoArrowRight;
  return (
    <Icon
      size={50}
      className={classNames(
        `custom-btn-${direction} cursor-pointer flex justify-center items-center 
         rounded-full p-2.5 bg-opacity-20 hover:bg-primary-600 border-2 border-slate-200 
         hover:text-slate-100 hover:border-primary-600 transition-colors duration-300 
         dark:text-slate-100 dark:border-slate-100/10 dark:hover:border-primary-600`,
        { 'opacity-20 pointer-events-none cursor-not-allowed': disabled },
      )}
    />
  );
};
