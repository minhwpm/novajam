import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudBolt, faBars, faXmark } from "@fortawesome/free-solid-svg-icons";

const dummyData = {
  title: "Make customer experience your competitive advantage",
  sections: [
    {
      media: {
        src: "https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/f1.webp",
        type: "image",
      },
      content: {
        title: "Start conversations, win loyal customers",
        description:
          "Chat with customers. Solve their problems in real time. Offer custom discounts based on browsing history. And make product recommendations based on their behavior.",
      },
    },
    {
      media: {
        src: "https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/f2.webp",
        type: "image",
      },
      content: {
        title: "Automate answers and workflows in minutes",
        description:
          "Automate up to 47% of repetitive answers about shipping, order status, or product availability so your agents can advise on complex topics.",
      },
    },
    {
      media: {
        src: "https://bluebiz-assets.s3.ap-southeast-1.amazonaws.com/f3.webp",
        type: "image",
      },
      content: {
        title: "Turn visitors into paying customers",
        description:
          "Make the most of your website traffic with sales chatbots designed to boost your revenue by 10-25%.",
      },
    },
  ],
};

interface Props {
  section: {
    content: {
      title: string;
      description: string;
    };
  };
  idx: number;
  setVisibleIdx: (idx: number) => void;
}

const ContentItem = ({ section, idx, setVisibleIdx }: Props) => {
  const divRef = useRef<HTMLDivElement>(null)
  const [ active, setActive ] = useState(false)
  useEffect(() => {
    function handler() {
      if (divRef.current != null) {
        const box = divRef.current.getBoundingClientRect()
        if (box.y < window.innerHeight / 3) {
          setActive(true)
          setVisibleIdx(idx)
        } else setActive(false)
      }
    }
    document.addEventListener('scroll', handler)
    return () => document.removeEventListener('scroll', handler)
  })
  return (
    <div
      ref={divRef}
      className={classNames(
        "relative min-h-[50vh] px-10 transition-opacity duration-300 border-l-2 border-dashed",
      )}
    >
      <div className="bg-white absolute -left-1 top-2 z-20">
        <div className={classNames(
          "z-20 ml-[-3px] h-[12px] w-[12px] origin-center transform rounded-full border-[2px] transition-transform",
          { " border-gray-200 bg-white group-hover:border-blue-600" : !active},
          { "border-white bg-blue-600 ring-[2px] ring-blue-600" : active}
        )} />
      </div>
      <h3 className={classNames("text-2xl font-semibold mb-3", { "text-blue-600": active})}>{section.content.title}</h3>
      <p className="text-lg">{section.content.description}</p>
    </div>
  );
};

const Timeline = ({ data = dummyData }) => {
  const { title, sections } = data;
  const sectionRef = useRef<HTMLDivElement>(null);
  const [ visibleIdx, setVisibleIdx ] = useState(0);
  const [ scrolled, setScrolled] = useState("not-yet")
  useEffect(() => {
    function handler () {
      var winScroll =
        document.body.scrollTop || document.documentElement.scrollTop;
      if (sectionRef.current !== null) {
        var box = sectionRef.current.getBoundingClientRect();
        var body = document.body;
        var docEl = document.documentElement;

        var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
        var clientTop = docEl.clientTop || body.clientTop || 0;

        var top = box.top + scrollTop - clientTop;
        var height2 = sectionRef.current.scrollHeight;
        var scrolled2 = ((winScroll - top + 250) / height2) * 100;

        if (scrolled2 <= 0) {
          setScrolled("not-yet")
        }
        if (scrolled2 > 0 && scrolled2 < 100) {
          setScrolled("scrolling")
        }
        if (scrolled2 >= 100) {
          setScrolled("scrolled")
        }
      }
    };
    document.addEventListener('scroll', handler)
  }, [scrolled]);
  return (
    <section  className="px-4 lg:px-32">
      <h2 className="text-4xl leading-snug lg:text-5xl lg:leading-snug text-center max-w-screen-lg font-semibold mb-16 mx-auto">
        {title}
      </h2>
      <div className="relative">
        <div className="absolute left-[50%] ml-[-1px] mt-[-60px] hidden h-[60px] w-[2px] bg-gradient-to-b from-blue-600/0 to-blue-600/100 lg:block" />
        <div className="absolute left-[20px] ml-[-8px] hidden h-full w-[16px] sm:left-[36px] lg:left-[50%] lg:block">
          {/* Progress bar */}
          <div
            className={classNames(
              "ml-[-1px] w-[2px] from-gray-100 bg-blue-600 <lg:hidden left-[50%] z-20 origin-bottom h-[250px] transition-transform duration-100",
              { "hidden" : scrolled === "not-yet"},
              { "fixed bottom-[67%]" : scrolled === "scrolling"},
              { "absolute bottom-0" : scrolled === "scrolled"},
            )}
          />
          {/* Circle */}
          <div className={classNames(
            "flex justify-center items-center z-40 ml-[-14px] box-content h-[24px] w-[24px] transform rounded-full border-[2px] border-white ring-[2px] ring-blue-600 transition-transform duration-500 lg:left-[50%]",
            {"absolute left-[-8px] top-0 sm:left-[-24px]]" : scrolled === "not-yet"},
            {"fixed left-[20px] top-[33%] sm:left-[36px]" : scrolled === "scrolling"},
            {"absolute bottom-0" : scrolled === "scrolled"}
          )}>
            <FontAwesomeIcon className="h-[20px] w-[20px] transform rounded-full transition duration-500 text-blue-600 bg-white" width={20} icon={faCloudBolt} />
          </div>
        </div>
        <div className="flex">
          <div className="relative w-1/2">
            <div className="sticky top-20">
              <div className="relative h-[80vh]">
                {sections.map((section, idx) => (
                  <div
                    key={section.content.title}
                    className={classNames(
                      "transition-opacity duration-300 flex justify-center items-center pt-5",
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
                      className="h-[80%] w-auto object-cover"
                      src={section.media.src}
                      alt={section.content.title}
                      width={500}
                      height={500}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div ref={sectionRef} className="w-1/2 flex flex-col">
            {sections.map((section, idx) => (
              <ContentItem
                key={section.content.title}
                section={section}
                idx={idx}
                setVisibleIdx={setVisibleIdx}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
