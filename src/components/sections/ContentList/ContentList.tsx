import classNames from 'classnames';
import { Section } from '@/components/sections/Section/Section';
import { ContentListType } from '@/helpers/types';
import { CarouselList } from '@/components/sections/CarouselList/CarouselList';
import { MasonryList } from '@/components/sections/MasonryList/MasonryList';
import { DeckList } from '@/components/sections/DeckList/DeckList';
import '@/app/styles/bg-color.css';

export const ContentList: React.FC<{ data: ContentListType }> = ({ data }) => {
  const { blocks, listVariant, itemSize, darkMode, alignment } = data;
  const layout = data.layout ?? 'full top';
  return (
    <Section
      className={classNames({
        dark: darkMode,
      })}
      data={data}
      layout={layout}
      framed={listVariant !== 'carousel'}
    >
      <div
        className={classNames('basis-1/2 grow shrink flex', {
          'justify-center': alignment === 'center',
          'justify-end': alignment === 'end',
        })}
      >
        {listVariant === 'carousel' && (
          <CarouselList blocks={blocks} itemSize={itemSize} />
        )}
        {listVariant === 'masonry' && (
          <MasonryList blocks={blocks} itemSize={itemSize} />
        )}
        {listVariant === 'deck' && (
          <DeckList blocks={blocks} itemSize={itemSize} />
        )}
      </div>
    </Section>
  );
};
