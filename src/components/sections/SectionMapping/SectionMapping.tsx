import { Hero } from "@/components/sections/Hero/Hero";
import { HeroOverlay } from "@/components/sections/HeroOverlay/HeroOverlay";
import { ScrollPT } from "@/components/sections/ScrollPT/ScrollPT";
import { AccordionPT } from "@/components/sections/AccordionPT/AccordionPT";
import { ContentList } from "@/components/sections/ContentList/ContentList";
import { FeaturedContent } from "@/components/sections/FeaturedContent/FeaturedContent";
import { TabPT } from "@/components/sections/TabPT/TabPT";
import { CarouselPT } from "@/components/sections/CarouselPT/CarouselPT";
import { SleekCarouselPT } from "@/components/sections/SleekCarouselPT/SleekCarouselPT";
import { InquiryForm } from "@/components/sections/InquiryForm/InquiryForm";
import {
  ContentListType,
  FeaturedContentType,
  HeroType,
  InquiryFormType,
  ContentPTType,
} from "@/lib/types";

type ComponentType = HeroType | ContentPTType | ContentListType | FeaturedContentType | InquiryFormType

function ContentPresentationMapping({ data }: { data: ContentPTType }) {
  switch (data.appearanceVariant) {
    case "scroll":
      return <ScrollPT key={data.id} data={data} />;
    case "accordion":
      return <AccordionPT key={data.id} data={data} />;
    case "tab":
      return <TabPT key={data.id} data={data} />;
    case "carousel":
      return <CarouselPT key={data.id} data={data} />;
    case "sleek carousel":
      return <SleekCarouselPT key={data.id} data={data} />;
    default:
      return null;
  }
}

function SectionComponentMapping({ data }: { data: ComponentType }) {
  switch (data.contentType) {
    case "hero":
      if (
        data.appearanceVariant === "vertical" ||
        data.appearanceVariant === "horizontal"
      ) {
        return <Hero data={data} />;
      }
      if (data.appearanceVariant === "overlay") {
        return <HeroOverlay data={data} />;
      }
      return null;
    case "contentpresentation":
      return <ContentPresentationMapping data={data} />;
    case "featuredcontent":
      return <FeaturedContent data={data} />;
    case "contentlist":
      return <ContentList data={data} />;
    case "inquiryform":
      return <InquiryForm data={data} />;
    default:
      return null;
  }
}

export const SectionMapping: React.FC<{
  data: Array<ComponentType>;
}> = ({ data }) => {
  return (
    <main className="flex flex-col">
      {data?.map((section) => (
        <SectionComponentMapping key={section.id} data={section} />
      ))}
    </main>
  )
}