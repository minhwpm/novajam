'use client'

import classNames from "classnames";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const dummyData = {
  title: "Don’t take our word for it, check how Bluebiz helps users grow their business",
  subtitle: "",
  sections: [
    {
      title: "Get more leads",
      content:
        "GET THIS PROGRAM - it has already boosted my sales leads by 34% in a matter of hours. Don't waste your time, searching - Bluebiz does it all. I am very pleased how they helped get me started too.",
      source: "Review on G2"
    },
    {
      title: "Increase conversion rate",
      content:
        "My conversion rate went from 1.4 to 4.8! This is amazing and makes me a lot of money automatically!",
      source: "Review on Shopify"
    },
    {
      title: "Generate more sales",
      content:
        "Bluebiz helped me make over 60k in sales in just a few months. Customer retention rate is a lot higher and a benefit is the sales!",
      source: "Review on G2"
    },
    {
      title: "Increase satisfaction rate",
      content:
        "Since having Bluebiz integrated into our website we have seen sales nearly double and positive reviews triple.",
      source: "Review on G2"
    },
  ]
}
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
  data?: { // @TODO modify data? later
    label?: string
    title?: string
    subtitle?: string
    sections: Array<{
      title: string
      content?: string
      source?: string
    }>
  }

}

const Testimonials = ( { data = dummyData }: Props) => {
  const [visibleIdx, setVisibleIdx] = useState(0);

  return (
    <div className="bg-gray-200 bg-opacity-60 px-5">
      <div className="overflow-x-hidden py-20 sm:p-5 md:p-16 xl:p-32">
        <div className="xl:flex xl:gap-5">
          <div className="xl:w-1/2 pr-10">
            <h2 className="text-3xl lg:text-4xl lg:leading-[50px] font-bold mb-10">
              {data.title}
            </h2>
            <div className="hidden xl:flex gap-12">
              <ArrowGroup visibleIdx={visibleIdx} setVisibleIdx={setVisibleIdx} length={data.sections.length} />
            </div>
          </div>
          <div className="xl:w-1/2 grid ">
            {data.sections.map((item, idx) => (
              <div
                key={item.content} //@TODO key is too long. does it hurt performance?
                className={classNames(
                  "col-start-1 row-start-1 flex flex-col gap-5 justify-center p-12 shadow-xl bg-white rounded-lg transition-all ease-in-out duration-500 relative bg-[url('/images/quote-left.svg')] bg-no-repeat",
                  { "opacity-100 right-0": visibleIdx == idx },
                  { "opacity-0 -right-24": visibleIdx != idx }
                )}
              >
                <h3 className="text-2xl font-semibold">{item.title}</h3>
                <p className="text-lg leading-8 italic">{item.content}</p>
                <p> - {item.source}</p>
              </div>
            ))}
          </div>
          <div className="flex xl:hidden gap-12 mt-8 justify-center">
            <ArrowGroup visibleIdx={visibleIdx} setVisibleIdx={setVisibleIdx} length={data.sections.length} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
