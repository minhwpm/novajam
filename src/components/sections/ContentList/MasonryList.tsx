"use client"
import classNames from "classnames";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { AlignmentType, Content, ContentSize } from "@/helpers/types";
import { ContentItem } from "./ContentItem";

export const MasonryList: React.FC<{
  content: Content[];
  size: ContentSize;
  alignment: AlignmentType;
}> = ({ content, size, alignment }) => {
  return (
    <ResponsiveMasonry
      columnsCountBreakPoints={{
        320: 1,
        768: 2,
        1024: parseInt(
          classNames(
            { 5: size === "S" },
            { 4: size === "M" },
            { 3: size === "L" },
            { 2: size === "XL" }
          )
        ),
      }}
    >
      <Masonry columnsCount={3} gutter="25px">
        {content.map((item, idx) => (
          <div key={item.id} className="">
            <ContentItem data={item} alignment={alignment} index={idx} />
          </div>
        ))}
      </Masonry>
    </ResponsiveMasonry>
  )
}