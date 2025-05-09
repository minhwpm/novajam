'use client';
import classNames from 'classnames';
import {
  SmartSectionType,
  ContentListType,
  FormType,
  RichContentType,
  FeaturedMediaType,
} from '@/lib/types';
import { SectionSeparator } from '@/components/elements/SectionSeparator/SectionSeparator';
import { Form } from '@/components/compartments/Form/Form';
import { RichContent } from '@/components/compartments/RichContent/RichContent';
import { ContentList } from '@/components/compartments/ContentList/ContentList';
import { FeaturedMedia } from '@/components/compartments/FeaturedMedia/FeaturedMedia';
import { getSpacingClasses } from '@/lib/utils';

interface SmartSectionProps {
  className?: string;
  data: SmartSectionType;
}

export const SmartSection: React.FC<SmartSectionProps> = ({
  className,
  data,
}) => {
  const {
    htmlid,
    content,
    gap,
    layout,
    backgroundColor,
    backgroundImage,
    enableParallaxEffect,
    inverse,
    sectionSeparator,
    paddingTop,
    paddingBottom,
    width,
  } = data;

  // Extracted function to get background styles
  const getBackgroundStyle = () => {
    if (!backgroundColor && !backgroundImage) return {};
    return {
      backgroundColor: backgroundColor
        ? `rgba(${parseInt(backgroundColor.slice(1, 3), 16)}, 
                ${parseInt(backgroundColor.slice(3, 5), 16)}, 
                ${parseInt(backgroundColor.slice(5, 7), 16)}, 
                var(--tw-bg-opacity))`
        : 'none',
      backgroundImage: backgroundImage ? `url(${backgroundImage.url})` : 'none',
    };
  };

  // Extracted function to get grid classes
  const getGridClasses = () => {
    if (!content.length) return '';

    return classNames(
      'grid grid-cols-1 grid-flow-col overflow-hidden',
      getSpacingClasses('pt', paddingTop),
      getSpacingClasses('pb', paddingBottom),
      getSpacingClasses('gap', gap),
      {
        'gap-y-6 md:gap-y-7.5 lg:gap-y-9':
          (gap === 'lg' || gap === 'xl' || gap === '2xl') &&
          ['Classic', 'Classic R'].includes(layout),
        'lg:grid-cols-[auto,auto] items-center':
          ['Classic', 'Classic R'].includes(layout) && content.length === 2,
        'lg:grid-cols-2 lg:grid-rows-[auto,auto] items-sketch':
          ['Classic', 'Classic R'].includes(layout) && content.length > 2,
        [`grid-rows-${content.length} items-center`]: layout === 'Rows',
        [`lg:grid-cols-${content.length} items-center`]: layout === 'Columns',
        [`lg:grid-cols-${content.length - 1} lg:grid-rows-[auto,auto] items-center`]:
          layout === 'Banner',
      },
    );
  };

  // Extracted function to render content
  const renderContent = (
    sectionContent:
      | ContentListType
      | FormType
      | RichContentType
      | FeaturedMediaType,
  ) => {
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
  };

  // Extracted function to render individual content items
  const renderContentItems = () =>
    content?.map((contentItem, idx) => (
      <div
        key={idx}
        className={classNames('col-span-full', {
          'lg:col-span-1':
            ['Classic', 'Classic R', 'Columns'].includes(layout) ||
            (layout === 'Banner' && idx > 0),
          'lg:first:row-span-full': layout === 'Classic',
          'lg:last:row-span-full': layout === 'Classic R',
          'first:self-end': layout === 'Classic R' && content.length > 2,
          'even:self-end': layout === 'Classic' && content.length > 2,
        })}
      >
        {renderContent(contentItem)}
      </div>
    ));

  return (
    <section
      id={htmlid ?? ''}
      className={classNames(
        'bg-opacity-100',
        {
          'bg-center bg-no-repeat bg-cover bg-blend-multiply': backgroundImage,
          'dark:bg-opacity-5': !inverse && backgroundColor,
          'dark:bg-opacity-80': inverse && backgroundColor,
          'dark:bg-slate-800/95 dark:bg-blend-color-burn':
            !inverse && backgroundImage,
          'dark:bg-slate-800/50 dark:bg-blend-color-burn':
            inverse && backgroundImage,
          'lg:bg-fixed': backgroundImage && enableParallaxEffect,
          inverse,
        },
        className,
      )}
      style={getBackgroundStyle()}
    >
      <div
        className={classNames({
          container: !width || width === 'standard',
          'max-w-5xl mx-auto px-4': width === 'narrow',
        })}
      >
        <div className={getGridClasses()}>{renderContentItems()}</div>
      </div>
      {sectionSeparator && <SectionSeparator />}
    </section>
  );
};
