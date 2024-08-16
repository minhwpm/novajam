import { BlogPreview } from "@/components/elements/BlogPreview/BlogPreview";
import { PagePreview } from "@/components/elements/PagePreview/PagePreview";
import { ExpertPreview } from "@/components/elements/ExpertPreview/ExpertPreview";
import { Statistics } from "@/components/elements/Statistics/Statistics";
import { FlexibleContent } from "@/components/elements/FlexibleContent/FlexibleContent";
import { PricingPlan } from "@/components/elements/PricingPlan/PricingPlan";
import { TextAlignmentType, Content } from "@/lib/types";
import { Testimonial } from "@/components/elements/Testimonial/Testimonial";
import { ImageLink } from "@/components/elements/ImageLink/ImageLink";

export const ContentMapping: React.FC<{
  data: Content;
  alignment: TextAlignmentType;
  layout?: "horizontal" | "vertical"
  index: number
  animate?: boolean
}> = ({ data, alignment, layout = "vertical", index, animate = true }) => {
  switch (data.contentType) {
    case "blog":
      return <BlogPreview data={data} layout={layout} aspectRatio={layout === "horizontal" ? "square" : undefined} alignment={alignment} animate={animate} />;
    case "page":
      return <PagePreview data={data} layout={layout} alignment={alignment} animate={animate}/>;
    case "expert":
      return <ExpertPreview data={data} layout={layout} alignment={alignment} animate={animate} />;
    case "statistics":
      return <Statistics index={index} data={data} alignment={alignment} />;
    case "flexiblecontent":
      return <FlexibleContent data={data} alignment={alignment} layout={layout} animate={animate} />;
    case "pricingplan":
      return <PricingPlan data={data} alignment={alignment} animate={animate} />;
    case "testimonial":
      return <Testimonial data={data} alignment={alignment} animate={animate} />;
    case "link":
      return <ImageLink data={data} animate={animate} />;
  }
};