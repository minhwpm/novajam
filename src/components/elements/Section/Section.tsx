// Denotes a section of page content.
import React from 'react';
import classNames from "classnames"
import { Container }from '../Container/Container';
import { RichText2 } from "@/components/elements/RichText/RichText2"
import { MediaType } from '@/helpers/types';
import { Document } from "@contentful/rich-text-types";

interface Props {
  id?: string | null
  label?: string | null
  heading?: Document | null
  summary?: Document | null
  className?: string
  background?: MediaType
  children: React.ReactNode
  framed?: boolean
}

export const Section: React.FC<Props> = ( { id, heading, label, summary, children, className, background, framed = true } ) => {
  return (
    <section
      id={id ?? ""}
      className={classNames("flex flex-col items-center py-18", className)}
      style={
        background
          ? {
              backgroundImage: `url(${background.url})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundBlendMode: "overlay",
            }
          : {}
      }
    >
      <Container>
        {label && (
          <div className="tracking-widest text-secondary-500 font-semibold text-center mx-auto mb-2">
            {label}
          </div>
        )}
        {heading && (
          <div
            className={classNames(
              "font-heading text-heading !leading-normal text-center max-w-3xl mx-auto mb-6"
            )}
          >
            <RichText2 data={heading} />
          </div>
        )}
        {summary && (
          <div
            className={classNames(
              "prose-lg lg:prose-xl text-center max-w-xl lg:max-w-3xl mx-auto mb-6"
            )}
          >
            <RichText2 data={summary} />
          </div>
        )}
      </Container>
      {framed ? (
        <Container
          className={classNames("rounded-assets", {
            "mt-3": heading || label || summary,
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