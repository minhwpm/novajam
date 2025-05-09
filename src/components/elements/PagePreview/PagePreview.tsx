'use client';
import classNames from 'classnames';
import Link from 'next/link';
import { AlignmentType, PageType } from '@/lib/types';
import { MediaItem } from '@/components/elements/MediaItem/MediaItem';

export const PagePreview: React.FC<{
  data: PageType;
  layout?: 'vertical' | 'horizontal';
  alignment?: AlignmentType;
}> = ({ data, layout = 'vertical', alignment }) => {
  const { title, url, seo } = data;

  if (layout === 'horizontal') {
    return (
      <div className={classNames('rounded-theme flex gap-5')}>
        <div className="basis-1/3 flex-1">
          <Link href={url}>
            <MediaItem data={seo?.ogImage} aspectRatio="square" />
          </Link>
        </div>
        <div className="basis-2/3 flex-1 py-4 pr-4 lg:py-6 lg:pr-6">
          <h4
            className={classNames(
              'text-lg xl:text-xl font-heading file:font-semibold dark:text-slate-100',
              {
                'text-center': alignment === 'center',
                'text-end': alignment === 'end',
              },
            )}
          >
            <Link href={url}>{seo?.metaTitle ?? title}</Link>
          </h4>
        </div>
      </div>
    );
  }
  return (
    <div
      className={classNames('group rounded-theme flex flex-col pb-4 lg:pb-6')}
    >
      <Link href={url}>
        <MediaItem
          data={seo?.ogImage}
          altText={seo?.ogImage?.description ?? ''}
          aspectRatio="4/3"
          zoomInOverHover
        />
        <h4
          className={classNames(
            'mt-4 text-lg xl:text-xl font-heading font-semibold transition-colors duration-300 ease-in-out dark:text-slate-100',
            {
              'text-center': alignment === 'center',
              'text-end': alignment === 'end',
            },
          )}
        >
          {seo?.metaTitle ?? title}
        </h4>
      </Link>
    </div>
  );
};
