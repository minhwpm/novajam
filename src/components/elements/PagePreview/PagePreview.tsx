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
      <div className="rounded-assets bg-neutral-50 bg-opacity-80 flex gap-5">
        <div className="basis-1/3 flex-1">
          <Link href={url}>
            <MediaItem data={metaImage} aspectRatio="square" />
          </Link>
        </div>
        <div className="basis-2/3 flex-1 py-4 pr-4 lg:py-6 lg:pr-6">
          <h4 className="text-xl font-heading file:font-semibold">
            <Link href={url}>
              {metaTitle ?? title}
            </Link>
          </h4>
        </div>
      </div>
    )
  }
  return (
    <div className="rounded-assets flex flex-col bg-neutral-50 bg-opacity-80">
      <Link href={url} >
        <MediaItem data={metaImage} aspectRatio="4/3" />
        <h4 className="mt-4 text-xl font-heading font-semibold text-center pb-4 lg:pb-6">
          {metaTitle ?? title}
        </h4>
      </Link>
    </div>
  )
}