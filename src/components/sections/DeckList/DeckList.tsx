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
    <div className="flex flex-wrap justify-center -mx-4">
      {listItems.map((item, idx) => (
        <div
          key={idx}
          className={classNames('p-4 w-full', {
            'lg:basis-11/12 xl:basis-4/5 2xl:basis-3/4 lg:p-5 xl:p-6':
              itemSize === '2XL',
            'lg:basis-1/2 lg:p-5 xl:p-6': itemSize === 'XL',
            'md:basis-1/2 xl:basis-1/3 lg:p-5': itemSize === 'L',
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
