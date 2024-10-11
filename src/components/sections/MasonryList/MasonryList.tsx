'use client';
import classNames from 'classnames';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { BlockType, ItemsPerViewType } from '@/helpers/types';
import { BlockMapping } from '../ContentList/BlockMapping';

export const MasonryList: React.FC<{
  blocks: BlockType[];
  itemsPerView: ItemsPerViewType;
}> = ({ blocks, itemsPerView }) => {
  return (
    <ResponsiveMasonry
      columnsCountBreakPoints={{
        320: parseInt(
          classNames({
            2: itemsPerView === '5',
            1: itemsPerView === '4' || 3 || 2 || 1,
          }),
        ),
        640: parseInt(
          classNames({
            3: itemsPerView === '5',
            2: itemsPerView === '4',
            1: itemsPerView === '3' || 2 || 1,
          }),
        ),
        768: parseInt(
          classNames({
            4: itemsPerView === '5',
            2: itemsPerView === '4' || 3,
            1: itemsPerView === '2' || 1,
          }),
        ),
        1024: parseInt(
          classNames({
            4: itemsPerView === '5',
            3: itemsPerView === '4',
            2: itemsPerView === '3' || 2,
            1: itemsPerView === '1',
          }),
        ),
        1280: parseInt(
          classNames({
            5: itemsPerView === '5',
            4: itemsPerView === '4',
            3: itemsPerView === '3',
            2: itemsPerView === '2',
            1: itemsPerView === '1',
          }),
        ),
      }}
    >
      <Masonry
        gutter={classNames({
          '32px': itemsPerView === '5' || itemsPerView === '4',
          '40px': itemsPerView === '3',
          '48px': itemsPerView === '2',
        })}
      >
        {blocks.map((item, idx) => (
          <BlockMapping key={idx} index={idx} data={item} />
        ))}
      </Masonry>
    </ResponsiveMasonry>
  );
};
