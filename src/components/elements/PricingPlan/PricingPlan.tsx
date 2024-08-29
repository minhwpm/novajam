import classNames from "classnames";
import { useContext } from "react";
import { useInView } from "react-hook-inview";
import { Button } from "@/components/elements/Button/Button";
import { DarkModeContext } from "@/components/sections/ContentList/ContentList";
import { TextAlignmentType, PricingPlanType } from "@/helpers/types";
import { MarkdownRenderer } from "../MarkdownRenderer/MarkdownRenderer";

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
        "relative flex flex-col gap-6 items-center rounded-theme bg-white py-10",
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
        className={classNames(" font-semibold tracking-wide", {
          "text-primary-600": !darkMode,
          "text-primary-400": darkMode,
        })}
      >
        {title}
      </h4>
      <div className="flex flex-col items-center">
        <div
          className={classNames(
            "text-4xl xl:text-5xl font-bold",
            { "text-neutral-50": darkMode },
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
      {ctaButton && (
        <div>
          <Button
            data={ctaButton}
            size="base"
          >
            {ctaButton.text}
          </Button>
        </div>
      )}
      {description && (
        <div
          className={classNames(
            "pt-6 px-6 border-t prose leading-loose",
            { "text-white/70 border-slate-700": darkMode },
            { "text-center": alignment === "center" },
            { "text-end": alignment === "end" }
          )}
        >
          <MarkdownRenderer>{description}</MarkdownRenderer>
        </div>
      )}
    </div>
  );
};
