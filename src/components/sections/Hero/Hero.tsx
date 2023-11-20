/* 
Created by minhwpm (minhhien134@gmail.com)
Layout: Row (Text | Media) Hero section
 */
'use client';
import Button from "@/components/elements/Button/Button";
import classNames from "classnames";
import { useState } from "react";
import { useInView } from "react-hook-inview";
import { HeroType } from "@/helpers/types";
import RichText from "@/components/elements/RichText/RichText";
import Container from "@/components/elements/Container/Container";
import Carousel from "@/components/elements/Carousel/Carousel";
import { MediaItem } from "@/components/elements/MediaItem/MediaItem";
import { MediaCarousel } from "@/components/elements/MediaCarousel/MediaCarousel";

interface Props {
  data: HeroType
}

const HeroB: React.FC<Props> = ({ data }) => {
  const { content, layout, alignment } = data;
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
      <Container className={classNames("flex mb-12")}>
        <Carousel
          autoplay={{
            delay: 4500,
            disableOnInteraction: false,
          }}
          pagination={{
            enabled: true,
            clickable: true,
          }}
          loop={true}
          slides={content.map((section) => (
            <div
              key={section.id}
              className={classNames("flex flex-col items-center",
                {"lg:flex-row max-h-screen": layout === "horizontal"}
              )}
            >
              <div className={classNames("flex flex-col gap-2 lg:pr-10 py-10",
                { "items-center text-center": alignment === "center" },
                { "items-end text-end": alignment === "reverse" },
              )}>
                <div
                  className={classNames(
                    "font-semibold text-primary-600 tracking-widest max-w-2xl",
                    animationClasses
                  )}
                >
                  {section.label}
                </div>
                <div
                  className={classNames(
                    "text-heading leading-normal font-heading max-w-3xl",
                    animationClasses
                  )}
                >
                  <RichText htmlString={section.heading} />
                </div>
                {section.content && (
                  <div
                    className={classNames(
                      "prose-lg lg:prose-xl mt-3 max-w-2xl",
                      animationClasses
                    )}
                  >
                    <RichText htmlString={section.content} />
                  </div>
                )}
                {section.buttons.length > 0 && (
                  <div
                    className={classNames(
                      "flex flex-row flex-wrap gap-6 mt-5",
                      { "justify-center": alignment === "center" },
                      { "justify-end": alignment === "reverse" },
                      animationClasses
                    )}
                  >
                    {section.buttons.map((button) => (
                      <Button
                        key={button.text}
                        variant={button.buttonVariant}
                        size="lg"
                        url={button.url}
                        openNewTab={button.openNewTab}
                      >
                        {button.text}
                      </Button>
                    ))}
                  </div>
                )}
              </div>
              {section.media.length > 0 && (
                <div className={classNames("lg:w-7/12 shrink-0", animationClasses)}>
                  {section.media.length === 1 && (
                    <MediaItem data={section.media[0]} videoAutoplay={true} />
                  )}
                  {section.media.length > 1 && (
                    <MediaCarousel data={section.media} videoAutoplay={true} />
                  )}
                </div>
              )}
            </div>
          ))}
        />
      </Container>
    </section>
  );
};

export default HeroB
