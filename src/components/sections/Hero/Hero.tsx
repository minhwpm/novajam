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
import RichText2 from "@/components/elements/RichText/RichText2";
import Container from "@/components/elements/Container/Container";
import Carousel from "@/components/elements/Carousel/Carousel";
import { MediaItem } from "@/components/elements/MediaItem/MediaItem";
import { MediaCarousel } from "@/components/elements/MediaCarousel/MediaCarousel";

interface Props {
  data: HeroType
}

const Hero: React.FC<Props> = ({ data }) => {
  const { content, layout, textAlignment } = data;
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
                { "items-center text-center": textAlignment === "center" },
                { "items-end text-end": textAlignment === "reverse" },
              )}>
                {section.label && (
                  <div
                    className={classNames(
                      "font-semibold text-primary-600 tracking-widest max-w-2xl",
                      animationClasses
                    )}
                  >
                    {section.label}
                  </div>
                )}
                {section.heading && (
                  <div
                    className={classNames(
                      "text-heading leading-normal font-heading max-w-3xl",
                      animationClasses
                    )}
                  >
                    <RichText2 data={section.heading} />
                  </div>
                )}
                {section.description && (
                  <div
                    className={classNames(
                      "prose-lg lg:prose-xl mt-3 max-w-2xl",
                      animationClasses
                    )}
                  >
                    <RichText2 data={section.description} />
                  </div>
                )}
                {section.buttons.length > 0 && (
                  <div
                    className={classNames(
                      "flex flex-row flex-wrap gap-6 mt-5",
                      { "justify-center": textAlignment === "center" },
                      { "justify-end": textAlignment === "reverse" },
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
                    <MediaItem data={section.media[0]} videoAutoplay={true} priority={true} />
                  )}
                  {section.media.length > 1 && (
                    <MediaCarousel data={section.media} videoAutoplay={true} priority={true} />
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

export default Hero
