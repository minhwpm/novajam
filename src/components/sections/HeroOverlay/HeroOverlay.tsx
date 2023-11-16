/* 
Created by minhwpm (minhhien134@gmail.com) 
Layout: Overlay
*/

import classNames from "classnames";
import Button from "@/components/elements/Button/Button";
import { HeroType } from "@/helpers/types";
import RichText from "@/components/elements/RichText/RichText";
import Carousel from "@/components/elements/Carousel/Carousel";
import { MediaItem } from "@/components/elements/MediaItem/MediaItem";
import { MediaCarousel } from "@/components/elements/MediaCarousel/MediaCarousel";

const HeroC: React.FC<{ data: HeroType }> = ({ data }) => {
  const { content } = data;
  return (
    <section className={classNames("relative")} >
      <Carousel
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          enabled: true,
          clickable: true
        }}
        loop={true}
        slides={content.map(section => (
          <div key={section.id} className="relative w-screen h-screen">
            <div className={classNames("w-full h-full",
              { "bg-gradient-to-bl from-primary-800 via-primary-600 to-primary-500" : section.media.length === 0 }
            )}>
              {section.media.length === 1 && <MediaItem data={section.media[0]} videoAutoplay={true} />}
              {section.media.length > 1 && <MediaCarousel data={section.media} videoAutoplay={true} />}
            </div>
            {(section.heading || section.content || section.buttons.length) && (
              <div
                className={classNames(
                  "absolute text-white px-8 py-12 drop-shadow-lg top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full lg:w-2/3 flex flex-col justify-center text-center"
                )}
              >
                {section.label && (
                  <div className="tracking-widest font-semibold">
                    {section.label}
                  </div>
                )}
                {section.heading && (
                  <div className="text-super-heading leading-tight font-heading max-w-3xl mx-auto">
                    <RichText htmlString={section.heading} />
                  </div>
                )}
                {section.content && (
                  <div className="block text-lg lg:text-2xl font-semibold mt-5">
                    <RichText htmlString={section.content} />
                  </div>
                )}
                <div
                  className={classNames(
                    "flex flex-row flex-wrap gap-6 mt-12 justify-center"
                  )}
                >
                  {section.buttons.length > 0 &&
                    section.buttons.map((button) => (
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
            )}
          </div>
        ))}
      />
    </section>
  );
};

export default HeroC;
