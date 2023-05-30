"use client";
import React, { useState } from "react";
import Image from "next/image";
import classNames from "classnames";
import FeatureContentItem from "@/components/elements/FeatureContentItem/FeatureContentItem";

const sections = [
  {
    img: "https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/f1.webp?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFIaDmFwLXNvdXRoZWFzdC0xIkcwRQIhAN9FPeAHjviZaSK63MoSTLJHNLfFATAYbIw%2BZYmwdYvrAiAdT4PtMh22PhNmClT0d%2F5LrPWT9XiACRhFjiJT%2BUuBKyrxAgiL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAEaDDExNjM3MTExNzg3NCIMTD1vQ8ks5v8xFcNjKsUC027n2fj0FmpOG%2Bj9Fqs1FVmStYpxJ66oVFTm3tpDwqLYSpu32JaKb6nnrdKa8V%2BEhbchIsi%2Bwj57HLltCAMrD2GkZOv2chvFIt9Etc%2BJ59ShyUXRFSYacv%2BNsUjZrqjPW4nBWAV%2Bcwc%2F4bOHy1Nvhswl5Bdv654WZ0zR1ZoyRpMmYI23tpcaYbXYhoPMwi9%2F924gtk9t241OUw50d61lCLt2ocoJG4Dwv8We4O%2Bqg9B2n4yVdmfFs1aZHH%2BJtPOXo%2BNhlepTDaMWr4U0oQmd9LMmOTeTZr3IoFsBCqWEdXvf%2FTnfvzeUtrhBSACnZ39RSVeXQGGCWfeR4%2FNX%2Bw7ziFLqf51wh7j5AgusvQ5SHnTaqne7eKyOaS3NrZTIJu0gkGGdQ%2BNjXu22afe8ik8LvFK9LUVKIRSQF27y1c463kHW7bYGlDD519ajBjqzAr6CfrTSnAfWJFW446R7d4X71V2q0Oq%2BxYLTEMS%2FgibwZMXy0kJaGLwIBuh0%2FMBEjoeoRngJ%2F1ZjX65OoX4XbVjtDADGyT5R7XDa8Sfc9YpvaaATXy%2Bia%2BAXAY0DWr4TIOUJrqZc39HTDA5KlbL3jqFzrsL1uQuLm4u%2BkZgT3nM%2BF06eRby%2BkPz4GbvBBS4bmlnVmFdCopr8%2Bsv7m9QwGqUzxo6SoK00UwQ79RH9Q1sUnrC%2FMXI6yNCKU9gLfo2V1RGeoTPvBiKc2IPfEAT7vLaeVnRJwDJs9YKNy7w7Vz86jncB4Wbi4wmY78LQobWpTHMZgn0ChMnxlaXzoM8fTWDkk0SYQC58kGMY5Ry5FIjanqhHBSRwyXBQZKJbDr5S0Jchs8PcYAEDvTggl%2Bpnn9TcSZ0%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230530T094738Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIARWGCCK4ZNWKAMTPZ%2F20230530%2Fap-southeast-1%2Fs3%2Faws4_request&X-Amz-Signature=9689eff92d4a00b4c29995ce48a5af809d6e044bdb2325d2099ac836a0ac6391",
    content: {
      title: "Start conversations, win loyal customers",
      description:
        "Chat with customers. Solve their problems in real time. Offer custom discounts based on browsing history. And make product recommendations based on their behavior.",
    },
  },
  {
    img: "https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/f2.webp?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFIaDmFwLXNvdXRoZWFzdC0xIkcwRQIhAN9FPeAHjviZaSK63MoSTLJHNLfFATAYbIw%2BZYmwdYvrAiAdT4PtMh22PhNmClT0d%2F5LrPWT9XiACRhFjiJT%2BUuBKyrxAgiL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAEaDDExNjM3MTExNzg3NCIMTD1vQ8ks5v8xFcNjKsUC027n2fj0FmpOG%2Bj9Fqs1FVmStYpxJ66oVFTm3tpDwqLYSpu32JaKb6nnrdKa8V%2BEhbchIsi%2Bwj57HLltCAMrD2GkZOv2chvFIt9Etc%2BJ59ShyUXRFSYacv%2BNsUjZrqjPW4nBWAV%2Bcwc%2F4bOHy1Nvhswl5Bdv654WZ0zR1ZoyRpMmYI23tpcaYbXYhoPMwi9%2F924gtk9t241OUw50d61lCLt2ocoJG4Dwv8We4O%2Bqg9B2n4yVdmfFs1aZHH%2BJtPOXo%2BNhlepTDaMWr4U0oQmd9LMmOTeTZr3IoFsBCqWEdXvf%2FTnfvzeUtrhBSACnZ39RSVeXQGGCWfeR4%2FNX%2Bw7ziFLqf51wh7j5AgusvQ5SHnTaqne7eKyOaS3NrZTIJu0gkGGdQ%2BNjXu22afe8ik8LvFK9LUVKIRSQF27y1c463kHW7bYGlDD519ajBjqzAr6CfrTSnAfWJFW446R7d4X71V2q0Oq%2BxYLTEMS%2FgibwZMXy0kJaGLwIBuh0%2FMBEjoeoRngJ%2F1ZjX65OoX4XbVjtDADGyT5R7XDa8Sfc9YpvaaATXy%2Bia%2BAXAY0DWr4TIOUJrqZc39HTDA5KlbL3jqFzrsL1uQuLm4u%2BkZgT3nM%2BF06eRby%2BkPz4GbvBBS4bmlnVmFdCopr8%2Bsv7m9QwGqUzxo6SoK00UwQ79RH9Q1sUnrC%2FMXI6yNCKU9gLfo2V1RGeoTPvBiKc2IPfEAT7vLaeVnRJwDJs9YKNy7w7Vz86jncB4Wbi4wmY78LQobWpTHMZgn0ChMnxlaXzoM8fTWDkk0SYQC58kGMY5Ry5FIjanqhHBSRwyXBQZKJbDr5S0Jchs8PcYAEDvTggl%2Bpnn9TcSZ0%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230530T094827Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIARWGCCK4ZNWKAMTPZ%2F20230530%2Fap-southeast-1%2Fs3%2Faws4_request&X-Amz-Signature=e7e7c2318e4db20539ed06c476daf1b6bd5f54cc7aa1d02b5d0158f1851b3b95",
    content: {
      title: "Automate answers and workflows in minutes",
      description:
        "Automate up to 47% of repetitive answers about shipping, order status, or product availability so your agents can advise on complex topics.",
    },
  },
  {
    img: "https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/f3.webp?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFIaDmFwLXNvdXRoZWFzdC0xIkcwRQIhAN9FPeAHjviZaSK63MoSTLJHNLfFATAYbIw%2BZYmwdYvrAiAdT4PtMh22PhNmClT0d%2F5LrPWT9XiACRhFjiJT%2BUuBKyrxAgiL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAEaDDExNjM3MTExNzg3NCIMTD1vQ8ks5v8xFcNjKsUC027n2fj0FmpOG%2Bj9Fqs1FVmStYpxJ66oVFTm3tpDwqLYSpu32JaKb6nnrdKa8V%2BEhbchIsi%2Bwj57HLltCAMrD2GkZOv2chvFIt9Etc%2BJ59ShyUXRFSYacv%2BNsUjZrqjPW4nBWAV%2Bcwc%2F4bOHy1Nvhswl5Bdv654WZ0zR1ZoyRpMmYI23tpcaYbXYhoPMwi9%2F924gtk9t241OUw50d61lCLt2ocoJG4Dwv8We4O%2Bqg9B2n4yVdmfFs1aZHH%2BJtPOXo%2BNhlepTDaMWr4U0oQmd9LMmOTeTZr3IoFsBCqWEdXvf%2FTnfvzeUtrhBSACnZ39RSVeXQGGCWfeR4%2FNX%2Bw7ziFLqf51wh7j5AgusvQ5SHnTaqne7eKyOaS3NrZTIJu0gkGGdQ%2BNjXu22afe8ik8LvFK9LUVKIRSQF27y1c463kHW7bYGlDD519ajBjqzAr6CfrTSnAfWJFW446R7d4X71V2q0Oq%2BxYLTEMS%2FgibwZMXy0kJaGLwIBuh0%2FMBEjoeoRngJ%2F1ZjX65OoX4XbVjtDADGyT5R7XDa8Sfc9YpvaaATXy%2Bia%2BAXAY0DWr4TIOUJrqZc39HTDA5KlbL3jqFzrsL1uQuLm4u%2BkZgT3nM%2BF06eRby%2BkPz4GbvBBS4bmlnVmFdCopr8%2Bsv7m9QwGqUzxo6SoK00UwQ79RH9Q1sUnrC%2FMXI6yNCKU9gLfo2V1RGeoTPvBiKc2IPfEAT7vLaeVnRJwDJs9YKNy7w7Vz86jncB4Wbi4wmY78LQobWpTHMZgn0ChMnxlaXzoM8fTWDkk0SYQC58kGMY5Ry5FIjanqhHBSRwyXBQZKJbDr5S0Jchs8PcYAEDvTggl%2Bpnn9TcSZ0%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230530T094851Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIARWGCCK4ZNWKAMTPZ%2F20230530%2Fap-southeast-1%2Fs3%2Faws4_request&X-Amz-Signature=d04b0ab9a6b533ac047c07dfddc89169e18f07e69f01eefc789ecca4a9bc45c0",
    content: {
      title: "Turn visitors into paying customers",
      description:
        "Make the most of your website traffic with sales chatbots designed to boost your revenue by 10-25%.",
    },
  },
];

