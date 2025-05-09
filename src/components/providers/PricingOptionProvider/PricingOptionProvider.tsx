'use client';
import {
  useState,
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
} from 'react';

interface PricingOptionContextType {
  billingCycle: string;
  setBillingCycle: Dispatch<SetStateAction<string>>;
}

const PricingOptionContext = createContext<
  PricingOptionContextType | undefined
>(undefined);

export const PricingOptionProvider: React.FC<{
  children?: React.ReactNode;
  initialBillingCycle?: string;
}> = ({ children, initialBillingCycle = '' }) => {
  const [billingCycle, setBillingCycle] = useState(initialBillingCycle);

  return (
    <PricingOptionContext.Provider value={{ billingCycle, setBillingCycle }}>
      {children}
    </PricingOptionContext.Provider>
  );
};

// Custom hook for using the context
export const usePricingOption = () => {
  const context = useContext(PricingOptionContext);
  if (!context) {
    throw new Error(
      'usePricingOption must be used within a PricingOptionProvider',
    );
  }
  return context;
};
