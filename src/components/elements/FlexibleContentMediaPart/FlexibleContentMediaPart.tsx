import {
  AlignmentType,
  FlexibleContentType,
  MediaAspectRatioType,
} from '@/helpers/types';
import classNames from 'classnames';
import { MediaItem } from '@/components/elements/MediaItem/MediaItem';
import { MediaCarousel } from '@/components/elements/MediaCarousel/MediaCarousel';

export const FlexibleContentMediaPart: React.FC<{
  data: FlexibleContentType;
  className?: string;
  alignment?: AlignmentType;
  aspectRatio?: MediaAspectRatioType;
  rounded?: 'theme' | 'full' | 'none';
}> = ({
  data,
  className,
  alignment,
  aspectRatio = '4/3',
  rounded = 'theme',
}) => {
  const { media } = data;
  return (
    <div
      className={classNames(
        'flex',
        { 'justify-center': alignment === 'center' },
        { 'justify-end': alignment === 'end' },
        className,
      )}
    >
      {media.length === 1 && (
        <MediaItem
          data={media[0]}
          aspectRatio={aspectRatio}
          rounded={rounded}
          videoControls
          zoomInOverHover
        />
      )}
      {media.length > 1 && (
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
