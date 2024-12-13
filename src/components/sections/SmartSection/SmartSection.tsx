'use client';
import classNames from 'classnames';
import {
  SmartSectionType,
  ContentListType,
  FormType,
  RichContentType,
  FeaturedMediaType,
  SmartSectionLayoutType,
} from '@/helpers/types';
import { SectionSeparator } from '@/components/elements/SectionSeparator/SectionSeparator';
import { Form } from '@/components/compartments/Form/Form';
import { RichContent } from '@/components/compartments/RichContent/RichContent';
import { ContentList } from '@/components/compartments/ContentList/ContentList';
import { FeaturedMedia } from '@/components/compartments/FeaturedMedia/FeaturedMedia';

interface SmartSectionProps {
  className?: string;
  layout?: SmartSectionLayoutType;
  data: SmartSectionType;
}

export const SmartSection: React.FC<SmartSectionProps> = ({
  className,
  data,
}) => {
  const {
    htmlid,
    content,
    layout,
    gap,
    backgroundColor,
    backgroundImage,
    enableParallaxEffect,
    darkMode,
    sectionSeparator,
    paddingTop,
    paddingBottom,
    fullViewWidth,
  } = data;

  const backgroundStyle = {
    backgroundColor: backgroundColor
      ? `rgba(${parseInt(backgroundColor.slice(1, 3), 16)}, 
            ${parseInt(backgroundColor.slice(3, 5), 16)}, 
            ${parseInt(backgroundColor.slice(5, 7), 16)}, 
            var(--tw-bg-opacity))`
      : 'none',
    backgroundImage: backgroundImage
      ? `url(${backgroundImage.url}), url('/fallback.png)`
      : 'none',
  };

  function mapSectionContent(
    sectionContent:
      | ContentListType
      | FormType
      | RichContentType
      | FeaturedMediaType,
  ) {
    switch (sectionContent.contentType) {
      case 'richcontent':
        return <RichContent data={sectionContent} />;
      case 'featuredmedia':
        return <FeaturedMedia data={sectionContent} />;
      case 'form':
        return <Form data={sectionContent} />;
      case 'contentlist':
        return <ContentList data={sectionContent} />;
      default:
        return null;
    }
  }
  return (
    <section
      id={htmlid ?? ''}
      className={classNames(
        'bg-opacity-100', // to set --tw-bg-opacity: 100
        {
          'bg-center bg-no-repeat bg-cover bg-blend-multiply': backgroundImage,
          'dark:bg-opacity-5': !darkMode && backgroundColor,
          'dark:bg-slate-900/90': !darkMode && backgroundImage,
          dark: darkMode,
          'lg:bg-fixed': backgroundImage && enableParallaxEffect,
        },
        className,
      )}
      style={backgroundStyle}
    >
      <div
        className={classNames({
          container: !fullViewWidth,
        })}
      >
        <div
          className={classNames(
            'grid grid-cols-1 grid-flow-col overflow-hidden',
            {
              'lg:grid-cols-[auto,auto] items-center':
                (layout === 'Classic' || layout === 'Classic R') &&
                content.length === 2,
              'lg:grid-cols-2 lg:grid-rows-[auto,auto] items-sketch':
                (layout === 'Classic' || layout === 'Classic R') &&
                content.length > 2,
              [`grid-rows-${content.length} items-center`]: layout === 'Rows',
              [`lg:grid-cols-${content.length} items-center`]:
                layout === 'Columns',
              [`lg:grid-cols-${content.length - 1} lg:grid-rows-[auto,auto] items-center`]:
                layout === 'Banner',
              //padding //@TODO refactor padding
              'pt-2 md:pt-2.5 lg:pt-3': paddingTop === 'xs',
              'pb-2 md:pb-2.5 lg:pb-3': paddingBottom === 'xs',
              'pt-4 md:pt-5 lg:pt-6': paddingTop === 'sm',
              'pb-4 md:pb-5 lg:pb-6': paddingBottom === 'sm',
              'pt-6 md:pt-7.5 lg:pt-9': paddingTop === 'base',
              'pb-6 md:pb-7.5 lg:pb-9': paddingBottom === 'base',
              'pt-10 md:pt-12 lg:pt-15': paddingTop === 'lg',
              'pb-10 md:pb-12 lg:pb-15': paddingBottom === 'lg',
              'pt-16 md:pt-20 lg:pt-24': paddingTop === 'xl',
              'pb-16 md:pb-20 lg:pb-24': paddingBottom === 'xl',
              'pt-26 md:pt-32 lg:pt-39': paddingTop === '2xl',
              'pb-26 md:pb-32 lg:pb-39': paddingBottom === '2xl',
              'pt-42 md:pt-52 lg:pt-63': paddingTop === '3xl',
              'pb-42 md:pb-52 lg:pb-63': paddingBottom === '3xl',
              'gap-2 md:gap-2.5 lg:gap-3': gap === 'xs' && content.length > 1,
              'gap-4 md:gap-5 lg:gap-6': gap === 'sm' && content.length > 1,
              'gap-6 md:gap-8 lg:gap-9': gap === 'base' && content.length > 1,
              'gap-10 md:gap-12 lg:gap-15': gap === 'lg' && content.length > 1,
              'gap-16 md:gap-20 lg:gap-24': gap === 'xl' && content.length > 1,
              'gap-26 md:gap-32 lg:gap-39': gap === '2xl' && content.length > 1,
            },
          )}
        >
          {content.map((contentItem, idx) => (
            <div
              key={idx}
              className={classNames('col-span-full', {
                'lg:col-span-1':
                  layout === 'Classic' ||
                  layout === 'Classic R' ||
                  layout === 'Columns' ||
                  (layout === 'Banner' && idx > 0),
                'lg:first:row-span-full': layout === 'Classic',
                'lg:last:row-span-full': layout === 'Classic R',
                'first:self-end': layout === 'Classic R' && content.length > 2,
                'even:self-end': layout === 'Classic' && content.length > 2,
              })}
            >
              {mapSectionContent(contentItem)}
            </div>
          ))}
        </div>
      </div>
      {sectionSeparator && <SectionSeparator />}
    </section>
  );
};
