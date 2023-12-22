/* Created by minhwpm (minhhien134@gmail.com) */
"use client";
import classNames from "classnames";
import { Button } from "@/components/elements/Button/Button";
import { HeroType } from "@/helpers/types";
import { RichText2 } from "@/components/elements/RichText/RichText2";
import Carousel from "@/components/elements/Carousel/Carousel";
import { MediaItem } from "@/components/elements/MediaItem/MediaItem";
import { MediaCarousel } from "@/components/elements/MediaCarousel/MediaCarousel";
import Container from "@/components/elements/Container/Container";
import { useIsLoaded } from "@/helpers/hooks/useIsLoaded";

export const HeroOverlay: React.FC<{ data: HeroType }> = ({ data }) => {
  const { content, textAlignment } = data;
  const isLoaded = useIsLoaded();

  return (
    <section className={classNames("relative")}>
      {/* @TODO refactor */}
      <Carousel
        autoplay={{
          delay: 5000,
        }}
        pagination={{
          enabled: true,
          clickable: true,
        }}
        navigation={{
          enabled: true,
        }}
        loop={true}
        slides={content.map((section) => (
          <div
            key={section.id}
            className={classNames("relative w-screen h-auto lg:min-h-max")}
          >
            <div
              className={classNames({
                "absolute w-full h-full lg:w-auto lg:static":
                  section.media.length > 0,
              })}
            >
              {section.media.length === 1 && (
                <MediaItem
                  data={section.media[0]}
                  dimensionBase="height"
                  videoAutoplay={true}
                  priority={true}
                  rounded="none"
                />
              )}
              {section.media.length > 1 && (
                <MediaCarousel
                  data={section.media}
                  dimensionBase="height"
                  videoAutoplay={true}
                  priority={true}
                  rounded="none"
                  autoplay={{
                    delay: 5000,
                  }}
                  navigation={{
                    enabled: false,
                  }}
                />
              )}
            </div>
            {(section.heading ||
              section.description ||
              section.buttons.length) && (
              <div
                className={classNames(
                  "w-full h-full px-4 pt-40 pb-20 text-white drop-shadow-lg overflow-hidden",
                  {
                    "bg-gradient-to-b from-primary-800 via-primary-500 to-primary-300":
                      section.media.length === 0,
                  },
                  {
                    "bg-neutral-900/20 lg:absolute lg:top-0 lg:left-0 ":
                      section.media.length > 0,
                  }
                )}
              >
                <Container
                  className={classNames(
                    "h-full flex flex-col justify-center bg-transparent",
                    { "items-center text-center": textAlignment === "center" },
                    { "items-end text-end": textAlignment === "reverse" }
                  )}
                >
                  {section.label && (
                    <div
                      className={classNames(
                        "relative",
                        { "-left-20 opacity-0": !isLoaded },
                        {
                          "opacity-100 left-0 transition-all duration-500 delay-200":
                            isLoaded,
                        },
                        "tracking-widest font-semibold lg:text-lg xl:text-xl max-w-2xl"
                      )}
                    >
                      {section.label}
                    </div>
                  )}
                  {section.heading && (
                    <div
                      className={classNames(
                        "relative",
                        { "-left-20 opacity-0": !isLoaded },
                        {
                          "opacity-100 left-0 transition-all ease-out duration-500 delay-300":
                            isLoaded,
                        },
                        "text-super-heading leading-[1.1] font-heading max-w-3xl mt-2"
                      )}
                    >
                      <RichText2 data={section.heading} />
                    </div>
                  )}
                  {section.description && (
                    <div
                      className={classNames(
                        "relative",
                        { "-left-20 opacity-0": !isLoaded },
                        {
                          "opacity-100 left-0 transition-all ease-out duration-500 delay-200":
                            isLoaded,
                        },
                        "prose-lg lg:prose-xl mt-10 max-w-2xl"
                      )}
                    >
                      <RichText2 data={section.description} />
                    </div>
                  )}
                  <div
                    className={classNames(
                      "flex flex-row flex-wrap gap-6 mt-12",
                      "relative",
                      { "-left-20 opacity-0": !isLoaded },
                      {
                        "opacity-100 left-0 transition-all ease-out duration-500 delay-500":
                          isLoaded,
                      },
                      { "justify-center": textAlignment === "center" },
                      { "justify-end": textAlignment === "reverse" }
                    )}
                  >
                    {section.buttons.length > 0 &&
                      section.buttons.map((button) => (
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
                </Container>
              </div>
            )}
          </div>
        ))}
      />
    </section>
  )
}