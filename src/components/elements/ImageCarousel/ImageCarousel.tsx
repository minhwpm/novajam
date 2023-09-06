import Image from "next/image";
import Carousel from "../Carousel/Carousel";

interface ImageSliderProps {
  images: Array<{
    url: string
    title: string
    width: number
    height: number
  }>
  thumbsEnable?: boolean
}

const ImageCarousel: React.FC<ImageSliderProps> = ({ images, thumbsEnable = false }) => {
  return (
    <Carousel
      thumbsEnable={thumbsEnable}
      pagination={{
        type: 'fraction',
      }}
      slides={images.map((image, idx) => (
        <div key={idx} className="aspect-3/2">
          <Image
            className="w-full h-full object-contain bg-slate-50"
            src={image.url}
            alt={image.title}
            width={image.width}
            height={image.height}
          />
        </div>
      ))}
    />
  )
}

export default ImageCarousel