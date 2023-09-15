'use client'
import classNames from "classnames";
import { useState } from "react";
import { useInView } from "react-hook-inview";

const messages = [
  {
    from: "client",
    content: "Hi, can I pay with PayPal?",
  },
  {
    from: "us",
    content: "Sure, we support PayPal payments.",
  },
  {
    from: "client",
    content: "Great, what's about delivery time?",
  },
  {
    from: "us",
    content:
      "Depending on the destination. The typical delivery time is between 2-5 working days.",
  },
  {
    from: "client",
    content: "I'm outside US",
  },
  {
    from: "us",
    content: "For shipping outside US it's usually 4-5 business days.",
  },
  {
    from: "client",
    content: "Thank you for your help!",
  },
  {
    from: "us",
    content: "You're welcome! Let me know if you need anything else.",
  },
];

const FakeMessageBox = () => {
  const [start, setStart] = useState(false);
  // const ref = useRef(null)
  // @TODO 
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [ref, isVisible] = useInView({
    threshold: 0.1,
    onEnter: () =>
      setTimeout(() => {
        setStart(true);
      }, 1000),
    onLeave: () => setStart(false),
  });
  // console.log("isVisible", isVisible,"; start", start)

  return (
    <div className="relative w-full h-full overflow-hidden">
      <div
        ref={ref}
        className={classNames(
          "flex flex-col gap-6 w-full h-full pt-36 px-5 absolute text-xs sm:text-base",
          { "-top-[75%]": !start },
          { "animate-slideUp top-0": start }
        )}
        style={{
          animationDelay: "5.5s",
        }}
      >
        {messages.map((item, idx) => (
          <div
            key={item.content}
            className={classNames(
              "max-w-[60%] flex gap-3",
              { "animate-fadeIn invisible": start },
              { "self-start": item.from === "client" },
              {
                "self-end": item.from === "us",
              }
            )}
            style={{
              animationDelay: `${(idx * 1.4).toString()}s`,
            }}
          >
            {item.from === "client" && (
              <div className="w-8 h-8 rounded-full bg-secondary-300 shrink-0 self-end" />
            )}
            <div
              className={classNames(
                "py-3 px-4",
                { "animate-pop invisible": start },
                {
                  "bg-white rounded-r-3xl rounded-tl-3xl":
                    item.from === "client",
                },
                {
                  "bg-primary-500 text-white rounded-l-3xl rounded-tr-3xl":
                    item.from === "us",
                }
              )}
              style={{
                animationDelay: `${(idx * 1.6).toString()}s`,
              }}
            >
              {item.content}
            </div>
            {item.from === "us" && (
              <div className="w-8 h-8 rounded-full bg-primary-300 shrink-0 self-end relative -bottom-1" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FakeMessageBox;
