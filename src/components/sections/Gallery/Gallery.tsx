'use client';
import classNames from 'classnames';
import { createContext } from 'react';
import { Section } from '@/components/elements/Section/Section';
import { ContentListType } from '@/helpers/types';
import { CarouselLayout } from '@/components/sections/GalleryCarousel/GalleryCarousel';
import { MasonryLayout } from '@/components/sections/GalleryMasonry/GalleryMasonry';
import { DeckLayout } from '@/components/sections/GalleryDeck/GalleryDeck';
import '@/app/styles/bg-color.css';

export const DarkModeContext = createContext(false);
export const ContentList: React.FC<{ data: ContentListType }> = ({ data }) => {
  const {
    displayTitle,
    eyebrow,
    summary,
    buttons,
    contentItems,
    layout,
    itemSize,
    headingTextAlignment,
    itemTextAlignment,
    itemLayout,
    htmlid,
    backgroundColor,
    backgroundImage,
    darkMode,
    sectionSeparator,
  } = data;
  return (
    <DarkModeContext.Provider value={darkMode}>
      <Section
        id={htmlid}
        eyebrow={eyebrow}
        heading={displayTitle}
        summary={summary}
        buttons={buttons}
        alignment={headingTextAlignment}
        framed={layout !== 'carousel'}
        backgroundColor={backgroundColor}
        backgroundImage={backgroundImage}
        sectionSeparator={sectionSeparator}
        darkMode={darkMode}
        className={classNames({
          dark: darkMode,
        })}
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
    </DarkModeContext.Provider>
  );
};
