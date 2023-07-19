import Section from "@/components/elements/Section/Section"
import classNames from "classnames"
import Button, { ButtonVariant } from "@/components/elements/Button/Button"
import Image from "next/image"

interface ImageGalleryProps {
  data: {
    title: string
    label?: string
    subtitle?: string
    images: Array<{
      src: string
      altText: string
    }>
    button: {
      url: string
      text: string
      type: ButtonVariant
    }
  }
  imageAspectRatio?: "video" | "square" | "3/4" | "4/3" | "3/2"
}

const ImageGalleryA: React.FC<ImageGalleryProps> = ({ data, imageAspectRatio }) => {
  const { title, label, subtitle, images, button } = data
  return (
    <Section
      label={label}
      title={title}
      subtitle={subtitle}
    >
      <div className="grid grid-cols-4 gap-5">
        {images.map((item, idx) => (
          <Image
            key={idx}
            className={classNames("w-full h-full object-cover",
              { "aspect-video" : imageAspectRatio === "video"},
              { "aspect-square" : imageAspectRatio === "square"},
              { "aspect-3/4" : imageAspectRatio === "3/4"},
              { "aspect-4/3" : imageAspectRatio === "4/3"},
              { "aspect-3/2" : imageAspectRatio === "3/2"},
            )}
            src={item.src}
            alt={item.altText}
            width={500}
            height={750}
          />
        ))}
      </div>
      {button?.url && (
        <div className="my-6">
          <Button size="lg" variant={button.type ?? "outline"} url={button.url}>
            {button.text}
          </Button>
        </div>
      )}
    </Section>
  )
}

export default ImageGalleryA