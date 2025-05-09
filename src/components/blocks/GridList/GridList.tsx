import classNames from 'classnames';
import { ContentMapping } from '@/components/blocks/ContentMapping/ContentMapping';
import { BlockType, ContentListType, GapType } from '@/lib/types';
import { getSpacingClasses } from '@/lib/utils';

export const GridList: React.FC<{
  contentItems: Array<BlockType>;
  columns: ContentListType['columns'];
  gap?: GapType;
  animate?: boolean;
}> = ({ contentItems, columns, gap = 'base', animate }) => {
  return (
    <ul
      className={classNames(
        'grid grid-flow-row',
        getSpacingClasses('gap', gap),
        {
          'grid-cols-1': columns === 1,
          'grid-cols-1 lg:grid-cols-2': columns === 2,
          'grid-cols-1 md:grid-cols-2 lg:grid-cols-3': columns === 3,
          'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4':
            columns === 4,
          'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5':
            columns === 5,
          'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6':
            columns === 6,
        },
      )}
    >
      {contentItems?.map((item, idx) => (
        <li
          key={idx}
          className={classNames('col-span-1 flex justify-center self-start')}
        >
          <ContentMapping
            data={item}
            index={idx}
            animate={animate}
            itemsPerRow={columns ?? 1}
          />
        </li>
      ))}
    </ul>
  );
};
