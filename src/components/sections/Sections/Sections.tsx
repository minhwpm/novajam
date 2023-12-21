import CTA from "@/components/sections/CTA/CTA";
import Hero from "@/components/sections/Hero/Hero";
import HeroOverlay from "../HeroOverlay/HeroOverlay";
import ScrollingPT from "@/components/sections/ScrollingPT/ScrollingPT";
import AccordionPT from "@/components/sections/AccordionPT/AccordionPT";
import ContentList from "@/components/sections/ContentList/ContentList";
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

type ComponentType = HeroType | CTAType | PresentationType | ContentListType | FeatureType | InquiryFormType

function PresentationMapping({ data }: { data: PresentationType }) {
  switch (data.layout) {
    case "scrolling":
      return <ScrollingPT data={data} />;
    case "accordion":
      return <AccordionPT data={data} />;
    case "tab":
      return <TabPT data={data} />;
    case "vertical-tab":
      return <VerticalTabPT data={data} />;
    case "carousel":
      return <CarouselPT data={data} />;
    case "mini-carousel":
      return <MiniCarouselPT data={data} />;
    default:
      return null;
  }
}

function SectionComponentMapping ({ data }: { data: ComponentType }) {
  switch (data.contentType) {
    case "hero":
      if (data.layout === "vertical" || data.layout === "horizontal") {
        return <Hero data={data} />
      }
      if (data.layout === "overlay") {
        return <HeroOverlay data={data} />
      }
      return null
    case "cta":
      return <CTA data={data} />
    case "presentation":
      return <PresentationMapping data={data} />
    case "feature":
      return <Feature data={data} />
    case "cardlist":
      return <ContentList data={data} />
    case "inquiryform":
      return <InquiryForm data={data} />
    default:
      return null
  }
}

const Sections: React.FC<{
  data: Array<ComponentType>;
}> = ({ data }) => {
  return (
    <main className="flex flex-col pb-32">
      {data.map((section) => (
        <SectionComponentMapping key={section.id} data={section} />
      ))}
    </main>
  );
};

export default Sections;