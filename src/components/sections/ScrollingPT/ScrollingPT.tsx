"use client";
import React, { useState } from "react";
import Image from "next/image";
import classNames from "classnames";
import Section from "@/components/elements/Section/Section";
import FeatureContentItem from "@/components/elements/FeatureContentItem/FeatureContentItem";
import { ButtonVariant } from "@/utils/types";

const sections = [
  {
    label: "",
    title: "Start conversations, win loyal customers",
    subtitle: "",
    content:
    "Chat with customers. Solve their problems in real time. Offer custom discounts based on browsing history. And make product recommendations based on their behavior.",
    media: {
      type: "image",
      src: "https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/f1.webp",
    },
    url: ""
  },
  {
    label: "",
    title: "Automate answers and workflows in minutes",
    subtitle: "",
    content:
    "Automate up to 47% of repetitive answers about shipping, order status, or product availability so your agents can advise on complex topics.",
    media: {
      type: "image",
      src: "https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/f2.webp",
    },
    url: ""
  },
  {
    label: "",
    title: "Turn visitors into paying customers",
    subtitle: "",
    content:
    "Make the most of your website traffic with sales chatbots designed to boost your revenue by 10-25%.",
    media: {
      type: "image",
      src: "https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/f3.webp",
    },
    url: ""
  },
];

interface SectionProps {
  label?: string
  title: string
  subtitle?: string
  content: string
  media: {
    type: string
    src: string
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
    sections: Array<SectionProps>
  }
}

const ScrollingPT: React.FC<ScrollingPTProps> = ({ data }) => {
  const { title, subtitle, sections } = data
  const [visibleIdx, setVisibleIdx] = useState(0);

  return (
    <Section title={title} subtitle={subtitle}>
      {/* FOR MOBILE, TABLETS */}
      <div className="xl:hidden">
        {sections.map((section, idx) => (
          <div key={section.title} className="mb-20">
            <div className="mb-10">
              <h3 className="font-semibold text-3xl lg:text-4xl leading-snug mb-6">
                {section.title}
              </h3>
              <p className="text-base md:text-lg lg:text-xl leading-relaxed">
                {section.content}
              </p>
            </div>
            <div className="md:w-3/5 mx-auto">
              <Image
                className="w-full object-cover"
                src={section.media.src}
                alt={section.title}
                width={500}
                height={500}
              />
            </div>
          </div>
        ))}
      </div>

      {/* FOR DESKTOP */}
      <div className="hidden xl:flex">
        <div className="relative w-3/5">
          <div className="sticky top-20">
            <div className="relative h-[80vh]">
              {sections.map((section, idx) => (
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
                  <Image
                    className="h-full w-auto object-cover"
                    src={section.media.src}
                    alt={section.title}
                    width={500}
                    height={500}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="w-2/5 flex flex-col">
          {sections.map((section, idx) => (
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
