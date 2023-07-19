// Item Order: vertical
import Image from "next/image"
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
  return (
    <div className="w-full columns-2 md:columns-3 gap-5 lg:columns-4">
      {items.map((item, idx) => (
        <div key={idx} className={classNames("mb-5")}>
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