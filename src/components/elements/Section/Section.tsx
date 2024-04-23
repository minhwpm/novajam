// Denotes a section of page content.
"use client";
import React from "react";
import classNames from "classnames";
import { Container } from "../Container/Container";
import { RichText } from "@/components/elements/RichText/RichText";
import { MediaType, TextAlignmentType, LinkType, BackgroundColorType } from "@/helpers/types";
import { Document } from "@contentful/rich-text-types";
import { useInView } from "react-hook-inview";
import { Button } from "../Button/Button";

interface SectionProps {
  id?: string | null;
  eyebrow?: string | null;
  heading?: Document | null;
  summary?: Document | null;
  alignment?: TextAlignmentType;
  additionalLink?: LinkType | null;
  className?: string;
  framed?: boolean;
  backgroundColor?: BackgroundColorType | null;
  backgroundImage?: MediaType | null;
  darkMode?: boolean;
  children: React.ReactNode;
}

export const Section: React.FC<SectionProps> = ({
  id,
  heading,
  eyebrow,
  summary,
  alignment,
  additionalLink,
  className,
  framed = true,
  backgroundColor,
  backgroundImage,
  darkMode,
  children,
}) => {
  const [ref, isIntersecting] = useInView({
    threshold: 0.5,
    unobserveOnEnter: true,
  });

  const renderEyebrow = () =>
    eyebrow && (
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
    );

  const renderHeading = () =>
    heading && (
      <div
        className={classNames(
          "font-heading text-heading leading-tight max-w-6xl mb-4",
          { "text-neutral-50": darkMode },
          { "text-center": alignment === "center" },
          { "text-end": alignment === "end" }
        )}
      >
        <RichText data={heading} />
      </div>
    );

  const renderSummary = () =>
    summary && (
      <div
        className={classNames(
          "prose lg:prose-lg 2xl:prose-xl max-w-xl lg:max-w-3xl  mb-4",
          { "text-neutral-200": darkMode },
          { "text-center": alignment === "center" },
          { "text-end": alignment === "end" }
        )}
      >
        <RichText data={summary} />
      </div>
    );

  const renderAdditionalLink = () =>
    additionalLink && (
      <div
        className={classNames(
          "flex -mx-4",
          { "justify-center": alignment === "center" },
          { "justify-end": alignment === "end" }
        )}
      >
        <Button
          data={{
            text: additionalLink.text,
            url: additionalLink.url,
            withArrow: true,
            buttonVariant: "ghost",
            openNewTab: false,
          }}
          size="lg"
        />
      </div>
    );
  return (
    <section
      id={id ?? ""}
      className={classNames(
        `${backgroundColor}-${darkMode ? "dark-" : ""}section-bg-color`,
        {
          "py-12 md:py-14 lg:py-16 xl:py-18 2xl:py-20": heading,
          "py-6 md:py-7 lg:py-8 xl:py-9 2xl:py-10": !heading,
          "lg:bg-fixed bg-center bg-no-repeat bg-cover bg-blend-multiply":
            backgroundImage,
        },
        className
      )}
      style={
        backgroundImage
          ? { backgroundImage: `url(${backgroundImage.url})` }
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
        {renderEyebrow()}
        {renderHeading()}
        {renderSummary()}
        {renderAdditionalLink()}
      </div>
      {framed ? (
        <Container
          className={classNames({
            "mt-4": heading || eyebrow || summary,
          })}
        >
          {children}
        </Container>
      ) : (
        <div>{children}</div>
      )}
    </section>
  );
};
