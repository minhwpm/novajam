import Link from "next/link"
import { PageType } from "@/helpers/types"
import { MediaItem } from "../MediaItem/MediaItem"
import { useContext } from "react"
import { DarkModeContext } from "@/components/sections/ContentList/ContentList";
import classNames from "classnames";

export const PagePreview: React.FC<{
  data: PageType
  layout?: "vertical" | "horizontal"
}> = ({
  data,
  layout = "vertical"
}) => {
  const { title, url, metaTitle, metaImage } = data
  const darkMode = useContext(DarkModeContext);
  if (layout === "horizontal") {
    return (
      <div className="rounded-assets flex gap-5">
        <div className="basis-1/3 flex-1">
          <Link href={url}>
            <MediaItem data={metaImage} aspectRatio="square" />
          </Link>
        </div>
        <div className="basis-2/3 flex-1 py-4 pr-4 lg:py-6 lg:pr-6">
          <h4 className={classNames("text-xl font-heading file:font-semibold",
            { "text-neutral-50": darkMode }
          )}>
            <Link href={url}>
              {metaTitle ?? title}
            </Link>
          </h4>
        </div>
      </div>
    )
  }
  return (
    <div className="rounded-assets flex flex-col">
      <Link href={url}>
        <MediaItem data={metaImage} aspectRatio="4/3" />
        <h4
          className={classNames(
            "mt-4 text-xl font-heading font-semibold text-center pb-4 lg:pb-6",
            { "text-neutral-50": darkMode }
          )}
        >
          {metaTitle ?? title}
        </h4>
      </Link>
    </div>
  );
}