'use client';
import classNames from 'classnames';
import { AlignmentType, StatisticsType } from '@/helpers/types';
import { useIntersecting } from '@/helpers/hooks/useIntersecting';

export const Statistics: React.FC<{
  data: StatisticsType;
  layout: 'horizontal' | 'vertical';
  index: number;
  alignment?: AlignmentType;
}> = ({ data, index, layout = 'vertical', alignment }) => {
  const { number, text } = data;
  const [ref, isIntersecting] = useIntersecting(1);

  return (
    <div
      ref={ref}
      className={classNames(
        'flex gap-6 rounded-theme',
        { 'flex-col': layout === 'vertical' },
        { 'flex-row': layout === 'vertical' },
        { 'perspective-2500 backface-hidden -rotate-y-90': !isIntersecting },
        {
          'perspective-none backface-hidden rotate-y-0 transition-transform ease duration-1000 ':
            isIntersecting,
        },
        { 'items-center': alignment === 'center' },
        { 'items-end': alignment === 'end' },
      )}
      style={{
        transitionDelay: `${(index + 1) * 0.2}s`,
      }}
    >
      <div
        className={classNames(
          'font-heading text-4xl md:text-5xl xl:text-6xl 2xl:text-7xl font-bold tracking-tight dark:text-slate-100',
          {
            'text-center': alignment === 'center',
            'text-end': alignment === 'end',
          },
        )}
      >
        {number}
      </div>
      <div
        className={classNames(
          'tracking-wide leading-loose pb-4 text-slate-500 dark:text-slate-100/70',
          {
            'text-center': alignment === 'center',
            'text-end': alignment === 'end',
          },
        )}
      >
        {text}
      </div>
    </div>
  );
};
