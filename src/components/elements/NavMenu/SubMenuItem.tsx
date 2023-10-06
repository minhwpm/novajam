import Link from "next/link"

const SubMenuItem = ( { title, href, children }: { title: string, href: string, children?: React.ReactNode }) => {
  return (
    <li className="underline-offset-4 hover:underline transition duration-500">
      <Link href={href} className="font-medium">
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