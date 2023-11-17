import { BlogType, PageType } from "@/helpers/types"
import Image from "next/image"
import Link from "next/link"

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

const SubMenuFeaturedContent: React.FC<{data: BlogType | PageType}> = ({ data }) => {
  const result = standardizeData(data)
  return (
    <>
      {/* @TODO resolve link href here*/}
      <Link
        href={result.url ?? ""}
        className="group flex flex-col items-center p-5 rounded-sm hover:bg-primary-50 transition-colors duration-500"
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
        <h3 className="mt-3 font-medium text-slate-700 group-hover:text-primary-600 transition-colors duration-500">
          {result.title}
        </h3>
      </Link>
    </>
  )
}

export default SubMenuFeaturedContent