import React from 'react';
import classNames from "classnames"

interface SectionProps {
  id?: string
  label?: string
  title?: string
  subtitle?: string
  children: React.ReactNode
  topMargined?: boolean
  background?: string
}

const Section: React.FC<SectionProps> = ({ title, label, subtitle, children, id, topMargined = true, background}) => {
  return (
    <section id={id} className={classNames(
      "flex flex-col items-center px-4 py-20 md:px-8 lg:px-20 lg:py-32 xl:px-32 bg-primary-200",
      {"mt-20 lg:mt-32": topMargined},
      background
    )}>
      {label && (
        <p className="uppercase tracking-widest">
          {label}
        </p>
      )}
      {title && (
        <h2 className={classNames("text-4xl lg:text-5xl leading-snug lg:leading-snug font-semibold text-center max-w-4xl",
          {"mb-5": subtitle},
          {"mb-12": !subtitle},
        )}>
          {title}
        </h2>
      )}
      {subtitle && (
        <p className="text-lg leading-8 lg:text-xl lg:leading-10 font-medium text-center mb-12 max-w-4xl">
          {subtitle}
        </p>
      )}
      {children}
    </section>
  )
}

export default Section
