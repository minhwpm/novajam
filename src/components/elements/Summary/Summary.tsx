import classNames from 'classnames';
import { AlignmentType } from '@/helpers/types';
import { MarkdownRenderer } from '../MarkdownRenderer/MarkdownRenderer';

export const Summary: React.FC<{
  content: string;
  alignment: AlignmentType;
}> = ({ content, alignment }) => (
  <div
    className={classNames(
      'prose lg:prose-lg 2xl:prose-xl max-w-xl lg:max-w-xl text-slate-600 dark:prose-invert dark:text-white/80',
      {
        'text-center': alignment === 'center',
        'text-end': alignment === 'end',
      },
    )}
  >
    <MarkdownRenderer>{content}</MarkdownRenderer>
  </div>
);
