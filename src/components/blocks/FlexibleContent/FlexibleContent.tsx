import classNames from 'classnames';
import Link from 'next/link';
import { FlexibleContentType } from '@/lib/types';
import { ButtonGroup } from '@/components/elements/ButtonGroup/ButtonGroup';
import { MarkdownRenderer } from '@/components/elements/MarkdownRenderer/MarkdownRenderer';
import { MediaItem } from '@/components/elements/MediaItem/MediaItem';
import { MediaCarousel } from '@/components/elements/MediaCarousel/MediaCarousel';

export const FlexibleContent: React.FC<{ data: FlexibleContentType }> = ({
  data,
}) => {
  const {
    eyebrow,
    title,
    body,
    media,
    buttons,
    redirectUrl,
    layout = 'vertical',
    alignment = 'center',
  } = data;
  const hasMedia = media?.length > 0;
  const hasText = Boolean(title || eyebrow || body || buttons?.length);

  const getMediaWrapperClasses = () =>
    classNames('flex', {
      'justify-center': alignment === 'center',
      'justify-end': alignment === 'end',
      'max-w-fit basis-5/12': layout === 'horizontal',
      'grow items-center': !hasText && layout !== 'horizontal',
    });

  const getTextWrapperClasses = () =>
    classNames(
      'flex flex-col gap-y-1',
      layout === 'horizontal' ? 'basis-7/12 grow shrink' : 'flex-1',
      {
        'text-center': alignment === 'center',
        'text-end': alignment === 'end',
      },
    );

  const renderMedia = () =>
    hasMedia && (
      <div className={getMediaWrapperClasses()}>
        {media.length === 1 ? (
          <MediaItem
            className="self-start"
            altText={media[0].description ?? ''}
            data={media[0]}
            videoControls
            zoomInOverHover={!!redirectUrl}
            shadow={!!redirectUrl}
          />
        ) : (
          <MediaCarousel
            data={media}
            autoplay={{ delay: 3500 }}
            pagination={{ enabled: true }}
          />
        )}
      </div>
    );

  const renderTextContent = () =>
    hasText && (
      <div className={getTextWrapperClasses()}>
        {eyebrow && (
          <div className="text-sm tracking-wide text-slate-500 dark:text-slate-100/60 inverse:text-slate-100/60">
            {eyebrow}
          </div>
        )}
        {title && (
          <MarkdownRenderer
            className={classNames(
              'text-lg lg:text-xl font-heading dark:text-slate-100 inverse:text-slate-100',
              {
                'group-hover:underline underline-offset-4 decoration-1':
                  !!redirectUrl,
                'mb-1 lg:mb-2': body,
                'mb-3 lg:mb-5': !body && buttons?.length,
              },
            )}
          >
            {title}
          </MarkdownRenderer>
        )}
        {body && (
          <MarkdownRenderer
            className={classNames(
              'prose 2xl:prose-lg leading-loose text-slate-600 dark:prose-invert dark:text-slate-100/80 inverse:prose-invert inverse:text-slate-100/80',
              {
                'mb-3 lg:mb-5': buttons?.length,
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
    );

  const content = (
    <div
      className={classNames(
        'group py-2',
        layout === 'horizontal'
          ? 'flex rounded-theme gap-4 lg:gap-6'
          : 'flex flex-col rounded-theme h-full gap-4 lg:gap-6',
      )}
    >
      {renderMedia()}
      {renderTextContent()}
    </div>
  );

  return redirectUrl ? (
    <Link href={redirectUrl} className="hover:pointer group/flexible-box">
      {content}
    </Link>
  ) : (
    content
  );
};
