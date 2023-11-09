import { AspectRatioType, MediaType } from "@/helpers/types"
import Carousel from "../Carousel/Carousel"
import { MediaItem } from "../MediaItem/MediaItem";
import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai";

export const MediaCarousel: React.FC<{ data: Array<MediaType>, aspectRatio?: AspectRatioType }> = ({data, aspectRatio = "auto"} ) => {
  return (
    <div className="relative">
      <Carousel
        effect="fade"
        loop={true}
        navigation={{
          enabled: true,
          nextEl: '.media-carousel-btn-next',
          prevEl: '.media-carousel-btn-prev'
        }}
        pagination={{
          enabled: true,
          type: "fraction",
        }}
        slides = { data.map((item) => (
          <MediaItem key={item.id} data={item} aspectRatio={aspectRatio} />
        ))}
      >
        <div className="media-carousel-btn-prev absolute right-2 bottom-4 z-10 cursor-pointer w-12 h-12 rounded-full bg-white bg-opacity-80 shadow items-center justify-center flex">
          <AiOutlineArrowLeft size={25} />
        </div>
        <div className="media-carousel-btn-next absolute right-2 bottom-20 z-10 cursor-pointer w-12 h-12 rounded-full bg-white bg-opacity-80 shadow items-center justify-center flex">
          <AiOutlineArrowRight size={25} />
        </div>
      </Carousel>
    </div>
  )
}