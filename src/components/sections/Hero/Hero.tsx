/* eslint-disable complexity */
'use client';
import classNames from 'classnames';
import { MarkdownRenderer } from '@/components/elements/MarkdownRenderer/MarkdownRenderer';
import { MediaItem } from '@/components/elements/MediaItem/MediaItem';
import { ButtonGroup } from '@/components/elements/ButtonGroup/ButtonGroup';
import { SectionSeparator } from '@/components/elements/SectionSeparator/SectionSeparator';
import { useIntersecting } from '@/helpers/hooks/useIntersecting';
import { HeroType } from '@/helpers/types';
import '@/app/styles/padding.css';

export const Hero: React.FC<{ order?: number; data: HeroType }> = ({
  data,
}) => {
  const {
    htmlid,
    eyebrow,
    displayTitle,
    summary,
    buttons,
    media,
    backgroundColor,
    backgroundImage,
    enableParallaxEffect,
    darkMode,
    showBottomSeparator,
    mediaWidthExpanded,
  } = data;
  const switchMediaPosition = data.switchMediaPosition ?? 'right';
  const [ref, isIntersecting] = useIntersecting();
  const layout = data.layout ?? 'horizontal';
  const alignment = data.alignment ?? 'start';
  const displayTitleFontSize = data.displayTitleFontSize ?? 'lg';

  return (
    <section
      id={htmlid ?? ''}
      ref={ref}
      className={classNames(
        'bg-opacity-100', // to set --tw-bg-opacity: 100
        {
          'bg-center bg-no-repeat bg-cover bg-blend-multiply': backgroundImage,
          'bg-opacity-100 dark:bg-opacity-10': !darkMode && backgroundColor,
          'dark:bg-slate-900/90': !darkMode && backgroundImage,
          dark: darkMode,
          'lg:bg-fixed': backgroundImage && enableParallaxEffect,
        },
      )}
      style={{
        backgroundColor: backgroundColor
          ? `rgba(${parseInt(backgroundColor.slice(1, 3), 16)}, 
                  ${parseInt(backgroundColor.slice(3, 5), 16)}, 
                  ${parseInt(backgroundColor.slice(5, 7), 16)}, 
                  var(--tw-bg-opacity))`
          : 'none',
        backgroundImage: backgroundImage
          ? `url(${backgroundImage.url}), url('/fallback.png)`
          : 'none',
      }}
    >
      <div
        className={classNames('flex flex-col', {
          'lg:flex-row lg:items-center': layout === 'horizontal',
        })}
      >
        {(eyebrow || displayTitle || summary || !!buttons?.length) && (
          <div
            className={classNames(
              'basis-1/2 shrink grow flex flex-col py-14 md:py-16 lg:py-20 xl:py-24 2xl:py-28',
              {
                // '': layout === 'horizontal',
                'pr-4 lg:pr-8 xl:pr-10 max-w-3xl custom-padding-left':
                  layout === 'horizontal' && switchMediaPosition === 'right',
                'pl-4 lg:pl-8 xl:pl-10 max-w-3xl custom-padding-right':
                  layout === 'horizontal' && switchMediaPosition === 'left',
                'px-4 max-w-4xl self-center': layout === 'vertical',
                'items-center text-center': alignment === 'center',
                'items-end text-end': alignment === 'end',
              },
            )}
          >
            {eyebrow && (
              <div
                className={classNames(
                  'text-sm xl:text-base tracking-widest max-w-2xl opacity-0 font-semibold mb-6 text-secondary-600 dark:text-secondary-500',
                  {
                    'animate-slidingHeroContent animation-delay-500':
                      isIntersecting,
                  },
                )}
              >
                {eyebrow}
              </div>
            )}
            {displayTitle && (
              <div
                className={classNames(
                  'font-heading leading-snug opacity-0 dark:text-slate-100',
                  {
                    'animate-slidingHeroContent': isIntersecting,
                    'text-base-heading': displayTitleFontSize === 'base',
                    'text-lg-heading': displayTitleFontSize === 'lg',
                    'text-xl-heading': displayTitleFontSize === 'xl',
                    'text-xxl-heading': displayTitleFontSize === 'xxl',
                  },
                )}
              >
                <MarkdownRenderer>{displayTitle}</MarkdownRenderer>
              </div>
            )}
            {summary && (
              <div
                className={classNames(
                  'prose lg:prose-lg 2xl:prose-xl mt-4 lg:mt-6 max-w-xl opacity-0 !leading-loose text-slate-500 dark:text-slate-100/70',
                  {
                    'animate-slidingHeroContent animation-delay-200':
                      isIntersecting,
                  },
                )}
              >
                <MarkdownRenderer>{summary}</MarkdownRenderer>
              </div>
            )}
            {buttons.length > 0 && (
              <div
                className={classNames('mt-8 lg:mt-10 opacity-0', {
                  'animate-slidingHeroContent animation-delay-400':
                    isIntersecting,
                })}
              >
                {buttons.length > 0 && (
                  <ButtonGroup data={buttons} alignment={alignment} size="lg" />
                )}
              </div>
            )}
          </div>
        )}
        {media && (
          <div
            className={classNames(
              'basis-1/2 shrink grow max-w-fit opacity-0 self-stretch flex items-center',
              {
                'custom-padding-right':
                  layout === 'horizontal' &&
                  switchMediaPosition === 'right' &&
                  !mediaWidthExpanded,
                'custom-padding-left':
                  layout === 'horizontal' &&
                  switchMediaPosition === 'left' &&
                  !mediaWidthExpanded,
                'custom-padding-right custom-padding-left':
                  layout === 'vertical' && !mediaWidthExpanded,
                'animate-slidingHeroContent animation-delay-300':
                  isIntersecting,
                '-order-1': switchMediaPosition === 'left',
              },
            )}
          >
            <MediaItem
              data={media}
              videoAutoplay={false}
              priority={true}
              dimensionBase="height"
            />
          </div>
        )}
      </div>
      {showBottomSeparator && <SectionSeparator />}
    </section>
  );
};
