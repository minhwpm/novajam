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
import Container from "@/components/elements/Container/Container";

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
    <section ref={ref}>
      <Container className="flex flex-col lg:flex-row items-center lg:max-h-screen mb-12">
        <div className="flex flex-col items-center lg:items-start py-12 lg:w-5/12 lg:pr-16">
          <div
            className={classNames(
              "uppercase font-semibold text-primary-600 tracking-widest text-center lg:text-start",
              animationClasses
            )}
          >
            {label}
          </div>
          <h1
            className={classNames(
              "font-heading text-4xl md:text-5xl md:leading-snug max-w-4xl text-center lg:text-start leading-snug font-bold mt-2",
              animationClasses
            )}
          >
            <RichText htmlString={heading} />
          </h1>
          {content && (
            <div
              className={classNames(
                "mt-6 prose lg:prose-lg xl:prose-xl",
                animationClasses
              )}
            >
              <RichText htmlString={content} />
            </div>
          )}
          <div
            className={classNames(
              "flex flex-row flex-wrap gap-6 mt-6 lg:mt-10",
              animationClasses
            )}
          >
            {buttons &&
              buttons.length > 0 &&
              buttons.map((button) => (
                <Button
                  key={button.text}
                  variant={button.buttonVariant}
                  size="lg"
                  url={button.url}
                >
                  {button.text}
                </Button>
              ))}
          </div>
        </div>
        <div className="lg:w-7/12">
          {media?.map((item) => (
            <div key={item.url}>
              {item?.contentType.includes("image") && (
                <Image
                  className={classNames("w-full object-cover rounded-assets", animationClasses)}
                  src={item.url}
                  alt={item.title}
                  width={500}
                  height={400}
                  priority={true}
                />
              )}
              {item?.contentType === "video" && (
                <video
                  className={classNames(animationClasses, "w-full object-cover rounded-assets")}
                  src={item.url}
                >
                  <track kind="captions" label={item.title} />
                </video>
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default HeroB
