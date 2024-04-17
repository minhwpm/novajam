import classNames from "classnames";
import { TextAlignmentType, TestimonialType } from "@/helpers/types";
import { RichText } from "@/components/elements/RichText/RichText";
import { MediaItem } from "../MediaItem/MediaItem";
import { AiFillStar } from "react-icons/ai";
import { useInView } from "react-hook-inview";

export const Testimonial: React.FC<{
  data: TestimonialType;
  alignment?: TextAlignmentType;
  animate?: boolean;
}> = ({ data, alignment = "center", animate }) => {
  const { content, portrait, name, role, rating } = data;
  const [ref, isIntersecting] = useInView({
    threshold: 0.4,
    unobserveOnEnter: true,
  });
  return (
    <div
      ref={ref}
      className={classNames(
        "px-4 pt-4 pb-6 lg:px-6 lg:pt-6 lg:pb-8 flex flex-col rounded-assets bg-white",
        { "relative -bottom-10 opacity-0": animate },
        {
          "animate-slidingUpContent animation-delay-150":
            isIntersecting && animate,
        },
        { "items-center": alignment === "center" },
        { "items-end": alignment === "end" }
      )}
    >
      <div
        className={classNames(
          "prose 2xl:prose-lg mb-6",
          { "text-center": alignment === "center" },
          { "text-end": alignment === "end" }
        )}
      >
        <RichText data={content} />
      </div>
      {rating > 0 && (
        <div className="flex gap-2 mb-6">
          {new Array(rating).fill(0).map((_item, idx) => (
            <AiFillStar key={idx} className="text-primary-600" size={20} />
          ))}
        </div>
      )}
      <div
        className={classNames(
          "flex flex-wrap items-center gap-4",
          { "justify-center": alignment === "center" },
          { "justify-end": alignment === "end" }
        )}
      >
        {portrait && (
          <div className="w-12 h-12">
            <MediaItem data={portrait} aspectRatio="square" rounded="full" />
          </div>
        )}

        {(name || role) && (
          <div className="flex flex-col">
            <div className="font-semibold">{name}</div>
            <div className="text-neutral-500 text-sm">{role}</div>
          </div>
        )}
      </div>
    </div>
  );
};
