import classNames from "classnames"
import Link from "next/link"
import { usePathname } from "next/navigation";

export const SubMenuLinkItem = ( { title, href, children, onClick }: { title: string, href: string, onClick?: () => void, children?: React.ReactNode, currentPathname?: string } ) => {
  const pathname = usePathname();
  return (
    <Link href={href} className={classNames("block w-full px-3 py-1.5 font-medium rounded-assets hover:bg-primary-50 hover:text-neutral-800 transition duration-500",
      { "bg-primary-100 text-neutral-800": href === pathname }
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