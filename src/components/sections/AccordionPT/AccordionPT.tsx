'use client';
import classNames from 'classnames';
import * as RadixAccordion from '@radix-ui/react-accordion';
import { Section } from '@/components/sections/Section/Section';
import { ContentPTType } from '@/helpers/types';
import { MarkdownRenderer } from '@/components/elements/MarkdownRenderer/MarkdownRenderer';
import { FlexibleContentMediaPart } from '@/components/elements/FlexibleContentMediaPart/FlexibleContentMediaPart';
import { ButtonGroup } from '@/components/elements/ButtonGroup/ButtonGroup';
import { FaChevronDown } from 'react-icons/fa';
import { useIntersecting } from '@/helpers/hooks/useIntersecting';

export const AccordionPT: React.FC<{ data: ContentPTType }> = ({ data }) => {
  const { presentationItems, itemAlignment, darkMode } = data;
  const [ref, isIntersecting] = useIntersecting();
  return (
    <Section data={data}>
      <div
        ref={ref}
        className={classNames(
          'w-full flex flex-col gap-10 relative -bottom-10 opacity-0',
          {
            'animate-slidingUpContent animation-delay-300': isIntersecting,
          },
        )}
      >
        <RadixAccordion.Root
          type="multiple"
          className={classNames(
            'w-full lg:w-[800px] mx-auto flex flex-col items-start justify-center',
          )}
        >
          {presentationItems &&
            presentationItems.length > 0 &&
            presentationItems.map((item) => (
              <RadixAccordion.Item
                key={item.id}
                value={item.id}
                className={classNames(
                  'group w-full border-b border-slate-200 data-[state=closed]:hover:text-slate-100 dark:text-slate-100',
                )}
              >
                <RadixAccordion.Trigger asChild>
                  <div className="py-6 xl:py-8 cursor-pointer flex gap-3 data-[state=closed]:hover:text-primary-600 data-[state=open]:text-primary-600">
                    <div className="flex-1 flex flex-col">
                      {item.eyebrow && (
                        <div
                          className={classNames(
                            'text-sm font-medium tracking-widest text-slate-500 dark:text-slate-100/70',
                          )}
                        >
                          {item.eyebrow}
                        </div>
                      )}
                      {item.displayTitle && (
                        <div
                          className={classNames(
                            'text-xl xl:text-2xl dark:text-slate-100',
                          )}
                        >
                          <MarkdownRenderer>
                            {item.displayTitle}
                          </MarkdownRenderer>
                        </div>
                      )}
                    </div>
                    <FaChevronDown
                      size={20}
                      className={classNames(
                        'inline-block shrink-0 mt-1 transition-transform duration-500 group-data-[state=open]:rotate-180 dark:text-slate-100',
                      )}
                    />
                  </div>
                </RadixAccordion.Trigger>
                <RadixAccordion.Content
                  className={classNames(
                    'overflow-hidden data-[state=closed]:animate-accordionSlideUp data-[state=open]:animate-accordionSlideDown',
                    { 'text-center': itemAlignment === 'center' },
                    { 'text-end': itemAlignment === 'end' },
                  )}
                >
                  <div className="pb-8 xl:pb-10">
                    {item.media.length > 0 && (
                      <div className="max-w-xl mx-auto mt-10">
                        <FlexibleContentMediaPart
                          data={item}
                          alignment={itemAlignment}
                        />
                      </div>
                    )}
                    {item.summary && (
                      <div
                        className={classNames(
                          'prose xl:prose-lg max-w-none group-data-[state=closed]:text-transparent',
                          {
                            'text-slate-100': darkMode,
                          },
                        )}
                      >
                        <MarkdownRenderer>{item.summary}</MarkdownRenderer>
                      </div>
                    )}
                    {item.buttons && item.buttons.length > 0 && (
                      <div className={classNames('mt-8')}>
                        <ButtonGroup
                          data={item.buttons}
                          alignment={itemAlignment}
                        />
                      </div>
                    )}
                  </div>
                </RadixAccordion.Content>
              </RadixAccordion.Item>
            ))}
        </RadixAccordion.Root>
      </div>
    </Section>
  );
};
