'use client';
import classNames from 'classnames';
import { Button } from '@/components/elements/Button/Button';
import { PricingPlanType } from '@/helpers/types';
import { MarkdownRenderer } from '@/components/elements/MarkdownRenderer/MarkdownRenderer';
import { useIntersecting } from '@/helpers/hooks/useIntersecting';
import { IoCheckmarkSharp } from 'react-icons/io5';
import { RxCross2 } from 'react-icons/rx';
import { usePricingOption } from '@/components/elements/PricingOptionProvider/PricingOptionProvider';

interface PricingPlanProps {
  index?: number;
  data: PricingPlanType;
  animate?: boolean;
}

const PricingBadge: React.FC<{ badge?: string }> = ({ badge }) => {
  if (!badge) return null;

  return (
    <div className="px-4 py-3 rounded-t-theme text-center font-heading bg-primary-600 text-slate-100 font-semibold tracking-wider">
      {badge}
    </div>
  );
};

const PricingOptions: React.FC<{
  pricingOptions: PricingPlanType['pricingOptions'];
  billingCycle: string;
}> = ({ pricingOptions, billingCycle }) => {
  return (
    <>
      {pricingOptions.map((item, idx) => (
        <div
          key={idx}
          className={classNames({ hidden: billingCycle !== item.billingCycle })}
        >
          <div className="font-bold font-heading text-lg-heading text-slate-800">
            {item.price}
          </div>
          {item.priceSuffix && (
            <div className="text-sm tracking-wide text-slate-400">
              {item.priceSuffix}
            </div>
          )}
        </div>
      ))}
    </>
  );
};

const PricingFeatures: React.FC<{
  features?: string[];
  planLimitations?: string[];
}> = ({ features, planLimitations }) => {
  if (!features?.length && !planLimitations?.length) return null;

  return (
    <ul className="my-2 lg:my-4 pl-8 flex flex-col gap-2 prose">
      {features?.map((feature, idx) => (
        <li key={idx} className="relative list-none">
          <IoCheckmarkSharp
            className="absolute -left-8 text-primary-500"
            size={25}
          />
          {feature}
        </li>
      ))}
      {planLimitations?.map((limitation, idx) => (
        <li key={idx} className="relative list-none opacity-30">
          <RxCross2 className="absolute -left-8 text-primary-500" size={25} />
          {limitation}
        </li>
      ))}
    </ul>
  );
};

export const PricingPlan: React.FC<PricingPlanProps> = ({
  index,
  data,
  animate,
}) => {
  const { billingCycle } = usePricingOption();
  const [ref, isIntersecting] = useIntersecting();
  const animationDelay = index && animate ? `${(index + 1) * 0.15}s` : '0s';

  const {
    planName,
    pricingOptions,
    badge,
    description,
    features,
    planLimitations,
    cta,
    disclaimer,
    featured,
    alignment = 'center',
  } = data;

  return (
    <div
      ref={ref}
      className={classNames(
        'w-full max-w-3xl rounded-theme bg-white dark:bg-slate-50 border border-slate-100 dark:border-none',
        {
          'scale-105 shadow-lg': featured,
          'relative -bottom-10 opacity-0': animate,
          'animate-slidingUpContent': isIntersecting && animate,
        },
      )}
      style={{ animationDelay }}
    >
      <PricingBadge badge={badge} />
      <div
        className={classNames(
          'px-8 lg:px-10 py-6 lg:py-8 flex flex-col gap-4 lg:gap-6',
          {
            'text-start items-start': alignment === 'start',
            'text-center items-center': alignment === 'center',
            'text-end items-end': alignment === 'end',
          },
        )}
      >
        <h4 className="text-sm font-semibold tracking-wider text-primary-600">
          {planName}
        </h4>
        <PricingOptions
          pricingOptions={pricingOptions}
          billingCycle={billingCycle}
        />
        {description && (
          <div className="mt-4 prose leading-loose">
            <MarkdownRenderer>{description}</MarkdownRenderer>
          </div>
        )}
        <PricingFeatures
          features={features}
          planLimitations={planLimitations}
        />
        <div className={classNames('flex flex-col gap-2')}>
          {cta && (
            <Button data={cta} size="lg">
              {cta.label}
            </Button>
          )}
          {disclaimer && (
            <MarkdownRenderer className="prose text-smd text-slate-500">
              {disclaimer}
            </MarkdownRenderer>
          )}
        </div>
      </div>
    </div>
  );
};
