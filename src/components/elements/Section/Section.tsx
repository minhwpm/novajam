import React from 'react';
import classNames from "classnames"

interface Props {
  label?: string
  title?: string
  subtitle?: string
  children: React.ReactNode
  framed?: boolean
  className?: string
  id?: string
}

const Section = ( { title, label, subtitle, children, framed = true, className, id }: Props) => {

  return (
    <section id={id} className={classNames(
      "flex flex-col items-center ",
      { "px-4 md:px-8 lg:px-20 xl:px-32": framed}, // @TODO make framed padding Global Settings
      className,
    )}>
      {label && (
        <p className="uppercase tracking-widest mb-3">
          {label}
        </p>
      )}
      {title && (
        <h2 className="text-4xl lg:text-5xl leading-snug lg:leading-snug font-semibold text-center max-w-4xl mb-5">
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

export const Label = ({ children }: {children: React.ReactNode}) => {
  <p className="uppercase tracking-widest mb-3">
    {children}
  </p>
}

export default Section
