"use client"
import classNames from "classnames";
import { useInView } from "react-hook-inview";
import { Section } from "@/components/elements/Section/Section";
import { CTAType } from "@/helpers/types";
import { RichText2 } from "@/components/elements/RichText/RichText2";
import { ButtonGroup } from "@/components/elements/ButtonGroup/ButtonGroup";

export const CTA: React.FC<{data: CTAType} > = ({ data }) => {
  const { heading, content, buttons } = data;

  const [ref, isVisible] = useInView({
    threshold: 0.5,
    onEnter: (entry, observer) => {
      console.log(entry, observer);
    },
  });
  return (
    <Section>
      <div
        ref={ref}
        className={classNames(
          "bg-gradient-to-bl from-primary-800 via-primary-700 to-primary-500 mx-auto px-5 py-16 md:py-20 lg:py-24 xl:py-28 2xl:py-32 lg:w-[70%] lg:will-change-[width] rounded-assets",
          { "lg:animate-expandingWidth": isVisible },
          { "lg:animate-shrinkingWidth": !isVisible }
        )}
      >
        <div className="flex flex-col items-center max-w-3xl mx-auto">
          <div className="text-heading leading-snug font-heading font-semibold text-center text-neutral-100">
            <RichText2 data={heading} />
          </div>
          {content && (
            <div className="text-xl text-neutral-200 text-center mt-8">
              <RichText2 data={content} />
            </div>
          )}
          {buttons.length > 0 && (
            <div className="mt-12">
              <ButtonGroup
                data={data.buttons}
                size="lg"
              />
            </div>
          )}
        </div>
      </div>
    </Section>
  );
}