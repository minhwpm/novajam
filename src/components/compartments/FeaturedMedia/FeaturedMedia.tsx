import classNames from 'classnames';
import { FeaturedMediaType } from '@/lib/types';
import { MediaItem } from '@/components/elements/MediaItem/MediaItem';

export const FeaturedMedia: React.FC<{ data: FeaturedMediaType }> = function ({
  data,
}) {
  const { file, priority } = data;
  return (
    <div className={classNames('w-full')}>
      {file && <MediaItem data={file} priority={priority} />}
    </div>
  );
};
