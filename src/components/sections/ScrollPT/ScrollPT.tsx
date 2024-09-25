'use client';
import { useState } from 'react';
import classNames from 'classnames';
import { Section } from '@/components/elements/Section/Section';
import {
  TextAlignmentType,
  ContentPTType,
  FlexibleContentType,
} from '@/helpers/types';
import { FlexibleContentMediaPart } from '@/components/elements/FlexibleContentMediaPart/FlexibleContentMediaPart';
import { TextPartPT } from '@/components/elements/TextPartPT/TextPartPT';
import { useInView } from 'react-hook-inview';
import '@/app/styles/bg-color.css';

const TextContent = ({
  data,
  idx,
  setVisibleIdx,
  alignment,
  darkMode,
}: {
  data: FlexibleContentType;
  idx: number;
  setVisibleIdx: (idx: number) => void;
  alignment: TextAlignmentType;
  darkMode: boolean;
}) => {
  const [ref, isVisible] = useInView({
    threshold: 0.9,
    onEnter: () => setVisibleIdx(idx),
  });
  return (
    <div
      ref={ref}
      className={classNames(
        'py-[20vh] px-10 transition-opacity duration-300 flex flex-col',
        { 'is-visible opacity-100': isVisible },
        { 'is-invisible opacity-10': !isVisible },
        { 'text-center': alignment === 'center' },
        { 'text-end': alignment === 'end' },
      )}
    >
      <TextPartPT data={data} alignment={alignment} darkMode={darkMode} />
    </div>
  );
};

export const ScrollPT: React.FC<{ data: ContentPTType }> = ({ data }) => {
  const { contentItems, itemTextAlignment, darkMode } = data;
  const [visibleIdx, setVisibleIdx] = useState(0);
  return (
    <Section data={data}>
      {/* FOR MOBILE, TABLETS */}
      <div className="lg:hidden">
        {contentItems?.map((item) => (
          <div key={item.id} className="mb-20">
            <div
              className={classNames(
                'flex flex-col mb-10',
                { 'text-center': itemTextAlignment === 'center' },
                { 'text-end': itemTextAlignment === 'end' },
              )}
            >
              <TextPartPT
                data={item}
                alignment={itemTextAlignment}
                darkMode={darkMode}
              />
            </div>
            <div className="md:w-3/5 mx-auto">
              {item.media?.length > 0 && (
                <FlexibleContentMediaPart
                  data={item}
                  alignment={itemTextAlignment}
                />
              )}
            </div>
          </div>
        ))}
      </div>

      {/* FOR DESKTOP */}
      <div className="hidden lg:flex">
        <div className="relative w-3/5">
          <div className="sticky top-20">
            <div className="relative h-[80vh]">
              {contentItems?.map((item, idx) => (
                <div
                  key={item.id}
                  className={classNames(
                    'transition-opacity duration-300',
                    {
                      'is-visible opacity-100 h-full overflow-visible ':
                        visibleIdx === idx,
                    },
                    {
                      'is-invisible h-0 opacity-10 max-h-full relative overflow-hidden':
                        visibleIdx !== idx,
                    },
                  )}
                >
                  {item.media.length > 0 && (
                    <FlexibleContentMediaPart
                      data={item}
                      alignment={itemTextAlignment}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="w-2/5 flex flex-col">
          {contentItems?.map((item, idx) => (
            <TextContent
              key={item.id}
              data={item}
              idx={idx}
              setVisibleIdx={setVisibleIdx}
              alignment={itemTextAlignment}
              darkMode={darkMode}
            />
          ))}
        </div>
      </div>
    </Section>
  );
};
