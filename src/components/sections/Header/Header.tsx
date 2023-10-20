'use client'
import Image from "next/image"
import Button from "@/components/elements/Button/Button"
import Link from "next/link"
import useStickyHeaderOnScrollUp from "@/helpers/hooks/useStickyHeaderOnScrollUp"
import classNames from "classnames"
import NavMenu from "@/components/elements/NavMenu/NavMenu"
import NavMenuMobile from "@/components/elements/NavMenu/NavMenuMobile"
import NavMenuFull from "@/components/elements/NavMenu/NavMenuFull"
import { HeaderType } from "@/helpers/types"
interface Props {
  data: HeaderType
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
        <div
          className={classNames(
            "absolute px-4 py-5 md:px-10 w-screen flex items-center justify-between"
          )}
        >
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

          <div className="flex gap-5 items-center">
            <div className="hidden md:block">
              {buttons &&
                buttons.length > 0 &&
                buttons.map((button) => (
                  <Button
                    key={button.text}
                    url={button.url}
                    variant={button.buttonVariant ?? "outline-white"}
                    size="lg"
                  >
                    {button.text}
                  </Button>
                ))}
            </div>
            <NavMenuFull data={data} />
          </div>
        </div>
      </header>
    );
  }

  // Default uiVariant - standard
  return (
    <header
      className={classNames(
        "relative bg-white z-[99999] font-bold tracking-wider",
        { "sticky w-full z-50 top-0 border-b animate-headerSlideIn": sticky }
      )}
    >
      <div className="container p-4 mx-auto flex items-center">
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
                size="lg"
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