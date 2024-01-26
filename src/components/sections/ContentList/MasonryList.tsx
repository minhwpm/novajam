"use client"
import classNames from "classnames";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { AlignmentType, Content, ContentSize } from "@/helpers/types";
import { ContentMapping } from "./ContentMapping";

export const MasonryList: React.FC<{
  list: Content[];
  size: ContentSize;
  alignment: AlignmentType;
}> = ({ list, size, alignment }) => {
  return (
    <ResponsiveMasonry
      columnsCountBreakPoints={{
        320: 1,
        640: parseInt(
          classNames(
            { 3: size === "S" },
            { 2: size === "M" },
            { 1: size === "L" },
            { 1: size === "XL" },
          )
        ),
        768: parseInt(
          classNames(
            { 4: size === "S" },
            { 2: size === "M" },
            { 2: size === "L" },
            { 1: size === "XL" },
          )
        ),
        1024: parseInt(
          classNames(
            { 4: size === "S" },
            { 3: size === "M" },
            { 2: size === "L" },
            { 2: size === "XL" }
          )
        ),
        1280: parseInt(
          classNames(
            { 5: size === "S" },
            { 4: size === "M" },
            { 3: size === "L" },
            { 2: size === "XL" }
          )
        ),
      }}
    >
      <Masonry gutter="24px">
        {list.map((item, idx) => (
          <ContentMapping key={item.id} data={item} alignment={alignment} index={idx} />
        ))}
      </Masonry>
    </ResponsiveMasonry>
  )
}