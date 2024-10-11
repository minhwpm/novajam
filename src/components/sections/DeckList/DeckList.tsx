import classNames from 'classnames';
import { BlockMapping } from '../ContentList/BlockMapping';
import { BlockType, ItemsPerViewType, AlignmentType } from '@/helpers/types';

export const DeckList: React.FC<{
  blocks: Array<BlockType>;
  itemsPerView: ItemsPerViewType;
  alignment?: AlignmentType;
}> = ({ blocks, itemsPerView, alignment }) => {
  return (
    <ul
      className={classNames('flex flex-wrap gap-y-8 -mx-4', {
        'justify-center': alignment === 'center',
        'justify-end': alignment === 'end',
        'lg:gap-y-10':
          itemsPerView === '3' || itemsPerView === '2' || itemsPerView === '1',
        'xl:gap-y-12': itemsPerView === '2' || itemsPerView === '1',
      })}
    >
      {blocks.map((item, idx) => (
        <li
          key={idx}
          className={classNames('px-4 w-full', {
            'lg:px-5 xl:px-6 lg:max-w-fit': itemsPerView === '1',
            'lg:basis-1/2 lg:px-5 xl:px-6': itemsPerView === '2',
            'md:basis-1/2 xl:basis-1/3 lg:px-5': itemsPerView === '3',
            'sm:basis-1/2 lg:basis-1/3 xl:basis-1/4': itemsPerView === '4',
            'basis-1/2 sm:basis-1/3 md:basis-1/4 xl:basis-1/5':
              itemsPerView === '5',
          })}
        >
          <BlockMapping data={item} index={idx} />
        </li>
      ))}
    </ul>
  );
};
