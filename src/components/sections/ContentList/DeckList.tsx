import classNames from "classnames";
import { ContentMapping } from "./ContentMapping"
import { AlignmentType, Content, ContentSize } from "@/helpers/types";

export const DeckList: React.FC<{
  list: Array<Content>
  size: ContentSize;
  alignment: AlignmentType;
}> = ({ list, size, alignment }) => {
  return (
    <div className="flex flex-wrap justify-center -mx-2 lg:-mx-4">
      {list.map((item, idx) => (
        <div 
          key={item.id} 
          className={classNames(
            "p-2 lg:p-4 2xl:p-4 w-full",
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
  )
}