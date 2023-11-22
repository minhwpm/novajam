/* eslint-disable complexity */ // @TODO fix complexity
'use client'
import Image from "next/image"
import Button from "@/components/elements/Button/Button"
import Link from "next/link"
import useStickyHeaderOnScrollUp from "@/helpers/hooks/useStickyHeaderOnScrollUp"
import classNames from "classnames"
import NavMenu from "@/components/elements/NavMenu/NavMenu"
import NavMenuMobile from "@/components/elements/NavMenu/NavMenuMobile"
import NavMenuFull from "@/components/elements/NavMenu/NavMenuFull"
import { NavigationType } from "@/helpers/types"
interface Props {
  data: NavigationType
  // @TODO following 4 properties
  // stickyType?: 'none' | 'scroll-up' | 'scroll-down'
  // logoAlignment?: 'center' | 'left'
  // backgroundColor?: 'white' | 'transparent'
}

const Header: React.FC<Props> = ({ data }) => {
  const { logo, logoRedirect, menu, buttons, isLoginEnabled, uiVariant } = data
  const sticky = useStickyHeaderOnScrollUp()

  if (uiVariant === "minimal") {
    return (
      <header className={classNames("relative z-[99999]")}>
        <div className={classNames("absolute w-screen flex justify-center")}>
          <div className="px-4 pt-10 container flex items-center justify-between">
            <div className="shrink-0">
              <Link href={logoRedirect ?? "/"}>
                <Image
                  className="w-40 h-14 object-contain"
                  src={logo.url}
                  width={logo.width}
                  height={logo.height}
                  alt={logo.title ?? ""}
                />
              </Link>
            </div>
            <div className="flex gap-5 items-center">
              <div className="hidden md:block">
                {buttons &&
                  buttons.length > 0 &&
                  buttons.map((button) => (
                    <Button
                      key={button.id}
                      url={button.url}
                      variant={button.buttonVariant ?? "outline-white"}
                      openNewTab={button.openNewTab}
                    >
                      {button.text}
                    </Button>
                  ))}
              </div>
              <NavMenuFull data={data} />
            </div>
          </div>
        </div>
      </header>
    );
  }
  if (uiVariant === "overlay") {
    return (
      <header className={classNames("relative z-[99999]")}>
        <div className={classNames("absolute left-1/2 -translate-x-1/2 w-screen flex justify-center bg-gradient-to-b from-neutral-600/60 to-neutral-10/40 text-white")}>
          <div className="container px-4 pt-10 pb-2 flex items-center">
            <div className="shrink-0">
              <Link href={logoRedirect ?? "/"}>
                <Image
                  className="w-40 h-14 object-contain"
                  src={logo.url}
                  width={160}
                  height={56}
                  alt={logo.title ?? ""}
                />
              </Link>
            </div>
            <div className="flex-1 drop-shadow-lg lg:text-lg font-semibold">
              <NavMenu menu={menu} />
            </div>
            <div className="shrink-0 hidden lg:block">
              {buttons &&
                buttons.length > 0 &&
                buttons.map((button) => (
                  <Button
                    key={button.text}
                    url={button.url}
                    variant={button.buttonVariant ?? "outline"}
                    openNewTab={button.openNewTab}
                  >
                    {button.text}
                  </Button>
                ))}
            </div>
            <NavMenuMobile menu={menu} />
          </div>
        </div>
      </header>
    )
  }

  // Default uiVariant - standard
  return (
    <header
      className={classNames(
        "relative bg-white z-[99999] font-bold tracking-wider",
        { "sticky w-full z-50 top-0 border-b animate-headerSlideIn": sticky }
      )}
    >
      <div className="container px-4 py-5 mx-auto flex items-center">
        <div className="shrink-0">
          <Link href={logoRedirect ?? "/"}>
            <Image
              className="w-40 h-14 object-contain"
              src={logo.url}
              width={160}
              height={56}
              alt={logo.title ?? ""}
            />
          </Link>
        </div>
        <div className="flex-1">
          <NavMenu menu={menu} />
        </div>

        {isLoginEnabled && (
          <Link
            href="/login"
            className="px-3 py-1 rounded hover:bg-primary-100 hover:text-primary-600 transition-all duration-300 hidden lg:block"
          >
            Login
          </Link>
        )}
        <div className="shrink-0 hidden lg:block">
          {buttons &&
            buttons.length > 0 &&
            buttons.map((button) => (
              <Button
                key={button.text}
                url={button.url}
                variant={button.buttonVariant ?? "outline"}
                openNewTab={button.openNewTab}
              >
                {button.text}
              </Button>
            ))}
        </div>
        <NavMenuMobile menu={menu} />
      </div>
    </header>
  );
}

export default Header