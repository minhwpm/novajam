import classNames from 'classnames';
import { AlignmentType, TitleFontSizeType } from '@/helpers/types';
import { MarkdownRenderer } from '@/components/elements/MarkdownRenderer/MarkdownRenderer';

export const Title: React.FC<{
  content: string;
  titleFontSize: TitleFontSizeType;
  alignment?: AlignmentType;
}> = ({ content, titleFontSize, alignment }) => (
  <div
    className={classNames('font-heading leading-snug dark:text-slate-100', {
      'text-center': alignment === 'center',
      'text-end': alignment === 'end',
      'text-sm-heading': titleFontSize === 'sm',
      'text-base-heading': titleFontSize === 'base',
      'text-lg-heading': titleFontSize === 'lg',
      'text-xl-heading': titleFontSize === 'xl',
      'text-2xl-heading': titleFontSize === '2xl',
    })}
  >
    <MarkdownRenderer>{content}</MarkdownRenderer>
  </div>
);
