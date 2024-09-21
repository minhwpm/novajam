import classNames from 'classnames';
import { ContentMapping } from '../Gallery/ContentMapping';
import { TextAlignmentType, Content, ItemSize } from '@/helpers/types';

export const DeckLayout: React.FC<{
  contentItems: Array<Content>;
  size: ItemSize;
  alignment: TextAlignmentType;
  layout: 'horizontal' | 'vertical';
}> = ({ contentItems, size, alignment, layout }) => {
  return (
    <div className="flex flex-wrap justify-center -mx-4">
      {contentItems.map((item, idx) => (
        <div
          key={idx}
          className={classNames('p-4 w-full', {
            'lg:basis-11/12 xl:basis-4/5 2xl:basis-3/4 lg:p-5 xl:p-6':
              size === '2XL',
            'lg:basis-1/2 lg:p-5 xl:p-6': size === 'XL',
            'md:basis-1/2 xl:basis-1/3 lg:p-5': size === 'L',
            'sm:basis-1/2 lg:basis-1/3 xl:basis-1/4': size === 'M',
            'basis-1/2 sm:basis-1/3 md:basis-1/4 xl:basis-1/5': size === 'S',
          })}
        >
          <ContentMapping
            data={item}
            alignment={alignment}
            layout={layout}
            index={idx}
          />
        </div>
      ))}
    </div>
  );
};
