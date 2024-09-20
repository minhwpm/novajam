import classNames from 'classnames';
import { useInView } from 'react-hook-inview';
import { Button } from '@/components/elements/Button/Button';
import { TextAlignmentType, PricingPlanType } from '@/helpers/types';
import { MarkdownRenderer } from '../MarkdownRenderer/MarkdownRenderer';

export const PricingPlan: React.FC<{
  index?: number;
  data: PricingPlanType;
  alignment?: TextAlignmentType;
  animate?: boolean;
}> = ({ index, data, alignment = 'center', animate }) => {
  const { title, pricing, pricingSuffix, badge, description, ctaButton } = data;
  const [ref, isIntersecting] = useInView({
    threshold: 0.4,
    unobserveOnEnter: true,
  });

  return (
    <div
      ref={ref}
      className={classNames(
        'relative flex flex-col rounded-theme bg-white dark:bg-opacity-10',
        {
          '-bottom-10 opacity-0': animate,
          'animate-slidingUpContent': isIntersecting && animate,
        },
      )}
      style={{
        animationDelay: index && animate ? `${(index + 1) * 0.15}s` : '0s',
      }}
    >
      <div
        className={classNames('flex flex-col px-4 lg:px-6 xl:px-8 py-8', {
          'items-center': alignment === 'center',
        })}
      >
        {badge && (
          <div className="absolute -top-5 rounded-theme-button text-center font-heading bg-primary-600 text-slate-100 px-4 py-2 font-bold tracking-wider">
            {badge}
          </div>
        )}
        <h4
          className={classNames(
            'font-semibold tracking-wide text-primary-600 dark:text-primary-500 mb-10',
          )}
        >
          {title}
        </h4>
        <div
          className={classNames(
            'text-4xl xl:text-5xl font-bold font-heading dark:text-slate-100',
          )}
        >
          {pricing}
        </div>
        <div
          className={classNames(
            'mt-3 text-sm tracking-wide text-slate-400 dark:text-slate-100/50',
          )}
        >
          {pricingSuffix}
        </div>
        {ctaButton && (
          <div className="mt-6">
            <Button data={ctaButton} size="base">
              {ctaButton.text}
            </Button>
          </div>
        )}
      </div>

      {description && (
        <div
          className={classNames(
            'py-8 px-4 lg:px-6 xl:px-8 border-t prose leading-loose dark:text-slate-100/70 dark:border-slate-700',
            {
              'text-center': alignment === 'center',
              'text-end': alignment === 'end',
            },
          )}
        >
          <MarkdownRenderer>{description}</MarkdownRenderer>
        </div>
      )}
    </div>
  );
};
