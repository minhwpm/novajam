'use client'
import classNames from "classnames";
import { useInView } from "react-hook-inview";
import Button from "@/components/elements/Button/Button"
import Section from "@/components/elements/Section/Section";
import { CTAType } from "@/helpers/types";
import RichText from "@/components/elements/RichText/RichText";

const CTA: React.FC<{data: CTAType} > = ({ data }) => {
  const { heading, subheading, buttons } = data;
  // @TODO expanding width on scrolling
  // const [w, setW] = useState(70)

  const [ref, isVisible] = useInView({
    threshold: 0.5,
    onEnter: (entry, observer) => {
      console.log(entry, observer);
    },
    // onLeave: () => setStart(false),
  });
  // console.log("isVisible", isVisible)
  return (
    <Section>
      <div
        ref={ref}
        className={classNames(
          "bg-gradient-to-bl from-primary-800 via-primary-700 to-primary-500 mx-auto px-5 py-16 lg:py-20 xl:py-32 lg:w-[70%] lg:will-change-[width] rounded-assets",
          { "lg:animate-expandingWidth": isVisible },
          { "lg:animate-shrinkingWidth": !isVisible }
        )}
      >
        <div className="flex flex-col items-center max-w-3xl mx-auto">
          <div className="text-heading leading-normal font-heading font-semibold text-center text-neutral-100">
            <RichText htmlString={heading} />
          </div>
          {subheading && (
            <p className="text-xl text-primary-200 text-center mt-8">
              {subheading}
            </p>
          )}
          <div className="mt-12">
            {buttons?.map((button) => (
              <Button
                key={button.id}
                variant={button.buttonVariant ?? "alternate"}
                size="lg"
                url={button.url}
                openNewTab={button.openNewTab}
              >
                {button.text}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

export default CTA