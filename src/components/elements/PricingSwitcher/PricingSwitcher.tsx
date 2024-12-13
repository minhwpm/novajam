import classNames from 'classnames';
import { usePricingOption } from '@/components/elements/PricingOptionProvider/PricingOptionProvider';
import { PricingPlanType } from '@/helpers/types';

function getUniqueBillingCycles(pricingPlans: Array<PricingPlanType>) {
  return Array.from(
    new Set(
      pricingPlans.flatMap((plan) =>
        plan.pricingOptions.map((option) => option.billingCycle),
      ),
    ),
  );
}

const ToggleSwitch: React.FC<{
  options: string[];
  current: string;
  onToggle: (value: string) => void;
}> = ({ options, current, onToggle }) => {
  const handleToggle = () => {
    const newValue = options.find((opt) => opt !== current);
    if (newValue) onToggle(newValue);
  };

  return (
    <div className="flex items-center gap-x-4">
      <span className="dark:text-slate-100">{options[0]}</span>
      <div
        className="relative w-16 h-8 bg-slate-500 rounded-full cursor-pointer"
        onClick={handleToggle}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') handleToggle();
        }}
        role="button"
        tabIndex={0}
        aria-pressed={current === options[1]}
      >
        <div
          className={classNames(
            'absolute top-1 left-1 w-6 h-6 bg-slate-100 rounded-full transition-transform',
            { 'translate-x-8': current === options[1] },
          )}
        />
      </div>
      <span className="dark:text-slate-100">
        {options[1]}
        <span className="ml-4 bg-primary-200 text-sm font-medium text-primary-600 tracking-wide px-2.5 py-1 rounded-full">
          SAVE 15%
        </span>
      </span>
    </div>
  );
};

const ButtonSwitcher: React.FC<{
  options: string[];
  current: string;
  onSelect: (value: string) => void;
}> = ({ options, current, onSelect }) => (
  <>
    {options.map((option) => (
      <button
        key={option}
        onClick={() => onSelect(option)}
        className={classNames(
          'px-8 py-4 first:rounded-l-theme-button last:rounded-r-theme-button transition-colors',
          current === option
            ? 'bg-primary-600 text-white'
            : 'bg-slate-100 text-primary-600 hover:bg-primary-200',
        )}
      >
        {option}
      </button>
    ))}
  </>
);

interface PricingSwitcherProps {
  plans: Array<PricingPlanType>;
}

export const PricingSwitcher: React.FC<PricingSwitcherProps> = ({ plans }) => {
  const { billingCycle, setBillingCycle } = usePricingOption();
  const options = getUniqueBillingCycles(plans);

  const handleToggle = (cycle: string) => setBillingCycle(cycle);

  return (
    <div className="w-full max-w-md mx-auto">
      {options.length === 2 ? (
        <div className="flex justify-center mx-auto">
          <ToggleSwitch
            options={options}
            current={billingCycle}
            onToggle={handleToggle}
          />
        </div>
      ) : (
        <div className="flex justify-center mx-auto rounded-theme-button w-full max-w-fit shadow-radiant">
          <ButtonSwitcher
            options={options}
            current={billingCycle}
            onSelect={handleToggle}
          />
        </div>
      )}
    </div>
  );
};
