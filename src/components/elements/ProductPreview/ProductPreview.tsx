'use client'
import Image from "next/image"
import classNames from "classnames"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ProductType } from "@/helpers/types"

interface Props {
  data: ProductType
}
const CURRENCY_UNIT = '$'

const ProductCard: React.FC<Props> = ({ data }) => {
  const { title, slug, price, media } = data
  const pathname = usePathname()
  return (
    <div>
      <Link href={`${pathname === "/" ? "" : pathname}/product/${slug}`}>
        <div className="aspect-[11/12] bg-slate-100 rounded-sm">
          <Image 
            className={classNames(
              "w-full h-full object-cover rounded-sm",
            )}
            src={media[0]?.url ?? "/bluebiz_square.webp"}
            width={500} 
            height={500} 
            alt={media[0]?.title ?? title}
          />
        </div>
        <div className={classNames(
          "w-full py-5",
        )}>
          {price && 
            <p className="font-semibold text-slate-700">
              <span className="relative -top-1 text-xs">
                {CURRENCY_UNIT}
              </span>
              {price}
            </p>
          }
          <h5 className="mb-2 lg:text-lg">
            {title}
          </h5>
        </div>
      </Link>
    </div>
  )
}

export default ProductCard