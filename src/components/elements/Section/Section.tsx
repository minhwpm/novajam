// Denotes a section of page content.
import React from 'react';
import classNames from "classnames"
import { Container }from '../Container/Container';
import { RichText2 } from "@/components/elements/RichText/RichText2"
import { MediaType } from '@/helpers/types';
import { Document } from "@contentful/rich-text-types";

interface Props {
  id?: string | null
  eyebrow?: string | null
  heading?: Document | null
  summary?: Document | null
  className?: string
  backgroundImage?: MediaType | null
  children: React.ReactNode
  framed?: boolean
  darkMode?: boolean
}

export const Section: React.FC<Props> = ( { id, heading, eyebrow, summary, children, className, backgroundImage, framed = true, darkMode } ) => {
  return (
    <section
      id={id ?? ""}
      className={classNames(
        {
          "py-12 md:py-14 lg:py-16 xl:py-18 2xl:py-20":
            heading,
        },
        {
          "py-6 md:py-7 lg:py-8 xl:py-9 2xl:py-10":
            !heading,
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
      <Container className="flex flex-col items-center">
        {eyebrow && (
          <div
            className={classNames(
              "tracking-widest font-semibold text-center mx-auto mb-2",
              { "text-primary-600": !darkMode },
              { "text-primary-500": darkMode }
            )}
          >
            {eyebrow}
          </div>
        )}
        {heading && (
          <div
            className={classNames(
              "font-heading text-heading !leading-normal tracking-tight text-center max-w-6xl mb-4",
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
              { "text-neutral-50": darkMode }
            )}
          >
            <RichText2 data={summary} />
          </div>
        )}
      </Container>
      {framed ? (
        <Container
          className={classNames("rounded-assets", {
            "mt-8": heading || eyebrow || summary,
          })}
        >
          {children}
        </Container>
      ) : (
        <>{children}</>
      )}
    </section>
  );
}