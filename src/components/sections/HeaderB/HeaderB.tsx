'use client'
import Image from "next/image"
import Button from "@/components/elements/Button/Button"
import Link from "next/link"
import useStickyHeaderOnScrollUp from "@/utils/hooks/useStickyHeaderOnScrollUp"
import classNames from "classnames"
import SearchBox from "@/components/elements/SearchBox/SearchBox"
import { CircleUser } from "@/components/icons/CircleUser"
import NavMenu from "@/components/elements/NavMenu/NavMenu"
import NavMenuMobile from "@/components/elements/NavMenu/NavMenuMobile"
import CartBtn from "@/components/elements/CartBtn/CartBtn"
import { HeaderProps } from "@/utils/types"


const Header: React.FC<HeaderProps> = ({
  data,
  variant = "standard"
}) => {
  const { logo, menu, buttons, isLoginEnabled = true, isShoppingEnabled = true, searchBox = { enabled: true, placeholder: null } } = data
  const sticky = useStickyHeaderOnScrollUp()

  return (
    <header className={classNames(
      "bg-white z-[99999]",
      { "shadow-md": variant === "standard" },
      { "font-bold tracking-wider border-b": variant === "alternate" },
      { "sticky w-full z-50 top-0 animate-headerSlideIn": sticky },
    )}>
      <div className={classNames(
        "relative flex p-4 lg:px-32 lg:py-5 items-center justify-between border-b",
      )}>
        <div className="shrink-0">
          <Link href="/">
            <Image
              className="w-40 h-14 object-contain"
              src={logo.url}
              width={160}
              height={56}
              alt={logo.title ?? ""}
            />
          </Link>
        </div>
        { searchBox?.enabled && (
          <div className="hidden lg:block w-96">
            <SearchBox placeholder={searchBox.placeholder ?? "Search..."} />
          </div>
        )}
        <div className="flex gap-5 items-center">
          { isLoginEnabled && (
            <Link href="/login" className="hidden lg:flex items-center gap-1 py-1 rounded hover:bg-primary-100 hover:text-primary-600 transition-all duration-300">
              <CircleUser /> Login
            </Link>
          )}
          { isShoppingEnabled &&
            <CartBtn />
          }
          <NavMenuMobile menu={menu} />
        </div>
      </div>
      { searchBox?.enabled && (
        <div className="lg:hidden p-4">
          <SearchBox placeholder={searchBox.placeholder ?? "Search..."} />
        </div>
      )}
      <NavMenu menu={menu} />
      <div className="shrink-0 hidden lg:block">
        {buttons && buttons.length > 0 && buttons.map(button => (
          <Button key={button.text} variant={button.type} size="lg" url={button.url}>
            {button.text}
          </Button>
        ))}
      </div>
    </header>
  )
}

export default Header