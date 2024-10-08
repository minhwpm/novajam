'use client';
import classNames from 'classnames';
import { useIntersecting } from '@/helpers/hooks/useIntersecting';
import { FeaturedContentType } from '@/helpers/types';
import { Section } from '@/components/sections/Section/Section';
import { MediaItem } from '@/components/elements/MediaItem/MediaItem';
import { MediaCarousel } from '@/components/elements/MediaCarousel/MediaCarousel';
import { DeckList } from '../DeckList/DeckList';
import '@/app/styles/bg-color.css';
import '@/app/styles/padding.css';

export const FeaturedContent: React.FC<{ data: FeaturedContentType }> = ({
  data,
}) => {
  const { blocks, media, mediaAspectRatio, alignment } = data;
  const layout = data.layout ?? 'flex row';
  const [mediaRef, isMediaIntersecting] = useIntersecting();

  return (
    <Section data={data} layout={layout}>
      {!!media.length && (
        <div
          ref={mediaRef}
          className={classNames(
            'relative -bottom-10 opacity-0 lg:basis-1/4 shrink grow',
            {
              'animate-slidingUpContent animation-delay-300':
                isMediaIntersecting,
            },
          )}
        >
          {media.length === 1 ? (
            <MediaItem
              data={media[0]}
              aspectRatio={mediaAspectRatio}
              videoControls
            />
          ) : (
            <MediaCarousel
              data={media}
              autoplay={{ delay: 3500 }}
              pagination={{ enabled: true }}
              aspectRatio={mediaAspectRatio}
            />
          )}
        </div>
      )}
      {!!blocks.length && (
        <div
          className={classNames('lg:basis-1/4 grow shrink', {
            'lg:max-w-fit': layout === 'flex row',
          })}
        >
          {!!blocks.length && (
            <DeckList blocks={blocks} itemSize={'2XL'} alignment={alignment} />
          )}
        </div>
      )}
    </Section>
  );
};
