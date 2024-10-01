'use client';
import classNames from 'classnames';
import { MarkdownRenderer } from '@/components/elements/MarkdownRenderer/MarkdownRenderer';
import { MediaItem } from '@/components/elements/MediaItem/MediaItem';
import { ButtonGroup } from '@/components/elements/ButtonGroup/ButtonGroup';
import { SectionSeparator } from '@/components/elements/SectionSeparator/SectionSeparator';
import { useIntersecting } from '@/helpers/hooks/useIntersecting';
import { HeroType } from '@/helpers/types';
import '@/app/styles/padding.css';
import '@/app/styles/bg-color.css';

export const Hero: React.FC<{ order: number; data: HeroType }> = ({
  order,
  data,
}) => {
  const {
    htmlid,
    eyebrow,
    displayTitle,
    summary,
    buttons,
    media,
    layout,
    introAlignment,
    backgroundColor,
    backgroundImage,
    enableParallaxEffect,
    darkMode,
    showBottomSeparator
  } = data;
  const [ref, isIntersecting] = useIntersecting();

  return (
    <section
      id={htmlid ?? ''}
      ref={ref}
      className={classNames(
        'bg-opacity-100', // to set --tw-bg-opacity: 100
        {
          'pt-10 pb-4 md:pb-6 lg:pb-10 xl:pb-14 2xl:pb-18': order === 1,
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
          ? `url(${backgroundImage.url})`
          : 'none',
      }}
    >
      <div
        className={classNames(
          'py-4 md:py-6 lg:py-8 xl:py-10 2xl:py-14 flex flex-col gap-y-10 md:gap-y-12 lg:gap-y-14 xl:gap-y-16',
          {
            'container py-8': layout === 'vertical',
            'lg:flex-row lg:items-center py-14': layout !== 'vertical',
          },
        )}
      >
        <div
          className={classNames('flex flex-col', {
            'pr-4 lg:pr-8 xl:pr-10 custom-padding-left': layout !== 'vertical',
            'items-center text-center': introAlignment === 'center',
            'items-end text-end': introAlignment === 'end',
          })}
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
                'basis-1/2 shrink grow text-hero-heading leading-snug font-heading max-w-2xl opacity-0 dark:text-slate-100',
                { 'animate-slidingHeroContent': isIntersecting },
              )}
            >
              <MarkdownRenderer>{displayTitle}</MarkdownRenderer>
            </div>
          )}
          {summary && (
            <div
              className={classNames(
                'prose lg:prose-lg 2xl:prose-xl mt-4 max-w-lg opacity-0 !leading-loose text-slate-500 dark:text-slate-100/70',
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
                <ButtonGroup
                  data={buttons}
                  alignment={introAlignment}
                  size="lg"
                />
              )}
            </div>
          )}
        </div>
        {media && (
          <div
            className={classNames('w-full basis-1/2 shrink grow opacity-0', {
              'animate-slidingHeroContent animation-delay-300': isIntersecting,
            })}
          >
            <MediaItem data={media} videoAutoplay={true} priority={true} />
          </div>
        )}
      </div>
      {showBottomSeparator && <SectionSeparator />}
    </section>
  );
};
