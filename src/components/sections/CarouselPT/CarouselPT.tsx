'use client';
import classNames from 'classnames';
import { Section } from '@/components/sections/Section/Section';
import { ContentPTType } from '@/helpers/types';
import { FlexibleContentMediaPart } from '@/components/elements/FlexibleContentMediaPart/FlexibleContentMediaPart';
import { GoArrowLeft, GoArrowRight } from 'react-icons/go';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { TextPartPT } from '@/components/elements/TextPartPT/TextPartPT';
import { useIntersecting } from '@/helpers/hooks/useIntersecting';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '@/app/styles/custom-swiper.css';
import '@/app/styles/padding.css';

export const CarouselPT: React.FC<{ data: ContentPTType }> = ({ data }) => {
  const { presentationItems, itemAlignment, darkMode } = data;
  const [ref, isIntersecting] = useIntersecting();

  return (
    <Section data={data}>
      <div
        ref={ref}
        className={classNames('relative -bottom-10 opacity-0', {
          'animate-slidingUpContent animation-delay-300': isIntersecting,
        })}
      >
        <Swiper
          slidesPerView={1}
          navigation={{
            enabled: true,
            nextEl: '.carouselpt-next',
            prevEl: '.carouselpt-prev',
          }}
          autoplay={{
            delay: 5000,
          }}
          loop={true}
          modules={[Navigation, Autoplay]}
        >
          {presentationItems.map((item) => (
            <SwiperSlide key={item.id}>
              <div
                className={classNames(
                  'h-full flex flex-col-reverse lg:flex-row lg:items-center gap-x-16 gap-y-5 rounded-theme px-4 lg:py-4 lg:px-14 xl:px-16',
                )}
              >
                {(item.displayTitle || item.summary || item.buttons) && (
                  <div
                    className={classNames(
                      'flex flex-col',
                      { 'text-center': itemAlignment === 'center' },
                      { 'text-end': itemAlignment === 'end' },
                    )}
                  >
                    <TextPartPT
                      data={item}
                      alignment={itemAlignment}
                      darkMode={darkMode}
                    />
                  </div>
                )}
                {item.media.length > 0 && (
                  <div
                    className={classNames(
                      {
                        'lg:w-1/2 shrink-0 ': item.displayTitle || item.summary,
                      },
                      { 'w-full': !item.displayTitle && !item.summary },
                    )}
                  >
                    <FlexibleContentMediaPart
                      data={item}
                      alignment={itemAlignment}
                    />
                  </div>
                )}
              </div>
            </SwiperSlide>
          ))}
          <div className="mt-4 lg:mt-0 w-full flex justify-center gap-4">
            <GoArrowLeft
              size={50}
              className={classNames(
                'carouselpt-prev cursor-pointer lg:absolute lg:left-0 lg:top-1/2 lg:-translate-y-1/2 z-10 flex justify-center items-center rounded-full p-2.5 bg-opacity-20 hover:bg-primary-600 hover:text-slate-100 transition-colors duration-300 ease-in-out dark:text-slate-100',
              )}
            />
            <GoArrowRight
              size={50}
              className={classNames(
                'carouselpt-next cursor-pointer lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2 z-10 flex justify-center items-center rounded-full p-2.5 bg-opacity-20 hover:bg-primary-600 hover:text-slate-100 transition-colors duration-300 ease-in-out dark:text-slate-100',
              )}
            />
          </div>
        </Swiper>
      </div>
    </Section>
  );
};
