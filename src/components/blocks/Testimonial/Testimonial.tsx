'use client';
import classNames from 'classnames';
import { useIntersecting } from '@/helpers/hooks/useIntersecting';
import { TestimonialType } from '@/helpers/types';
import { MediaItem } from '@/components/elements/MediaItem/MediaItem';
import { MarkdownRenderer } from '@/components/elements/MarkdownRenderer/MarkdownRenderer';
import { AiFillStar } from 'react-icons/ai';
import { VscQuote } from 'react-icons/vsc';

export const Testimonial: React.FC<{
  index?: number;
  data: TestimonialType;
  animate?: boolean;
}> = ({ index, data, animate }) => {
  const { content, authorImage, authorName, authorTitle, rating, fontSize } =
    data;
  const layout = data.layout ?? 'vertical';
  const alignment = data.alignment ?? 'center';

  const [ref, isIntersecting] = useIntersecting();

  return (
    <div
      ref={ref}
      className={classNames('max-w-3xl flex rounded-theme', {
        'flex-row gap-4': layout === 'horizontal',
        'flex-col gap-4': layout === 'vertical',
        'lg:gap-6': fontSize === 'lg',
        'lg:gap-8': fontSize === 'xl',
        'relative -bottom-10 opacity-0': animate,
        'animate-slidingUpContent': isIntersecting && animate,
        'items-center': alignment === 'center',
        'items-end': alignment === 'end',
      })}
      style={{
        animationDelay: index && animate ? `${(index + 1) * 0.15}s` : '0s',
      }}
    >
      {authorImage && (
        <div className={classNames('shrink-0 mb-2')}>
          <MediaItem data={authorImage} aspectRatio="square" rounded="full" />
        </div>
      )}
      <div
        className={classNames('flex flex-col justify-between', {
          'items-center text-center': alignment === 'center',
          'items-end text-end': alignment === 'end',
        })}
      >
        {rating && rating > 0 && (
          <div className="flex gap-2 mb-4">
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
              'mb-6 prose text-slate-600 dark:text-white/80 dark:prose-invert',
              {
                'prose-lg': fontSize === 'lg',
                'prose-xl': fontSize === 'xl',
              },
            )}
          >
            {content}
          </MarkdownRenderer>
        )}

        <VscQuote className="mb-2 rotate-180 text-primary-500" size={20} />
        <div
          className={classNames(
            'font-semibold font-heading text-lg dark:text-slate-100',
          )}
        >
          {authorName}
        </div>
        {authorTitle && (
          <div
            className={classNames('text-smd text-slate-600 dark:text-white/80')}
          >
            {authorTitle}
          </div>
        )}
      </div>
    </div>
  );
};
