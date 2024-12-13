import classNames from 'classnames';
import { ContentMapping } from '@/components/blocks/ContentMapping/ContentMapping';
import { BlockType, ColumnsType, GapType } from '@/helpers/types';

export const GridList: React.FC<{
  contentItems: Array<BlockType>;
  columns: ColumnsType;
  gap?: GapType;
  animate?: boolean;
}> = ({ contentItems, columns, gap = 'base', animate }) => {
  return (
    <ul
      className={classNames('grid grid-flow-row', {
        'grid-cols-1': columns === 1,
        'grid-cols-1 lg:grid-cols-2': columns === 2,
        'grid-cols-1 md:grid-cols-2 lg:grid-cols-3': columns === 3,
        'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4':
          columns === 4,
        'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5':
          columns === 5,
        'gap-2 md:gap-2.5 lg:gap-3': gap === 'xs',
        'gap-4 md:gap-5 lg:gap-6': gap === 'sm',
        'gap-6 md:gap-8 lg:gap-9': gap === 'base',
        'gap-10 md:gap-12 lg:gap-15': gap === 'lg',
        'gap-16 md:gap-20 lg:gap-24': gap === 'xl',
      })}
    >
      {contentItems?.map((item, idx) => (
        <li
          key={idx}
          className={classNames('col-span-1 flex justify-center self-start')}
        >
          <ContentMapping data={item} index={idx} animate={animate} />
        </li>
      ))}
    </ul>
  );
};
