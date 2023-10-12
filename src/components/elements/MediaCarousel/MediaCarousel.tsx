import { MediaType } from "@/utils/types"
import Carousel from "../Carousel/Carousel"
import Image from "next/image"
import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai";
import classNames from "classnames";

export const MediaCarousel: React.FC<{ data: Array<MediaType>, aspectRatio?: string }> = ({data, aspectRatio = ""} ) => {
  console.log(aspectRatio)
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
        slides = { data.map((item) => (
            <div key={item.id} className={classNames(
              { [aspectRatio] : item.width >= 160 }
            )}> 
              {item.contentType.includes("image") && (
                <Image
                  className={classNames(
                    { "object-cover w-full h-full": (item.width >= 160)},
                    { "w-20 object-contain": (item.width < 160)},
                  )}
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
        ))}
      >
        <div className="media-carousel-btn-prev absolute right-2 bottom-16 z-10 cursor-pointer w-10 h-10 rounded-full bg-white bg-opacity-80 shadow items-center justify-center flex">
          <AiOutlineArrowLeft size={20} />
        </div>
        <div className="media-carousel-btn-next absolute right-2 bottom-4 z-10 cursor-pointer w-10 h-10 rounded-full bg-white bg-opacity-80 shadow items-center justify-center flex">
          <AiOutlineArrowRight size={20} />
        </div>
      </Carousel>
    </div>
  )
}