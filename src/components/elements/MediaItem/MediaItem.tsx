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
          alt={altText}
          priority={priority}
          fallbackSrc={fallbackSrc}
          dimensionBase={dimensionBase}
          className={className}
        />
      )}
    </>
  );

  return zoomInOverHover ? (
    <div className={classNames('overflow-hidden', `rounded-${rounded}`)}>
      {media}
    </div>
  ) : (
    media
  );
};
