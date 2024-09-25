import classNames from 'classnames';
import { ButtonGroup } from '@/components/elements/ButtonGroup/ButtonGroup';
import { AlignmentType, FlexibleContentType } from '@/helpers/types';
import { MarkdownRenderer } from '@/components/elements/MarkdownRenderer/MarkdownRenderer';

export const TextPartPT: React.FC<{
  data: FlexibleContentType;
  alignment?: AlignmentType;
  darkMode: boolean;
}> = ({ data, alignment, darkMode }) => {
  const { displayTitle, eyebrow, description, buttons } = data;
  return (
    <>
      {eyebrow && (
        <div
          className={classNames(
            'text-sm font-medium tracking-widest',
            { 'text-slate-500': !darkMode },
            { 'text-slate-100/70': darkMode },
          )}
        >
          {eyebrow}
        </div>
      )}
      {displayTitle && (
        <div
          className={classNames(
            'mt-1 text-2xl xl:text-3xl max-w-4xl dark:text-slate-100',
          )}
        >
          <MarkdownRenderer>{displayTitle}</MarkdownRenderer>
        </div>
      )}
      {description && (
        <div
          className={classNames('mt-4 prose xl:prose-lg', {
            'text-slate-100': darkMode,
          })}
        >
          <MarkdownRenderer>{description}</MarkdownRenderer>
        </div>
      )}
      {buttons && buttons.length > 0 && (
        <div className="mt-4">
          <ButtonGroup data={buttons} alignment={alignment} />
        </div>
      )}
    </>
  );
};
