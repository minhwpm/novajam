import classNames from "classnames"

// Constrains the maximum width of page content.
interface Props {
  children: React.ReactNode
  className?: string
}

export default function Container ({children, className}: Props) {
  return (
    <div className={classNames("container mx-auto px-4 md:px-6 lg:px-8 xl:px-10", className)}>
      {children}
    </div>
  )
}