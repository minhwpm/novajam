import classNames from "classnames"

interface Props {
  gap?: number
  columns?: number
  className?: string // @TODO implement style config instead of passing className here
  children: React.ReactNode
}

const GridBox = ({ gap = 5, columns = 3, children } : Props) => {
  return (
    <div className={classNames(
        "grid relative",
        [`lg:grid-cols-${columns}`],
        [`gap-${gap}`],
      )}
    >
      {children}
    </div>
  )
}

export default GridBox