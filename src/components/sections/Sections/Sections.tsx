import CTA from "@/components/sections/CTA/CTA";
import Hero from "@/components/sections/Hero/Hero";
import HeroOverlay from "../HeroOverlay/HeroOverlay";
import ScrollingPT from "@/components/sections/ScrollingPT/ScrollingPT";
import AccordionPT from "@/components/sections/AccordionPT/AccordionPT";
import ContentList from "@/components/sections/ContentList";
import Feature from "@/components/sections/Feature/Feature";
import {
  CTAType,
  ContentListType,
  FeatureType,
  HeroType,
  InquiryFormType,
  PresentationType,
} from "@/helpers/types";
import TabPT from "../TabPT/TabPT";
import CarouselPT from "../CarouselPT/CarouselPT";
import MiniCarouselPT from "../MiniCarouselPT/MiniCarouselPT";
import { InquiryForm } from "../InquiryForm/InquiryForm";
import VerticalTabPT from "../VerticalTabPT/VerticalTabPT";

const sectionComponents = {
  "hero": {
    "vertical": Hero,
    "horizontal": Hero,
    "overlay": HeroOverlay,
  },
  "cta": CTA,
  "presentation": {
    "scrolling": ScrollingPT,
    "accordion": AccordionPT,
    "tab": TabPT,
    "vertical-tab": VerticalTabPT,
    "carousel": CarouselPT,
    "mini-carousel": MiniCarouselPT,
  },
  "feature": Feature,
  "cardlist": ContentList,
  "inquiryform": InquiryForm,
};

// type ComponentType = typeof HeroB | typeof HeroC | typeof CTAB | typeof ScrollingPT | typeof AccordionPT | typeof CarouselPT | typeof TabPT | typeof Feature | typeof ContentList

type SectionType = {
  data:
    | HeroType
    | CTAType
    | PresentationType
    | ContentListType
    | FeatureType
    | InquiryFormType;
};
const SectionComponent: React.FC<SectionType> = ({ data }) => {
  // @TODO
  // @ts-ignore
  const Component = typeof sectionComponents[data.contentType] === "object" ? sectionComponents[data.contentType][data.layout] : sectionComponents[data.contentType];
  if (!Component) return null;
  return <Component data={data} />;
};

const Sections: React.FC<{
  data: Array<
    HeroType | CTAType | PresentationType | ContentListType | FeatureType
  >;
}> = ({ data }) => {
  return (
    <main className="flex flex-col pb-32">
      {data.map((section) => (
        <SectionComponent key={section.id} data={section} />
      ))}
    </main>
  );
};

export default Sections;