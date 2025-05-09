'use client';
import { SmartSection } from '@/components/sections/SmartSection/SmartSection';
import { SmartSectionType } from '@/lib/types';

export const SectionMapping: React.FC<{
  data: Array<SmartSectionType>;
}> = ({ data }) => {
  return (
    <main className="flex flex-col min-h-screen">
      {data?.map((section, idx) => {
        return <SmartSection key={idx} data={section} />;
      })}
    </main>
  );
};
