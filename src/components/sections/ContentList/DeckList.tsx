import classNames from "classnames";
import { ContentMapping } from "./ContentMapping"
import { TextAlignmentType, Content, ContentSize, ContentOrientationType } from "@/lib/types";

export const DeckList: React.FC<{
  list: Array<Content>
  size: ContentSize;
  alignment: TextAlignmentType;
  layout: ContentOrientationType;
}> = ({ list, size, alignment, layout }) => {
  return (
    <div className="flex flex-wrap justify-center -mx-4">
      {list.map((item, idx) => (
        <div 
          key={idx} 
          className={classNames(
            "p-4 w-full",
            { "lg:basis-1/2": size === "XL" },
            { "md:basis-1/2 xl:basis-1/3": size === "L" },
            { "sm:basis-1/2 lg:basis-1/3 xl:basis-1/4": size === "M" },
            { "basis-1/2 sm:basis-1/3 md:basis-1/4 xl:basis-1/5": size === "S" }
          )}
        >
          <ContentMapping data={item} alignment={alignment} layout={layout} index={idx} />
        </div>
      ))}
    </div>
  )
}