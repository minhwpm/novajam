import classNames from "classnames";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const testimonials = [
  {
    title: "Get more leads",
    content:
      "GET THIS PROGRAM - it has already boosted my sales leads by 34% in a matter of hours. Don't waste your time, searching - Tidio does it all. I am very pleased how they helped get me started too.",
  },
  {
    title: "Increase conversion rate",
    content:
      "My conversion rate went from 1.4 to 4.8! This is amazing and makes me a lot of money automatically!",
  },
  {
    title: "Generate more sales",
    content:
      "Tidio helped me make over 60k in sales in just a few months. Customer retention rate is a lot higher and a benefit is the sales!",
  },
  {
    title: "Increase satisfaction rate",
    content:
      "Since having Tidio integrated into our website we have seen sales nearly double and positive reviews triple.",
  },
];

const Testimonials = () => {
  const [visibleIdx, setVisibleIdx] = useState(0);
  return (
    <section className="bg-gray-200 p-32 bg-opacity-60">
      <div className="flex gap-5">
        <div className="w-1/2 pr-10">
          <h2 className="text-4xl leading-[50px] font-bold mb-10">
            Don’t take our word for it, check how Tidio helps users grow their
            business
          </h2>
          <FontAwesomeIcon
            className="cursor-pointer mr-12"
            icon={faArrowLeft}
            size="2xl"
            onClick={() => {
              if (visibleIdx > 0) setVisibleIdx(visibleIdx - 1);
              else setVisibleIdx(testimonials.length - 1);
            }}
          />
          <FontAwesomeIcon
            className="cursor-pointer"
            icon={faArrowRight}
            size="2xl"
            onClick={() => {
              if (visibleIdx < testimonials.length - 1)
                setVisibleIdx(visibleIdx + 1);
              else setVisibleIdx(0);
            }}
          />
        </div>
        <div className="w-1/2 grid">
          {testimonials.map((item, idx) => (
            <div
              key={item.title}
              className={classNames(
                "col-start-1 row-start-1 flex flex-col justify-center p-12 shadow-xl bg-white rounded-lg transition-all ease-in-out duration-500 relative",
                { "opacity-100 right-0": visibleIdx == idx },
                { "opacity-0 -right-24": visibleIdx != idx }
              )}
            >
              <h3 className="text-2xl font-semibold mb-3">{item.title}</h3>
              <p className="text-lg">{item.content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
