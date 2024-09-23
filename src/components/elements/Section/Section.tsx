'use client';
import React from 'react';
import classNames from 'classnames';
import { ContentListType, ContentPTType, CTAType } from '@/helpers/types';
import { useInView } from 'react-hook-inview';
import { ButtonGroup } from '@/components/elements/ButtonGroup/ButtonGroup';
import { MarkdownRenderer } from '@/components/elements/MarkdownRenderer/MarkdownRenderer';
import { SectionSeparator } from '@/components/elements/SectionSeparator/SectionSeparator';

interface SectionProps {
  className?: string;
  framed?: boolean;
  layout?: 'side-by-side' | 'top-to-bottom';
  data: ContentListType | ContentPTType | CTAType;
  children: React.ReactNode;
}

export const Section: React.FC<SectionProps> = ({
  className,
  framed = true,
  layout = 'top-to-bottom',
  data,
  children,
}) => {
  const {
    htmlid,
    displayTitle,
    eyebrow,
    description,
    buttons,
    headingTextAlignment,
    backgroundColor,
    backgroundImage,
    darkMode,
    sectionSeparator,
  } = data;
  const [ref, isIntersecting] = useInView({
    threshold: 0.5,
    unobserveOnEnter: true,
  });

  const renderEyebrow = () =>
    eyebrow && (
      <div
        className={classNames(
          'text-sm xl:text-base tracking-widest mb-6 font-semibold text-secondary-600 dark:text-secondary-500',
          {
            'text-center': headingTextAlignment === 'center',
            'text-end': headingTextAlignment === 'end',
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
            'text-center': headingTextAlignment === 'center',
            'text-end': headingTextAlignment === 'end',
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
            'text-center': headingTextAlignment === 'center',
            'text-end': headingTextAlignment === 'end',
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
        alignment={headingTextAlignment}
        size="base"
      />
    );

  return (
    <section
      id={htmlid ?? ''}
      className={classNames(
        {
          [`${backgroundColor}-${darkMode ? 'dark-' : ''}section-bg-color`]:
            backgroundColor,
          'bg-center bg-no-repeat bg-cover bg-blend-multiply': backgroundImage,
          'dark:bg-opacity-10': !darkMode && backgroundColor,
          'dark:bg-slate-900/90': !darkMode && backgroundImage,
          dark: darkMode,
          // "lg:bg-fixed": backgroundImage && parallaxBackground @TODO
        },
        className,
      )}
      style={{
        // backgroundColor: backgroundColor ?? 'none',
        backgroundImage: `url(${backgroundImage?.url})`,
      }}
    >
      {sectionSeparator && sectionSeparator.includes('top') && (
        <SectionSeparator />
      )}

      <div
        className={classNames('flex gap-x-10 gap-y-6', {
          'py-14 md:py-16 lg:py-18 xl:py-20 2xl:py-24': displayTitle,
          'py-6 md:py-7 lg:py-8 xl:py-9 2xl:py-10': !displayTitle,
          'container mx-auto px-4': framed,
          'flex-col lg:flex-row lg:justify-between': layout === 'side-by-side',
          'flex-col': layout === 'top-to-bottom',
        })}
      >
        <div
          ref={ref}
          className={classNames(
            'relative -bottom-10 opacity-0 container mx-auto flex flex-col',
            {
              'animate-slidingUpContent animation-delay-150': isIntersecting,
              'items-center': headingTextAlignment === 'center',
              'items-end': headingTextAlignment === 'end',
            },
          )}
        >
          {renderEyebrow()}
          {renderTitle()}
          {renderDescription()}
          {data.contentType !== 'cta' && renderButtons()}
        </div>
        {children}
      </div>
      {sectionSeparator && sectionSeparator.includes('bottom') && (
        <SectionSeparator />
      )}
    </section>
  );
};
