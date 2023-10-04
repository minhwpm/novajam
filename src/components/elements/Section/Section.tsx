// Denotes a section of page content.
import React from 'react';
import classNames from "classnames"
import Container from '../Container/Container';
import RichText from '../RichText/RichText';

// @TODO make this as Theme Style settings
// type SectionVariant = "standard" | "alternate"
interface Props {
  label?: string
  title?: string
  subtitle?: string
  children: React.ReactNode
  className?: string
  id?: string
  background?: {
    bgImage?: string
    parallax?: boolean
  }
}

const Section = ( { title, label, subtitle, children, className, id, background }: Props) => {

  return (
    <section id={id} className={classNames(
      "flex flex-col items-center py-12",
      { "bg-fixed min-h-screen": background?.parallax },
      className,
    )}>
      {label && (
        <p className="uppercase tracking-widest text-secondary-500 font-semibold">
          {label}
        </p>
      )}
      {title && (
        <h2 className={classNames("font-heading text-3xl md:text-4xl lg:text-5xl leading-snug lg:leading-snug font-bold text-center max-w-3xl",
          {"mb-5": subtitle},
          {"mb-12": !subtitle},
        )}>
          <RichText htmlString={title} />
        </h2>
      )}
      {subtitle && (
        <p className="text-lg leading-8 lg:text-xl lg:leading-10 font-medium text-center mb-12 max-w-4xl">
          {subtitle}
        </p>
      )}
      <Container>
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
