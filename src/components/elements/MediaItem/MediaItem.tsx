import { AspectRatioType, MediaType } from "@/helpers/types";
import classNames from "classnames";
import Image from "next/image";

export const MediaItem: React.FC<{
  data: MediaType;
  aspectRatio?: AspectRatioType;
  videoAutoplay?: boolean;
}> = ({ data, aspectRatio = "auto", videoAutoplay }) => {
  const { url, width, height, title, contentType } = data;
  return (
    <div className={classNames({ [`aspect-${aspectRatio}`]: width >= 160 })}>
      {contentType.includes("image") && (
        <Image
          className={classNames(
            { "object-cover w-full h-full": width >= 160 },
            { "w-20 object-contain": width < 160 }
          )}
          src={url ?? "/bluebiz_square.webp"}
          alt={title}
          width={width}
          height={height}
        />
      )}
      {contentType.includes("video") && (
        <video className="w-full h-full" src={url} autoPlay={videoAutoplay} loop={videoAutoplay} muted={videoAutoplay} >
          <track kind="captions" label={title} />
        </video>
      )}
    </div>
  );
};
