'use client';
import classNames from 'classnames';
import {
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
  layout?: 'flex row' | 'full top';
  data: ContentListType | ContentPTType | CTAType | FeaturedContentType;
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
    introAlignment,
    backgroundColor,
    backgroundImage,
    enableParallaxEffect,
    darkMode,
    showBottomSeparator,
  } = data;

  const [ref, isIntersecting] = useIntersecting(0.5);

  const renderEyebrow = () =>
    eyebrow && (
      <div
        className={classNames(
          'text-sm xl:text-base tracking-widest mb-6 font-semibold text-secondary-600 dark:text-secondary-500',
          {
            'text-center': introAlignment === 'center',
            'text-end': introAlignment === 'end',
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
            'text-center': introAlignment === 'center',
            'text-end': introAlignment === 'end',
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
            'text-center': introAlignment === 'center',
            'text-end': introAlignment === 'end',
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
          'flex flex-col lg:flex-row lg:justify-between lg:items-center gap-x-10 gap-y-6 lg:gap-y-10',
          'py-14 md:py-16 lg:py-18 xl:py-20 2xl:py-24',
          {
            container: framed,
            'flex-wrap': layout === 'full top',
          },
        )}
      >
        {displayTitle && (
          <div
            ref={ref}
            className={classNames(
              'relative -bottom-10 opacity-0 flex flex-col',
              {
                'basis-1/3 grow shrink-0': layout === 'flex row',
                'w-full': layout === 'full top',
                'animate-slidingUpContent animation-delay-150': isIntersecting,
                'items-center': introAlignment === 'center',
                'items-end': introAlignment === 'end',
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
                alignment={introAlignment}
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
              <ButtonGroup data={buttons} alignment={introAlignment} />
            </div>
          )}
        {!!buttons?.length && data.contentType === 'cta' && (
          <div className="">
            <ButtonGroup data={buttons} alignment={introAlignment} size="lg" />
          </div>
        )}
      </div>
      {showBottomSeparator && <SectionSeparator />}
    </section>
  );
};
