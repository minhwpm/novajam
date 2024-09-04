import { Hero } from "@/components/sections/Hero/Hero";
import { HeroOverlay } from "@/components/sections/HeroOverlay/HeroOverlay";
import { Alert } from "@/components/sections/Alert/Alert";
import { ScrollPT } from "@/components/sections/ScrollPT/ScrollPT";
import { AccordionPT } from "@/components/sections/AccordionPT/AccordionPT";
import { ContentList } from "@/components/sections/Gallery/Gallery";
import { FeaturedContent } from "@/components/sections/FeaturedContent/FeaturedContent";
import { TabPT } from "@/components/sections/TabPT/TabPT";
import { CarouselPT } from "@/components/sections/CarouselPT/CarouselPT";
import { SleekCarouselPT } from "@/components/sections/SleekCarouselPT/SleekCarouselPT";
import { CTA } from "@/components/sections/CTA/CTA";
import { ContentPTType, PageContentType } from "@/helpers/types";

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

function SectionComponentMapping({ data }: { data: PageContentType }) {
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
    case "alert":
      return <Alert data={data} />;
    case "contentpresentation":
      return <ContentPresentationMapping data={data} />;
    case "featuredcontent":
      return <FeaturedContent data={data} />;
    case "contentlist":
      return <ContentList data={data} />;
    case "cta":
      return <CTA data={data} />
    default:
      return null;
  }
}

export const SectionMapping: React.FC<{
  data: Array<PageContentType>;
}> = ({ data }) => {
  return (
    <main className="flex flex-col">
      {data?.map((section) => (
        <SectionComponentMapping key={section.id} data={section} />
      ))}
    </main>
  )
}