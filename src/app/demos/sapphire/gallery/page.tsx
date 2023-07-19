
import Section from "@/components/elements/Section/Section"
import Masonry from "@/components/elements/Masonry/Masonry"

const defaultPageData = {
  sections: {
    imageGallery2: {
      label: "Hair Lookbook",
      title: "We Style & You Smile",
      subtitle: "We provide the best Beauty Care services that guarantees to keep your hair healthy and make it look fabulous",
      images: [
        {
          type: "image",
          src:"https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/demos/sapphire/hair-style-1.webp",
          altText: "Hair Style"
        },
        {
          type: "image",
          src:"https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/demos/sapphire/hair-style-2.webp",
          altText: "Hair Style"
        },
        {
          type: "image",
          src:"https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/demos/sapphire/hair-style-3.webp",
          altText: "Hair Style"
        },
        {
          type: "image",
          src: "https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/demos/sapphire/hair-style-4.webp",
          altText: "Hair Style"
        },
        {
          type: "image",
          src:"https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/demos/sapphire/hair-style-5.webp",
          altText: "Hair Style"
        },
        {
          type: "image",
          src:"https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/demos/sapphire/hair-style-6.webp",
          altText: "Hair Style"
        },
        {
          type: "image",
          src:"https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/demos/sapphire/hair-style-7.webp",
          altText: "Hair Style"
        },
        {
          type: "image",
          src: "https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/demos/sapphire/hair-style-8.webp",
          altText: "Hair Style"
        },
      ]
    },
  }
}

export default function Gallery() {

  const { imageGallery2 } = defaultPageData.sections
  return (
    <main className="flex flex-col min-h-screen pb-24">
      <Section>
        <Masonry items={imageGallery2.images} />
      </Section>
    </main>
  )
}
