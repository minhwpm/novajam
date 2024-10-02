import { Expert } from '@/components/elements/Expert/Expert';
import { Statistics } from '@/components/elements/Statistics/Statistics';
import { FlexibleContent } from '@/components/elements/FlexibleContent/FlexibleContent';
import { PricingPlan } from '@/components/elements/PricingPlan/PricingPlan';
import { BlockType } from '@/helpers/types';
import { Testimonial } from '@/components/elements/Testimonial/Testimonial';
import { Form } from '@/components/elements/Form/Form';

export const BlockMapping: React.FC<{
  data: BlockType;
  index: number;
  animate?: boolean;
}> = ({ data, index, animate = true }) => {
  switch (data.contentType) {
    case 'expert':
      return <Expert index={index} data={data} animate={animate} />;
    case 'statistics':
      return <Statistics index={index} data={data} />;
    case 'flexiblecontent':
      return <FlexibleContent index={index} data={data} animate={animate} />;
    case 'pricingplan':
      return <PricingPlan index={index} data={data} animate={animate} />;
    case 'testimonial':
      return <Testimonial index={index} data={data} animate={animate} />;
    case 'form':
      return <Form data={data} />;
  }
};
