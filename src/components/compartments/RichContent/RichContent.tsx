import classNames from 'classnames';
import { RichContentType } from '@/helpers/types';
import { ButtonGroup } from '@/components/elements/ButtonGroup/ButtonGroup';
import { Eyebrow } from '@/components/elements/Eyebrow/Eyebrow';
import { Title } from '@/components/elements/Title/Title';
import { Body } from '@/components/elements/Body/Body';
import { MarkdownRenderer } from '@/components/elements/MarkdownRenderer/MarkdownRenderer';

export const RichContent: React.FC<{
  data: RichContentType;
}> = function ({ data }) {
  const {
    eyebrow,
    title,
    body,
    ctas,
    disclaimer,
    titleFontSize,
    alignment,
    paddingTop,
    paddingLeft,
    paddingBottom,
    paddingRight,
  } = data;
  return (
    <div
      className={classNames('max-w-4xl flex flex-col gap-6', {
        'items-center text-center justify-self-center': alignment === 'center',
        'items-end text-end justify-self-end': alignment === 'end',
        //padding //@TODO refactor padding
        'pt-2 md:pt-2.5 lg:pt-3.5': paddingTop === 'xs',
        'pb-2 md:pb-2.5 lg:pb-3.5': paddingBottom === 'xs',
        'pt-4 md:pt-5 lg:pt-6': paddingTop === 'sm',
        'pb-4 md:pb-5 lg:pb-6': paddingBottom === 'sm',
        'pt-6 md:pt-8 lg:pt-10': paddingTop === 'base',
        'pb-6 md:pb-8 lg:pb-10': paddingBottom === 'base',
        'pt-10 md:pt-12 lg:pt-16': paddingTop === 'lg',
        'pb-10 md:pb-12 lg:pb-16': paddingBottom === 'lg',
        'pt-16 md:pt-20 lg:pt-28': paddingTop === 'xl',
        'pb-16 md:pb-20 lg:pb-28': paddingBottom === 'xl',
        'pt-26 md:pt-32 lg:pt-39': paddingTop === '2xl',
        'pb-26 md:pb-32 lg:pb-39': paddingBottom === '2xl',
        'pl-2 md:pl-2.5 lg:pl-3.5': paddingLeft === 'xs',
        'pr-2 md:pr-2.5 lg:pr-3.5': paddingRight === 'xs',
        'pl-4 md:pl-5 lg:pl-6': paddingLeft === 'sm',
        'pr-4 md:pr-5 lg:pr-6': paddingRight === 'sm',
        'pl-6 md:pl-8 lg:pl-10': paddingLeft === 'base',
        'pr-6 md:pr-8 lg:pr-10': paddingRight === 'base',
        'pl-10 md:pl-12 lg:pl-16': paddingLeft === 'lg',
        'pr-10 md:pr-12 lg:pr-16': paddingRight === 'lg',
        'pl-16 md:pl-20 lg:pl-28': paddingLeft === 'xl',
        'pr-16 md:pr-20 lg:pr-28': paddingRight === 'xl',
        'pl-26 md:pl-32 lg:pl-39': paddingLeft === '2xl',
        'pr-26 md:pr-32 lg:pr-39': paddingRight === '2xl',
      })}
    >
      {eyebrow && <Eyebrow content={eyebrow} />}
      {title && (
        <Title content={title} titleFontSize={titleFontSize ?? 'base'} />
      )}
      {body && <Body content={body} />}
      {!!ctas?.length && (
        <ButtonGroup
          className={classNames({
            'mt-2 lg:mt-4': body,
          })}
          data={ctas}
          alignment={alignment ?? 'start'}
          size="lg"
        />
      )}
      {disclaimer && (
        <MarkdownRenderer className="-mt-4 prose text-smd text-slate-500">
          {disclaimer}
        </MarkdownRenderer>
      )}
    </div>
  );
};
