"use client"
import classNames from "classnames";
import { createContext } from "react"
import { Section } from "@/components/elements/Section/Section";
import { ContentListType } from "@/helpers/types";
import { Button } from "@/components/elements/Button/Button";
import { CarouselList } from "./CarouselList";
import { MasonryList } from "./MasonryList";
import { DeckList } from "./DeckList";
import { SpotlightList } from "./SpotlightList";
import "@/app/css/bg-color.css";

// @TODO refactor this and other files related to darkMode
export const DarkModeContext = createContext(false)

export const ContentList: React.FC<{ data: ContentListType }> = ({ data }) => {
  const {
    heading,
    eyebrow,
    summary,
    seeAllLink,
    content,
    layout,
    size,
    alignment,
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
        framed={ layout !== "carousel" }
        backgroundImage={backgroundImage}
        darkMode={darkMode}
      >
        {/* @TODO rename seeAllLink -> additionalLink */}
        {seeAllLink && 
          <div className="w-full flex justify-center -mt-8 mb-4">
            <Button
            size="lg"
            variant="arrow"
            url={seeAllLink.url}>
              {seeAllLink.text}
            </Button>
          </div>
        }
        {layout === "carousel" && (
          <CarouselList list={content} size={size} alignment={alignment} />
        )}
        {layout === "masonry" && (
          <MasonryList list={content} size={size} alignment={alignment} />
        )}
        {layout === "deck" && (
          <DeckList list={content} size={size} alignment={alignment} />
        )}
        {layout === "spotlight" && (
          <SpotlightList list={content} size={size} alignment={alignment} />
        )}
      </Section>
    </DarkModeContext.Provider>
  )
}