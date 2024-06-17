import { useContext } from "react";
import classNames from "classnames";
import { Button } from "../Button/Button";
import { TextAlignmentType, PricingPlanType } from "@/lib/types";
import { RichText } from "../RichText/RichText";
import { DarkModeContext } from "@/components/sections/ContentList/ContentList";
import { useInView } from "react-hook-inview";

export const PricingPlan: React.FC<{
  data: PricingPlanType;
  alignment?: TextAlignmentType;
  animate?: boolean;
}> = ({ data, alignment, animate }) => {
  const darkMode = useContext(DarkModeContext);
  const { title, pricing, pricingSuffix, badge, description, ctaButton } = data;
  const [ref, isIntersecting] = useInView({
    threshold: 0.4,
    unobserveOnEnter: true,
  });
  return (
    <div
      ref={ref}
      className={classNames(
        "relative flex flex-col gap-6 items-center rounded-theme bg-white shadow-radiant",
        { "-bottom-10 opacity-0": animate },
        { "animate-slidingUpContent animation-delay-150": isIntersecting && animate },
        { "bg-opacity-5": darkMode }
      )}
    >
      {badge && (
        <div className="absolute -top-5 rounded-theme-button text-center bg-primary-600 text-neutral-50 px-4 py-2 font-bold tracking-wider">
          {badge}
        </div>
      )}
      <h4
        className={classNames("text-2xl font-bold", {
          "text-primary-600 mt-12": true,
        })}
      >
        {title}
      </h4>
      <div className="flex flex-col items-center">
        <div
          className={classNames(
            "text-3xl font-bold",
            { "text-neutral-50": darkMode },
            { "text-neutral-600": !darkMode }
          )}
        >
          {pricing}
        </div>
        <div
          className={classNames(
            "text-sm tracking-wide",
            { "text-neutral-300": darkMode },
            { "text-neutral-500": !darkMode },
          )}
        >
          {pricingSuffix}
        </div>
      </div>
      <div>
        <Button
          data={ctaButton}
          size="base"
        >
          {ctaButton.text}
        </Button>
      </div>
      {description && (
        <div
          className={classNames(
            "pt-6 pb-10 px-6 border-t prose 2xl:prose-lg",
            { "text-neutral-200": darkMode },
            { "text-center": alignment === "center" },
            { "text-end": alignment === "end" }
          )}
        >
          <RichText data={description} />
        </div>
      )}
    </div>
  );
};
