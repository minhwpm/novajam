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
  const { content } = data;
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
        <Carousel
          autoplay={{
            delay: 2500,
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
              className={classNames("flex flex-col lg:flex-row items-center")}
            >
              <div className="flex flex-col justify-center gap-2 lg:pr-10 py-10">
                <div
                  className={classNames(
                    "font-semibold text-primary-600 tracking-widest text-center lg:text-start",
                    animationClasses
                  )}
                >
                  {section.label}
                </div>
                <div
                  className={classNames(
                    "text-4xl lg:text-5xl !leading-snug font-heading font-bold max-w-3xl mx-auto text-center lg:text-start",
                    animationClasses
                  )}
                >
                  <RichText htmlString={section.heading} />
                </div>
                {section.content && (
                  <div
                    className={classNames(
                      "prose-lg lg:prose-xl mt-3",
                      animationClasses
                    )}
                  >
                    <RichText htmlString={section.content} />
                  </div>
                )}
                {section.buttons.length > 0 && (
                  <div
                    className={classNames(
                      "flex flex-row flex-wrap gap-6 mt-5 justify-center lg:justify-start",
                      animationClasses
                    )}
                  >
                    {section.buttons.map((button) => (
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
        {/* <div className="flex flex-col items-center lg:items-start py-12 lg:w-5/12 lg:pr-16">
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
        </div> */}
      </Container>
    </section>
  );
};

export default HeroB
