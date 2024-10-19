'use client';
import classNames from 'classnames';
import {
  ContentListType,
  ContentPTType,
  FeaturedContentType,
} from '@/helpers/types';
import { ButtonGroup } from '@/components/elements/ButtonGroup/ButtonGroup';
import { MarkdownRenderer } from '@/components/elements/MarkdownRenderer/MarkdownRenderer';
import { SectionSeparator } from '@/components/elements/SectionSeparator/SectionSeparator';
import { useIntersecting } from '@/helpers/hooks/useIntersecting';

interface SectionProps {
  className?: string;
  framed?: boolean;
  layout?: 'flex row' | 'full top';
  data: ContentListType | ContentPTType | FeaturedContentType;
  children: React.ReactNode;
}

export const Section: React.FC<SectionProps> = ({
  className,
  framed = true,
  layout = 'full top',
  data,
  children,
}) => {
  const {
    htmlid,
    displayTitle,
    eyebrow,
    summary,
    buttons,
    alignment,
    backgroundColor,
    backgroundImage,
    enableParallaxEffect,
    darkMode,
    showBottomSeparator,
  } = data;

  const marginTop = 'marginTop' in data ? data.marginTop : 'none';
  const marginBottom = 'marginBottom' in data ? data.marginBottom : 'none';

  const [ref, isIntersecting] = useIntersecting(0.5);

  const backgroundStyle = {
    backgroundColor: backgroundColor
      ? `rgba(${parseInt(backgroundColor.slice(1, 3), 16)}, 
            ${parseInt(backgroundColor.slice(3, 5), 16)}, 
            ${parseInt(backgroundColor.slice(5, 7), 16)}, 
            var(--tw-bg-opacity))`
      : 'none',
    backgroundImage: backgroundImage
      ? `url(${backgroundImage.url}), url('/fallback.png)`
      : 'none',
  };

  const renderEyebrow = () =>
    eyebrow && (
      <div
        className={classNames(
          'text-sm xl:text-base tracking-widest mb-6 font-semibold text-secondary-600 dark:text-secondary-500',
          {
            'text-center': alignment === 'center',
            'text-end': alignment === 'end',
          },
        )}
      >
        {eyebrow}
      </div>
    );

  const marginClass = classNames({
    'mt-0': marginTop === 'none',
    '-mt-2 md:-mt-4 2xl:-mt-6': marginTop === '-sm',
    '-mt-4 md:-mt-6 lg:-mt-8 xl:-mt-10 2xl:-mt-14': marginTop === '-md',
    '-mt-14 md:-mt-16 lg:-mt-20 xl:-mt-24 2xl:-mt-28': marginTop === '-lg',
    'mt-2 md:mt-4 2xl:mt-6': marginTop === 'sm',
    'mt-4 md:mt-6 lg:mt-8 xl:mt-10 2xl:mt-14': marginTop === 'md',
    'mt-14 md:mt-16 lg:mt-20 xl:mt-24 2xl:mt-28': marginTop === 'lg',
    'mb-0': marginBottom === 'none',
    '-mb-2 md:-mb-4 2xl:-mb-6': marginTop === '-sm',
    '-mb-4 md:-mb-6 lg:-mb-8 xl:-mb-10 2xl:-mb-14': marginTop === '-md',
    '-mb-14 md:-mb-16 lg:-mb-20 xl:-mb-24 2xl:-mb-28': marginBottom === '-lg',
    'mb-2 md:mb-4 2xl:mb-6': marginBottom === 'sm',
    'mb-4 md:mb-6 lg:mb-8 xl:mb-10 2xl:mb-14': marginBottom === 'md',
    'mb-14 md:mb-16 lg:mb-20 xl:mb-24 2xl:mb-28': marginBottom === 'lg',
  });

  const renderTitle = () =>
    displayTitle && (
      <div
        className={classNames(
          'font-heading text-heading leading-snug max-w-3xl mb-4 lg:mb-6 dark:text-slate-100',
          {
            'text-center': alignment === 'center',
            'text-end': alignment === 'end',
          },
        )}
      >
        <MarkdownRenderer>{displayTitle}</MarkdownRenderer>
      </div>
    );

  const renderSummary = () =>
    summary && (
      <div
        className={classNames(
          'prose lg:prose-lg 2xl:prose-xl max-w-xl lg:max-w-xl mb-4 text-slate-500 dark:prose-invert dark:text-slate-100/70',
          {
            'text-center': alignment === 'center',
            'text-end': alignment === 'end',
          },
        )}
      >
        <MarkdownRenderer>{summary}</MarkdownRenderer>
      </div>
    );

  return (
    <section
      id={htmlid ?? ''}
      className={classNames(
        'bg-opacity-100', // to set --tw-bg-opacity: 100
        {
          'bg-center bg-no-repeat bg-cover bg-blend-multiply': backgroundImage,
          'dark:bg-opacity-5': !darkMode && backgroundColor,
          'dark:bg-slate-900/90': !darkMode && backgroundImage,
          dark: darkMode,
          'lg:bg-fixed': backgroundImage && enableParallaxEffect,
        },
        className,
      )}
      style={backgroundStyle}
    >
      <div
        className={classNames(
          'flex flex-wrap justify-between items-center gap-6 lg:gap-10',
          'py-14 md:py-16 lg:py-20 xl:py-24 2xl:py-28',
          { container: framed },
          marginClass,
        )}
      >
        {(eyebrow || displayTitle || summary) && (
          <div
            ref={ref}
            className={classNames(
              'w-full relative -bottom-10 opacity-0 flex flex-col',
              {
                'lg:basis-1/4 grow shrink-0 max-w-lg': layout === 'flex row',
                'animate-slidingUpContent animation-delay-150': isIntersecting,
                'items-center': alignment === 'center',
                'items-end': alignment === 'end',
              },
            )}
          >
            {renderEyebrow()}
            {renderTitle()}
            {renderSummary()}
            {!!buttons?.length && data.contentType === 'featuredcontent' && (
              <ButtonGroup
                className="mt-6"
                data={buttons}
                alignment={alignment}
                size="lg"
              />
            )}
          </div>
        )}
        {children}
        {!!buttons?.length &&
          (data.contentType === 'contentlist' ||
            data.contentType === 'contentpresentation') && (
            <div className="w-full">
              <ButtonGroup data={buttons} alignment={alignment} />
            </div>
          )}
      </div>
      {showBottomSeparator && <SectionSeparator />}
    </section>
  );
};
