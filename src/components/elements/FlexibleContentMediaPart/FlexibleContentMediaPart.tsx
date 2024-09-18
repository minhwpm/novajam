import {
  TextAlignmentType,
  FlexibleContentType,
  MediaAspectRatioType,
} from '@/helpers/types';
import classNames from 'classnames';
import { MediaItem } from '@/components/elements/MediaItem/MediaItem';
import { MediaCarousel } from '@/components/elements/MediaCarousel/MediaCarousel';

export const FlexibleContentMediaPart: React.FC<{
  data: FlexibleContentType;
  className?: string;
  alignment?: TextAlignmentType;
  aspectRatio?: MediaAspectRatioType;
  rounded?: 'theme' | 'full' | 'none';
}> = ({
  data,
  className,
  alignment,
  aspectRatio = '4/3',
  rounded = 'theme',
}) => {
  const { media, embeddedMediaUrl, embeddedMediaTitle } = data;
  return (
    <div
      className={classNames(
        'flex',
        { 'justify-center': alignment === 'center' },
        { 'justify-end': alignment === 'end' },
        className,
      )}
    >
      {embeddedMediaUrl && (
        <div
          className={classNames(
            'w-full overflow-hidden',
            `aspect-${aspectRatio === 'auto' ? 'video' : aspectRatio}`,
            `rounded-${rounded}`,
          )}
        >
          <iframe
            src={embeddedMediaUrl}
            width="100%"
            title={embeddedMediaTitle ?? ''}
            className="w-full h-full object-cover"
            allowFullScreen={true}
          />
        </div>
      )}
      {!embeddedMediaUrl && media && media.length === 1 && (
        <MediaItem
          data={media[0]}
          aspectRatio={aspectRatio}
          rounded={rounded}
          videoControls={true}
        />
      )}
      {!embeddedMediaUrl && media && media.length > 1 && (
        <MediaCarousel
          data={media}
          autoplay={{
            delay: 3500,
          }}
          pagination={{
            enabled: true,
          }}
          aspectRatio={aspectRatio}
          rounded={rounded}
        />
      )}
    </div>
  );
};
