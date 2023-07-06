/*
Created by minhwpm (minhhien134@gmail.com)
Carousel Hero section
 */
import Image from "next/image"
import Carousel from "@/components/elements/Carousel/Carousel"
import Button, { ButtonVariant } from "@/components/elements/Button/Button"
import classNames from "classnames";

interface HeroDProps {
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
}

const HeroD: React.FC<HeroDProps> = ({data}) => {
  const { title, subtitle, sections } = data
  return (
    <section>
      <Carousel
        effect="coverflow"
        pagination={true}
        aspectRatio="video"
        slides={(sections.map(section => (
          <div key={section.id}>
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
        )))}
      />
    </section>
  )
}