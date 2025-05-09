import classNames from 'classnames';
import { Expert } from '@/components/blocks/Expert/Expert';
import { Statistics } from '@/components/blocks/Statistics/Statistics';
import { FlexibleContent } from '@/components/blocks/FlexibleContent/FlexibleContent';
import { PricingPlan } from '@/components/blocks/PricingPlan/PricingPlan';
import { Testimonial } from '@/components/blocks/Testimonial/Testimonial';
import { QnA } from '@/components/blocks/QnA/QnA';
import { BlockType } from '@/lib/types';
import { useIntersecting } from '@/lib/hooks';

const BlockComponent: React.FC<{ data: BlockType }> = ({ data }) => {
  switch (data.contentType) {
    case 'expert':
      return <Expert data={data} />;
    case 'statistics':
      return <Statistics data={data} />;
    case 'flexiblecontent':
      return <FlexibleContent data={data} />;
    case 'pricingplan':
      return <PricingPlan data={data} />;
    case 'testimonial':
      return <Testimonial data={data} />;
    case 'qa':
      return <QnA data={data} />;
    default:
      return null;
  }
};

export const ContentMapping: React.FC<{
  index: number;
  itemsPerRow?: number;
  animate?: boolean;
  data: BlockType;
}> = ({ data, index, itemsPerRow = 1, animate = true }) => {
  const { ref, inView, delay } = useIntersecting(index, itemsPerRow);

  const animationClass = classNames({
    // Animation for 'statistics' block
    'perspective-2500 backface-hidden -rotate-y-90':
      data.contentType === 'statistics' && !inView && animate,
    'perspective-none backface-hidden rotate-y-0 transition-transform ease duration-1000':
      data.contentType === 'statistics' && inView && animate,

    // General animation
    'opacity-0': animate && data.contentType !== 'statistics',
    'animate-slidingUpContent':
      inView && animate && data.contentType !== 'statistics',
  });

  return (
    <div
      ref={ref}
      className={classNames('w-full max-w-3xl', animationClass)}
      style={{
        [data.contentType === 'statistics'
          ? 'transitionDelay'
          : 'animationDelay']: `${delay}s`,
      }}
    >
      <BlockComponent data={data} />
    </div>
  );
};
