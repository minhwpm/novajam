import Link from "next/link";
import Image from "next/image";
import { BlogPreview } from "@/components/elements/BlogPreview/BlogPreview";
import PagePreview from "../PagePreview/PagePreview";
import { ExpertPreview } from "@/components/elements/Expert/ExpertPreview";
import { Statistics } from "@/components/elements/Statistics/Statistics";
import { FlexibleContent } from "@/components/elements/FlexibleContent/FlexibleContent";
import { PricingPlan } from "@/components/elements/PricingPlan/PricingPlan";
import { AlignmentType, Content } from "@/helpers/types";

export const ContentMapping: React.FC<{
  data: Content;
  alignment: AlignmentType;
  layout?: "horizontal" | "vertical"
  index: number
}> = ({ data, alignment, layout = "vertical", index }) => {
  //@TODO do alignment for Blog, Page ...
  switch (data.contentType) {
    case "blog":
      return <BlogPreview data={data} layout={layout} aspectRatio={layout === "horizontal" ? "square" : undefined} />;
    case "page":
      return <PagePreview data={data} />;
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
    case "expert":
      return <ExpertPreview data={data} layout={layout} />;
    case "statistics":
      return <Statistics index={index} data={data} />;
    case "contentpiece":
      return <FlexibleContent data={data} alignment={alignment} />;
    case "pricingplan":
      return <PricingPlan data={data} />;
  }
};