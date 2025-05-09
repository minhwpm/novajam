import { MediaItem } from '@/components/elements/MediaItem/MediaItem';
import { ExpertType } from '@/lib/types';

export const Author: React.FC<{ author: ExpertType }> = ({ author }) => (
  <div className="group flex gap-2 items-center">
    <div className="w-11 h-11">
      <MediaItem
        data={author.profilePicture}
        aspectRatio="square"
        rounded="full"
      />
    </div>
    <div className="flex flex-col gap-1">
      <div className="font-heading font-medium text-lg dark:text-slate-100">
        {author.name}
      </div>
      {author.role && (
        <div className="text-sm text-slate-400 dark:text-slate-100/50">
          {author.role}
        </div>
      )}
    </div>
  </div>
);
