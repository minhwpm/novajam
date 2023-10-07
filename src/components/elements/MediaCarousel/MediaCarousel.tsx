import { MediaType } from "@/utils/types"
import Carousel from "../Carousel/Carousel"
import Image from "next/image"
import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai";

export const MediaCarousel: React.FC<{ data: Array<MediaType>}> = ({data}) => {
  return (
    <div className="relative">
      <Carousel
        effect="fade"
        navigation={{
          enabled: true,
          nextEl: '.media-carousel-btn-next',
          prevEl: '.media-carousel-btn-prev'
        }}
        pagination={{
          enabled: true,
        }}
        slides = { data.map((item) => {
          return (
            <div key={item.id} className="aspect-4/3"> 
              {item.contentType.includes("image") && (
                <Image
                  className="w-full h-full object-cover"
                  src={item.url ?? "/bluebiz_square.webp"}
                  alt={item.title}
                  width={item.width}
                  height={item.height}
                />
              )}
              {item.contentType.includes("video") && (
                <video className="w-full h-96" src={item.url}>
                  <track kind="captions" label={item.title} />
                </video>
              )}
            </div>
          )
        })}
      />
      {data.length > 1 && (
        <>
        <div className="media-carousel-btn-prev absolute right-2 bottom-16 z-10 cursor-pointer w-10 h-10 rounded-full bg-white bg-opacity-80 shadow items-center justify-center flex">
          <AiOutlineArrowLeft size={20} />
        </div>
        <div className="media-carousel-btn-next absolute right-2 bottom-4 z-10 cursor-pointer w-10 h-10 rounded-full bg-white bg-opacity-80 shadow items-center justify-center flex">
          <AiOutlineArrowRight size={20} />
        </div>
        </>
      )}
    </div>
  )
}