'use client';
import NextImage from 'next/image';
import classNames from 'classnames';
import { useState } from 'react';
import { MediaAspectRatioType, MediaType } from '@/helpers/types';

export const Image: React.FC<{
  data: MediaType | null;
  alt?: string;
  aspectRatio?: MediaAspectRatioType;
  dimensionBase?: 'width' | 'height';
  priority?: boolean;
  rounded?: 'theme' | 'full' | 'none';
  zoomInOverHover?: boolean;
  className?: string;
  fallbackSrc?: string;
}> = ({
  data,
  alt,
  aspectRatio = 'auto',
  dimensionBase = 'width',
  priority = false,
  rounded = 'theme',
  zoomInOverHover = false,
  className,
  fallbackSrc = '/fallback.png',
}) => {
  const [mediaSrc, setMediaSrc] = useState(data?.url ?? fallbackSrc);
  const handleError = () => setMediaSrc(fallbackSrc);

  const aspectRatioClass = classNames({
    'aspect-square': aspectRatio === 'square',
    'aspect-video': aspectRatio === '16/9',
    'aspect-4/3': aspectRatio === '4/3',
    'aspect-3/2': aspectRatio === '3/2',
    'aspect-3/4': aspectRatio === '3/4',
  });

  if (!data) {
    return (
      <NextImage
        className={classNames('object-cover w-full h-full', aspectRatioClass, {
          'group-hover:scale-110 hover:scale-110 transition-all duration-500':
            zoomInOverHover,
        })}
        src={fallbackSrc}
        width={500}
        height={500}
        alt={alt ?? 'No image'}
        priority={priority}
      />
    );
  }

  const { width, height, title } = data;
  return (
    <NextImage
      className={classNames(
        'not-prose',
        aspectRatioClass,
        {
          'w-full': dimensionBase === 'width' && width >= 200,
          'h-full': dimensionBase === 'height' && width >= 200,
          'object-cover': width >= 200,
          'object-contain': width < 200,
          'group-hover:scale-110 hover:scale-110 transition-all duration-500':
            width >= 200 && zoomInOverHover,
          [`rounded-${rounded}`]: width >= 200,
        },
        className,
      )}
      src={mediaSrc}
      alt={alt ?? title ?? ''}
      width={width}
      height={height}
      priority={priority}
      onError={handleError}
    />
  );
};
