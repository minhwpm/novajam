"use client"
import classNames from "classnames";
import { createContext } from "react"
import { Section } from "@/components/elements/Section/Section";
import { ContentListType } from "@/helpers/types";
import { CarouselLayout } from "@/components/sections/GalleryCarousel/GalleryCarousel";
import { MasonryLayout } from "@/components/sections/GalleryMasonry/GalleryMasonry";
import { DeckLayout } from "@/components/sections/GalleryDeck/GalleryDeck";
import "@/app/styles/bg-color.css";

export const DarkModeContext = createContext(false)
export const ContentList: React.FC<{ data: ContentListType }> = ({ data }) => {
  const {
    displayTitle,
    eyebrow,
    summary,
    buttons,
    contentItems,
    appearanceVariant,
    size,
    headingTextAlignment,
    contentTextAlignment,
    contentOrientation,
    htmlid,
    backgroundColor,
    backgroundImage,
    darkMode,
    sectionSeparator
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
        framed={appearanceVariant !== "carousel"}
        backgroundColor={backgroundColor}
        backgroundImage={backgroundImage}
        sectionSeparator={sectionSeparator}
        darkMode={darkMode}
        className={classNames({
          dark: darkMode,
        })}
      >
        {appearanceVariant === "carousel" && (
          <CarouselLayout
            contentItems={contentItems}
            size={size}
            alignment={contentTextAlignment}
            layout={contentOrientation}
          />
        )}
        {appearanceVariant === "masonry" && (
          <MasonryLayout
            contentItems={contentItems}
            size={size}
            alignment={contentTextAlignment}
            layout={contentOrientation}
          />
        )}
        {appearanceVariant === "deck" && (
          <DeckLayout
            contentItems={contentItems}
            size={size}
            alignment={contentTextAlignment}
            layout={contentOrientation}
          />
        )}
      </Section>
    </DarkModeContext.Provider>
  );
}