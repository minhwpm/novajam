import classNames from 'classnames';
import { BlockMapping } from '../ContentList/BlockMapping';
import { BlockType, ItemSize, AlignmentType } from '@/helpers/types';

export const DeckList: React.FC<{
  blocks: Array<BlockType>;
  itemSize: ItemSize;
  alignment?: AlignmentType;
}> = ({ blocks, itemSize, alignment }) => {
  return (
    <div
      className={classNames('flex flex-wrap gap-y-8 -mx-4', {
        'justify-center': alignment === 'center',
        'justify-end': alignment === 'end',
        'lg:gap-y-10':
          itemSize === 'L' || itemSize === 'XL' || itemSize === '2XL',
        'xl:gap-y-12': itemSize === 'XL' || itemSize === '2XL',
      })}
    >
      {blocks.map((item, idx) => (
        <div
          key={idx}
          className={classNames('px-4 w-full', {
            'lg:px-5 xl:px-6 lg:max-w-fit': itemSize === '2XL',
            'lg:basis-1/2 lg:px-5 xl:px-6': itemSize === 'XL',
            'md:basis-1/2 xl:basis-1/3 lg:px-5': itemSize === 'L',
            'sm:basis-1/2 lg:basis-1/3 xl:basis-1/4': itemSize === 'M',
            'basis-1/2 sm:basis-1/3 md:basis-1/4 xl:basis-1/5':
              itemSize === 'S',
          })}
        >
          <BlockMapping data={item} index={idx} />
        </div>
      ))}
    </div>
  );
};
