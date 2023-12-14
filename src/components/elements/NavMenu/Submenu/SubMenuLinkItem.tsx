import classNames from "classnames"
import Link from "next/link"

export const SubMenuLinkItem = ( { title, href, children, onClick, currentPathname }: { title: string, href: string, onClick?: () => void, children?: React.ReactNode, currentPathname?: string } ) => {
  return (
    <Link href={href} className={classNames("block w-full px-3 py-1.5 font-medium rounded-assets hover:bg-primary-50 transition duration-500",
      { "bg-primary-100": href === currentPathname }
    )} onClick={onClick}>
      {children ? (
        <>
          <span>{title}</span>
          <span>{children}</span>
        </>
      ) : (
        <span>{title}</span>
      )}
    </Link>
  )
}