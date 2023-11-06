import Section from "@/components/elements/Section/Section"
import { GalleryType } from "@/helpers/types"
import Image from "next/image"

interface Props {
  data: GalleryType
}

export const Gallery: React.FC<Props> = ( { data }) => {
  const { heading, label, subtitle, content } = data
  return (
    <Section
      title={heading}
      label={label}
      subtitle={subtitle}
    >
      <div className="w-full columns-1 md:columns-2 gap-5 lg:columns-3">
        {content.map(item => (
          <div key={item.id} className="mb-5">
            <Image
              className="w-full h-full object-cover rounded-assets"
              src={item.url}
              alt={item.title}
              width={item.width}
              height={item.height}
            />
          </div>
        ))}
      </div>
    </Section>
  )
}