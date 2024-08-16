"use client"
import React, { useEffect, useRef, useState } from 'react';
import classNames from "classnames";
import * as RadixTabs from '@radix-ui/react-tabs';
import { Section } from '@/components/elements/Section/Section';
import { ContentPTType } from '@/lib/types';
import { RichText } from "@/components/elements/RichText/RichText"
import { FlexibleContentMediaPart } from '@/components/elements/FlexibleContentMediaPart/FlexibleContentMediaPart';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { useInView } from 'react-hook-inview';
import { ButtonGroup } from '@/components/elements/ButtonGroup/ButtonGroup';
import "@/app/styles/bg-color.css";
import "./styles.css"

export const TabPT: React.FC<{ data: ContentPTType }> = ({data}) => {
  const { htmlid, eyebrow, heading, summary, content, headingTextAlignment, contentTextAlignment, backgroundColor, backgroundImage, darkMode } = data
  const [justify, setJustify] = useState(headingTextAlignment)
  const wrapperRef = useRef(null) as unknown as React.MutableRefObject<HTMLDivElement>
  useEffect(() => {
    if (wrapperRef.current.scrollWidth > wrapperRef.current.clientWidth) {
      setJustify("start")
    }
  }, [])
  const [ref, isIntersecting] = useInView({
    threshold: 0.4,
    unobserveOnEnter: true,
  });
  return (
    <Section
      id={htmlid}
      eyebrow={eyebrow}
      heading={heading}
      summary={summary}
      alignment={headingTextAlignment}
      framed={false}
      backgroundColor={backgroundColor}
      backgroundImage={backgroundImage}
      darkMode={darkMode}
    >
      <RadixTabs.Root
        ref={ref}
        className={classNames("w-full mt-6", "relative -bottom-10 opacity-0", {
          "animate-slidingUpContent animation-delay-300": isIntersecting,
        })}
        defaultValue={content.length > 0 ? content[0].id : ""}
      >
        <div
          ref={wrapperRef}
          className={classNames("flex overflow-x-auto whitespace-nowrap", [
            `justify-${justify}`,
          ])}
        >
          <RadixTabs.List
            className={classNames("group/list TabList flex")}
            aria-label={heading ? documentToHtmlString(heading) : undefined}
          >
            <div
              className={classNames(
                "bg-neutral-200 lg:bg-opacity-0 flex gap-x-0 gap-y-2 lg:gap-x-2 overflow-x-auto overscroll-contain rounded-theme",
                { "bg-opacity-50": !darkMode },
                { "bg-opacity-20": darkMode }
              )}
            >
              {content.length > 0 &&
                content.map((section) => (
                  <RadixTabs.Trigger
                    key={section.id}
                    value={section.id}
                    className={classNames(
                      "group/trigger shrink-0 px-6 py-2 hover:bg-neutral-200 flex flex-col justify-center items-center cursor-pointer rounded-theme-button hover:bg-opacity-90 data-[state='active']:bg-primary-600"
                    )}
                  >
                    {section.eyebrow && (
                      <div
                        className={classNames(
                          "text-sm tracking-widest font-medium group-hover/trigger:text-neutral-800 group-data-[state='active']/trigger:text-primary-100",
                          { "text-neutral-500": !darkMode },
                          { "text-neutral-200": darkMode }
                        )}
                      >
                        {section.eyebrow}
                      </div>
                    )}
                    {section.heading && (
                      <div
                        className={classNames(
                          "block font-semibold lg:text-lg group-hover/trigger:text-neutral-800 group-data-[state='active']/trigger:text-neutral-50",
                          { "text-neutral-600": !darkMode },
                          { "text-neutral-50": darkMode }
                        )}
                      >
                        <RichText data={section.heading} />
                      </div>
                    )}
                  </RadixTabs.Trigger>
                ))}
            </div>
          </RadixTabs.List>
        </div>
        <div className="mt-2 container px-4 mx-auto grid">
          {content.map((section) => (
            <RadixTabs.Content
              key={section.id}
              value={section.id}
              className={classNames(
                "col-start-1 row-start-1 relative data-[state='active']:animate-fadeInSlideLeft",
                { "text-center": contentTextAlignment === "center" },
                { "text-end": contentTextAlignment === "end" }
              )}
            >
              <div className="flex flex-col-reverse lg:flex-row lg:items-center rounded-theme p-4 lg:p-8 -mx-4 lg:-mx-8">
                <div className="py-4 lg:pr-10 xl:pr-14">
                  {section.description && (
                    <div
                      className={classNames("prose xl:prose-lg", {
                        "text-neutral-100": darkMode,
                      })}
                    >
                      <RichText data={section.description} />
                    </div>
                  )}
                  {section.buttons && section.buttons.length > 0 && (
                    <div className={classNames("mt-8")}>
                      <ButtonGroup
                        data={section.buttons}
                        alignment={contentTextAlignment}
                      />
                    </div>
                  )}
                </div>
                {(section.media.length > 0 || section.embeddedMediaUrl) && (
                  <div className="lg:w-7/12 shrink-0">
                    <FlexibleContentMediaPart
                      data={section}
                      alignment={contentTextAlignment}
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
}