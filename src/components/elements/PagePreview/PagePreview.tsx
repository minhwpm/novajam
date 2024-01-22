import Link from "next/link"
import { PageType } from "@/helpers/types"
import { MediaItem } from "../MediaItem/MediaItem"

export const PagePreview: React.FC<{
  data: PageType
  layout?: "vertical" | "horizontal"
}> = ({
  data,
  layout = "vertical"
}) => {
  const { title, url, metaTitle, metaImage } = data
  if (layout === "horizontal") {
    return (
      <div className="rounded-assets bg-white flex gap-5">
        <div className="basis-1/3 flex-1">
          <MediaItem data={metaImage} aspectRatio="square" />
        </div>
        <div className="basis-2/3 flex-1 py-4 pr-4 lg:py-6 lg:pr-6">
          <h4 className="text-xl font-semibold">
            <Link href={url} className="group flex gap-5">
              {metaTitle ?? title}
            </Link>
          </h4>
        </div>
      </div>
    )
  }
  return (
    <div className="rounded-assets flex flex-col bg-white">
      <Link href={url} >
        <MediaItem data={metaImage} aspectRatio="4/3" />
        <h4 className="mt-4 text-xl font-semibold text-center pb-4 lg:pb-6">
          {metaTitle ?? title}
        </h4>
      </Link>
    </div>
  )
}