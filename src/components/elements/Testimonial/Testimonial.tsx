import classNames from "classnames";
import { AlignmentType,  TestimonialType } from "@/helpers/types";
import { RichText2 } from "@/components/elements/RichText/RichText2"
import { MediaItem } from "../MediaItem/MediaItem";

export const Testimonial: React.FC<{
  data: TestimonialType;
  alignment?: AlignmentType
}> = ({
  data, alignment = 'center'
}) => {
  const { content, portrait, name, role } = data;
  return (
    <div className={classNames("px-4 pt-4 pb-6 lg:px-6 lg:pt-6 lg:pb-8 flex flex-col rounded-assets bg-white",
      {"items-center" : alignment === "center"},
      {"items-end" : alignment === "reverse"},
    )}>
      
      <div
        className={classNames(
          "prose 2xl:prose-lg mb-6",
          { "text-center": alignment === "center" },
          { "text-end": alignment === "reverse" }
        )}
      >
        <RichText2 data={content} />
      </div>
      {portrait && (
        <div className="w-20 h-20">
          <MediaItem data={portrait} aspectRatio="square" rounded="full"/>
        </div>
      )}
      {(name || role) && (
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="font-semibold">
            {name}
          </span>
          <span>
            {role}
          </span>
        </div>
      )}
    </div>
  );
};
