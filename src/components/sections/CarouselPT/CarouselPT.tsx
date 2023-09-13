'use client'
import Section from "@/components/elements/Section/Section";
import Button from "@/components/elements/Button/Button"
import Image from "next/image";
import Carousel from "@/components/elements/Carousel/Carousel";
import classNames from "classnames";
import { ButtonVariant } from "@/utils/types";
import RichText from "@/components/elements/RichText/RichText";

interface SectionProps {
  title: string
  label?: string
  subtitle?: string
  content: string
  media: {
    contentType: string
    url: string
    title: string
  }
  button?: {
    url: string
    text: string
    type: ButtonVariant
  }
}

interface CarouselPTProps {
  data: {
    label?: string
    title: string
    subtitle: string
    content: Array<SectionProps>
  }
  aspectRatio?: "video" | "square" | "3/4" | "4/3" | "3/2"
}

const CarouselPT: React.FC<CarouselPTProps> = ({ data, aspectRatio }) => {
  const { label, title, subtitle, content } = data
  return (
    <Section
      label={label}
      title={title}
      subtitle={subtitle}
    >
      <Carousel
        effect="fade"
        slides={content.map((section) => (
          <div key={section.title} className={classNames("h-full grid gap-x-16 gap-y-5 bg-white px-5 md:px-10 lg:px-14", { "lg:grid-cols-2": section.content})}>
            <div className="flex flex-col justify-center lg:py-10">
              <h3 className="text-3xl lg:text-4xl leading-snug lg:leading-snug font-bold max-w-4xl mb-5">
                {section.title}
              </h3>
              <div className="text-slate-700 text-lg block mb-3">
                <RichText htmlString={section.content} />
              </div>
              {section.button &&
                <Button variant={section.button.type} url={section.button.url}>
                  {section.button.text}
                </Button>
              }
            </div>
            <div>
              <Image
                className={classNames(
                  "w-full h-full object-cover",
                )}
                src={section.media?.url ?? ""}
                alt={section.media?.title ?? ""}
                width={500}
                height={500}
              />
            </div>
          </div>
        ))}
      />
    </Section>
  )
}
export default CarouselPT;
