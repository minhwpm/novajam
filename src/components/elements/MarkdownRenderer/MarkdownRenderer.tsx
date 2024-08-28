import React from 'react';
import ReactMarkdown from 'react-markdown';

export const MarkdownRenderer: React.FC<{content: string, className: string}> = ({ content, className }) => {
  return (
    <ReactMarkdown className={className}>{content}</ReactMarkdown>
  );
};