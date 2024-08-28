import React from 'react';
import ReactMarkdown from 'react-markdown';

export const MarkdownRenderer: React.FC<{content: string, className?: string}> = ({ content, className }) => {
  return (
    <div className={className}>
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
};