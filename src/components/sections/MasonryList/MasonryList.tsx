'use client';
import classNames from 'classnames';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { AlignmentType, Content, ItemSize } from '@/helpers/types';
import { ContentMapping } from '../ContentList/ContentMapping';

export const MasonryList: React.FC<{
  listItems: Content[];
  itemSize: ItemSize;
  itemAlignment: AlignmentType;
  itemLayout: 'horizontal' | 'vertical';
}> = ({ listItems, itemSize, itemAlignment, itemLayout }) => {
  return (
    <ResponsiveMasonry
      columnsCountBreakPoints={{
        320: parseInt(
          classNames({
            2: itemSize === 'S',
            1: itemSize === 'M' || 'L' || 'XL' || '2XL',
          }),
        ),
        640: parseInt(
          classNames({
            3: itemSize === 'S',
            2: itemSize === 'M',
            1: itemSize === 'L' || 'XL' || '2XL',
          }),
        ),
        768: parseInt(
          classNames({
            4: itemSize === 'S',
            2: itemSize === 'M' || 'L',
            1: itemSize === 'XL' || '2XL',
          }),
        ),
        1024: parseInt(
          classNames({
            4: itemSize === 'S',
            3: itemSize === 'M',
            2: itemSize === 'L' || 'XL',
            1: itemSize === '2XL',
          }),
        ),
        1280: parseInt(
          classNames({
            5: itemSize === 'S',
            4: itemSize === 'M',
            3: itemSize === 'L',
            2: itemSize === 'XL',
            1: itemSize === '2XL',
          }),
        ),
      }}
    >
      <Masonry
        gutter={classNames({
          '32px': itemSize === 'S' || itemSize === 'M',
          '40px': itemSize === 'L',
          '48px': itemSize === 'XL',
        })}
      >
        {listItems.map((item, idx) => (
          <ContentMapping
            key={idx}
            data={item}
            alignment={itemAlignment}
            layout={itemLayout}
            index={idx}
          />
        ))}
      </Masonry>
    </ResponsiveMasonry>
  );
};
