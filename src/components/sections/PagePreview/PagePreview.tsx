import { PageType } from "@/utils/types"
import Image from "next/image"
import Link from "next/link"

const PagePreview = ({data}: {data: PageType}) => {
  const { title, url, metaTitle, metaImage } = data
  return (
    <div>
      <Link href={url} className="group flex flex-col">
        <div className="aspect-4/3 overflow-hidden">
          <Image 
            className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500 ease-in-out"
            src={metaImage?.url ?? "/bluebiz_square.webp"}
            alt={metaImage?.title}
            width={metaImage?.width ?? 500}
            height={metaImage?.height ?? 400}
          />
        </div>
        <h4 className="mt-3 text-center pb-5">
          {metaTitle ?? title}
        </h4>
      </Link>
    </div>
  )
}

export default PagePreview
