import Section from "@/components/elements/Section/Section";
import classNames from "classnames";
import { ContentListType } from "@/helpers/types";
import Button from "@/components/elements/Button/Button";
import { ContentItem } from "./ContentItem";
import { CarouselList } from "./CarouselList";
import { MasonryList } from "./MasonryList";

const ContentList: React.FC<{ data: ContentListType }> = ({ data }) => {
  const {
    heading,
    label,
    subheading,
    seeAllLink,
    content,
    layout,
    size,
    alignment,
    htmlid,
  } = data;

  return (
    <Section
      label={label}
      heading={heading}
      subheading={subheading}
      id={htmlid}
      framed={ layout !== "carousel" }
    >
      <div className="mt-4">
        {seeAllLink && 
          <div className="w-full flex justify-center -mt-4">
            <Button
            size="lg"
            variant="link"
            url={seeAllLink.url}>
              {seeAllLink.text}
            </Button>
          </div>
        }
        {layout === "carousel" && (
          <CarouselList content={content} size={size} alignment={alignment} />
        )}
        {layout === "masonry" && (
          <MasonryList content={content} size={size} alignment={alignment} />
        )}
        {layout === "deck" && (
          <div className="flex flex-wrap justify-center -mx-3.5 mt-5">
            {content.map((item, idx) => (
              <div 
                key={item.id} 
                className={classNames(
                  "px-3.5 py-3 w-full",
                  { "lg:basis-1/2": size === "XL" },
                  { "md:basis-1/2 xl:basis-1/3": size === "L" },
                  { "sm:basis-1/2 lg:basis-1/3 xl:basis-1/4": size === "M" },
                  { "basis-1/2 sm:basis-1/3 md:basis-1/4 xl:basis-1/5": size === "S" }
                )}
              >
                <ContentItem data={item} alignment={alignment} index={idx} />
              </div>
            ))}
          </div>
        )}
      </div>
    </Section>
  );
};

export default ContentList;
