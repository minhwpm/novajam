import { MediaItem } from '@/components/elements/MediaItem/MediaItem';
import { MediaCarousel } from '@/components/elements/MediaCarousel/MediaCarousel';
import { MediaType, MediaAspectRatioType } from '@/helpers/types';
import classNames from 'classnames';

export const MediaSection: React.FC<{
  media: Array<MediaType>;
  mediaAspectRatio: MediaAspectRatioType;
  isIntersecting: boolean;
}> = ({ media, mediaAspectRatio, isIntersecting }) => {
  if (!media) return null;

  return (
    <div
      className={classNames('relative -bottom-10 opacity-0 lg:flex-1', {
        'animate-slidingUpContent animation-delay-150': isIntersecting,
      })}
    >
      {media.length === 1 ? (
        <MediaItem
          data={media[0]}
          aspectRatio={mediaAspectRatio}
          videoControls
        />
      ) : (
        <MediaCarousel
          data={media}
          autoplay={{ delay: 3500 }}
          pagination={{ enabled: true }}
          aspectRatio={mediaAspectRatio}
        />
      )}
    </div>
  );
};
