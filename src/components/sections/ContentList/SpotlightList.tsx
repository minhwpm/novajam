import classNames from "classnames";
import { ContentMapping } from "./ContentMapping"
import { AlignmentType, Content, ContentSize } from "@/helpers/types";

export const SpotlightList: React.FC<{
  list: Array<Content>
  size: ContentSize;
  alignment: AlignmentType;
}> = ({ list, size, alignment }) => {
  return (
    <div className="grid lg:grid-cols-12 gap-10">
      <div className={classNames(
        { "lg:col-span-7 xl:col-span-8 2xl:col-span-9": size === "XL"},
        { "lg:col-span-6 xl:col-span-7 2xl:col-span-8": size === "L"},
        { "lg:col-span-5 xl:col-span-6 2xl:col-span-7": size === "M"},
        { "lg:col-span-4 xl:col-span-5 2xl:col-span-6": size === "S"},
      )}>
        <ContentMapping data={list[0]} alignment={alignment} index={0} />
      </div>
      <div className={classNames("flex flex-col gap-y-10",
        { "lg:col-span-5 xl:col-span-4 2xl:col-span-3": size === "XL"},
        { "lg:col-span-6 xl:col-span-5 2xl:col-span-4": size === "L"},
        { "lg:col-span-7 xl:col-span-6 2xl:col-span-5": size === "M"},
        { "lg:col-span-8 xl:col-span-7 2xl:col-span-6": size === "S"},
      )}>
        {list.slice(1).map((item, idx) => (
          <ContentMapping key={item.id} data={item} alignment={alignment} layout="horizontal" index={idx} />
        ))}
      </div>
    </div>
  )
}