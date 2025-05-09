import classNames from 'classnames';
import { usePricingOption } from '@/components/providers/PricingOptionProvider/PricingOptionProvider';
import { PricingPlanType } from '@/lib/types';

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
        className="relative w-16 h-8 bg-primary-500 rounded-full cursor-pointer"
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
      <span className="dark:text-slate-100">{options[1]}</span>
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
        aria-label={option}
        className={classNames(
          'px-6 lg:px-8 py-4 text-sm font-medium tracking-wide rounded-full transition-colors',
          current === option
            ? 'bg-primary-600 text-slate-100'
            : 'bg-white text-primary-600 hover:bg-primary-50 dark:bg-slate-800/80 dark:backdrop-blur-xl dark:text-primary-400 dark:hover:text-slate-100 dark:hover:bg-primary-500/50 transition-colors duration-300',
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

  if (options.length <= 1) return null;

  return (
    <div className="w-full max-w-md mx-auto">
      {options.length === 2 ? (
        <div className="flex justify-center mx-auto">
          <ToggleSwitch
            options={options}
            current={billingCycle}
            onToggle={setBillingCycle}
          />
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-800/80 flex gap-0.5 p-1 justify-center mx-auto rounded-full w-full max-w-fit shadow-radiant">
          <ButtonSwitcher
            options={options}
            current={billingCycle}
            onSelect={setBillingCycle}
          />
        </div>
      )}
    </div>
  );
};
