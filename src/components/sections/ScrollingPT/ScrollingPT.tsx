"use client";
import React, { useState } from "react";
import Image from "next/image";
import classNames from "classnames";
import Section from "@/components/elements/Section/Section";
import FeatureContentItem from "@/components/elements/FeatureContentItem/FeatureContentItem";
import { ButtonVariant } from "@/utils/types";

interface SectionProps {
  label?: string
  title: string
  subtitle?: string
  content: string
  media: {
    contentType: string
    title: string
    url: string
  }
  button?: {
    url: string
    text: string
    type: ButtonVariant
  }
}

interface ScrollingPTProps {
  data: {
    title: string
    subtitle: string
    content?: Array<SectionProps>
  }
}

const ScrollingPT: React.FC<ScrollingPTProps> = ({ data }) => {
  const { title, subtitle, content } = data
  const [visibleIdx, setVisibleIdx] = useState(0);

  return (
    <Section title={title} subtitle={subtitle}>
      {/* FOR MOBILE, TABLETS */}
      <div className="xl:hidden">
        {content?.map((section) => (
          <div key={section.title} className="mb-20">
            <div className="mb-10">
              <h3 className="font-semibold text-3xl lg:text-4xl leading-snug mb-6">
                {section.title}
              </h3>
              <p className="text-base md:text-lg lg:text-xl leading-relaxed">
                {/* {section.content} */}
              </p>
            </div>
            <div className="md:w-3/5 mx-auto">
              {section.media && 
                <Image
                  className="w-full object-cover"
                  src={section.media.url}
                  alt={section.title}
                  width={500}
                  height={500}
                />
              }
            </div>
          </div>
        ))}
      </div>

      {/* FOR DESKTOP */}
      <div className="hidden xl:flex">
        <div className="relative w-3/5">
          <div className="sticky top-20">
            <div className="relative h-[80vh]">
              {content?.map((section, idx) => (
                <div
                  key={section.title}
                  className={classNames(
                    "transition-opacity duration-300",
                    {
                      "is-visible opacity-100 h-full overflow-visible ":
                        visibleIdx === idx,
                    },
                    {
                      "is-invisible h-0 opacity-10 max-h-full relative overflow-hidden":
                        visibleIdx !== idx,
                    }
                  )}
                >
                  {section.media && 
                    <Image
                      className="h-full w-auto object-cover"
                      src={section.media.url}
                      alt={section.media.title}
                      width={500}
                      height={500}
                    />
                  }
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="w-2/5 flex flex-col">
          {content?.map((section, idx) => (
            <FeatureContentItem
              key={section.title}
              section={section}
              idx={idx}
              setVisibleIdx={setVisibleIdx}
            />
          ))}
        </div>
      </div>
    </Section>
  );
};

export default ScrollingPT;
