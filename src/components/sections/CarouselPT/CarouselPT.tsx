import Section from "@/components/elements/Section/Section";
import Button from "@/components/elements/Button/Button"
import Carousel from "@/components/elements/Carousel/Carousel";
import classNames from "classnames";
import { AspectRatioType, PresentationType } from "@/helpers/types";
import RichText2 from "@/components/elements/RichText/RichText2";
import { MediaCarousel } from "@/components/elements/MediaCarousel/MediaCarousel";
import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai";

const CarouselPT: React.FC<{ data: PresentationType }> = ({ data }) => {
  const { label, heading, subheading, content, alignment } = data
  return (
    <Section
      label={label}
      heading={heading}
      subheading={subheading}
    >
      <div className="relative">
        <Carousel
          effect="fade"
          navigation={{
            enabled: true,
            nextEl: '.carouselPT-btn-next',
            prevEl: '.carouselPT-btn-prev'
          }}
          pagination={{
            enabled: true,
            clickable: true,
          }}
          loop={true}
          slides={content.map((section) => (
            <div key={section.id} className={classNames(
              "h-full flex flex-col-reverse lg:flex-row lg:items-center gap-x-16 gap-y-5 bg-neutral-50 px-5 pt-5 pb-10 md:px-10 md:pt-10 lg:px-16 lg:pt-12 lg:pb-12 rounded-assets"
            )}>
              {(section.heading || section.description || section.buttons) && (
                <div className={classNames(
                  "flex flex-col",
                  { "text-center": alignment === "center" },
                  { "text-end": alignment === "reverse" }
                )}>
                  <div className="flex items-center justify-center gap-8 py-6 lg:hidden">
                    <AiOutlineArrowLeft className="carouselPT-btn-prev cursor-pointer" size={40} />
                    <AiOutlineArrowRight className="carouselPT-btn-next cursor-pointer" size={40} />
                  </div>
                  <div className={classNames("text-sm font-semibold text-neutral-500 tracking-widest")}>
                    {section.label}
                  </div>
                  {section.heading && (
                    <div className="text-2xl lg:text-3xl leading-snug lg:leading-snug font-bold max-w-4xl">
                      <RichText2 data={section.heading} />
                    </div>
                  )}
                  {section.description && (
                    <div className="mt-5 prose lg:prose-lg">
                      <RichText2 data={section.description} />
                    </div>
                  )}
                  {section.buttons && section.buttons.length > 0 && (
                    <div
                      className={classNames("mt-8", {
                        "flex justify-center": alignment === "center",
                      })}
                    >
                      {section.buttons.map(button => (
                        <Button
                          key={button.id}
                          url={button.url}
                          variant={button.buttonVariant}
                          openNewTab={button.openNewTab}
                        >
                          {button.text}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              )}
              { section.media?.length > 0 &&  
                <div className={classNames(
                  { "lg:w-1/2 shrink-0 ": (section.heading || section.description) },
                  { "w-full": (!section.heading && !section.description) },
                )}>
                  <MediaCarousel 
                    data={section.media} 
                    aspectRatio={classNames(
                      { "4/3": (section.heading || section.description) },
                      { "video": (!section.heading && !section.description) }
                    ) as AspectRatioType } 
                    autoplay={{
                      delay: 5000,
                    }}
                    navigation={{
                      enabled: false,
                    }}
                  /> 
                </div>
              }
            </div>
          ))}
        >
          <div className="carouselPT-btn-prev cursor-pointer absolute left-0 top-1/2 -translate-y-1/2 z-10 hidden lg:flex justify-center items-center rounded-assets w-14 h-14 hover:bg-neutral-200 transition-colors duration-300 ease-in-out">
            <AiOutlineArrowLeft size={35} />
          </div>
          <div className="carouselPT-btn-next cursor-pointer absolute right-0 top-1/2 -translate-y-1/2 z-10 hidden lg:flex justify-center items-center rounded-assets w-14 h-14 hover:bg-neutral-200 transition-colors duration-300 ease-in-out">
            <AiOutlineArrowRight size={35} />
          </div>
        </Carousel>
      </div>
    </Section>
  )
}
export default CarouselPT;
