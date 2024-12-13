'use client';
import classNames from 'classnames';
import { Image } from '@/components/elements/Image/Image';
import { Video } from '@/components/elements/Video/Video';
import { MediaAspectRatioType, MediaType } from '@/helpers/types';

export const MediaItem: React.FC<{
  data: MediaType | null;
  altText?: string;
  aspectRatio?: MediaAspectRatioType;
  videoAutoplay?: boolean;
  videoControls?: boolean;
  dimensionBase?: 'width' | 'height';
  priority?: boolean;
  rounded?: 'theme' | 'full' | 'none';
  shadow?: boolean;
  zoomInOverHover?: boolean;
  className?: string;
  fallbackSrc?: string;
}> = ({
  data,
  altText,
  aspectRatio = 'auto',
  videoAutoplay = false,
  videoControls = true,
  dimensionBase = 'width',
  priority = false,
  rounded = 'theme',
  shadow = false,
  zoomInOverHover = false,
  className,
  fallbackSrc = '/fallback.png',
}) => {
  const media = (
    <>
      {data?.contentType?.includes('video') ? (
        <Video
          data={data}
          aspectRatio={aspectRatio}
          videoAutoplay={videoAutoplay}
          videoControls={videoControls}
          zoomInOnHover={zoomInOverHover}
          fallbackSrc={fallbackSrc}
          dimensionBase={dimensionBase}
          className={className}
        />
      ) : (
        <Image
          data={data}
          aspectRatio={aspectRatio}
          rounded={rounded}
          zoomInOverHover={zoomInOverHover}
          alt={altText ?? data?.description ?? undefined}
          priority={priority}
          fallbackSrc={fallbackSrc}
          dimensionBase={dimensionBase}
          className={className}
        />
      )}
    </>
  );

  return shadow || zoomInOverHover ? (
    <div
      className={classNames(
        `bg-slate-200 dark:bg-slate-700 rounded-${rounded}`,
        {
          'overflow-hidden': zoomInOverHover,
          'shadow-radiant': shadow,
        },
      )}
    >
      {media}
    </div>
  ) : (
    media
  );
};
