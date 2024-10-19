'use client';
import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import * as RadixTabs from '@radix-ui/react-tabs';
import { Section } from '@/components/sections/Section/Section';
import { ContentPTType } from '@/helpers/types';
import { MarkdownRenderer } from '@/components/elements/MarkdownRenderer/MarkdownRenderer';
import { FlexibleContentMediaPart } from '@/components/elements/FlexibleContentMediaPart/FlexibleContentMediaPart';
import { ButtonGroup } from '@/components/elements/ButtonGroup/ButtonGroup';
import { useIntersecting } from '@/helpers/hooks/useIntersecting';
import './styles.css';

export const TabPT: React.FC<{ data: ContentPTType }> = ({ data }) => {
  const { displayTitle, presentationItems, alignment, itemAlignment } = data;
  const [justify, setJustify] = useState(alignment);
  const wrapperRef = useRef(
    null,
  ) as unknown as React.MutableRefObject<HTMLDivElement>;
  useEffect(() => {
    if (wrapperRef.current.scrollWidth > wrapperRef.current.clientWidth) {
      setJustify('start');
    }
  }, []);
  const [ref, isIntersecting] = useIntersecting();

  return (
    <Section framed={false} data={data}>
      <RadixTabs.Root
        ref={ref}
        className={classNames('w-full mt-6', 'relative -bottom-10 opacity-0', {
          'animate-slidingUpContent animation-delay-300': isIntersecting,
        })}
        defaultValue={
          presentationItems.length > 0 ? presentationItems[0].id : ''
        }
      >
        <div
          ref={wrapperRef}
          className={classNames('flex overflow-x-auto whitespace-nowrap', [
            `justify-${justify}`,
          ])}
        >
          <RadixTabs.List
            className={classNames('group/list TabList flex')}
            aria-label={displayTitle ?? ''}
          >
            <div
              className={classNames(
                'bg-slate-200 lg:bg-opacity-0 flex gap-x-0 gap-y-2 lg:gap-x-2 overflow-x-auto overscroll-contain rounded-theme bg-opacity-50 dark:bg-opacity-20',
              )}
            >
              {presentationItems.length > 0 &&
                presentationItems.map((item) => (
                  <RadixTabs.Trigger
                    key={item.id}
                    value={item.id}
                    className={classNames(
                      "group/trigger shrink-0 px-6 py-2 hover:bg-slate-200 flex flex-col justify-center items-center cursor-pointer rounded-theme-button hover:bg-opacity-90 data-[state='active']:bg-primary-600",
                    )}
                  >
                    {item.eyebrow && (
                      <div
                        className={classNames(
                          "text-sm tracking-widest font-medium group-hover/trigger:text-inherit group-data-[state='active']/trigger:text-primary-600/50 text-slate-500 dark:text-slate-100/70",
                        )}
                      >
                        {item.eyebrow}
                      </div>
                    )}
                    {item.displayTitle && (
                      <div
                        className={classNames(
                          "block font-semibold lg:text-lg group-hover/trigger:text-inherit group-data-[state='active']/trigger:text-slate-100 dark:text-slate-100",
                        )}
                      >
                        <MarkdownRenderer>{item.displayTitle}</MarkdownRenderer>
                      </div>
                    )}
                  </RadixTabs.Trigger>
                ))}
            </div>
          </RadixTabs.List>
        </div>
        <div className="mt-2 container grid">
          {presentationItems.map((item) => (
            <RadixTabs.Content
              key={item.id}
              value={item.id}
              className={classNames(
                "col-start-1 row-start-1 relative data-[state='active']:animate-fadeInSlideLeft",
                {
                  'text-center': itemAlignment === 'center',
                  'text-end': itemAlignment === 'end',
                },
              )}
            >
              <div className="flex flex-col-reverse lg:flex-row lg:items-center rounded-theme p-4 lg:p-8 -mx-4 lg:-mx-8">
                <div className="py-4 lg:pr-10 xl:pr-14">
                  {item.summary && (
                    <div
                      className={classNames(
                        'prose xl:prose-lg dark:text-slate-100',
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
                {item.media.length > 0 && (
                  <div className="lg:w-7/12 shrink-0">
                    <FlexibleContentMediaPart
                      data={item}
                      alignment={itemAlignment}
                    />
                  </div>
                )}
              </div>
            </RadixTabs.Content>
          ))}
        </div>
      </RadixTabs.Root>
    </Section>
  );
};
