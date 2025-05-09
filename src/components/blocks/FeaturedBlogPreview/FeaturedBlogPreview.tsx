import classNames from 'classnames';
import readingTime from 'reading-time';
import Link from 'next/link';
import { format } from 'date-fns';
import { BlogPostType, MediaAspectRatioType } from '@/lib/types';
import { MediaItem } from '@/components/elements/MediaItem/MediaItem';
import { MarkdownRenderer } from '@/components/elements/MarkdownRenderer/MarkdownRenderer';
import { Author } from '@/components/blocks/Author/Author';

interface BlogPreviewProps {
  data: BlogPostType;
  aspectRatio?: MediaAspectRatioType;
  withSummary?: boolean;
}

export const FeaturedBlogPreview: React.FC<BlogPreviewProps> = ({
  data,
  aspectRatio = '16/9',
  withSummary = false,
}) => {
  const {
    title,
    slug,
    summary,
    taxonomy,
    body,
    featuredImage,
    postDate,
    author,
  } = data;

  const readingTimeStats = readingTime(body ?? '');

  return (
    <div className="group w-full h-full rounded-theme">
      <Link href={`/blog/${slug}`}>
        <article className="grid grid-cols-12 grid-flow-col gap-4 md:gap-6 lg:gap-8">
          <div className="col-span-full lg:col-span-8">
            <MediaItem
              data={featuredImage}
              altText={featuredImage?.description || title}
              aspectRatio={aspectRatio}
              zoomInOverHover
              priority
            />
          </div>

          <div className="col-span-full lg:col-span-4 flex flex-col justify-center gap-y-4 py-4">
            <TaxonomyAndReadingTime
              taxonomy={taxonomy}
              readingTime={
                readingTimeStats.minutes ? readingTimeStats.text : undefined
              }
            />
            <Title title={title} slug={slug} />
            {withSummary && summary && <Summary summary={summary} />}
            {author && author[0] && <Author author={author[0]} />}
            {postDate && <PublishDate date={postDate} />}
          </div>
        </article>
      </Link>
    </div>
  );
};

const TaxonomyAndReadingTime: React.FC<{
  taxonomy: BlogPostType['taxonomy'];
  readingTime?: string;
}> = ({ taxonomy, readingTime }) => (
  <div className="inline-flex items-center gap-2">
    {taxonomy?.length > 0 && (
      <>
        {taxonomy.map((item, idx) => (
          <span
            key={idx}
            className="text-sm uppercase tracking-wider text-primary-600 dark:text-primary-400 font-semibold"
          >
            {item.name}
          </span>
        ))}
        {readingTime && (
          <span className="text-slate-400 dark:text-slate-100/50 text-xs font-medium uppercase">
            •
          </span>
        )}
      </>
    )}
    {readingTime && (
      <span className="text-slate-400 dark:text-slate-100/50 text-xs font-medium uppercase">
        {readingTime}
      </span>
    )}
  </div>
);

const Title: React.FC<{ title: string; slug: string }> = ({ title }) => (
  <h2
    className={classNames(
      'text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-[2.675rem] lg:!leading-tight font-heading font-semibold transition-colors duration-500 group-hover:underline underline-offset-4 dark:text-slate-100 dark:hover:text-primary-500',
    )}
  >
    {title}
  </h2>
);

const Summary: React.FC<{ summary: string }> = ({ summary }) => (
  <div className="line-clamp-3 prose text-slate-600 dark:text-slate-100/80">
    <MarkdownRenderer>{summary}</MarkdownRenderer>
  </div>
);

const PublishDate: React.FC<{ date: string }> = ({ date }) => (
  <div className="text-slate-400 dark:text-slate-100/50">
    {format(Date.parse(date), 'MMMM dd, yyyy')}
  </div>
);
