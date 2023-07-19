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
    <div className="w-full columns-2 md:columns-3 lg:columns-4">
      {items.map((item, idx) => (
        <div key={idx} className={classNames()}>
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