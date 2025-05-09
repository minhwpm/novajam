'use client';
import classNames from 'classnames';
import { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper/types';
import { FeaturedBlogPreview } from '@/components/blocks/FeaturedBlogPreview/FeaturedBlogPreview';
import { BlogPostType } from '@/lib/types';
import 'swiper/css';
import 'swiper/css/effect-fade';

const PROGRESS_DURATION = 3500; // 3.5 seconds

const CustomPagination: React.FC<{
  swiper: SwiperType | null;
  totalSlides: number;
  activeIndex: number;
}> = ({ swiper, totalSlides, activeIndex }) => {
  return (
    <div className="custom-pagination absolute z-10 flex gap-3 items-center p-4">
      {Array.from({ length: totalSlides }).map((_, index) => (
        <button
          key={index}
          aria-label={`Go to slide ${index + 1}`}
          className={classNames(
            'w-2 h-2 rounded-md bg-white pagination-bullet drop-shadow-lg',
            {
              'active scale-150 transition-transform duration-300 opacity-100':
                index === activeIndex,
              'opacity-50': index !== activeIndex,
            },
          )}
          onClick={() => swiper?.slideTo(index)}
        />
      ))}
    </div>
  );
};

export const FeaturedBlogCarousel: React.FC<{ blogs: BlogPostType[] }> = ({
  blogs,
}) => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="relative">
      <CustomPagination
        swiper={swiperRef.current}
        totalSlides={blogs.length}
        activeIndex={activeIndex}
      />
      <Swiper
        className="rounded-theme"
        slidesPerView={1}
        modules={[Autoplay, EffectFade]}
        autoplay={{
          delay: PROGRESS_DURATION,
          waitForTransition: false,
          disableOnInteraction: false,
        }}
        navigation={false}
        effect="fade"
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
      >
        {blogs.map((blog, index) => (
          <SwiperSlide
            key={blog.slug}
            className={classNames({
              invisible: activeIndex !== index,
            })}
          >
            <FeaturedBlogPreview data={blog} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
