import Link from "next/link";
import Image from "next/image";
import { BlogPreview } from "@/components/elements/BlogPreview/BlogPreview";
import { PagePreview } from "@/components/elements/PagePreview/PagePreview";
import { ExpertPreview } from "@/components/elements/Expert/ExpertPreview";
import { Statistics } from "@/components/elements/Statistics/Statistics";
import { FlexibleContent } from "@/components/elements/FlexibleContent/FlexibleContent";
import { PricingPlan } from "@/components/elements/PricingPlan/PricingPlan";
import { AlignmentType, Content } from "@/helpers/types";
import { Testimonial } from "@/components/elements/Testimonial/Testimonial";

export const ContentMapping: React.FC<{
  data: Content;
  alignment: AlignmentType;
  layout?: "horizontal" | "vertical"
  index: number
}> = ({ data, alignment, layout = "vertical", index }) => {
  switch (data.contentType) {
    case "blog":
      return <BlogPreview data={data} layout={layout} aspectRatio={layout === "horizontal" ? "square" : undefined} alignment={alignment} />;
    case "page":
      return <PagePreview data={data} layout={layout} alignment={alignment} />;
    case "expert":
      return <ExpertPreview data={data} layout={layout} alignment={alignment} />;
    case "statistics":
      return <Statistics index={index} data={data} alignment={alignment} />;
    case "contentpiece":
      return <FlexibleContent data={data} alignment={alignment} layout={layout} />;
    case "pricingplan":
      return <PricingPlan data={data} alignment={alignment} />;
    case "testimonial":
      return <Testimonial data={data} alignment={alignment} />;
    case "link":
      return (
        <Link href={data.url}>
          {data.image ? (
            <Image
              src={data.image.url}
              alt={data.text}
              width={data.image.width}
              height={data.image.height}
            />
          ) : (
            data.text
          )}
        </Link>
      );
  }
};