'use client';
import classNames from 'classnames';
import { StatisticsType } from '@/helpers/types';
import { useIntersecting } from '@/helpers/hooks/useIntersecting';

export const Statistics: React.FC<{
  data: StatisticsType;
  index: number;
}> = ({ data, index }) => {
  const { number, text } = data;
  const layout = data.layout ?? 'vertical';
  const alignment = data.alignment ?? 'center';

  const [ref, isIntersecting] = useIntersecting();

  return (
    <div
      ref={ref}
      className={classNames('flex gap-6 rounded-theme', {
        'flex-col': layout === 'vertical',
        'flex-row items-center': layout === 'horizontal',
        'perspective-2500 backface-hidden -rotate-y-90': !isIntersecting,
        'perspective-none backface-hidden rotate-y-0 transition-transform ease duration-1000 ':
          isIntersecting,
        'items-center': alignment === 'center',
        'items-end': alignment === 'end',
      })}
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
          'tracking-wide leading-loose text-slate-500 dark:text-slate-100/70',
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
