import Testimonials from '@/components/sections/Testimonials/Testimonials'
import CTAB from "@/components/sections/CTAB/CTAB"
import HeroB from "@/components/sections/HeroB/HeroB"
import ScrollingPT from "@/components/sections/ScrollingPT/ScrollingPT"
import AccordionPT from "@/components/sections/AccordionPT/AccordionPT"
import ContentB from "@/components/sections/ContentB/ContentB"
import Feature from "@/components/sections/FeatureB/FeatureB"
import Subscription from "@/components/sections/Subscription/Subscription"
import { ButtonVariant } from "@/utils/types"
import classNames from "classnames"
import HeroC from './HeroC/HeroC'
import HeroD from './HeroD/HeroD'

const sectionComponents = {
  hero: {
    "side by side": HeroB,
    overlay: HeroC,
    carousel: HeroD
  },
  cta: CTAB,
  presentation: {
    scrolling: ScrollingPT,
    accordion: AccordionPT
  },
  testimonials: Testimonials,
}

const Section = ({data}) => {
  const Component = typeof sectionComponents[data.contentType] === "object" ? sectionComponents[data.contentType][data.style] : sectionComponents[data.contentType]
  if (!Component) return null
  return <Component data={data} />
}

export default function Sections ({ data }) {
  return (
    <div className="flex flex-col gap-20">
      {data.map(section => (
        <Section key={section.id} data={section} />
      ))}
    </div>
  )
}