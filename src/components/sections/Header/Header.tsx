'use client'
import Image from "next/image"
import Button, { ButtonVariant } from "@/components/elements/Button/Button"
import Link from "next/link"
import useStickyHeaderOnScrollUp from "@/utils/hooks/useStickyHeaderOnScrollUp"
import classNames from "classnames"
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
    isLoginEnabled?: boolean
    button?: {
      text: string
      url: string
      type: ButtonVariant
    }
  }
  variant?: "standard" | "alternate"
  // @TODO following 4 properties
  stickyType?: 'none' | 'scroll-up' | 'scroll-down'
  logoAlignment?: 'center' | 'left'
  navAlignment?: 'center' | 'left' | 'right' // this property is for XL screens
  backgroundColor?: 'white' | 'transparent'
}


const Header: React.FC<HeaderProps> = ({ data, navAlignment = 'right', variant = "standard" }) => {
  const { logo, nav, button, isLoginEnabled } = data
  const sticky = useStickyHeaderOnScrollUp()

  return (
    <header className={classNames(
      "relative flex p-4 lg:px-32 lg:py-5 items-center bg-white z-[99999]",
      { "sticky w-full z-50 top-0 animate-headerSlideIn": sticky },
      { "shadow-md": sticky && variant === "standard" },
      { "border-b": sticky && variant === "alternate" },
      { "font-bold tracking-wider": variant === "alternate"}
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
      <NavMenu menuItems={nav} navAlignment={navAlignment} />

      { isLoginEnabled && (
        <Link href="/login" className="px-3 py-1 rounded hover:bg-primary-100 hover:text-primary-600 transition-all duration-300 hidden lg:block">
          Login
        </Link>
      )}
      <div className="shrink-0 hidden lg:block">
        {button && (
          <Button key={button.text} variant={button.type} size="lg" url={button.url}>
            {button.text}
          </Button>
        )}
      </div>
      <NavMenuMobile menuItems={nav} />
    </header>
  )
}

export default Header