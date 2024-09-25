'use client';
import classNames from 'classnames';
import {
  AlignmentType,
  ContentListType,
  ContentPTType,
  CTAType,
  FeaturedContentType,
} from '@/helpers/types';
import { ButtonGroup } from '@/components/elements/ButtonGroup/ButtonGroup';
import { MarkdownRenderer } from '@/components/elements/MarkdownRenderer/MarkdownRenderer';
import { SectionSeparator } from '@/components/elements/SectionSeparator/SectionSeparator';
import { useIntersecting } from '@/helpers/hooks/useIntersecting';

interface SectionProps {
  className?: string;
  framed?: boolean;
  layout?: 'flex-row' | 'full-top';
  data: ContentListType | ContentPTType | CTAType | FeaturedContentType;
  children: React.ReactNode;
}

export const Section: React.FC<SectionProps> = ({
  className,
  framed = true,
  layout = 'full-top',
  data,
  children,
}) => {
  const {
    htmlid,
    displayTitle,
    eyebrow,
    description,
    buttons,
    backgroundColor,
    backgroundImage,
    enableParallaxEffect,
    darkMode,
    sectionSeparator,
  } = data;

  let alignment: AlignmentType = 'start';
  if ('headingAlignment' in data && data.headingAlignment)
    alignment = data.headingAlignment;
  if ('contentAlignment' in data && data.contentAlignment)
    alignment = data.contentAlignment;

  const [ref, isIntersecting] = useIntersecting(0.5);

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

  const renderTitle = () =>
    displayTitle && (
      <div
        className={classNames(
          'font-heading text-heading leading-snug max-w-3xl mb-4 dark:text-slate-100',
          {
            'text-center': alignment === 'center',
            'text-end': alignment === 'end',
          },
        )}
      >
        <MarkdownRenderer>{displayTitle}</MarkdownRenderer>
      </div>
    );

  const renderDescription = () =>
    description && (
      <div
        className={classNames(
          'prose lg:prose-lg 2xl:prose-xl max-w-xl lg:max-w-3xl mb-4 text-slate-500 dark:prose-invert dark:text-slate-100/70',
          {
            'text-center': alignment === 'center',
            'text-end': alignment === 'end',
          },
        )}
      >
        <MarkdownRenderer>{description}</MarkdownRenderer>
      </div>
    );

  const renderButtons = () =>
    buttons &&
    buttons.length > 0 && (
      <ButtonGroup
        className="mt-4"
        data={buttons}
        alignment={alignment}
        size="base"
      />
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
      {sectionSeparator && sectionSeparator.includes('top') && (
        <SectionSeparator />
      )}
      <div
        className={classNames(
          'flex flex-col lg:flex-row lg:justify-between lg:items-center gap-x-10 gap-y-6',
          {
            'py-14 md:py-16 lg:py-18 xl:py-20 2xl:py-24': displayTitle,
            'py-6 md:py-7 lg:py-8 xl:py-9 2xl:py-10': !displayTitle,
            'container mx-auto px-4': framed,
            'flex-wrap': layout === 'full-top',
          },
        )}
      >
        {displayTitle && (
          <div
            ref={ref}
            className={classNames(
              'relative -bottom-10 opacity-0 container mx-auto flex flex-col',
              {
                'basis-1/3 grow shrink-0': layout === 'flex-row',
                'w-full': layout === 'full-top',
                'animate-slidingUpContent animation-delay-150': isIntersecting,
                'items-center': alignment === 'center',
                'items-end': alignment === 'end',
              },
            )}
          >
            {renderEyebrow()}
            {renderTitle()}
            {renderDescription()}
            {data.contentType !== 'cta' && renderButtons()}
          </div>
        )}
        {children}
      </div>
      {sectionSeparator && sectionSeparator.includes('bottom') && (
        <SectionSeparator />
      )}
    </section>
  );
};
