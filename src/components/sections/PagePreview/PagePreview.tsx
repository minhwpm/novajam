import { PageType } from "@/utils/types"
import Image from "next/image"
import Link from "next/link"

const PagePreview = ({data}: {data: PageType}) => {
  const { seo, title, slug } = data
  return (
    <div className="basis-[80%] md:basis-[40%] lg:basis-[30%] px-4 shrink-0 grow">
      <Link href={slug} className="group flex flex-col">
        <div className="aspect-4/3 overflow-hidden">
          <Image 
            className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500 ease-in-out"
            src={seo.sharedImage?.url ?? "/vercel.svg"}
            alt={seo.sharedImage?.title}
            width={seo.sharedImage?.width ?? 500}
            height={seo.sharedImage?.height ?? 400}
          />
        </div>
        <h4 className="mt-3 text-center pb-5">
          {seo.metaTitle ?? title}
        </h4>
      </Link>
    </div>
  )
}

export default PagePreview
