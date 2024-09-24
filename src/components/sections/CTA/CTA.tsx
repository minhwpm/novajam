'use client';
import classNames from 'classnames';
import { CTAType } from '@/helpers/types';
import { Form } from '@/components/elements/Form/Form';
import { ButtonGroup } from '@/components/elements/ButtonGroup/ButtonGroup';
import { Section } from '@/components/elements/Section/Section';
import { useIntersecting } from '@/helpers/hooks/useIntersecting';

export type FormValues = {
  [x: string]: string | Date;
};

export const CTA: React.FC<{ data: CTAType }> = ({ data }) => {
  const { buttons, form, darkMode } = data;
  const layout = data.layout ?? 'flex-row';

  const [ref, isIntersecting] = useIntersecting(0.2);

  return (
    <Section data={data} layout={layout}>
      <div
        ref={ref}
        className={classNames(
          'relative -bottom-10 opacity-0 flex items-center',
          {
            'lg:pl-10 xl:pl-20': layout === 'flex-row',
            'items-center self-start': layout === 'full-top',
            'animate-slidingUpContent animation-delay-300': isIntersecting,
          },
        )}
      >
        {form && <Form data={form} darkMode={darkMode} />}
        {buttons && <ButtonGroup data={buttons} size="lg" />}
      </div>
    </Section>
  );
};
