import classNames from "classnames";
import { ContentMapping } from "./ContentMapping"
import { TextAlignmentType, Content, ContentSize, ContentOrientationType } from "@/helpers/types";

export const DeckList: React.FC<{
  list: Array<Content>
  size: ContentSize;
  alignment: TextAlignmentType;
  layout: ContentOrientationType;
}> = ({ list, size, alignment, layout }) => {
  return (
    <div className="flex flex-wrap justify-center -mx-2 lg:-mx-3.5">
      {list.map((item, idx) => (
        <div 
          key={item.id} 
          className={classNames(
            "px-2 lg:px-3.5 py-3.5 w-full",
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