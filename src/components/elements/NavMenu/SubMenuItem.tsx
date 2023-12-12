import classNames from "classnames"
import Link from "next/link"

const SubMenuItem = ( { title, href, children, onClick, currentPathname }: { title: string, href: string, onClick?: () => void, children?: React.ReactNode, currentPathname?: string } ) => {
  return (
    <li className={classNames("w-full px-3 py-1.5 font-medium rounded-assets hover:bg-primary-50 transition duration-500",
      { "bg-primary-100": href === currentPathname }
    )}>
      <Link href={href} className="block" onClick={onClick}>
        {children ? (
          <>
            <span>{title}</span>
            <span>{children}</span>
          </>
        ) : (
          <span>{title}</span>
        )}
      </Link>
    </li>
  )
}

export default SubMenuItem