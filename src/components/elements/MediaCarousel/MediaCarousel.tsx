import { MediaType } from "@/helpers/types"
import Carousel from "../Carousel/Carousel"
import { MediaItem } from "../MediaItem/MediaItem";
import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai";

export const MediaCarousel: React.FC<{ data: Array<MediaType>, aspectRatio?: "video" | "square" | "3/4" | "4/3" | "3/2" | "auto" }> = ({data, aspectRatio = "auto"} ) => {
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
        }}
        slides = { data.map((item) => (
          <MediaItem key={item.id} data={item} aspectRatio={aspectRatio} />
        ))}
      >
        <div className="media-carousel-btn-next absolute right-2 bottom-4 z-10 cursor-pointer w-10 h-10 rounded-full bg-white bg-opacity-80 shadow items-center justify-center flex">
          <AiOutlineArrowRight size={20} />
        </div>
        <div className="media-carousel-btn-prev absolute right-2 bottom-16 z-10 cursor-pointer w-10 h-10 rounded-full bg-white bg-opacity-80 shadow items-center justify-center flex">
          <AiOutlineArrowLeft size={20} />
        </div>
      </Carousel>
    </div>
  )
}