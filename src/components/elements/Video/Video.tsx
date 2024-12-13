'use client';
import classNames from 'classnames';
import { useRef, useState } from 'react';
import { MediaAspectRatioType, MediaType } from '@/helpers/types';
import { FaPlay } from 'react-icons/fa';

export const Video: React.FC<{
  data: MediaType | null;
  aspectRatio?: MediaAspectRatioType;
  dimensionBase?: 'width' | 'height';
  videoAutoplay: boolean;
  videoControls: boolean;
  zoomInOnHover?: boolean;
  fallbackSrc?: string;
  className?: string;
}> = ({
  data,
  aspectRatio,
  dimensionBase,
  videoAutoplay,
  videoControls,
  zoomInOnHover = false,
  fallbackSrc = '/fallback.png',
  className,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoStarted, setVideoStarted] = useState(false);
  const [mediaSrc, setMediaSrc] = useState(data?.url ?? fallbackSrc);
  const handleError = () => setMediaSrc(fallbackSrc);

  const aspectRatioClass = classNames({
    'aspect-square': aspectRatio === 'square',
    'aspect-video': aspectRatio === '16/9',
    'aspect-4/3': aspectRatio === '4/3',
    'aspect-3/2': aspectRatio === '3/2',
    'aspect-3/4': aspectRatio === '3/4',
  });

  return (
    <div
      className={classNames('relative', {
        'w-full': dimensionBase === 'width',
        'h-full': dimensionBase === 'height',
      })}
    >
      <video
        className={classNames(
          'not-prose object-cover before:cont before:bg-slate-300/90',
          aspectRatioClass,
          {
            'w-full': dimensionBase === 'width',
            'h-full': dimensionBase === 'height',
            'hover:scale-110 transition-all duration-500': zoomInOnHover,
          },
          className,
        )}
        src={mediaSrc}
        autoPlay={videoAutoplay}
        loop={videoAutoplay}
        muted={videoAutoplay}
        ref={videoRef}
        controls={videoStarted && videoControls}
        playsInline={true}
        preload="metadata"
        onError={handleError}
      >
        <track kind="captions" label={data?.title} />
        {!videoAutoplay && (
          <picture>
            <source srcSet={`${mediaSrc}#t=0.001`} type={data?.contentType} />
          </picture>
        )}
        Your browser does not support the video tag.
      </video>
      {!videoStarted && videoControls && (
        <div className="absolute z-10 bottom-0 right-0 w-full h-full bg-slate-600/50 flex justify-center items-center transition-opacity duration-300 ease-linear group-hover:opacity-100">
          <button
            className="w-20 h-20 flex justify-center items-center bg-slate-100 rounded-full"
            onClick={() => {
              videoRef.current?.play();
              setVideoStarted(true);
            }}
            aria-label="Play video"
          >
            <FaPlay className="text-primary-600 w-4 h-4 transition-all duration-200 ease-linear hover:scale-110 hover:text-primary-600" />
          </button>
        </div>
      )}
    </div>
  );
};
