import classNames from "classnames"

interface Props {
  title?: string
  label?: string
  subtitle?: string
  children: React.ReactNode
  framed?: boolean
}

const Section = ( { title, label, subtitle, children, framed = true }: Props) => {

  return (
    <section className={classNames(
      "flex flex-col items-center ",
      { "px-4 md:px-8 lg:px-20 xl:px-32": framed} // @TODO make framed padding Global Settings
    )}>
      <h2 className="text-4xl lg:text-5xl font-semibold text-center max-w-4xl mb-5">
        {title}
      </h2>
      <p className="text-lg leading-8 lg:text-xl lg:leading-10 font-medium text-center mb-12 max-w-4xl">
        {subtitle}
      </p>
      {children}
    </section>
  )
}

export default Section 