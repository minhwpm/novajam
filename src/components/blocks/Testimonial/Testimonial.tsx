'use client';
import classNames from 'classnames';
import { useIntersecting } from '@/helpers/hooks/useIntersecting';
import { TestimonialType } from '@/helpers/types';
import { MediaItem } from '@/components/elements/MediaItem/MediaItem';
import { MarkdownRenderer } from '@/components/elements/MarkdownRenderer/MarkdownRenderer';
import { AiFillStar } from 'react-icons/ai';

export const Testimonial: React.FC<{
  index?: number;
  data: TestimonialType;
  animate?: boolean;
}> = ({ index, data, animate }) => {
  const { content, portrait, name, role, rating, size } = data;
  const layout = data.layout ?? 'vertical';
  const alignment = data.alignment ?? 'center';

  const [ref, isIntersecting] = useIntersecting();

  return (
    <div
      ref={ref}
      className={classNames('max-w-4xl flex rounded-theme', {
        'flex-row gap-4': layout === 'horizontal',
        'flex-col gap-4': layout === 'vertical',
        'lg:gap-6': size === 'lg',
        'lg:gap-8': size === 'xl',
        'relative -bottom-10 opacity-0': animate,
        'animate-slidingUpContent': isIntersecting && animate,
        'items-center text-center': alignment === 'center',
        'items-end text-end': alignment === 'end',
      })}
      style={{
        animationDelay: index && animate ? `${(index + 1) * 0.15}s` : '0s',
      }}
    >
      {portrait && (
        <div
          className={classNames('shrink-0 mb-2 w-14', {
            'md:w-20 lg:w-28': size === 'lg',
            'sm:w-20 md:w-28 lg:w-36': size === 'xl',
          })}
        >
          <MediaItem data={portrait} aspectRatio="square" rounded="full" />
        </div>
      )}
      <div className="flex flex-col gap-4 justify-between">
        {rating && rating > 0 && (
          <div className="flex gap-2 ">
            {new Array(rating).fill(0).map((_item, idx) => (
              <AiFillStar
                key={idx}
                className={classNames('text-yellow-500 ')}
                size={20}
              />
            ))}
          </div>
        )}
        {content && (
          <MarkdownRenderer
            className={classNames(
              'prose text-slate-500 dark:text-slate-100/70 dark:prose-invert',
              {
                'text-base lg:text-lg': size === 'lg',
                'text-base md:text-lg xl:text-xl': size === 'xl',
              },
            )}
          >
            {content}
          </MarkdownRenderer>
        )}

        {(name || role) && (
          <div className="flex flex-col">
            <div
              className={classNames(
                'font-semibold font-heading text-lg dark:text-slate-100',
              )}
            >
              {name}
            </div>
            <div
              className={classNames(
                'text-smd text-slate-500 dark:text-slate-100/70',
              )}
            >
              {role}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
