import ReactMarkdown from 'react-markdown';

export const MarkdownRenderer: React.FC<{
  children: string;
  className?: string;
}> = ({ children, className }) => {
  return <ReactMarkdown className={className}>{children}</ReactMarkdown>;
};
