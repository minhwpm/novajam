'use client'
import Image from "next/image"
import Button, { ButtonVariant } from "@/components/elements/Button/Button"
import Link from "next/link"
import useStickyHeaderOnScrollUp from "@/utils/hooks/useStickyHeaderOnScrollUp"
import classNames from "classnames"
import SearchBox from "@/components/elements/SearchBox/SearchBox"
import { ShoppingBag } from "@/components/icons/ShoppingBag"
import { CircleUser } from "@/components/icons/CircleUser"
import NavMenu from "@/components/elements/NavMenu/NavMenu"
import NavMenuMobile from "@/components/elements/NavMenu/NavMenuMobile"

interface HeaderProps {
  data: {
    logo: {
      url: string
      altText: string
    },
    nav: Array<{
      title: string
      url?: string
      content?: Array<{
        title: string
        url: string
      }>
    }>
    button?: {
      text: string
      url: string
      type: ButtonVariant
    }
    isLoginEnabled?: boolean
    isShoppingEnabled?: boolean
    searchBox?: {
      enable?: boolean
      placeholder?: string
    }
  }
  variant?: "standard" | "alternate"
  // @TODO following 4 properties
  logoAlignment?: 'center' | 'left'
  backgroundColor?: 'white' | 'transparent'
}

const Header: React.FC<HeaderProps> = ({ data, variant = "standard" }) => {
  const { logo, nav, button, isLoginEnabled, isShoppingEnabled, searchBox } = data
  const sticky = useStickyHeaderOnScrollUp()

  return (
    <header className={classNames(
      "bg-white z-[99999]",
      { "sticky w-full z-50 top-0 animate-headerSlideIn": sticky },
      { "shadow-md": sticky && variant === "standard" },
      { "border-b": sticky && variant === "alternate" },
      { "font-bold tracking-wider": variant === "alternate"}
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
              alt={logo.altText}
            />
          </Link>
        </div>
        { searchBox?.enable && (
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
          { isShoppingEnabled && (
            <ShoppingBag />
          )}
          <NavMenuMobile menuItems={nav} />
        </div>
      </div>
      { searchBox?.enable && (
        <div className="lg:hidden p-4">
          <SearchBox placeholder={searchBox.placeholder ?? "Search..."} />
        </div>
      )}
      <NavMenu menuItems={nav} />
      <div className="shrink-0 hidden lg:block">
        {button && (
          <Button key={button.text} variant={button.type} size="lg" url={button.url}>
            {button.text}
          </Button>
        )}
      </div>
    </header>
  )
}

export default Header