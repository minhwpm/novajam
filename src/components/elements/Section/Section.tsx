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
  title?: string
  subtitle?: string
  className?: string
  background?: MediaType
  children: React.ReactNode
}

const Section: React.FC<Props> = ( { title, label, subtitle, children, className, id, background }) => {

  return (
    <section 
      id={id} 
      className={classNames(
        "flex flex-col items-center py-16",
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
          <p className="uppercase tracking-widest text-secondary-500 font-semibold text-center mx-auto mb-2">
            {label}
          </p>
        )}
        {title && (
          <h2 className={classNames("font-heading text-3xl md:text-4.5xl font-bold text-center max-w-3xl mx-auto",
            {"mb-5": subtitle},
            {"mb-12": !subtitle},
          )}>
            <RichText htmlString={title} />
          </h2>
        )}
        {subtitle && (
          <p className="prose md:prose-lg lg:prose-xl text-center mb-12 max-w-xl lg:max-w-3xl mx-auto">
            {subtitle}
          </p>
        )}
      </Container>
      <Container className="rounded-assets">
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
