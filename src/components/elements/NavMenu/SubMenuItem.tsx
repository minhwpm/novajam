import Link from "next/link"

const SubMenuItem = ( { title, href, children }: { title: string, href: string, children?: React.ReactNode }) => {
  return (
    <li className="px-3 py-1 rounded hover:bg-gray-100 transition-colors duration-500 ">
      <Link href={href} className="">
        {children ? (
          <>
            <span className="font-semibold">{title}</span>
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