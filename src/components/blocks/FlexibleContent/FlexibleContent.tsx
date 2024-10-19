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

export const FlexibleContent: React.FC<{
  index?: number;
  data: FlexibleContentType;
  animate?: boolean;
}> = ({ index, data, animate }) => {
  const {
    eyebrow,
    displayTitle,
    tags,
    summary,
    media,
    mediaAspectRatio,
    buttons,
    redirectUrl,
  } = data;
  const layout = data.layout ?? 'vertical';
  const alignment = data.alignment ?? 'center';

  const [ref, isIntersecting] = useIntersecting();

  const hasMedia = media?.length > 0;
  const hasText =
    displayTitle || eyebrow || summary || tags || buttons?.length > 0;

  const animationClass = classNames({
    'relative -bottom-10 opacity-0': animate,
    'animate-slidingUpContent': isIntersecting && animate,
  });

  const animationDelay = index && animate ? `${(index + 1) * 0.15}s` : '0s';

  const content = (
    <div
      ref={ref}
      className={classNames(
        layout === 'horizontal'
          ? 'flex rounded-theme'
          : 'flex flex-col rounded-theme h-full',
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
              data={media[0]}
              aspectRatio={mediaAspectRatio}
              videoControls
              zoomInOverHover={!!redirectUrl}
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
              aspectRatio={mediaAspectRatio}
            />
          )}
        </div>
      )}
      {hasText && (
        <div
          className={classNames(
            'flex flex-col gap-y-1',
            layout === 'horizontal'
              ? 'basis-7/12 flex-1 pl-4 xl:pl-6'
              : 'py-4 xl:pt-6 flex-1',
            {
              'text-center': alignment === 'center',
              'text-end': alignment === 'end',
            },
          )}
        >
          {eyebrow && (
            <div className="text-xs xl:text-sm tracking-wide text-slate-500 dark:text-slate-100/70">
              {eyebrow}
            </div>
          )}
          {displayTitle && (
            <div
              className={classNames(
                'text-lg xl:text-xl font-heading font-medium dark:text-slate-100',
              )}
            >
              <MarkdownRenderer>{displayTitle}</MarkdownRenderer>
            </div>
          )}
          {!!tags?.length && (
            <div
              className={classNames(
                'text-xs xl:text-sm tracking-wide text-slate-500 dark:text-slate-100/70',
                {
                  'mt-1': displayTitle,
                },
              )}
            >
              {tags.join(', ')}
            </div>
          )}
          {summary && (
            <div
              className={classNames(
                'prose 2xl:prose-lg leading-loose text-slate-500 dark:text-slate-100/70',
                {
                  'mt-1 lg:mt-2': displayTitle || !!tags?.length,
                  'mb-3 lg:mb-5': buttons.length > 0,
                },
              )}
            >
              <MarkdownRenderer>{summary}</MarkdownRenderer>
            </div>
          )}
          {buttons?.length > 0 && (
            <ButtonGroup data={buttons} alignment={alignment} />
          )}
        </div>
      )}
    </div>
  );

  return redirectUrl ? (
    <Link href={redirectUrl} className="hover:pointer">
      {content}
    </Link>
  ) : (
    content
  );
};