const FeatureRow = () => {
  const [visibleIdx, setVisibleIdx] = useState(0);

  return (
    <section className="px-4 lg:px-32">
      <h2 className="text-4xl leading-snug lg:text-5xl lg:leading-snug text-center max-w-screen-lg font-semibold mb-16 mx-auto">
        Make customer experience your competitive advantage
      </h2>
      {/* FOR MOBILE, TABLETS */}
      <div className="xl:hidden">
        {sections.map((section, idx) => (
          <div key={section.content.title} className="mb-20">
            <div className="mb-10">
              <h3 className="font-semibold text-3xl lg:text-4xl leading-snug mb-6">
                {section.content.title}
              </h3>
              <p className="text-base md:text-lg lg:text-xl leading-relaxed">
                {section.content.description}
              </p>
            </div>
            <div className="md:w-3/5 mx-auto">
              <Image
                className="w-full object-cover"
                src={section.img}
                alt={section.content.title}
                width={500}
                height={500}
              />
            </div>
          </div>
        ))}
      </div>

      {/* FOR DESKTOP */}
      <div className="hidden xl:flex">
        <div className=" relative w-3/5">
          <div className="sticky top-20">
            <div className="relative h-[80vh]">
              {sections.map((section, idx) => (
                <div
                  key={section.content.title}
                  className={classNames(
                    "transition-opacity duration-300",
                    {
                      "is-visible opacity-100 h-full overflow-visible ":
                        visibleIdx === idx,
                    },
                    {
                      "is-invisible h-0 opacity-10 max-h-full relative overflow-hidden":
                        visibleIdx !== idx,
                    }
                  )}
                >
                  <Image
                    className="h-full w-auto object-cover"
                    src={section.img}
                    alt={section.content.title}
                    width={500}
                    height={500}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="w-2/5 flex flex-col">
          {sections.map((section, idx) => (
            <FeatureContentItem
              key={section.content.title}
              section={section}
              idx={idx}
              setVisibleIdx={setVisibleIdx}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureRow;
