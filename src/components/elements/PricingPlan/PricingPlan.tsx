import { useContext } from "react";
import classNames from "classnames";
import { Button } from "../Button/Button";
import { AlignmentType, PricingPlanType } from "@/helpers/types";
import { RichText2 } from "../RichText/RichText";
import { DarkModeContext } from "@/components/sections/ContentList/ContentList";

export const PricingPlan: React.FC<{
  data: PricingPlanType;
  alignment?: AlignmentType;
}> = ({ data, alignment }) => {
  const darkMode = useContext(DarkModeContext);
  const { title, pricing, pricingSuffix, badge, description, ctaButton } = data;
  return (
    <div
      className={classNames(
        "flex flex-col gap-6 items-center rounded-assets",
        { "bg-white md:mt-16 shadow-radiant": !badge },
        {
          "bg-gradient-to-tl from-primary-600 to-primary-700 mt-6 md:mt-0 shadow-xl text-neutral-50":
            badge,
        },
        { "bg-opacity-5": darkMode && !badge }
      )}
    >
      {badge && (
        <div className="relative bottom-5 rounded-assets text-center bg-gradient-to-bl from-primary-200 via-primary-100 to-primary-50 text-primary-600 px-6 py-2 font-bold rounded-t-assets tracking-wider">
          {badge}
        </div>
      )}
      <h4
        className={classNames("text-2xl font-bold", {
          "text-primary-600 mt-12": !badge,
        })}
      >
        {title}
      </h4>
      <div className="flex flex-col items-center">
        <div
          className={classNames(
            "text-3xl font-bold",
            { "text-neutral-50": darkMode && !badge },
            { "text-neutral-700": !darkMode && !badge }
          )}
        >
          {pricing}
        </div>
        <div
          className={classNames(
            "text-sm tracking-wide",
            { "text-neutral-300": darkMode && !badge },
            { "text-neutral-500": !darkMode && !badge },
            { "text-neutral-200": badge }
          )}
        >
          {pricingSuffix}
        </div>
      </div>
      <div>
        <Button
          url={ctaButton.url}
          variant={ctaButton.buttonVariant}
          openNewTab={ctaButton.openNewTab}
        >
          {ctaButton.text}
        </Button>
      </div>
      {description && (
        <div
          className={classNames(
            "leading-loose pt-6 pb-10 px-6 border-t",
            { "text-neutral-200": darkMode },
            { "text-center": alignment === "center" },
            { "text-end": alignment === "end" }
          )}
        >
          <RichText2 data={description} />
        </div>
      )}
    </div>
  );
};
