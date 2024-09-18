'use client';
import classNames from 'classnames';
import { CTAType } from '@/helpers/types';
import { useInView } from 'react-hook-inview';
import { MarkdownRenderer } from '@/components/elements/MarkdownRenderer/MarkdownRenderer';
import { Form } from '@/components/elements/Form/Form';
import { ButtonGroup } from '@/components/elements/ButtonGroup/ButtonGroup';

export type FormValues = {
  [x: string]: string | Date;
};

export const CTA: React.FC<{ data: CTAType }> = ({ data }) => {
  const {
    htmlid,
    displayTitle,
    eyebrow,
    description,
    buttons,
    form,
    layout,
    backgroundColor,
    backgroundImage,
    darkMode,
  } = data;

  const [ref, isIntersecting] = useInView({
    threshold: 0.2,
    unobserveOnEnter: true,
  });

  return (
    <>
      <section
        id={htmlid ?? ''}
        className={classNames({
          'bg-center bg-no-repeat bg-cover bg-blend-multiply ': backgroundImage,
          'dark:bg-opacity-10': !darkMode && backgroundColor,
          'dark:bg-slate-900/90': !darkMode && backgroundImage,
          dark: darkMode,
          // "lg:bg-fixed": backgroundImage && parallaxBackground @TODO
        })}
        style={{
          backgroundImage: `url(${backgroundImage?.url})`,
          backgroundColor: backgroundColor ?? 'none',
        }}
      >
        <div
          ref={ref}
          className={classNames(
            'relative -bottom-10 opacity-0 container mx-auto px-4 flex gap-10 my-24 lg:my-28',
            {
              'flex-col lg:flex-row lg:justify-between':
                layout === 'side-by-side',
              'flex-col': layout === 'top-to-bottom',
              'animate-slidingUpContent animation-delay-150': isIntersecting,
            },
          )}
        >
          <div
            className={classNames('flex flex-col items-center basis-5/12', {
              'lg:items-start': layout === 'side-by-side',
              'flex-grow': buttons && !form,
            })}
          >
            {eyebrow && (
              <div
                className={classNames(
                  'text-sm lg:text-base tracking-widest text-center mb-2 text-secondary-600 dark:text-secondary-500',
                  {
                    'lg:text-start': layout === 'side-by-side',
                  },
                )}
              >
                {eyebrow}
              </div>
            )}
            {displayTitle && (
              <div
                className={classNames(
                  'font-heading text-heading text-center leading-snug dark:text-slate-100',
                  {
                    'lg:text-start': layout === 'side-by-side',
                  },
                )}
              >
                <MarkdownRenderer>{displayTitle}</MarkdownRenderer>
              </div>
            )}
            {description && (
              <div
                className={classNames(
                  'prose xl:prose-lg mt-8 text-slate-500 dark:text-slate-100/70 dark:prose-invert',
                  {
                    'lg:text-start': layout === 'side-by-side',
                  },
                )}
              >
                <MarkdownRenderer>{description}</MarkdownRenderer>
              </div>
            )}
          </div>
          <div
            className={classNames(
              'relative -bottom-10 opacity-0 flex items-center',
              {
                'items-center self-center': layout === 'top-to-bottom',
                'animate-slidingUpContent animation-delay-300': isIntersecting,
              },
            )}
          >
            {form && <Form data={form} darkMode={darkMode} />}
            {buttons && <ButtonGroup data={buttons} size="lg" />}
          </div>
        </div>
      </section>
    </>
  );
};
