import Image from "next/image";
import Carousel from "../Carousel/Carousel";

interface ImageSliderProps {
  images: Array<{
    src: string
    altText: string
  }>
  thumbsEnable?: boolean
}

const ImageCarousel: React.FC<ImageSliderProps> = ({ images, thumbsEnable = false }) => {
  return (
    <Carousel
      pagination={true}
      thumbsEnable={thumbsEnable}
      slides={images.map((image, idx) => (
        <div key={idx}>
          <Image
            className="w-full h-full object-cover"
            src={image.src}
            alt={image.altText}
            width={500}
            height={500}
          />
        </div>
      ))}
    />
  )
}

export default ImageCarousel