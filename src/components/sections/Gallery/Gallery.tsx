'use client';
import classNames from 'classnames';
import { Section } from '@/components/elements/Section/Section';
import { ContentListType } from '@/helpers/types';
import { CarouselLayout } from '@/components/sections/GalleryCarousel/GalleryCarousel';
import { MasonryLayout } from '@/components/sections/GalleryMasonry/GalleryMasonry';
import { DeckLayout } from '@/components/sections/GalleryDeck/GalleryDeck';
import '@/app/styles/bg-color.css';

export const ContentList: React.FC<{ data: ContentListType }> = ({ data }) => {
  const {
    contentItems,
    layout,
    itemSize,
    itemTextAlignment,
    itemLayout,
    darkMode,
  } = data;
  return (
    <Section
      className={classNames({
        dark: darkMode,
      })}
      data={data}
    >
      {layout === 'carousel' && (
        <CarouselLayout
          contentItems={contentItems}
          size={itemSize}
          alignment={itemTextAlignment}
          layout={itemLayout}
        />
      )}
      {layout === 'masonry' && (
        <MasonryLayout
          contentItems={contentItems}
          size={itemSize}
          alignment={itemTextAlignment}
          layout={itemLayout}
        />
      )}
      {layout === 'deck' && (
        <DeckLayout
          contentItems={contentItems}
          size={itemSize}
          alignment={itemTextAlignment}
          layout={itemLayout}
        />
      )}
    </Section>
  );
};
