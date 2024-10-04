'use client';
import classNames from 'classnames';
import { useIntersecting } from '@/helpers/hooks/useIntersecting';
import { TestimonialType } from '@/helpers/types';
import { MediaItem } from '@/components/elements/MediaItem/MediaItem';
import { MarkdownRenderer } from '@/components/elements/MarkdownRenderer/MarkdownRenderer';
import { AiFillStar } from 'react-icons/ai';
import { RiDoubleQuotesL } from 'react-icons/ri';

export const Testimonial: React.FC<{
  index?: number;
  data: TestimonialType;
  animate?: boolean;
}> = ({ index, data, animate }) => {
  const { content, portrait, name, role, rating } = data;
  const layout = data.layout ?? 'vertical';
  const alignment = data.alignment ?? 'center';

  const [ref, isIntersecting] = useIntersecting();

  return (
    <div
      ref={ref}
      className={classNames('max-w-2xl flex gap-4 rounded-theme', {
        'flex-col': layout === 'vertical',
        'relative -bottom-10 opacity-0': animate,
        'animate-slidingUpContent': isIntersecting && animate,
        'items-center': alignment === 'center',
        'items-end': alignment === 'end',
      })}
      style={{
        animationDelay: index && animate ? `${(index + 1) * 0.15}s` : '0s',
      }}
    >
      {portrait && (
        <div className="shrink-0 w-14 h-14">
          <MediaItem data={portrait} aspectRatio="square" rounded="full" />
        </div>
      )}
      <div
        className={classNames('relative', {
          'text-center': alignment === 'center',
          'text-end': alignment === 'end',
        })}
      >
        <RiDoubleQuotesL
          size={40}
          className={classNames(
            'absolute -top-6 -left-6 -z-10 text-slate-300/70 dark:text-slate-300/20',
          )}
        />
        {content && (
          <MarkdownRenderer className="prose leading-loos text-slate-500 dark:text-slate-100/70 dark:prose-invert">
            {content}
          </MarkdownRenderer>
        )}
        {rating > 0 && (
          <div className="flex gap-2 mb-6">
            {new Array(rating).fill(0).map((_item, idx) => (
              <AiFillStar
                key={idx}
                className={classNames(
                  'text-primary-600 dark:text-primary-600/50',
                )}
                size={20}
              />
            ))}
          </div>
        )}
        {(name || role) && (
          <div className="flex flex-col mt-4">
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
