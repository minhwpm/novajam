import classNames from 'classnames';
import { Section } from '@/components/elements/Section/Section';
import { ContentListType } from '@/helpers/types';
import { CarouselList } from '@/components/sections/CarouselList/CarouselList';
import { MasonryList } from '@/components/sections/MasonryList/MasonryList';
import { DeckList } from '@/components/sections/DeckList/DeckList';
import '@/app/styles/bg-color.css';

export const ContentList: React.FC<{ data: ContentListType }> = ({ data }) => {
  const {
    contentItems,
    listVariant,
    itemSize,
    itemAlignment,
    itemLayout,
    darkMode,
  } = data;
  const layout = data.layout ?? 'full-top';
  return (
    <Section
      className={classNames({
        dark: darkMode,
      })}
      data={data}
      layout={layout}
    >
      <div className="basis-2/3 grow shrink">
        {listVariant === 'carousel' && (
          <CarouselList
            contentItems={contentItems}
            itemSize={itemSize}
            itemAlignment={itemAlignment}
            itemLayout={itemLayout}
          />
        )}
        {listVariant === 'masonry' && (
          <MasonryList
            contentItems={contentItems}
            itemSize={itemSize}
            itemAlignment={itemAlignment}
            itemLayout={itemLayout}
          />
        )}
        {listVariant === 'deck' && (
          <DeckList
            contentItems={contentItems}
            itemSize={itemSize}
            itemAlignment={itemAlignment}
            itemLayout={itemLayout}
          />
        )}
      </div>
    </Section>
  );
};
