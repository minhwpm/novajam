"use client"
import classNames from "classnames";
import { createContext } from "react"
import { Section } from "@/components/elements/Section/Section";
import { ContentListType } from "@/helpers/types";
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
    exploreMore,
    content,
    appearanceVariant,
    size,
    headingTextAlignment,
    contentTextAlignment,
    contentOrientation,
    htmlid,
    backgroundColor,
    backgroundImage,
    darkMode
  } = data;
  return (
    <DarkModeContext.Provider value={darkMode}>
      <Section
        id={htmlid}
        className={classNames(
          `${backgroundColor}-${darkMode ? "dark-" : ""}section-bg-color`
        )}
        eyebrow={eyebrow}
        heading={heading}
        summary={summary}
        alignment={headingTextAlignment}
        framed={appearanceVariant !== "carousel"}
        backgroundImage={backgroundImage}
        darkMode={darkMode}
        additionalLink={exploreMore}
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