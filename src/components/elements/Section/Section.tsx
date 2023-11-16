// Denotes a section of page content.
import React from 'react';
import classNames from "classnames"
import Container from '../Container/Container';
import RichText from '../RichText/RichText';
import { MediaType } from '@/helpers/types';

// @TODO make this as Theme Style settings
// type SectionVariant = "standard" | "alternate"
interface Props {
  id?: string
  label?: string
  heading?: string
  subheading?: string
  className?: string
  background?: MediaType
  children: React.ReactNode
}

const Section: React.FC<Props> = ( { id, heading, label, subheading, children, className, background }) => {

  return (
    <section 
      id={id} 
      className={classNames(
        "flex flex-col items-center py-18",
        className,
      )}
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
          <div className={classNames("font-heading text-heading !leading-normal text-center max-w-3xl mx-auto mb-5")}>
            <RichText htmlString={heading} />
          </div>
        )}
        {subheading && (
          <p className={classNames("prose-lg lg:prose-xl text-center max-w-xl lg:max-w-3xl mx-auto mb-5")}>
            {subheading}
          </p>
        )}
      </Container>
      <Container className={classNames("rounded-assets",
        { "mt-8": (heading || label || subheading) }
      )}>
        {children}
      </Container>
    </section>
  )
}

export const Label = ({ children }: {children: React.ReactNode}) => {
  <p className="uppercase tracking-widest mb-3">
    {children}
  </p>
}

export default Section
