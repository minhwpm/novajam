// Denotes a section of page content.
"use client";
import React from "react";
import classNames from "classnames";
import { Container } from "../Container/Container";
import { RichText2 } from "@/components/elements/RichText/RichText";
import { MediaType, TextAlignmentType, LinkType } from "@/helpers/types";
import { Document } from "@contentful/rich-text-types";
import { useInView } from "react-hook-inview";
import { Button } from "../Button/Button";

interface Props {
  id?: string | null;
  eyebrow?: string | null;
  heading?: Document | null;
  summary?: Document | null;
  alignment?: TextAlignmentType;
  additionalLink?: LinkType | null;
  className?: string;
  framed?: boolean;
  backgroundImage?: MediaType | null;
  darkMode?: boolean;
  children: React.ReactNode;
}

export const Section: React.FC<Props> = ({
  id,
  heading,
  eyebrow,
  summary,
  alignment,
  additionalLink,
  className,
  framed = true,
  backgroundImage,
  darkMode,
  children,
}) => {
  const [ref, isIntersecting] = useInView({
    threshold: 0.5,
    unobserveOnEnter: true,
  });
  return (
    <section
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
              backgroundBlendMode: "multiply",
            }
          : {}
      }
    >
      <div
        ref={ref}
        className={classNames(
          "container mx-auto px-4 relative flex flex-col -bottom-10 opacity-0",
          { "animate-slidingUpContent animation-delay-150": isIntersecting },
          { "items-center": alignment === "center" },
          { "items-end": alignment === "end" }
        )}
      >
        {eyebrow && (
          <div
            className={classNames(
              "tracking-widest font-medium mb-2",
              { "text-center": alignment === "center" },
              { "text-end": alignment === "end" },
              { "text-primary-500": !darkMode },
              { "text-primary-400": darkMode }
            )}
          >
            {eyebrow}
          </div>
        )}
        {heading && (
          <div
            className={classNames(
              "font-heading text-heading leading-tighter max-w-6xl mb-4",
              { "text-neutral-50": darkMode },
              { "text-center": alignment === "center" },
              { "text-end": alignment === "end" }
            )}
          >
            <RichText2 data={heading} />
          </div>
        )}
        {summary && (
          <div
            className={classNames(
              "prose lg:prose-lg 2xl:prose-xl max-w-xl lg:max-w-3xl  mb-4",
              { "text-neutral-200": darkMode },
              { "text-center": alignment === "center" },
              { "text-end": alignment === "end" }
            )}
          >
            <RichText2 data={summary} />
          </div>
        )}
        {additionalLink && (
          <div
            className={classNames(
              "flex -mx-4",
              { "justify-center": alignment === "center" },
              { "justify-end": alignment === "end" }
            )}
          >
            <Button
              size="lg"
              withArrow={true}
              variant="ghost"
              url={additionalLink.url}
            >
              {additionalLink.text}
            </Button>
          </div>
        )}
      </div>
      {framed ? (
        <Container
          className={classNames(
            // "relative -bottom-10 opacity-0",
            {
              "mt-4": heading || eyebrow || summary,
            },
            // {
            //   "animate-slidingUpContent animation-delay-500": isIntersecting,
            // }
          )}
        >
          {children}
        </Container>
      ) : (
        <div
          // className={classNames(
          //   "relative -bottom-10 opacity-0", {
          //   "animate-slidingUpContent animation-delay-500": isIntersecting,
          // })}
        >
          {children}
        </div>
      )}
    </section>
  );
};
