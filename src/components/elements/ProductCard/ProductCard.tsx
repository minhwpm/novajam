'use client'
import Image from "next/image"
import classNames from "classnames"
import Link from "next/link"
import { ProductCardProps } from "@/utils/types"
import { usePathname } from "next/navigation"

const CURRENCY_UNIT = '$'

const ProductCard: React.FC<ProductCardProps> = ({ data }) => {
  const { title, slug, price, media } = data
  const pathname = usePathname()
  // console.log(pathname)
  return (
    <div className={classNames(
      "basis-[80%] md:basis-[40%] lg:basis-[30%] px-4 shrink-0 grow",
    )}>
      <Link href={`${pathname === "/" ? "" : pathname}/product/${slug}`}>
        <Image 
          className={classNames(
            "aspect-9/8",
            "object-contain",
            "w-full",
            "bg-slate-50"
          )}
          src={media[0]?.url ?? "/vercel.svg"}
          width={500} 
          height={500} 
          alt={media[0]?.title ?? title}
        />
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