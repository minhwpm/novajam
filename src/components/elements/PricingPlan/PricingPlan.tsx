import { Button } from "../Button/Button"
import { PricingPlanType } from "@/helpers/types"
import classNames from "classnames"
import { RichText2 } from "../RichText/RichText2"

export const PricingPlan: React.FC<{ data: PricingPlanType }> = ({ data }) => {
  const { title, pricing, pricingSuffix, badge, description, ctaButton } = data
  return (
    <div
      className={classNames(
        "flex flex-col gap-4 items-center rounded-assets shadow-radiant",
        { "bg-white mt-16": !badge },
        { "bg-primary-50 mt-0 border-2 border-primary-100": badge }
      )}
    >
      {badge && (
        <div className="w-full text-center bg-secondary-500 border-2 border-secondary-500 text-white px-3 py-2 font-bold rounded-t-assets tracking-wider">
          {badge}
        </div>
      )}
      <h4 className={classNames("text-2xl text-neutral-700 font-bold",
        { "mt-12": !badge },
        { "mt-8": badge },
      )}>{title}</h4>
      <div className="flex flex-col items-center">
        <div className="text-3xl font-bold">{pricing}</div>
        <div className="text-neutral-400 text-sm tracking-wide">{pricingSuffix}</div>
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
      <div className={classNames("leading-loose pt-6 pb-10 px-6 border-t", {})}>
        {description && <RichText2 data={description} /> }
      </div>
    </div>
  );
}