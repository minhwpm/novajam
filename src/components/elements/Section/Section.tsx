// Denotes a section of page content.
"use client";
import React from "react";
import classNames from "classnames";
import { Container } from "../Container/Container";
import { RichText2 } from "@/components/elements/RichText/RichText";
import { MediaType } from "@/helpers/types";
import { Document } from "@contentful/rich-text-types";
import { useInView } from "react-hook-inview";

interface Props {
  id?: string | null;
  eyebrow?: string | null;
  heading?: Document | null;
  summary?: Document | null;
  className?: string;
  backgroundImage?: MediaType | null;
  children: React.ReactNode;
  framed?: boolean;
  darkMode?: boolean;
}

export const Section: React.FC<Props> = ({
  id,
  heading,
  eyebrow,
  summary,
  children,
  className,
  backgroundImage,
  framed = true,
  darkMode,
}) => {
  const [ref, isIntersecting] = useInView({
    threshold: [0.1, 0.5, 1],
    unobserveOnEnter: true,
  });
  return (
    <section
      ref={ref}
      id={id ?? ""}
      className={classNames(
        {
          "py-12 md:py-14 lg:py-16 xl:py-18 2xl:py-20": heading,
        },
        {
          "py-6 md:py-7 lg:py-8 xl:py-9 2xl:py-10": !heading,
        },
        className
      )}
      style={
        backgroundImage
          ? {
              backgroundImage: `url(${backgroundImage.url})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundBlendMode: "overlay",
            }
          : {}
      }
    >
      <Container
        className={classNames(
          "relative flex flex-col items-center -bottom-10 opacity-0",
          {
            "animate-slidingUpSection animation-delay-300": isIntersecting,
          }
        )}
      >
        {eyebrow && (
          <div
            className={classNames(
              "tracking-widest font-semibold text-center mx-auto mb-2",
              { "text-primary-600": !darkMode },
              { "text-neutral-100": darkMode }
            )}
          >
            {eyebrow}
          </div>
        )}
        {heading && (
          <div
            className={classNames(
              "font-heading text-heading leading-tight tracking-tight text-center max-w-6xl mb-4",
              { "text-neutral-50": darkMode }
            )}
          >
            <RichText2 data={heading} />
          </div>
        )}
        {summary && (
          <div
            className={classNames(
              "prose prose-lg 2xl:prose-xl text-center max-w-xl lg:max-w-3xl  mb-4",
              { "text-neutral-200": darkMode }
            )}
          >
            <RichText2 data={summary} />
          </div>
        )}
      </Container>
      {framed ? (
        <Container
          className={classNames(
            "relative -bottom-10 opacity-0",
            {
              "mt-8": heading || eyebrow || summary,
            },
            {
              "animate-slidingUpSection animation-delay-500": isIntersecting,
            }
          )}
        >
          {children}
        </Container>
      ) : (
        <div
          className={classNames("relative -bottom-10 opacity-0", {
            "animate-slidingUpSection animation-delay-500": isIntersecting,
          })}
        >
          {children}
        </div>
      )}
    </section>
  );
};
