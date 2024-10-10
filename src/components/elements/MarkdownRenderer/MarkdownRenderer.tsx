import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { IoCheckmarkSharp } from 'react-icons/io5';

export const MarkdownRenderer: React.FC<{
  children: string;
  className?: string;
}> = ({ children, className }) => {
  return (
    <ReactMarkdown
      className={className}
      remarkPlugins={[remarkGfm]}
      components={{
        li: ({ children, ...props }) => (
          <li className="relative list-none" {...props}>
            <IoCheckmarkSharp
              className="absolute -left-6 -top-4  text-primary-500 bg-primary-500/10 rounded-full p-0.5"
              size={20}
            />
            {children}
          </li>
        ),
        del: ({ children, ...props }) => (
          <del className="text-slate-300" {...props}>
            {children}
          </del>
        ),
      }}
    >
      {children}
    </ReactMarkdown>
  );
};
