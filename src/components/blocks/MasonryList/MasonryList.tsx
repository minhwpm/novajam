'use client';
import classNames from 'classnames';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { BlockType, ColumnsType, GapType } from '@/helpers/types';
import { ContentMapping } from '@/components/blocks/ContentMapping/ContentMapping';

export const MasonryList: React.FC<{
  contentItems: BlockType[];
  columns: ColumnsType;
  gap?: GapType;
}> = ({ contentItems, columns, gap = 'base' }) => {
  return (
    <ResponsiveMasonry
      className="w-full"
      columnsCountBreakPoints={{
        320: parseInt(
          classNames({
            2: columns === 5,
            1: columns === 4 || columns === 3 || columns === 2 || columns === 1,
          }),
        ),
        640: parseInt(
          classNames({
            3: columns === 5,
            2: columns === 4,
            1: columns === 3 || columns === 2 || columns === 1,
          }),
        ),
        768: parseInt(
          classNames({
            4: columns === 5,
            2: columns === 4 || columns === 3,
            1: columns === 2 || columns === 1,
          }),
        ),
        1024: parseInt(
          classNames({
            4: columns === 5,
            3: columns === 4,
            2: columns === 3 || columns === 2,
            1: columns === 1,
          }),
        ),
        1280: parseInt(
          classNames({
            5: columns === 5,
            4: columns === 4,
            3: columns === 3,
            2: columns === 2,
            1: columns === 1,
          }),
        ),
      }}
    >
      <Masonry
        gutter={classNames({
          '8px': gap === 'xs',
          '16px': gap === 'sm',
          '24px': gap === 'base',
          '40px': gap === 'lg',
          '64px': gap === 'xl',
        })}
      >
        {contentItems.map((item, idx) => (
          <ContentMapping key={idx} index={idx} data={item} />
        ))}
      </Masonry>
    </ResponsiveMasonry>
  );
};
