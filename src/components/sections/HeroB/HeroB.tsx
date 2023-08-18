/* 
Created by minhwpm (minhhien134@gmail.com)
Feature Row (Text | Media) Hero section
 */
'use client';
import SlidingText from "@/components/elements/SlidingText/SlidingText"
import Button from "@/components/elements/Button/Button";
import classNames from "classnames";
import { useState } from "react";
import { useInView } from "react-hook-inview";
import Image from 'next/image';
import { ButtonVariant } from "@/utils/types";
import RichText from "@/components/elements/RichText/RichText";

interface Props {
  data: {
    id: string
    label?: string
    title: string
    spotlightTexts?: Array<string>
    content?: string
    buttons: Array<
      {
        text: string
        type: ButtonVariant
        url?: string
      }
    >
    media: Array<{
      contentType: string
      url: string
      title: string
    }>
  }
}

const HeroB: React.FC<Props> = ({ data }) => {
  const { label, title, spotlightTexts, content, buttons, media } = data;
  const [animated, setAnimated] = useState(false);
  const [ref, isVisible] = useInView({
    threshold: 0.3,
    onEnter: () => {
      // @TODO technical debt
      setTimeout(() => {
        setAnimated(true);
      }, 500);
    },
  });

  const animationClasses = classNames(
    { invisible: !animated },
    { visible: animated },
    { "animate-animationA delay-1000": isVisible && !animated }
  );

  return (
    <section
      ref={ref}
      className="px-4 lg:px-32 flex flex-col-reverse lg:flex-row gap-5 items-center lg:min-h-screen"
    >
      <div className="lg:w-5/12">
        <div
          className={classNames(
            "uppercase font-semibold text-primary-600 tracking-widest",
            animationClasses
          )}
        >
          {label}
        </div>
        <h1
          className={classNames(
            "font-heading text-4xl leading-snug md:text-5xl md:leading-snug font-bold mt-2",
            animationClasses
          )}
        >
          {title}
          {spotlightTexts && <SlidingText content={spotlightTexts}/>}
        </h1>
        {content && 
          <div className={classNames("mt-6 md:text-lg", animationClasses)}>
            <RichText htmlString={content} />
          </div>
        }
        <div className={classNames("flex flex-row flex-wrap gap-6 mt-10", animationClasses)}>
          {buttons && buttons.length > 0 && buttons.map(button => (
            <Button key={button.text} variant={button.type} size="lg" url={button.url}>
              {button.text}
            </Button>
          ))}
        </div>
      </div>
      <div className="lg:w-7/12">
        {media?.map(item => (
          <div key={item.url}>
            {item?.contentType.includes("image") && (
              <Image
                className={classNames("w-full object-cover", animationClasses)} 
                src={item.url}
                alt={item.title}
                width={500}
                height={400}
                priority={true}
              />
            )}
            {item?.contentType === "video" && (
              <video className={classNames(animationClasses)} src={item.url} />
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default HeroB
