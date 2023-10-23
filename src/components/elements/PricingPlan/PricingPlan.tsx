import { PricingPlanType } from "@/helpers/types"
import Button from "../Button/Button"
import { BsCheckLg } from "react-icons/bs"
import classNames from "classnames"

export const PricingPlan: React.FC<{ data: PricingPlanType }> = ({ data }) => {
  const { title, pricing, pricingSuffix, badge, features, ctaButton } = data
  return (
    <div className={classNames("relative flex flex-col gap-5 items-center pt-12 pb-6 px-4 rounded-md border shadow",
      { "mt-8": !badge },
      { "bg-primary-100 mt-0": badge},
    )}>
      <h4 className="text-2xl font-bold">
        {title}
      </h4>
      <div className="flex flex-col items-center">
        <div className="text-xl font-bold">
          {pricing}
        </div>
        <div className="text-neutral-500 text-sm">
          {pricingSuffix}
        </div>
      </div>
      {badge && (
        <div className="absolute -top-4 bg-primary-700 text-white px-3 py-1 font-bold rounded-sm">
          {badge}
        </div>
      )}

      <div>
        <Button url={ctaButton.url} variant={ctaButton.buttonVariant}>
          {ctaButton.text}
        </Button>
      </div>
      <ul className={classNames("leading-loose py-4 border-t",
        {}
      )}>
        {features.map(item => (
          <li key={item} className="mb-2 inline-flex gap-2">
            <BsCheckLg className="flex-shrink-0 relative top-1.5 ml-2 text-primary-600" size={20} />
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}