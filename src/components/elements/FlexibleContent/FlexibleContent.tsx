'use client';
import classNames from 'classnames';
import { AlignmentType, FlexibleContentType } from '@/helpers/types';
import { ButtonGroup } from '@/components/elements/ButtonGroup/ButtonGroup';
import { FlexibleContentMediaPart } from '@/components/elements/FlexibleContentMediaPart/FlexibleContentMediaPart';
import { useIntersecting } from '@/helpers/hooks/useIntersecting';
import { MarkdownRenderer } from '@/components/elements/MarkdownRenderer/MarkdownRenderer';

export const FlexibleContent: React.FC<{
  index?: number;
  data: FlexibleContentType;
  alignment?: AlignmentType;
  layout?: 'vertical' | 'horizontal';
  animate?: boolean;
}> = ({ index, data, alignment = 'center', layout = 'vertical', animate }) => {
  const { displayTitle, eyebrow, description, media, buttons } = data;
  const [ref, isIntersecting] = useIntersecting();

  const hasMedia = media.length > 0;
  const hasText = displayTitle || eyebrow || description || buttons?.length > 0;

  const animationClass = classNames({
    'relative -bottom-10 opacity-0': animate,
    'animate-slidingUpContent': isIntersecting && animate,
  });

  const animationDelay = index && animate ? `${(index + 1) * 0.15}s` : '0s';

  return (
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
        <FlexibleContentMediaPart
          className={classNames({
            'max-w-fit basis-5/12': layout === 'horizontal',
            'grow items-center': !hasText && layout !== 'horizontal',
          })}
          data={data}
          alignment={alignment}
          aspectRatio="auto"
        />
      )}
      {hasText && (
        <div
          className={classNames(
            'flex flex-col',
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
            <div className="not-prose text-xs xl:text-sm font-medium tracking-widest mb-1 text-slate-400 dark:text-slate-100/60">
              {eyebrow}
            </div>
          )}
          {displayTitle && (
            <div
              className={classNames(
                'not-prose font-heading text-lg lg:text-xl dark:text-slate-100',
                {
                  'mb-2 lg:mb-4': description || buttons.length > 0,
                },
              )}
            >
              <MarkdownRenderer>{displayTitle}</MarkdownRenderer>
            </div>
          )}
          {description && (
            <div
              className={classNames(
                'prose 2xl:prose-lg leading-loose text-slate-500 dark:text-slate-100/70',
                {
                  'mb-4 lg:mb-6': buttons.length > 0,
                },
              )}
            >
              <MarkdownRenderer>{description}</MarkdownRenderer>
            </div>
          )}
          {buttons?.length > 0 && (
            <ButtonGroup data={buttons} alignment={alignment} />
          )}
        </div>
      )}
    </div>
  );
};
