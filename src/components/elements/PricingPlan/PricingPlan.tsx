import { Button } from "../Button/Button"
import { PricingPlanType } from "@/helpers/types"
import classNames from "classnames"
import { RichText2 } from "../RichText/RichText2"

export const PricingPlan: React.FC<{ data: PricingPlanType }> = ({ data }) => {
  const { title, pricing, pricingSuffix, badge, description, ctaButton } = data
  return (
    <div
      className={classNames(
        "flex flex-col gap-6 items-center rounded-assets",
        { "bg-white md:mt-16 shadow-radiant": !badge },
        { "bg-gradient-to-tl from-primary-50 via-primary-100 to-primary-200 mt-6 md:mt-0 shadow-xl": badge }
      )}
    >
      {badge && (
        <div className="relative bottom-5 rounded-assets text-center bg-gradient-to-bl from-primary-800 via-primary-700 to-primary-500 text-white px-6 py-2 font-bold rounded-t-assets tracking-wider">
          {badge}
        </div>
      )}
      <h4
        className={classNames("text-2xl text-primary-600 font-bold", {
          "mt-12": !badge,
        })}
      >
        {title}
      </h4>
      <div className="flex flex-col items-center">
        <div className="text-3xl text-neutral-700 font-bold">{pricing}</div>
        <div className="text-neutral-500 text-sm tracking-wide">
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
        <div className={classNames("leading-loose pt-6 pb-10 px-6 border-t")}>
          <RichText2 data={description} />
        </div>
      )}
    </div>
  );
}