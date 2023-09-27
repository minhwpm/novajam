/*
Created by minhwpm (minhhien134@gmail.com)
Carousel Hero section
 */
import Image from "next/image"
import Carousel from "@/components/elements/Carousel/Carousel"
import classNames from "classnames";
import { HeroType } from "@/utils/types";

interface HeroDProps {
  data: HeroType
}

const HeroD: React.FC<HeroDProps> = ({data}) => {
  const { media } = data
  return (
    <section>
      <Carousel
        autoplay={true}
        pagination={{
          enabled: true
        }}
        slides={media.map((item, idx) => (
          <div key={idx}>
            {/* <Link href={item.url}> */}
              <Image
                className={classNames(
                  "w-full object-cover aspect-3/4 md:aspect-video lg:aspect-5/2",
                )}
                src={item.url ?? ""}
                alt={item.title}
                width={500}
                height={500}
              />
            {/* </Link> */}
          </div>
        ))}
      />
    </section>
  )
}

export default HeroD