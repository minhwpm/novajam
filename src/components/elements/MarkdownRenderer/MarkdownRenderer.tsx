import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import rehypeRaw from 'rehype-raw';
import { IoCheckmarkSharp } from 'react-icons/io5';

export const MarkdownRenderer: React.FC<{
  children: string;
  className?: string;
  blogMode?: boolean;
}> = ({ children, className, blogMode = false }) => {
  return (
    <ReactMarkdown
      className={className}
      remarkPlugins={[remarkGfm, remarkBreaks]}
      rehypePlugins={[rehypeRaw]} // Add raw HTML parsing support
      components={{
        h1: ({ children, ...props }) => (
          <h1 className="font-heading" {...props}>
            {children}
          </h1>
        ),
        h2: ({ children, ...props }) => (
          <h2 className="font-heading" {...props}>
            {children}
          </h2>
        ),
        h3: ({ children, ...props }) => (
          <h3 className="font-heading" {...props}>
            {children}
          </h3>
        ),
        h4: ({ children, ...props }) => (
          <h4 className="font-heading" {...props}>
            {children}
          </h4>
        ),
        h5: ({ children, ...props }) => (
          <h5 className="font-heading" {...props}>
            {children}
          </h5>
        ),
        h6: ({ children, ...props }) => (
          <h6 className="font-heading" {...props}>
            {children}
          </h6>
        ),
        ul: ({ children, ...props }) => {
          if (!blogMode) {
            return (
              <ul className="flex flex-wrap gap-x-10" {...props}>
                {children}
              </ul>
            );
          }
          return <ul {...props}>{children}</ul>;
        },
        li: ({ children, ...props }) => {
          if (blogMode) {
            return <li {...props}>{children}</li>;
          }
          return (
            <li
              className="relative list-none grow basis-full md:basis-5/12 min-w-fit"
              {...props}
            >
              <IoCheckmarkSharp
                className="absolute -left-6 -top-5 text-primary-500"
                size={25}
              />
              {children}
            </li>
          );
        },
        del: ({ children, ...props }) => (
          <del className="text-slate-300" {...props}>
            {children}
          </del>
        ),
        a: ({ children, ...props }) => (
          <Link
            className="underline underline-offset-4 decoration-1"
            href={props.href ?? '#'}
          >
            {children}
          </Link>
        ),
      }}
    >
      {children}
    </ReactMarkdown>
  );
};
