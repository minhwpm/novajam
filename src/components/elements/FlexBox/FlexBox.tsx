import classNames from "classnames"

interface Props {
  horizontalScrollable?: boolean
  gap?: 5 | 7 | 9
  children: React.ReactNode
  className?: string
}

const FlexBox = ( { horizontalScrollable = false, gap = 5, className, children }: Props) => {
  return (
    <div className={classNames(
        "u-scroll-x flex items-start w-full",
        { "gap-5": gap === 5},
        { "gap-7": gap === 7},
        { "gap-9": gap === 9},
        { "flex-wrap": !horizontalScrollable},
        { "cursor-grab overflow-x-scroll overscroll-x-contain": horizontalScrollable},
        // @TODO make it grabbable to move left-right
        className,
      )}
    >
      {children}
    </div>
  )
}

export default FlexBox