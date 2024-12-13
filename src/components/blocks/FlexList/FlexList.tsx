import classNames from 'classnames';
import { BlockType, ColumnsType, GapType } from '@/helpers/types';
import { ContentMapping } from '@/components/blocks/ContentMapping/ContentMapping';

export const FlexList: React.FC<{
  contentItems: Array<BlockType>;
  columns: ColumnsType;
  gap?: GapType;
}> = ({ contentItems, columns, gap = 'base' }) => {
  return (
    <ul
      className={classNames('flex flex-wrap justify-center', {
        '-mx-1 md:-mx-1.25 lg:-mx-1.5 gap-y-2 md:gap-y-2.5 lg:gap-y-3':
          gap === 'xs',
        '-mx-2 md:-mx-2.5 lg:-mx-3 gap-y-4 md:gap-y-5 lg:gap-y-6': gap === 'sm',
        '-mx-3 md:-mx-4 lg:-mx-9 gap-y-6 md:gap-y-8 lg:gap-y-9': gap === 'base',
        '-mx-5 md:-mx-6 lg:-mx-7.5 gap-y-10 md:gap-y-12 lg:gap-y-15':
          gap === 'lg',
        '-mx-8 md:-mx-10 lg:-mx-12 gap-y-16 md:gap-y-20 lg:gap-y-24':
          gap === 'xl',
      })}
    >
      {contentItems.map((item, idx) => (
        <li
          key={idx}
          className={classNames('w-full', {
            'lg:max-w-fit': columns === 1,
            'lg:basis-1/2': columns === 2,
            'md:basis-1/2 lg:basis-1/3': columns === 3,
            'sm:basis-1/2 lg:basis-1/3 xl:basis-1/4': columns === 4,
            'basis-1/2 sm:basis-1/3 md:basis-1/4 xl:basis-1/5': columns === 5,
            'px-1': gap === 'xs',
            'px-2': gap === 'sm',
            'px-3': gap === 'base',
            'px-5': gap === 'lg',
            'px-8': gap === 'xl',
          })}
        >
          <ContentMapping data={item} index={idx} />
        </li>
      ))}
    </ul>
  );
};
