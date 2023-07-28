'use client'
import Section from "@/components/elements/Section/Section";
import Button, { ButtonVariant } from "@/components/elements/Button/Button"
import Image from "next/image";
import Carousel from "@/components/elements/Carousel/Carousel";
import classNames from "classnames";

interface CarouselPTProps {
  data: {
    label?: string
    title: string
    subtitle: string
    sections: Array<{
      id: string
      media: {
        type: string
        src: string
      }
      content?: {
        title: string
        label?: string
        subtitle?: string
        body: string
        button?: {
          url: string
          text: string
          type: ButtonVariant
        }
      }
    }>
  }
  aspectRatio?: "video" | "square" | "3/4" | "4/3" | "3/2"
}

const CarouselPT: React.FC<CarouselPTProps> = ({ data, aspectRatio }) => {
  const { label, title, subtitle, sections } = data
  return (
    <Section
      label={label}
      title={title}
      subtitle={subtitle}
    >
      <Carousel
        effect="fade"
        pagination={false}
        slides={sections.map((section) => (
          <div key={section.id} className={classNames("h-full grid gap-x-16 gap-y-5 bg-white px-5 md:px-10 lg:px-14", { "lg:grid-cols-2": section.content})}>
            {section.content && (
              <div className="flex flex-col justify-center lg:py-10">
                <h3 className="text-3xl lg:text-4xl leading-snug lg:leading-snug font-bold max-w-4xl mb-5">
                  {section.content?.title}
                </h3>
                <p className="text-slate-600 text-lg block mb-3">
                  {section.content?.body}
                </p>
                {section.content?.button &&
                  <Button variant={section.content.button.type} url={section.content.button.url}>
                    {section.content.button.text}
                  </Button>
                }
              </div>
            )}
            <div>
              <Image
                className={classNames(
                  "w-full h-full object-cover",
                )}
                src={section.media?.src ?? ""}
                alt="Teacher Training"
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
