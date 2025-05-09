import classNames from 'classnames';
import { TestimonialType } from '@/lib/types';
import { MediaItem } from '@/components/elements/MediaItem/MediaItem';
import { MarkdownRenderer } from '@/components/elements/MarkdownRenderer/MarkdownRenderer';
import { AiFillStar } from 'react-icons/ai';

export const Testimonial: React.FC<{
  data: TestimonialType;
}> = ({ data }) => {
  const { content, authorImage, authorName, authorTitle, rating, fontSize } =
    data;
  const layout = data.layout ?? 'vertical';
  const alignment = data.alignment ?? 'center';

  return (
    <div
      className={classNames('flex rounded-theme py-2', {
        'flex-row gap-4': layout === 'horizontal',
        'flex-col gap-4': layout === 'vertical',
        'lg:gap-6': fontSize === 'lg',
        'lg:gap-8': fontSize === 'xl',
        'items-center': alignment === 'center',
        'items-end': alignment === 'end',
      })}
    >
      {authorImage && (
        <div className={classNames('mb-2')}>
          <MediaItem data={authorImage} rounded="full" />
        </div>
      )}
      <div
        className={classNames(
          'basis-[70%] grow shrink-0 flex flex-col justify-between',
          {
            'items-center text-center': alignment === 'center',
            'items-end text-end': alignment === 'end',
          },
        )}
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
              'mb-3 lg:mb-4 prose text-slate-600 dark:prose-invert dark:text-slate-100/80 inverse:prose-invert inverse:text-slate-100/80',
              {
                'prose-lg': fontSize === 'lg',
                'prose-xl': fontSize === 'xl',
              },
            )}
          >
            {content}
          </MarkdownRenderer>
        )}

        <div
          className={classNames(
            'font-semibold font-heading text-lg dark:text-slate-100 inverse:text-slate-100',
          )}
        >
          {authorName}
        </div>
        {authorTitle && (
          <div
            className={classNames(
              'text-smd text-slate-600 dark:text-slate-100/80 inverse:text-slate-100/80',
            )}
          >
            {authorTitle}
          </div>
        )}
      </div>
    </div>
  );
};
