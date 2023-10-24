/* 
Created by minhwpm (minhhien134@gmail.com)
Layout: Row (Text | Media) Hero section
 */
'use client';
import Button from "@/components/elements/Button/Button";
import classNames from "classnames";
import { useState } from "react";
import { useInView } from "react-hook-inview";
import Image from 'next/image';
import { HeroType } from "@/helpers/types";
import RichText from "@/components/elements/RichText/RichText";

interface Props {
  data: HeroType
}

const HeroB: React.FC<Props> = ({ data }) => {
  const { label, heading, content, buttons, media } = data;
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
      className="px-4 xl:px-32 py-16 flex flex-col gap-16 lg:flex-row lg:gap-0 items-center lg:max-h-screen"
    >
      <div className="flex flex-col items-center lg:items-start lg:w-6/12 lg:pr-16">
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
            "font-heading text-4xl md:text-5xl md:leading-snug max-w-4xl text-center lg:text-left leading-snug font-bold mt-2",
            animationClasses
          )}
        >
          <RichText htmlString={heading} />
        </h1>
        {content && 
          <div className={classNames("mt-6 prose lg:prose-lg xl:prose-xl", animationClasses)}>
            <RichText htmlString={content} />
          </div>
        }
        <div className={classNames("flex flex-row flex-wrap gap-6 mt-6 lg:mt-10", animationClasses)}>
          {buttons && buttons.length > 0 && buttons.map(button => (
            <Button key={button.text} variant={button.buttonVariant} size="lg" url={button.url}>
              {button.text}
            </Button>
          ))}
        </div>
      </div>
      <div className="lg:w-6/12">
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
              <video className={classNames(animationClasses, "w-full object-cover")} src={item.url}>
                <track kind="captions" label={item.title} />
              </video>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default HeroB
