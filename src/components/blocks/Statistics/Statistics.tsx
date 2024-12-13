'use client';
import classNames from 'classnames';
import { StatisticsType } from '@/helpers/types';
import { useIntersecting } from '@/helpers/hooks/useIntersecting';

export const Statistics: React.FC<{
  data: StatisticsType;
  index: number;
}> = ({ data, index }) => {
  const { keyNumber, description } = data;
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
          'font-heading text-lg-heading leading-none font-bold tracking-tight dark:text-slate-100',
          {
            'self-start pt-1': layout === 'horizontal',
            'text-center': alignment === 'center',
            'text-end': alignment === 'end',
          },
        )}
      >
        {keyNumber}
      </div>
      <div
        className={classNames(
          'tracking-wide leading-loose text-slate-600 dark:text-white/80',
          {
            'text-center': alignment === 'center',
            'text-end': alignment === 'end',
          },
        )}
      >
        {description}
      </div>
    </div>
  );
};
