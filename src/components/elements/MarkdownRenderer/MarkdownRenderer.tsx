import React from 'react';
import ReactMarkdown from 'react-markdown';

export const MarkdownRenderer: React.FC<{content: string}> = ({ content }) => {
  return (
    <div>
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
};