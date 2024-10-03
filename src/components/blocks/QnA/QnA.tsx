'use client';
import { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import { QAType } from '@/helpers/types';
import { MarkdownRenderer } from '@/components/elements/MarkdownRenderer/MarkdownRenderer';
import { FaChevronRight } from 'react-icons/fa';

export const QnA: React.FC<{ data: QAType }> = ({ data }) => {
  const { question, answer } = data;
  const [expanded, setExpanded] = useState(data.isExpanded);
  const [height, setHeight] = useState(0);
  const answerRef = useRef<HTMLDivElement>(null);

  // Set the height dynamically when expanded
  useEffect(() => {
    if (answerRef.current) {
      setHeight(expanded ? answerRef.current.scrollHeight : 0);
    }
  }, [expanded]);

  const toggleAccordion = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="max-w-2xl rounded-theme bg-white dark:bg-white/5">
      <button
        className="p-4 lg:p-6 w-full flex justify-between items-center"
        onClick={toggleAccordion}
      >
        <div className="prose prose-lg 2xl:prose-xl font-medium dark:text-slate-100">
          {question}
        </div>
        <FaChevronRight
          size={15}
          className={classNames(
            'shrink-0 transition-transform duration-500 dark:text-slate-100',
            { 'rotate-90': expanded },
          )}
        />
      </button>
      <div
        ref={answerRef}
        style={{
          height: `${height}px`,
          overflow: 'hidden',
        }}
        className={classNames('transition-all duration-300 ease')}
      >
        <MarkdownRenderer className="prose px-4 lg:px-6 pb-4 lg:pb-6 2xl:prose-lg text-slate-500 dark:text-slate-100/70">
          {answer}
        </MarkdownRenderer>
      </div>
    </div>
  );
};
