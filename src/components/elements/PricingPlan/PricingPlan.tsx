import { PricingPlanType } from "@/utils/types"
import Button from "../Button/Button"
import { BsCheck2 } from "react-icons/bs"

export const PricingPlan: React.FC<{ data: PricingPlanType }> = ({ data }) => {
  const { title, pricing, pricingSuffix, features, ctaButton } = data
  return (
    <div className="flex flex-col gap-5 items-center py-6 px-4 rounded-md border">
      <h4 className="text-2xl font-bold">
        {title}
      </h4>
      <div>
        <span className="text-xl font-bold">
          {pricing}
        </span>
        <span className="text-neutral-500 text-sm">
          {pricingSuffix}
        </span>
      </div>
      <div>
        <Button url={ctaButton.url} variant={ctaButton.buttonVariant}>
          {ctaButton.text}
        </Button>
      </div>
      <ul className="text-neutral-600 leading-loose py-4 border-t">
        {features.map(item => (
          <li key={item} className="mb-2 inline-flex gap-3">
            <BsCheck2 className="flex-shrink-0 relative top-1.5 ml-2 text-primary-500" size={20} />
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}