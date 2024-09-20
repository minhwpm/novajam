'use client';
import classNames from 'classnames';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { TextAlignmentType, Content, ItemSize } from '@/helpers/types';
import { ContentMapping } from '../Gallery/ContentMapping';

export const MasonryLayout: React.FC<{
  contentItems: Content[];
  size: ItemSize;
  alignment: TextAlignmentType;
  layout: 'horizontal' | 'vertical';
}> = ({ contentItems, size, alignment, layout }) => {
  return (
    <ResponsiveMasonry
      className="pt-3.5"
      columnsCountBreakPoints={{
        320: parseInt(
          classNames(
            { 2: size === 'S' },
            { 1: size === 'M' },
            { 1: size === 'L' },
            { 1: size === 'XL' },
          ),
        ),
        640: parseInt(
          classNames(
            { 3: size === 'S' },
            { 2: size === 'M' },
            { 1: size === 'L' },
            { 1: size === 'XL' },
          ),
        ),
        768: parseInt(
          classNames(
            { 4: size === 'S' },
            { 2: size === 'M' },
            { 2: size === 'L' },
            { 1: size === 'XL' },
          ),
        ),
        1024: parseInt(
          classNames(
            { 4: size === 'S' },
            { 3: size === 'M' },
            { 2: size === 'L' },
            { 2: size === 'XL' },
          ),
        ),
        1280: parseInt(
          classNames(
            { 5: size === 'S' },
            { 4: size === 'M' },
            { 3: size === 'L' },
            { 2: size === 'XL' },
          ),
        ),
      }}
    >
      <Masonry
        gutter={classNames(
          { '32px': size === 'S' || size === 'M' },
          { '40px': size === 'L' },
          { '48px': size === 'XL' },
        )}
      >
        {contentItems.map((item, idx) => (
          <ContentMapping
            key={idx}
            data={item}
            alignment={alignment}
            layout={layout}
            index={idx}
          />
        ))}
      </Masonry>
    </ResponsiveMasonry>
  );
};
