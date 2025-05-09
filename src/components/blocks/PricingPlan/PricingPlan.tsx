import classNames from 'classnames';
import { Button } from '@/components/elements/Button/Button';
import { PricingPlanType } from '@/lib/types';
import { MarkdownRenderer } from '@/components/elements/MarkdownRenderer/MarkdownRenderer';
import { IoCheckmarkSharp } from 'react-icons/io5';
import { RxCross2 } from 'react-icons/rx';
import { usePricingOption } from '@/components/providers/PricingOptionProvider/PricingOptionProvider';

const PricingBadge: React.FC<{ badge?: string }> = ({ badge }) => {
  if (!badge) return null;

  return (
    <div className="px-2 py-1 rounded-theme text-primary-600 text-xs font-medium tracking-wider bg-primary-100 dark:text-primary-200 dark:bg-primary-600/60">
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
          <div className="font-bold font-heading text-lg-heading dark:text-slate-100">
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
    <ul className="my-2 lg:my-4 pl-8 flex flex-col gap-2 prose dark:prose-invert">
      {features?.map((feature, idx) => (
        <li key={idx} className="relative list-none">
          <IoCheckmarkSharp
            className="absolute -left-8 text-primary-600 dark:text-primary-400"
            size={25}
          />
          {feature}
        </li>
      ))}
      {planLimitations?.map((limitation, idx) => (
        <li key={idx} className="relative list-none opacity-30">
          <RxCross2
            className="absolute -left-8 text-primary-600 dark:text-primary-400"
            size={25}
          />
          {limitation}
        </li>
      ))}
    </ul>
  );
};

export const PricingPlan: React.FC<{ data: PricingPlanType }> = ({ data }) => {
  const {
    planName,
    pricingOptions,
    badge,
    description,
    features,
    planLimitations,
    cta,
    featured,
    alignment = 'center',
  } = data;

  const { billingCycle } = usePricingOption();

  return (
    <div
      className={classNames(
        'rounded-theme bg-white dark:bg-slate-800/80 dark:backdrop-blur-xl border border-slate-100 dark:border-slate-800/80 inverse:border-slate-800/80',
        {
          'mx-2 shadow-radiant': featured,
        },
      )}
    >
      <div
        className={classNames(
          'px-8 lg:px-10 py-8 flex flex-col gap-4 lg:gap-6',
          {
            'text-start items-start': alignment === 'start',
            'text-center items-center': alignment === 'center',
            'text-end items-end': alignment === 'end',
          },
        )}
      >
        <div
          className={classNames('w-full flex gap-4 items-start', {
            'justify-start': alignment === 'start',
            'justify-center': alignment === 'center',
            'justify-end': alignment === 'end',
          })}
        >
          <h4 className="text-base lg:text-lg font-semibold text-primary-600 dark:text-primary-200">
            {planName}
          </h4>
          <PricingBadge badge={badge} />
        </div>

        <PricingOptions
          pricingOptions={pricingOptions}
          billingCycle={billingCycle}
        />
        {description && (
          <div className="mt-4 prose leading-loose dark:prose-invert">
            <MarkdownRenderer>{description}</MarkdownRenderer>
          </div>
        )}
        <PricingFeatures
          features={features}
          planLimitations={planLimitations}
        />
        {cta && (
          <Button data={cta} size="lg" fullWidth>
            {cta.label}
          </Button>
        )}
      </div>
    </div>
  );
};
