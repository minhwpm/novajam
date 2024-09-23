'use client';
import classNames from 'classnames';
import { CTAType } from '@/helpers/types';
import { useInView } from 'react-hook-inview';
import { Form } from '@/components/elements/Form/Form';
import { ButtonGroup } from '@/components/elements/ButtonGroup/ButtonGroup';
import { Section } from '@/components/elements/Section/Section';

export type FormValues = {
  [x: string]: string | Date;
};

export const CTA: React.FC<{ data: CTAType }> = ({ data }) => {
  const { buttons, form, layout, darkMode } = data;

  const [ref, isIntersecting] = useInView({
    threshold: 0.2,
    unobserveOnEnter: true,
  });

  return (
    <Section data={data} layout={layout}>
      <div
        ref={ref}
        className={classNames(
          'relative -bottom-10 opacity-0 flex items-center lg:my-6',
          {
            'items-center self-center': layout === 'top-to-bottom',
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
