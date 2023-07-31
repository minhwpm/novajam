import Image from "next/image"
import classNames from "classnames"
import { ButtonVariant } from "../Button/Button"
import Link from "next/link"

const CURRENCY_UNIT = '$'
interface ProductPreviewProps {
  data: {
    title: string
    url: string
    price: number
    image: {
      src: string
      altText: string
    }
    buttons?: Array<{
      url: string
      text: string
      type: ButtonVariant
    }> 
  }
  imgAspectRatio: "video" | "square" | "4/3" | "3/2"
}

const ProductPreview: React.FC<ProductPreviewProps> = ({ data, imgAspectRatio }) => {
  const { title, url, price, image, buttons } = data
  return (
    <div className={classNames(
      "flex flex-col shrink-0",
    )}>
      <Image 
        className={classNames(
          { "aspect-video" : imgAspectRatio === "video"},
          { "aspect-square" : imgAspectRatio === "square"},
          { "aspect-4/3" : imgAspectRatio === "4/3"},
          { "aspect-3/2" : imgAspectRatio === "3/2"},
          "object-cover",
        )}
        src={image.src}
        width={500} 
        height={500} 
        alt={image.altText ?? title}
      />
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
        <p className="text-lg lg:text-xl font-semibold">
          {CURRENCY_UNIT}{price}
        </p>
      </div>
    </div>
  )
}

export default ProductPreview