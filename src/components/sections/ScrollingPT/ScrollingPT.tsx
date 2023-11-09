"use client";
import React, { useState } from "react";
import classNames from "classnames";
import Section from "@/components/elements/Section/Section";
import FeatureContentItem from "@/components/elements/FeatureContentItem/FeatureContentItem";
import { PresentationType } from "@/helpers/types";
import { MediaCarousel } from "@/components/elements/MediaCarousel/MediaCarousel";
import RichText from "@/components/elements/RichText/RichText";

const ScrollingPT: React.FC<{ data: PresentationType }> = ({ data }) => {
  const { label, heading, subtitle, content } = data
  const [visibleIdx, setVisibleIdx] = useState(0);

  return (
    <Section label={label} heading={heading} subtitle={subtitle}>
      {/* FOR MOBILE, TABLETS */}
      <div className="xl:hidden">
        {content?.map((section) => (
          <div key={section.id} className="mb-20">
            <div className="mb-10">
              <h3 className="font-semibold text-3xl lg:text-4xl leading-snug mb-6">
                {section.heading}
              </h3>
              <div className="prose">
                <RichText htmlString={section.content} />
              </div>
            </div>
            <div className="md:w-3/5 mx-auto">
              {section.media?.length > 0 && 
                <MediaCarousel data={section.media} />
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
                  key={section.id}
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
                  {section.media?.length > 0 && 
                    <MediaCarousel data={section.media} />
                  }
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="w-2/5 flex flex-col">
          {content?.map((section, idx) => (
            <FeatureContentItem
              key={section.heading}
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
