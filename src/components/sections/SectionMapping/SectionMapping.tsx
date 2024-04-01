import { CTA } from "@/components/sections/CTA/CTA";
import { Hero } from "@/components/sections/Hero/Hero";
import { HeroOverlay } from "@/components/sections/HeroOverlay/HeroOverlay";
import { ScrollingPT } from "@/components/sections/ScrollingPT/ScrollingPT";
import { AccordionPT } from "@/components/sections/AccordionPT/AccordionPT";
import { ContentList } from "@/components/sections/ContentList/ContentList";
import { FeaturedContent } from "@/components/sections/FeaturedContent/FeaturedContent";
import { TabPT } from "@/components/sections/TabPT/TabPT";
import { CarouselPT } from "@/components/sections/CarouselPT/CarouselPT";
import { MiniCarouselPT } from "@/components/sections/MiniCarouselPT/MiniCarouselPT";
import { InquiryForm } from "@/components/sections/InquiryForm/InquiryForm";
import {
  CTAType,
  ContentListType,
  FeaturedContentType,
  HeroType,
  InquiryFormType,
  ContentPTType,
} from "@/helpers/types";

type ComponentType = HeroType | CTAType | ContentPTType | ContentListType | FeaturedContentType | InquiryFormType

function PresentationMapping({ data }: { data: ContentPTType }) {
  switch (data.layout) {
    case "scrolling":
      return <ScrollingPT data={data} />;
    case "accordion":
      return <AccordionPT data={data} />;
    case "tab":
      return <TabPT data={data} />;
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
      return <FeaturedContent data={data} />
    case "cardlist":
      return <ContentList data={data} />
    case "inquiryform":
      return <InquiryForm data={data} />
    default:
      return null
  }
}

export const SectionMapping: React.FC<{
  data: Array<ComponentType>;
}> = ({ data }) => {
  return (
    <main className="flex flex-col pb-32">
      {data?.map((section) => (
        <SectionComponentMapping key={section.id} data={section} />
      ))}
    </main>
  )
}