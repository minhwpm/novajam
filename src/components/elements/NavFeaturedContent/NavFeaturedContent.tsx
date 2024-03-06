import { BlogType, PageType } from "@/helpers/types"
import classNames from "classnames"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

function standardizeData(data: (BlogType | PageType)) {
  switch(data.contentType) {
    case "blog":
      return {
        title: data.title,
        url: data.slug,
        thumbnailImage: data.media ?? null
      }
    case "page":
      return {
        title: data.title,
        url: data.url,
        thumbnailImage: data.metaImage
      }
  }
}

export const NavFeaturedContent: React.FC<{
  data: BlogType | PageType
  onClick?: () => void
}> = ({ data, onClick }) => {
  const result = standardizeData(data)
  const pathname = usePathname();

  return (
    <>
      <Link
        href={result.url ?? "#"}
        className={classNames("group bg-white flex flex-col items-center rounded-assets transition-colors duration-500",
          { "bg-primary-100": result.url === pathname}
        )}
        onClick={onClick}
      >
        {result.thumbnailImage && (
          <div  className="w-full overflow-hidden rounded-assets">
            <Image
              className="w-full aspect-square object-cover group-hover:scale-110 transition-all duration-500"
              alt={result.thumbnailImage?.title ?? result.title}
              src={result.thumbnailImage?.url ?? "/bluebiz_square.webp"}
              width={result.thumbnailImage.width ?? 500}
              height={result.thumbnailImage.height ?? 500}
            />
          </div>
        )}
        <h3 className={classNames("mt-3 font-medium group-hover:text-primary-600 transition-colors duration-500 px-5 pb-5",
          { "text-primary-600": result.url === pathname}
        )}>
          {result.title}
        </h3>
      </Link>
    </>
  )
}