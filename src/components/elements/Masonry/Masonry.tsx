import Image from "next/image"
import { ButtonVariant } from "../Button/Button"
import classNames from "classnames"

interface MasonryProps {
  items: Array<{
    type: string
    src: string
    altText: string
    caption?: string
  }>
}

const Masonry: React.FC<MasonryProps> = ({ items }) => {
  // @TODO: calculate Height base on number of items & number of columns
  return (
    <div className="flex flex-col flex-wrap content-center gap-5 w-full md:h-[900px] lg:h-[1200px] xl:h-[700px]">
      {items.map((item, idx) => (
        <div key={idx} className={classNames(`w-full md:w-[calc(33.33%-13px)] xl:w-[calc(25%-15px)]`)}>
          {/* {idx + 1} */}
          <Image
            src={item.src}
            alt={item.altText}
            width={500}
            height={500}
          />
        </div>
      ))}
    </div>
  )
}

export default Masonry