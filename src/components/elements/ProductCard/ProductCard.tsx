import Image from "next/image"
import classNames from "classnames"
import Link from "next/link"
import { ButtonVariant } from "@/utils/types"

const CURRENCY_UNIT = '$'
interface ProductCardProps {
  data: {
    id: string
    title: string
    url: string
    price: number
    categories: Array<string>
    media: Array<{
      title: string
      url: string
    }>
    contentType: string
  }
  imgAspectRatio?: "video" | "square" | "4/3" | "3/2"
}

const ProductCard: React.FC<ProductCardProps> = ({ data, imgAspectRatio = "4/3" }) => {
  const { title, url, price, media } = data
  return (
    <div className={classNames(
      "flex flex-col shrink-0",
    )}>
      {media.length > 0 && media[0].url && (
        <Image 
          className={classNames(
            { "aspect-video" : imgAspectRatio === "video"},
            { "aspect-square" : imgAspectRatio === "square"},
            { "aspect-4/3" : imgAspectRatio === "4/3"},
            { "aspect-3/2" : imgAspectRatio === "3/2"},
            "object-cover",
          )}
          src={media[0].url}
          width={500} 
          height={500} 
          alt={media[0].title ?? title}
        />
      )}
      <div className={classNames(
        "w-full py-5",
      )}>
        <h5 className="mb-2">
          {url ? (
            <Link href={url}>
              {title}
            </Link>
          ) : (<>{title}</>)}
        </h5>
        {price && 
          <p className="text-lg lg:text-xl font-semibold">
            {CURRENCY_UNIT}{price}
          </p>
        }
      </div>
    </div>
  )
}

export default ProductCard