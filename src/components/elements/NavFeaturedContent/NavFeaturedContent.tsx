import Link from 'next/link';
import { BlogPostType, PageType } from '@/lib/types';
import { MediaItem } from '@/components/elements/MediaItem/MediaItem';

export const NavFeaturedContent: React.FC<{
  data: BlogPostType | PageType;
  onClick?: () => void;
}> = ({ data, onClick }) => {
  const isBlog = data.contentType === 'blog';
  const url = isBlog ? `/blog/${data.slug}` : data.url;
  const image = isBlog ? data.featuredImage : data.seo?.ogImage;
  const altText = isBlog
    ? data.featuredImage?.description || data.title
    : (data.seo?.metaTitle ?? data.title);
  const title = isBlog ? data.title : (data.seo?.metaTitle ?? data.title);

  return (
    <Link href={url} onClick={onClick} title={title} aria-label={title}>
      <article className="relative">
        <MediaItem
          data={image}
          altText={altText}
          aspectRatio="3/2"
          zoomInOverHover
        />
        <div className="absolute rounded-theme inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none transition-opacity duration-500" />
        <h3 className="absolute w-full bottom-0 px-4 pb-3 text-[17px] flex justify-center font-heading font-semibold text-white">
          {title}
        </h3>
      </article>
    </Link>
  );
};
