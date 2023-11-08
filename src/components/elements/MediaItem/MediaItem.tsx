import { MediaType } from "@/helpers/types"
import classNames from "classnames"
import Image from "next/image"

export const MediaItem: React.FC<{data: MediaType, aspectRatio?: "video" | "square" | "3/4" | "4/3" | "3/2" | "auto" }> = ({data, aspectRatio = "auto" }) => {
  const { url, width, height, title, contentType } = data
  return (
    <div className={classNames(
      { [`aspect-${aspectRatio}`] : width >= 160 }
    )}> 
      {contentType.includes("image") && (
        <Image
          className={classNames(
            "rounded-assets",
            { "object-cover w-full h-full": (width >= 160)},
            { "w-20 object-contain": (width < 160)},
          )}
          src={url ?? "/bluebiz_square.webp"}
          alt={title}
          width={width}
          height={height}
        />
      )}
      {contentType.includes("video") && (
        <video className="w-full h-96 rounded-assets" src={url}>
          <track kind="captions" label={title} />
        </video>
      )}
    </div>
  )
}