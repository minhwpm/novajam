import { SmartSectionType } from '@/helpers/types';
import { SmartSection } from '@/components/sections/SmartSection/SmartSection';

export const SectionMapping: React.FC<{
  data: Array<SmartSectionType>;
}> = ({ data }) => {
  return (
    <main className="flex flex-col min-h-screen">
      {data?.map((section, idx) => <SmartSection key={idx} data={section} />)}
    </main>
  );
};
