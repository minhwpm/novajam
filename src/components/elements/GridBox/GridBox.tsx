import classNames from "classnames"

interface Props {
  gap?: 0 | 5 | 7 | 9
  columns?: 2 | 3 | 4
  className?: string // @TODO implement style config instead of passing className here
  children: React.ReactNode
}

const GridBox = ({ gap = 5, columns = 3, children } : Props) => {
  return (
    <div className={classNames(
        "grid gap-y-12",
        { "lg:grid-cols-2": columns === 2},
        { "lg:grid-cols-3": columns === 3},
        { "lg:grid-cols-4": columns === 4},
        { "gap-x-5": gap === 5},
        { "gap-x-7": gap === 7},
        { "gap-x-9": gap === 9},
        [`gap-${gap}`],
      )}
    >
      {children}
    </div>
  )
}

export default GridBox