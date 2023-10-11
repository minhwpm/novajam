'use client'
import Section from "@/components/elements/Section/Section";
import Button from "@/components/elements/Button/Button"
import Carousel from "@/components/elements/Carousel/Carousel";
import classNames from "classnames";
import { PresentationType } from "@/utils/types";
import RichText from "@/components/elements/RichText/RichText";
import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai";
import { MediaCarousel } from "@/components/elements/MediaCarousel/MediaCarousel";

const CarouselPT: React.FC<{ data: PresentationType }> = ({ data }) => {
  const { label, title, subtitle, content } = data
  return (
    <Section
      label={label}
      title={title}
      subtitle={subtitle}
    >
      <div className="relative">
        <Carousel
          effect="fade"
          navigation={{
            enabled: true,
            nextEl: '.custom-swiper-btn-next',
            prevEl: '.custom-swiper-btn-prev'
          }}
          slides={content.map((section) => (
            <div key={section.id} className={classNames(
              "h-full grid grid-cols-2 gap-x-16 gap-y-5 bg-white px-5 md:px-20 lg:px-24"
            )}>
              <div className={classNames(
                "flex flex-col lg:py-10 mx-auto col-span-2 lg:col-span-1",
                { "lg:col-span-2": section.media?.length === 0}
              )}>
                <div className="flex items-center justify-center gap-8 py-6 lg:hidden">
                  <AiOutlineArrowLeft className="custom-swiper-btn-prev cursor-pointer" size={40} />
                  <AiOutlineArrowRight className="custom-swiper-btn-next cursor-pointer" size={40} />
                </div>
                <h3 className="text-2xl lg:text-3xl leading-snug lg:leading-snug font-bold max-w-4xl">
                  {section.title}
                </h3>
                <div className="mt-5 prose lg:prose-lg">
                  <RichText htmlString={section.content} />
                </div>
                <div className="self-end mt-8">
                  <Button key={section.ctaButton?.id} variant={section.ctaButton?.buttonVariant} url={section.ctaButton?.url}>
                    {section.ctaButton?.text}
                  </Button>
                </div>
              </div>
              { section.media?.length > 0 &&  
                <div className="col-span-2 row-start-1 lg:col-span-1 lg:row-start-auto">
                  <MediaCarousel data={section.media} /> 
                </div>
              }
            </div>
          ))}
        >
          <AiOutlineArrowLeft className="custom-swiper-btn-prev cursor-pointer absolute left-0 top-1/2 -translate-y-1/2 z-10 hidden lg:block" size={40} />
          <AiOutlineArrowRight className="custom-swiper-btn-next cursor-pointer absolute right-0 top-1/2 -translate-y-1/2 z-10 hidden lg:block" size={40} />
        </Carousel>
      </div>
    </Section>
  )
}
export default CarouselPT;
