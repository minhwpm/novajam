'use client'

import classNames from "classnames";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Section from "@/components/elements/Section/Section";
import { TestimonialsType } from "@/helpers/types";

interface ArrowGroupProps {
  visibleIdx: number
  setVisibleIdx: (idx: number) => void
  length: number
}

const ArrowGroup = ({visibleIdx, setVisibleIdx, length}: ArrowGroupProps) => {
  return (
    <>
      <FontAwesomeIcon
        className="xl:inline-block cursor-pointer"
        icon={faArrowLeft}
        size="2xl"
        width={26}
        onClick={() => {
          if (visibleIdx > 0) setVisibleIdx(visibleIdx - 1);
          else setVisibleIdx(length - 1);
        }}
      />
      <FontAwesomeIcon
        className="xl:inline-block cursor-pointer"
        icon={faArrowRight}
        size="2xl"
        width={26}
        onClick={() => {
          if (visibleIdx < length - 1)
            setVisibleIdx(visibleIdx + 1);
          else setVisibleIdx(0);
        }}
      />
    </>
  )
}

interface Props {
  data: TestimonialsType
}

const Testimonials: React.FC<Props> = ({ data }) => {
  const { title, content } = data
  const [visibleIdx, setVisibleIdx] = useState(0);

  return (
    <Section>
      <div className="bg-gray-200 bg-opacity-60 w-full">
        <div className="container mx-auto xl:flex xl:gap-5 overflow-x-hidden py-24 px-4">
          <div className="xl:w-1/2 pr-10">
            <h2 className="text-3xl lg:text-4xl lg:leading-[50px] font-bold mb-10">
              {title}
            </h2>
            <div className="hidden xl:flex gap-12">
              <ArrowGroup visibleIdx={visibleIdx} setVisibleIdx={setVisibleIdx} length={content.length} />
            </div>
          </div>
          <div className="xl:w-1/2 grid pr-5">
            {content.map((item, idx) => (
              <div
                key={item.id} //@TODO key is too long. does it hurt performance?
                className={classNames(
                  "col-start-1 row-start-1 flex flex-col gap-5 justify-center p-12 shadow-xl bg-white rounded-lg transition-all ease-in-out duration-500 relative bg-[url('/images/quote-left.svg')] bg-no-repeat",
                  { "opacity-100 right-0": visibleIdx == idx },
                  { "opacity-0 -right-24": visibleIdx != idx }
                )}
              >
                <h3 className="text-2xl font-semibold">{item.title}</h3>
                <p className="text-lg leading-8 italic">{item.content}</p>
                <p> - {item.witnessFullName}</p>
              </div>
            ))}
          </div>
          <div className="flex xl:hidden gap-12 mt-8 justify-center">
            <ArrowGroup visibleIdx={visibleIdx} setVisibleIdx={setVisibleIdx} length={content.length} />
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Testimonials;
