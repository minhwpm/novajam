/* eslint-disable complexity */ //@TODO eslint
'use client';
import classNames from 'classnames';
import Link from 'next/link';
import { FlexibleContentType } from '@/helpers/types';
import { ButtonGroup } from '@/components/elements/ButtonGroup/ButtonGroup';
import { useIntersecting } from '@/helpers/hooks/useIntersecting';
import { MarkdownRenderer } from '@/components/elements/MarkdownRenderer/MarkdownRenderer';
import { MediaItem } from '@/components/elements/MediaItem/MediaItem';
import { MediaCarousel } from '@/components/elements/MediaCarousel/MediaCarousel';
import { MdArrowOutward } from 'react-icons/md';

export const FlexibleContent: React.FC<{
  index?: number;
  data: FlexibleContentType;
  animate?: boolean;
}> = ({ index, data, animate }) => {
  const { eyebrow, title, body, tags, media, buttons, redirectUrl } = data;
  const layout = data.layout ?? 'vertical';
  const alignment = data.alignment ?? 'center';

  const [ref, isIntersecting] = useIntersecting();

  const hasMedia = media?.length > 0;
  const hasText = title || eyebrow || body || tags || buttons?.length > 0;

  const animationClass = classNames({
    'relative -bottom-10 opacity-0': animate,
    'animate-slidingUpContent': isIntersecting && animate,
  });

  const animationDelay = index && animate ? `${(index + 1) * 0.15}s` : '0s';

  const content = (
    <div
      ref={ref}
      className={classNames(
        'group',
        layout === 'horizontal'
          ? 'flex rounded-theme gap-4 lg:gap-6'
          : 'flex flex-col rounded-theme h-full gap-4 lg:gap-6',
        animationClass,
      )}
      style={{ animationDelay }}
    >
      {hasMedia && (
        <div
          className={classNames('flex', {
            'justify-center': alignment === 'center',
            'justify-end': alignment === 'end',
            'max-w-fit basis-5/12': layout === 'horizontal',
            'grow items-center': !hasText && layout !== 'horizontal',
          })}
        >
          {media.length === 1 && (
            <MediaItem
              className="self-start"
              altText={media[0].description ?? ''}
              data={media[0]}
              videoControls
              zoomInOverHover={!!redirectUrl}
              shadow={!!redirectUrl}
            />
          )}
          {media.length > 1 && (
            <MediaCarousel
              data={media}
              autoplay={{
                delay: 3500,
              }}
              pagination={{
                enabled: true,
              }}
            />
          )}
        </div>
      )}
      {hasText && (
        <div
          className={classNames(
            'flex flex-col gap-y-1',
            layout === 'horizontal' ? 'basis-7/12 flex-1' : 'flex-1',
            {
              'text-center': alignment === 'center',
              'text-end': alignment === 'end',
            },
          )}
        >
          {eyebrow && (
            <div className="text-xs xl:text-sm tracking-wide text-slate-600 dark:text-white/80">
              {eyebrow}
            </div>
          )}
          {title && (
            <MarkdownRenderer
              className={classNames(
                'text-lg xl:text-xl font-heading dark:text-slate-100',
                { 'group-hover:text-primary-500': !!redirectUrl },
              )}
            >
              {title}
            </MarkdownRenderer>
          )}
          {!!tags?.length && (
            <div
              className={classNames(
                'text-xs xl:text-sm tracking-wide text-slate-600 dark:text-white/80',
                {
                  'mt-1': title,
                },
              )}
            >
              {tags.join(', ')}
            </div>
          )}
          {body && (
            <MarkdownRenderer
              className={classNames(
                'prose 2xl:prose-lg leading-loose text-slate-600 dark:text-white/80',
                {
                  'mt-1 lg:mt-2': title || !!tags?.length,
                  'mb-3 lg:mb-5': buttons.length > 0,
                },
              )}
            >
              {body}
            </MarkdownRenderer>
          )}
          {buttons?.length > 0 && (
            <ButtonGroup data={buttons} alignment={alignment} />
          )}
        </div>
      )}
      {!!redirectUrl && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 invisible group-hover:visible rounded-full bg-primary-600 flex items-center justify-center p-3 shadow-radiant">
          <MdArrowOutward className="text-white" size={25} />
        </div>
      )}
    </div>
  );
  if (redirectUrl) {
    return (
      <Link
        href={redirectUrl}
        className="hover:pointer relative group/flexible-box"
      >
        {content}
      </Link>
    );
  }
  return content;
};
