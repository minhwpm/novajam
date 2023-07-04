'use client'

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Navigation, Pagination } from "swiper";
import 'swiper/css';
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Section from "@/components/elements/Section/Section";
import Button, { ButtonVariant } from "@/components/elements/Button/Button"
import GridBox from "@/components/elements/GridBox/GridBox";
import Image
 from "next/image";
interface SectionProps {
  title: string
  label?: string
  subtitle?: string
  content: string
  media: {
    type: string
    src: string
  }
  button?: {
    url: string
    text: string
    type: ButtonVariant
  }
}

interface CarouselPTProps {
  data: {
    title: string
    label?: string
    subtitle: string
    sections: Array<SectionProps>
  }
}

const CarouselPT: React.FC<CarouselPTProps> = ({ data }) => {
  const { label, title, subtitle, sections } = data
  return (
    <Section
      label={label}
      title={title}
      subtitle={subtitle}
    >
      <Swiper
        className="mySwiper w-full min-h-[500px]"
        spaceBetween={30}
        loop={true}
        effect={"fade"}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        modules={[EffectFade, Navigation, Pagination]}
      >
        {sections.map((section) => (
          <SwiperSlide key={section.title} className="bg-white px-5 md:px-10 lg:px-20">
            <GridBox columns={2} gap={9}>
              <div className="flex flex-col justify-center">
                <h3 className="text-3xl lg:text-4xl leading-snug lg:leading-snug font-bold max-w-4xl mb-5">
                  {section.title}
                </h3>
                <p className="text-slate-600 text-lg block mb-3">
                  {section.content}
                </p>
                {section.button &&
                  <Button variant={section.button.type} url={section.button.url}>
                    {section.button.text}
                  </Button>
                }
              </div>
              <div>
                <Image
                  className="w-full h-full object-cover"
                  src={section.media?.src ?? ""}
                  alt="Teacher Training"
                  width={500}
                  height={500}
                />
              </div>
            </GridBox>
          </SwiperSlide>
        ))}
      </Swiper>
    </Section>
  )
}
export default CarouselPT;
