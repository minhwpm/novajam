import { BlogType, ProductType, PageType } from "@/utils/types"
import Image from "next/image"
import Link from "next/link"

function standardizeData(data: (BlogType | ProductType | PageType)) {
  console.log("HEYYYY", data)
  switch(data.contentType) {
    case "blog":
      return {
        title: data.title,
        url: data.slug,
        media: data.media ?? null
      }
    case "product":
      return {
        title: data.title,
        url: data.slug,
        media: data.media[0] ?? null
      }
    case "page":
      return {
        title: data.title,
        url: data.slug,
        media: data.metaImage ?? {}
      }
  }
}

const SubMenuFeaturedContent: React.FC<{data: BlogType | ProductType | PageType}> = ({ data }) => {
  const result = standardizeData(data)
  return (
    <>
      {/* @TODO resolve link href here*/}
      <Link
        href={result.url ?? ""}
        className="group flex flex-col items-center p-5 rounded bg-slate-50 hover:bg-primary-50 transition-colors duration-500"
      >
        {result.media && (
          <div  className="w-full overflow-hidden">
            <Image
              className="w-full aspect-square object-cover group-hover:scale-110 transition-all duration-500"
              alt={result.media?.title ?? result.title}
              src={result.media?.url}
              width={result.media.width}
              height={result.media.height}
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