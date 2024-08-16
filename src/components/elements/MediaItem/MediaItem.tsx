"use client";
import Image from "next/image";
import classNames from "classnames";
import { useRef, useState } from "react";
import { MediaAspectRatioType, MediaType } from "@/lib/types";
import { FaPlay } from "react-icons/fa";

export const MediaItem: React.FC<{
  data: MediaType | null;
  altText?: string;
  aspectRatio?: MediaAspectRatioType;
  videoAutoplay?: boolean;
  videoControls?: boolean;
  dimensionBase?: "width" | "height";
  priority?: boolean;
  rounded?: "theme" | "full" | "none";
  zoomInOverHover?: boolean
}> = ({
  data,
  altText,
  aspectRatio = "auto",
  videoAutoplay = false,
  videoControls = false,
  dimensionBase = "width",
  priority = false,
  rounded = "theme",
  zoomInOverHover = false
}) => {
  const aspectRatioClass = classNames(
    {"aspect-square": aspectRatio === "square"},
    {"aspect-video": aspectRatio === "16/9"},
    {"aspect-4/3": aspectRatio === "4/3"},
    {"aspect-3/2": aspectRatio === "3/2"},
    {"aspect-3/4": aspectRatio === "3/4"},
  )
  if (!data) {
    return (
      <div
        className={classNames(
          "overflow-hidden",
          [aspectRatioClass],
          { "w-full": dimensionBase === "width" },
          { "h-full": dimensionBase === "height" },
          `rounded-${rounded}`
        )}
      >
        <Image
          className={classNames("object-cover w-full h-full",
            {"hover:scale-110 transition-all duration-500": zoomInOverHover}
          )}
          src="/fallback-image.webp"
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
          [aspectRatioClass]: width >= 200 || contentType.includes("video"),
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
            "not-prose",
            { "object-cover w-full h-full": width >= 200 },
            { "object-contain": width < 200 },
            {
              "hover:scale-110 transition-all duration-500": zoomInOverHover,
            }
          )}
          src={url ?? "/fallback-image.webp"}
          alt={altText ?? title}
          width={width}
          height={height}
          priority={priority}
        />
      )}
      {contentType.includes("video") && (
        <Video
          url={url}
          title={title}
          videoAutoplay={videoAutoplay}
          videoControls={videoControls}
          type={contentType}
          zoomInOnHover={zoomInOverHover}
        />
      )}
    </div>
  );
};

const Video = ({
  url,
  title,
  videoAutoplay,
  videoControls,
  type,
  zoomInOnHover,
}: {
  url: string;
  title: string;
  videoAutoplay: boolean;
  videoControls: boolean;
  type: string;
  zoomInOnHover: boolean
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoStarted, setVideoStarted] = useState(false);
  return (
    <>
      <video
        className={classNames("not-prose object-cover w-full h-full", {
          "hover:scale-110 transition-all duration-500": zoomInOnHover,
        })}
        src={url}
        autoPlay={videoAutoplay}
        loop={videoAutoplay}
        muted={videoAutoplay}
        ref={videoRef}
        controls={videoStarted && videoControls}
        playsInline={true}
        preload="metadata"
      >
        <track kind="captions" label={title} />
        {!videoAutoplay && (
          <picture>
            <source srcSet={`${url}#t=0.001`} type={type} />
          </picture>
        )}
        Your browser does not support the video tag.
      </video>
      {!videoStarted && videoControls && (
        <div className="p-5 absolute bottom-0 right-0 w-full h-full bg-neutral-900 bg-opacity-30 flex justify-center items-center transition-opacity duration-300 ease-linear group-hover:opacity-100">
          <button
            onClick={() => {
              videoRef.current?.play();
              setVideoStarted(true);
            }}
            aria-label="Play video"
          >
            <FaPlay className="text-neutral-50 w-16 h-16 transition-all duration-200 ease-linear hover:scale-110 hover:text-primary-600" />
          </button>
        </div>
      )}
    </>
  );
};
