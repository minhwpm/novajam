import classNames from 'classnames';
import { StatisticsType } from '@/lib/types';
import { getTextColorClass, getAlignmentClass } from '@/lib/utils';
import { MarkdownRenderer } from '@/components/elements/MarkdownRenderer/MarkdownRenderer';

export const Statistics: React.FC<{
  data: StatisticsType;
}> = ({ data }) => {
  const {
    keyNumber,
    description,
    layout = 'vertical',
    alignment = 'center',
    keyNumberColor = 'slate',
  } = data;

  return (
    <div
      className={classNames(
        'flex gap-6 rounded-theme w-full py-2',
        {
          'flex-col': layout === 'vertical',
          'flex-row items-center': layout === 'horizontal',
        },
        getAlignmentClass(alignment),
      )}
    >
      <div
        className={classNames(
          'font-heading text-lg-heading leading-none font-bold tracking-tight',
          getTextColorClass(keyNumberColor),
          {
            'self-start pt-1': layout === 'horizontal',
          },
        )}
      >
        {keyNumber}
      </div>
      <MarkdownRenderer
        className={classNames(
          'prose tracking-wide leading-loose text-slate-500 dark:prose-invert dark:text-slate-100/70 inverse:prose-invert inverse:text-slate-100/70',
          getAlignmentClass(alignment),
        )}
      >
        {description}
      </MarkdownRenderer>
    </div>
  );
};
