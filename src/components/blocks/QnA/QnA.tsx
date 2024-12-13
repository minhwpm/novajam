'use client';
import { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import { QAType } from '@/helpers/types';
import { MarkdownRenderer } from '@/components/elements/MarkdownRenderer/MarkdownRenderer';
import { FaChevronRight } from 'react-icons/fa';

export const QnA: React.FC<{ data: QAType }> = ({ data }) => {
  const { heading, body, isCollapsed } = data;
  const [collapsed, setCollapsed] = useState(isCollapsed);
  const [height, setHeight] = useState(0);
  const bodyRef = useRef<HTMLDivElement>(null);

  // Set the height dynamically when collapsed
  useEffect(() => {
    if (bodyRef.current) {
      setHeight(collapsed ? 0 : bodyRef.current.scrollHeight);
    }
  }, [collapsed]);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className="max-w-2xl rounded-theme bg-white">
      <button
        className="p-4 lg:p-6 w-full flex justify-between items-baseline gap-10"
        onClick={toggleCollapsed}
      >
        <span className="text-lg 2xl:text-xl text-start font-heading font-semibold text-slate-800 max-w-none">
          {heading}
        </span>
        <FaChevronRight
          size={15}
          className={classNames(
            'shrink-0 transition-transform duration-500 text-slate-800',
            {
              'rotate-90': collapsed,
            },
          )}
        />
      </button>
      <div
        ref={bodyRef}
        style={{
          height: `${height}px`,
          overflow: 'hidden',
        }}
        className={classNames('transition-all duration-300 ease')}
      >
        <MarkdownRenderer className="max-w-none prose px-4 lg:px-6 pb-4 lg:pb-6 2xl:prose-lg text-slate-600">
          {body}
        </MarkdownRenderer>
      </div>
    </div>
  );
};
