'use client';
import classNames from 'classnames';
import { FeaturedContentType } from '@/helpers/types';
import { useInView } from 'react-hook-inview';
import { MediaSection } from './MediaSection';
import { ContentSection } from './ContentSection';
import { MarkdownRenderer } from '@/components/elements/MarkdownRenderer/MarkdownRenderer';
import '@/app/styles/bg-color.css';
import '@/app/styles/padding.css';

export const FeaturedContent: React.FC<{ data: FeaturedContentType }> = ({
  data,
}) => {
  const {
    eyebrow,
    displayTitle,
    description,
    buttons,
    items,
    media,
    mediaPosition,
    mediaAspectRatio,
    htmlid,
    size,
    backgroundColor,
    backgroundImage,
    darkMode,
  } = data;
  const [ref, isIntersecting] = useInView({
    threshold: 0.4,
    unobserveOnEnter: true,
  });

  return (
    <section
      id={htmlid}
      ref={ref}
      className={classNames({
        'py-14 md:py-16 lg:py-18 xl:py-20 2xl:py-24': size === 'standard',
        [`${backgroundColor}-${darkMode ? 'dark-' : ''}section-bg-color`]:
          backgroundColor,
        'bg-center bg-no-repeat bg-cover bg-blend-multiply': backgroundImage,
        'dark:bg-opacity-10': !darkMode && backgroundColor,
        'dark:bg-slate-900/90': !darkMode && backgroundImage,
        dark: darkMode,
        // "lg:bg-fixed": backgroundImage && parallaxBackground @TODO
      })}
      style={{
        backgroundImage: `url(${backgroundImage?.url})`,
      }}
    >
      {items.length >= 3 && (
        <div className="px-4 text-center flex flex-col items-center">
          {eyebrow && (
            <div className="text-sm xl:text-base tracking-widest mb-2 max-w-5xl text-primary-600 dark:text-primary-600/50">
              {eyebrow}
            </div>
          )}
          {displayTitle && (
            <div className="text-heading leading-snug font-heading max-w-3xl xl:max-w-4xl mb-4 dark:text-slate-100">
              <MarkdownRenderer>{displayTitle}</MarkdownRenderer>
            </div>
          )}
          {description && (
            <div
              className={classNames(
                'block prose xl:prose-lg leading-loose text-slate-500 dark:prose-invert dark:text-slate-100/70',
                { 'mb-4 lg:mb-8': buttons && buttons.length > 0 },
              )}
            >
              <MarkdownRenderer>{description}</MarkdownRenderer>
            </div>
          )}
        </div>
      )}
      <div
        className={classNames(
          'w-full flex flex-wrap gap-4 lg:gap-0 items-center',
          {
            'container mx-auto px-4': size === 'standard',
            'flex-row-reverse flex-wrap-reverse': mediaPosition === 'right',
          },
        )}
      >
        <MediaSection
          media={media}
          mediaAspectRatio={mediaAspectRatio}
          isIntersecting={isIntersecting}
        />
        <ContentSection
          eyebrow={eyebrow}
          displayTitle={displayTitle}
          description={description}
          items={items}
          buttons={buttons}
          mediaPosition={mediaPosition}
          size={size}
          isIntersecting={isIntersecting}
        />
      </div>
    </section>
  );
};
