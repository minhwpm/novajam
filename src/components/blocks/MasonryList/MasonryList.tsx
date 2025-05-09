'use client';
import classNames from 'classnames';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { BlockType, ContentListType, GapType } from '@/lib/types';
import { ContentMapping } from '@/components/blocks/ContentMapping/ContentMapping';

const columnBreakpoints = {
  320: { 6: 2, 5: 2, 4: 1, 3: 1, 2: 1, 1: 1 },
  640: { 6: 3, 5: 3, 4: 2, 3: 1, 2: 1, 1: 1 },
  768: { 6: 4, 5: 4, 4: 2, 3: 2, 2: 1, 1: 1 },
  1024: { 6: 5, 5: 4, 4: 3, 3: 2, 2: 2, 1: 1 },
  1280: { 6: 6, 5: 5, 4: 4, 3: 3, 2: 2, 1: 1 },
};

export const MasonryList: React.FC<{
  contentItems: BlockType[];
  columns: ContentListType['columns'];
  gap?: GapType;
}> = ({ contentItems, columns, gap = 'base' }) => {
  const columnsCountBreakPoints = Object.fromEntries(
    Object.entries(columnBreakpoints).map(([breakpoint, mapping]) => [
      Number(breakpoint),
      columns ? mapping[columns] : 1,
    ]),
  );

  return (
    <ResponsiveMasonry
      className="w-full"
      columnsCountBreakPoints={columnsCountBreakPoints}
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
          <ContentMapping
            key={idx}
            index={idx}
            data={item}
            itemsPerRow={columns ?? 1}
          />
        ))}
      </Masonry>
    </ResponsiveMasonry>
  );
};
