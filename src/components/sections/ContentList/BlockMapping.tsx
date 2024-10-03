import { Expert } from '@/components/blocks/Expert/Expert';
import { Statistics } from '@/components/blocks/Statistics/Statistics';
import { FlexibleContent } from '@/components/blocks/FlexibleContent/FlexibleContent';
import { PricingPlan } from '@/components/blocks/PricingPlan/PricingPlan';
import { Testimonial } from '@/components/blocks/Testimonial/Testimonial';
import { Form } from '@/components/blocks/Form/Form';
import { QnA } from '@/components/blocks/QnA/QnA';
import { BlockType } from '@/helpers/types';

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
    case 'qa':
      return <QnA data={data} />;
  }
};
