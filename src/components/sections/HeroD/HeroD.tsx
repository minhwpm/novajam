/*
Created by minhwpm (minhhien134@gmail.com)
Carousel Hero section
 */
import Image from "next/image"
import Carousel from "@/components/elements/Carousel/Carousel"
import classNames from "classnames";
import Link from "next/link";

interface HeroDProps {
  data: {
    images: Array<{
      src: {
        default: string
        sm?: string
      }
      altText: string
      url: string
    }>
  }
}

const HeroD: React.FC<HeroDProps> = ({data}) => {
  const { images } = data
  return (
    <section>
      <Carousel
        autoplay={true}
        pagination={true}
        slides={images.map((item, idx) => (
          <div key={idx}>
            <Link href={item.url}>
              <Image
                className={classNames(
                  "w-full object-cover aspect-3/4 md:aspect-video lg:aspect-5/2",
                )}
                src={item.src.default ?? ""}
                alt="Teacher Training"
                width={500}
                height={500}
              />
            </Link>
          </div>
        ))}
      />
    </section>
  )
}

export default HeroD