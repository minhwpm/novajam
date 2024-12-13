import { ContentListType, PricingPlanType } from '@/helpers/types';
import { CarouselList } from '@/components/blocks/CarouselList/CarouselList';
import { MasonryList } from '@/components/blocks/MasonryList/MasonryList';
import { GridList } from '@/components/blocks/GridList/GridList';
import { FlexList } from '@/components/blocks/FlexList/FlexList';
import { ButtonGroup } from '@/components/elements/ButtonGroup/ButtonGroup';
import { PricingOptionProvider } from '@/components/elements/PricingOptionProvider/PricingOptionProvider';
import { PricingSwitcher } from '@/components/elements/PricingSwitcher/PricingSwitcher';

export const ContentList: React.FC<{ data: ContentListType }> = ({ data }) => {
  const { contentItems, layout, gap, ctas } = data;
  const columns = data.columns ?? 2;

  const renderLayout = () => {
    switch (layout) {
      case 'carousel':
        return (
          <CarouselList
            contentItems={contentItems}
            columns={columns}
            gap={gap}
          />
        );
      case 'masonry':
        return (
          <MasonryList
            contentItems={contentItems}
            columns={columns}
            gap={gap}
          />
        );
      case 'grid':
        return (
          <GridList contentItems={contentItems} columns={columns} gap={gap} />
        );
      case 'flex':
        return (
          <FlexList contentItems={contentItems} columns={columns} gap={gap} />
        );
      default:
        return null;
    }
  };

  const renderCTA = () =>
    ctas?.length > 0 && (
      <ButtonGroup
        className="mt-10 lg:mt-12"
        data={ctas}
        size="lg"
        alignment="center"
      />
    );

  const isPricingPlan = contentItems.every(
    (contentItem) =>
      contentItem.contentType === 'pricingplan' &&
      contentItem.pricingOptions.length > 1,
  );

  return isPricingPlan ? (
    <PricingOptionProvider>
      <PricingSwitcher plans={contentItems as PricingPlanType[]} />
      <div className="mt-12 lg:mt-14">
        {renderLayout()}
        {renderCTA()}
      </div>
    </PricingOptionProvider>
  ) : (
    <>
      {renderLayout()}
      {renderCTA()}
    </>
  );
};
