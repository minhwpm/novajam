import { Section } from "@/components/elements/Section/Section";
import classNames from "classnames";
import { ContentListType } from "@/helpers/types";
import { Button } from "@/components/elements/Button/Button";
import { ContentMapping } from "./ContentMapping";
import { CarouselList } from "./CarouselList";
import { MasonryList } from "./MasonryList";
import "@/app/css/bg-color.css";

export const ContentList: React.FC<{ data: ContentListType }> = ({ data }) => {
  const {
    heading,
    label,
    summary,
    seeAllLink,
    content,
    layout,
    size,
    alignment,
    htmlid,
    backgroundColor
  } = data;

  return (
    <Section
      id={htmlid}
      className={classNames(`${backgroundColor}-section-bg-color`)}
      label={label}
      heading={heading}
      summary={summary}
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
          <div className="flex flex-wrap justify-center -mx-3 mt-5">
            {content.map((item, idx) => (
              <div 
                key={item.id} 
                className={classNames(
                  "px-3 py-3 w-full",
                  { "lg:basis-1/2": size === "XL" },
                  { "md:basis-1/2 xl:basis-1/3": size === "L" },
                  { "sm:basis-1/2 lg:basis-1/3 xl:basis-1/4": size === "M" },
                  { "basis-1/2 sm:basis-1/3 md:basis-1/4 xl:basis-1/5": size === "S" }
                )}
              >
                <ContentMapping data={item} alignment={alignment} index={idx} />
              </div>
            ))}
          </div>
        )}
        {layout === "spotlight" && (
          <div className="grid lg:grid-cols-12 gap-10">
            <div className={classNames(
              { "lg:col-span-7 xl:col-span-8 2xl:col-span-9": size === "XL"},
              { "lg:col-span-6 xl:col-span-7 2xl:col-span-8": size === "L"},
              { "lg:col-span-5 xl:col-span-6 2xl:col-span-7": size === "M"},
              { "lg:col-span-4 xl:col-span-5 2xl:col-span-6": size === "S"},
            )}>
              <ContentMapping data={content[0]} alignment={alignment} index={0} />
            </div>
            <div className={classNames("flex flex-col gap-y-10",
              { "lg:col-span-5 xl:col-span-4 2xl:col-span-3": size === "XL"},
              { "lg:col-span-6 xl:col-span-5 2xl:col-span-4": size === "L"},
              { "lg:col-span-7 xl:col-span-6 2xl:col-span-5": size === "M"},
              { "lg:col-span-8 xl:col-span-7 2xl:col-span-6": size === "S"},
            )}>
              {content.slice(1).map((item, idx) => (
                <ContentMapping key={item.id} data={item} alignment={alignment} layout="horizontal" index={idx} />
              ))}
            </div>
          </div>
        )}
      </div>
    </Section>
  )
}