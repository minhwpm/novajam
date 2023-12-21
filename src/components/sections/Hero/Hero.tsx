/*  Created by minhwpm (minhhien134@gmail.com) */
"use client";
import Button from "@/components/elements/Button/Button";
import classNames from "classnames";
import { HeroType } from "@/helpers/types";
import RichText2 from "@/components/elements/RichText/RichText2";
import Container from "@/components/elements/Container/Container";
import Carousel from "@/components/elements/Carousel/Carousel";
import { MediaItem } from "@/components/elements/MediaItem/MediaItem";
import { MediaCarousel } from "@/components/elements/MediaCarousel/MediaCarousel";
import { useIsLoaded } from "@/helpers/hooks/useIsLoaded";

const Hero: React.FC<{ data: HeroType }> = ({ data }) => {
  const { content, layout, textAlignment } = data;
  const isLoaded = useIsLoaded()

  return (
    <section>
      <Container className={classNames("flex mb-12")}>
        {/* @TODO refactor */}
        <Carousel
          autoplay={{
            delay: 5000,
          }}
          pagination={{
            enabled: true,
            clickable: true,
          }}
          loop={true}
          slides={content.map((section) => (
            <div
              key={section.id}
              className={classNames("flex flex-col items-center", {
                "lg:flex-row lg:max-h-screen": layout === "horizontal",
              })}
            >
              <div
                className={classNames(
                  "flex flex-col gap-2 lg:pr-10 py-16",
                  { "items-center text-center": textAlignment === "center" },
                  { "items-end text-end": textAlignment === "reverse" }
                )}
              >
                {section.label && (
                  <div
                    className={classNames(
                      "relative font-semibold text-primary-600 tracking-widest max-w-2xl",
                      { "-left-20 opacity-0": !isLoaded },
                      {
                        "opacity-100 left-0 transition-all duration-500 delay-200":
                          isLoaded,
                      }
                    )}
                  >
                    {section.label}
                  </div>
                )}
                {section.heading && (
                  <div
                    className={classNames(
                      "relative text-heading leading-tight font-heading max-w-3xl",
                      { "-left-20 opacity-0": !isLoaded },
                      {
                        "opacity-100 left-0 transition-all duration-500 delay-300":
                          isLoaded,
                      }
                    )}
                  >
                    <RichText2 data={section.heading} />
                  </div>
                )}
                {section.description && (
                  <div
                    className={classNames(
                      "relative prose-lg lg:prose-xl mt-3 max-w-2xl",
                      { "-left-20 opacity-0": !isLoaded },
                      {
                        "opacity-100 left-0 transition-all duration-500 delay-200":
                          isLoaded,
                      }
                    )}
                  >
                    <RichText2 data={section.description} />
                  </div>
                )}
                {section.buttons.length > 0 && (
                  <div
                    className={classNames(
                      "relative flex flex-row flex-wrap gap-6 mt-5",
                      { "justify-center": textAlignment === "center" },
                      { "justify-end": textAlignment === "reverse" },
                      { "-left-20 opacity-0": !isLoaded },
                      {
                        "opacity-100 left-0 transition-all duration-500 delay-500":
                          isLoaded,
                      }
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
                <div
                  className={classNames(
                    "relative w-full lg:w-7/12",
                    { "-left-20 opacity-0": !isLoaded },
                    {
                      "opacity-100 left-0 transition-all duration-500 delay-500":
                        isLoaded,
                    }
                  )}
                >
                  {section.media.length === 1 && (
                    <MediaItem
                      data={section.media[0]}
                      videoAutoplay={true}
                      priority={true}
                    />
                  )}
                  {section.media.length > 1 && (
                    <MediaCarousel
                      data={section.media}
                      videoAutoplay={true}
                      priority={true}
                      autoplay={{
                        delay: 5000,
                      }}
                      loop={true}
                      pagination={{
                        enabled: true,
                        clickable: true,
                      }}
                    />
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
