import classNames from 'classnames';
import { ContentMapping } from '../ContentList/ContentMapping';
import { AlignmentType, Content, ItemSize } from '@/helpers/types';

export const DeckList: React.FC<{
  listItems: Array<Content>;
  itemSize: ItemSize;
  itemAlignment: AlignmentType;
  itemLayout: 'horizontal' | 'vertical';
}> = ({ listItems, itemSize, itemAlignment, itemLayout }) => {
  return (
    <div
      className={classNames(
        'flex flex-wrap gap-y-8 justify-center -mx-4',
        {
          'lg:gap-y-10':
            itemSize === 'L' || itemSize === 'XL' || itemSize === '2XL',
        },
        { 'xl:gap-y-12': itemSize === 'XL' || itemSize === '2XL' },
      )}
    >
      {listItems.map((item, idx) => (
        <div
          key={idx}
          className={classNames('px-4 w-full', {
            'lg:basis-11/12 xl:basis-4/5 2xl:basis-3/4 lg:px-5 xl:px-6':
              itemSize === '2XL',
            'lg:basis-1/2 lg:px-5 xl:px-6': itemSize === 'XL',
            'md:basis-1/2 xl:basis-1/3 lg:px-5': itemSize === 'L',
            'sm:basis-1/2 lg:basis-1/3 xl:basis-1/4': itemSize === 'M',
            'basis-1/2 sm:basis-1/3 md:basis-1/4 xl:basis-1/5':
              itemSize === 'S',
          })}
        >
          <ContentMapping
            data={item}
            alignment={itemAlignment}
            layout={itemLayout}
            index={idx}
          />
        </div>
      ))}
    </div>
  );
};
