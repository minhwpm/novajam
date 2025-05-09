import classNames from 'classnames';
import { AlignmentType } from '@/lib/types';
import { MarkdownRenderer } from '@/components/elements/MarkdownRenderer/MarkdownRenderer';

export const Body: React.FC<{
  content: string;
  alignment?: AlignmentType;
}> = ({ content, alignment }) => (
  <MarkdownRenderer
    className={classNames(
      'prose prose-lg 2xl:prose-xl text-slate-600 dark:prose-invert dark:text-slate-100/80 inverse:prose-invert inverse:text-slate-100/80',
      {
        'text-center': alignment === 'center',
        'text-end': alignment === 'end',
      },
    )}
  >
    {content}
  </MarkdownRenderer>
);
