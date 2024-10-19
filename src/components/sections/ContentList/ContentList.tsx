import classNames from 'classnames';
import { Section } from '@/components/sections/Section/Section';
import { ContentListType } from '@/helpers/types';
import { CarouselList } from '@/components/sections/CarouselList/CarouselList';
import { MasonryList } from '@/components/sections/MasonryList/MasonryList';
import { DeckList } from '@/components/sections/DeckList/DeckList';

export const ContentList: React.FC<{ data: ContentListType }> = ({ data }) => {
  const { blocks, displayMode, itemsPerView, darkMode, alignment } = data;
  const layout = data.layout ?? 'full top';
  return (
    <Section
      className={classNames({
        dark: darkMode,
      })}
      data={data}
      layout={layout}
      framed={displayMode !== 'carousel'}
    >
      <div
        className={classNames('basis-1/3 grow shrink', {
          'lg:max-w-fit': layout === 'flex row',
        })}
      >
        {displayMode === 'carousel' && (
          <CarouselList blocks={blocks} itemsPerView={itemsPerView} />
        )}
        {displayMode === 'masonry' && (
          <MasonryList blocks={blocks} itemsPerView={itemsPerView} />
        )}
        {displayMode === 'deck' && (
          <DeckList
            blocks={blocks}
            itemsPerView={itemsPerView}
            alignment={alignment}
          />
        )}
      </div>
    </Section>
  );
};
