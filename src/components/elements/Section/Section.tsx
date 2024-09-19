// Denotes a section of page content.
'use client';
import React from 'react';
import classNames from 'classnames';
import { Container } from '../Container/Container';
import {
  MediaType,
  TextAlignmentType,
  BackgroundColorType,
  ButtonType,
} from '@/helpers/types';
import { useInView } from 'react-hook-inview';
import { ButtonGroup } from '../ButtonGroup/ButtonGroup';
import { MarkdownRenderer } from '../MarkdownRenderer/MarkdownRenderer';

interface SectionProps {
  id?: string | null;
  eyebrow?: string | null;
  heading?: string | null;
  summary?: string | null;
  alignment?: TextAlignmentType;
  buttons?: Array<ButtonType>;
  className?: string;
  framed?: boolean;
  backgroundColor?: BackgroundColorType | null;
  backgroundImage?: MediaType | null;
  darkMode?: boolean;
  sectionSeparator?: Array<string> | null;
  children: React.ReactNode;
}

export const Section: React.FC<SectionProps> = ({
  id,
  heading,
  eyebrow,
  summary,
  buttons,
  alignment,
  className,
  framed = true,
  backgroundColor,
  backgroundImage,
  darkMode,
  sectionSeparator,
  children,
}) => {
  const [ref, isIntersecting] = useInView({
    threshold: 0.5,
    unobserveOnEnter: true,
  });

  const renderEyebrow = () =>
    eyebrow && (
      <div
        className={classNames(
          'text-sm xl:text-base tracking-widest mb-6 font-semibold text-secondary-600 dark:text-secondary-500',
          { 'text-center': alignment === 'center' },
          { 'text-end': alignment === 'end' },
        )}
      >
        {eyebrow}
      </div>
    );

  const renderHeading = () =>
    heading && (
      <div
        className={classNames(
          'font-heading text-heading leading-snug max-w-3xl mb-4 dark:text-slate-100',
          { 'text-center': alignment === 'center' },
          { 'text-end': alignment === 'end' },
        )}
      >
        <MarkdownRenderer>{heading}</MarkdownRenderer>
      </div>
    );

  const renderSummary = () =>
    summary && (
      <div
        className={classNames(
          'prose lg:prose-lg 2xl:prose-xl max-w-xl lg:max-w-3xl mb-4 text-slate-500 dark:text-slate-100/70',
          { 'text-center': alignment === 'center' },
          { 'text-end': alignment === 'end' },
        )}
      >
        <MarkdownRenderer>{summary}</MarkdownRenderer>
      </div>
    );

  const renderButtons = () =>
    buttons &&
    buttons.length > 0 && (
      <ButtonGroup data={buttons} alignment={alignment} size="base" />
    );

  const Separator = () => (
    <div
      role="separator"
      className={classNames(
        'container mx-auto border-t border-slate-200 dark:border-slate-800',
      )}
    />
  );

  return (
    <section
      id={id ?? ''}
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
        backgroundImage: `url(${backgroundImage?.url})`,
      }}
    >
      {sectionSeparator && sectionSeparator.includes('top') && <Separator />}
      <div
        className={classNames({
          'py-14 md:py-16 lg:py-18 xl:py-20 2xl:py-24': heading,
          'py-6 md:py-7 lg:py-8 xl:py-9 2xl:py-10': !heading,
        })}
      >
        <div
          ref={ref}
          className={classNames(
            'container mx-auto px-4 relative flex flex-col -bottom-10 opacity-0',
            {
              'animate-slidingUpContent animation-delay-150': isIntersecting,
            },
            { 'items-center': alignment === 'center' },
            { 'items-end': alignment === 'end' },
          )}
        >
          {renderEyebrow()}
          {renderHeading()}
          {renderSummary()}
          {renderButtons()}
        </div>
        {framed ? (
          <Container
            className={classNames({
              'mt-10': heading || eyebrow || summary,
            })}
          >
            {children}
          </Container>
        ) : (
          <div>{children}</div>
        )}
      </div>
      {sectionSeparator && sectionSeparator.includes('bottom') && <Separator />}
    </section>
  );
};
