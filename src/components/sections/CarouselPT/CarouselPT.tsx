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
            <div key={section.id} className={classNames("h-full grid grid-cols-2 gap-x-16 gap-y-5 bg-white px-5 md:px-20 lg:px-24")}>
              <div className={classNames(
                "flex flex-col justify-center lg:py-10 mx-auto",
                { "col-span-2": section.media.length === 0}
              )}>
                <h3 className="text-3xl lg:text-4xl leading-snug lg:leading-snug font-bold max-w-4xl mb-5">
                  {section.title}
                </h3>
                <div className="text-slate-700 text-lg block mb-3 prose lg:prose-lg">
                  <RichText htmlString={section.content} />
                </div>
                {section.buttons.length > 0 && section.buttons.map(button => (
                  <Button key={button.id} variant={button.type} url={button.url}>
                    {button.text}
                  </Button>
                ))}
                <div className="flex items-center justify-center gap-8 py-6">
                  <AiOutlineArrowLeft className="custom-swiper-btn-prev cursor-pointer md:hidden" size={40} />
                  <AiOutlineArrowRight className="custom-swiper-btn-next cursor-pointer md:hidden" size={40} />
                </div>
              </div>
              {section.media.length > 0 && 
                <div className="">
                  <MediaCarousel data={section.media} />
                </div>
              }
            </div>
          ))}
        >
          <AiOutlineArrowLeft className="custom-swiper-btn-prev cursor-pointer absolute left-0 top-1/2 z-10 hidden md:block" size={40} />
          <AiOutlineArrowRight className="custom-swiper-btn-next cursor-pointer absolute right-0 top-1/2 z-10 hidden md:block" size={40} />
        </Carousel>
      </div>
    </Section>
  )
}
export default CarouselPT;
