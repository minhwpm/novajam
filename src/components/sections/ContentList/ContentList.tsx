"use client"
import { createContext } from "react"
import { Section } from "@/components/elements/Section/Section";
import { ContentListType } from "@/lib/types";
import { CarouselList } from "./CarouselList";
import { MasonryList } from "./MasonryList";
import { DeckList } from "./DeckList";
import "@/app/styles/bg-color.css";

export const DarkModeContext = createContext(false)
export const ContentList: React.FC<{ data: ContentListType }> = ({ data }) => {
  const {
    heading,
    eyebrow,
    summary,
    buttons,
    content,
    appearanceVariant,
    size,
    headingTextAlignment,
    contentTextAlignment,
    contentOrientation,
    htmlid,
    backgroundColor,
    backgroundImage,
    enableParallaxBackground,
    darkMode
  } = data;
  return (
    <DarkModeContext.Provider value={darkMode}>
      <Section
        id={htmlid}
        eyebrow={eyebrow}
        heading={heading}
        summary={summary}
        buttons={buttons}
        alignment={headingTextAlignment}
        framed={appearanceVariant !== "carousel"}
        backgroundColor={backgroundColor}
        backgroundImage={backgroundImage}
        enableParallaxBackground={enableParallaxBackground}
        darkMode={darkMode}
      >
        {appearanceVariant === "carousel" && (
          <CarouselList
            list={content}
            size={size}
            alignment={contentTextAlignment}
            layout={contentOrientation}
          />
        )}
        {appearanceVariant === "masonry" && (
          <MasonryList
            list={content}
            size={size}
            alignment={contentTextAlignment}
            layout={contentOrientation}
          />
        )}
        {appearanceVariant === "deck" && (
          <DeckList
            list={content}
            size={size}
            alignment={contentTextAlignment}
            layout={contentOrientation}
          />
        )}
      </Section>
    </DarkModeContext.Provider>
  );
}