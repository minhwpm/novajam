import { BlogPreview } from '@/components/elements/BlogPreview/BlogPreview';
import { PagePreview } from '@/components/elements/PagePreview/PagePreview';
import { ExpertPreview } from '@/components/elements/ExpertPreview/ExpertPreview';
import { Statistics } from '@/components/elements/Statistics/Statistics';
import { FlexibleContent } from '@/components/elements/FlexibleContent/FlexibleContent';
import { PricingPlan } from '@/components/elements/PricingPlan/PricingPlan';
import { TextAlignmentType, Content } from '@/helpers/types';
import { Testimonial } from '@/components/elements/Testimonial/Testimonial';

export const ContentMapping: React.FC<{
  data: Content;
  alignment: TextAlignmentType;
  layout?: 'horizontal' | 'vertical';
  index: number;
  animate?: boolean;
}> = ({ data, alignment, layout = 'vertical', index, animate = true }) => {
  switch (data.contentType) {
    case 'blog':
      return (
        <BlogPreview
          index={index}
          data={data}
          layout={layout}
          aspectRatio={layout === 'horizontal' ? 'square' : undefined}
          alignment={alignment}
          animate={animate}
        />
      );
    case 'page':
      return (
        <PagePreview
          index={index}
          data={data}
          layout={layout}
          alignment={alignment}
          animate={animate}
        />
      );
    case 'expert':
      return (
        <ExpertPreview
          index={index}
          data={data}
          layout={layout}
          alignment={alignment}
          animate={animate}
        />
      );
    case 'statistics':
      return (
        <Statistics
          index={index}
          layout={layout}
          data={data}
          alignment={alignment}
        />
      );
    case 'flexiblecontent':
      return (
        <FlexibleContent
          index={index}
          data={data}
          alignment={alignment}
          layout={layout}
          animate={animate}
        />
      );
    case 'pricingplan':
      return (
        <PricingPlan
          index={index}
          data={data}
          alignment={alignment}
          layout={layout}
          animate={animate}
        />
      );
    case 'testimonial':
      return (
        <Testimonial
          index={index}
          data={data}
          alignment={alignment}
          layout={layout}
          animate={animate}
        />
      );
  }
};
