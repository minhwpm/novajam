"use client"
import { useRef, useState } from "react";
import { MediaAspectRatioType, MediaType } from "@/helpers/types";
import classNames from "classnames";
import Image from "next/image";
import { FaPlay } from "react-icons/fa";

export const MediaItem: React.FC<{
  data: MediaType | null;
  altText?: string;
  aspectRatio?: MediaAspectRatioType;
  videoAutoplay?: boolean;
  videoControls?: boolean;
  dimensionBase?: "width" | "height";
  priority?: boolean
  rounded?: "assets" | "full" | "none"
}> = ({
  data,
  altText,
  aspectRatio = "auto",
  videoAutoplay = false,
  videoControls = false,
  dimensionBase = "width",
  priority = false,
  rounded = "assets",
}) => {
  if (!data) {
    return (
      <div
        className={classNames(
          "overflow-hidden",
          `aspect-${aspectRatio}`,
          { "w-full": dimensionBase === "width" },
          { "h-full": dimensionBase === "height" },
          `rounded-${rounded}`,
        )}
      >
        <Image
          className={classNames(
            "object-cover w-full h-full",
          )}
          src="/bluebiz_square.webp"
          width={500}
          height={500}
          alt={altText ?? "No image"}
          priority={priority}
        />
      </div>
    );
  }

  const { url, width, height, title, contentType } = data;
  return (
    <div
      className={classNames(
        "overflow-hidden relative",
        {
          [`aspect-${aspectRatio}`]:
            width >= 200 || contentType.includes("video"),
        },
        {
          "w-full":
            dimensionBase === "width" &&
            (contentType.includes("video") ||
              width >= 200 ||
              contentType.includes("video")),
        },
        {
          "h-full":
            dimensionBase === "height" &&
            (contentType.includes("video") ||
              width >= 200 ||
              contentType.includes("video")),
        },
        `rounded-${rounded}`
      )}
    >
      {contentType.includes("image") && (
        <Image
          className={classNames(
            { "object-cover w-full h-full": width >= 200 },
            { "w-20 mx-5 object-contain": width < 200 }
          )}
          src={url ?? "/bluebiz_square.webp"}
          alt={altText ?? title}
          width={width}
          height={height}
          priority={priority}
        />
      )}
      {contentType.includes("video") && (
        <Video url={url} title={title} videoAutoplay={videoAutoplay} videoControls={videoControls} />
      )}
    </div>
  );
};

const Video = ({
  url,
  title,
  videoAutoplay,
  videoControls,
}: {
  url: string
  title: string
  videoAutoplay: boolean
  videoControls: boolean
}) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoStarted, setVideoStarted] = useState(false)
  return (
    <>
      <video
        className="object-cover w-full h-full"
        src={url}
        autoPlay={videoAutoplay}
        loop={videoAutoplay}
        muted={videoAutoplay}
        ref={videoRef}
        controls={videoStarted && videoControls}
        playsInline={true}
        // preload="auto"
      >
        <track kind="captions" label={title} />
      </video>
      {!videoStarted && videoControls && (
        <div className="p-5 absolute bottom-0 right-0 w-full h-full bg-neutral-900 bg-opacity-30 flex justify-center items-center transition-opacity duration-300 ease-linear group-hover:opacity-100">
          <button
            onClick={() => {
              videoRef.current?.play()
              setVideoStarted(true)
            }}
          >
            <FaPlay className="text-neutral-50 w-16 h-16 transition-all duration-200 ease-linear hover:scale-110 hover:text-primary-600" />
          </button>
        </div>
      )}
    </>
  );
};
