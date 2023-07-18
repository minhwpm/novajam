'use client'
import { useState } from "react"
import Image from "next/image"
import Button, { ButtonVariant } from "@/components/elements/Button/Button"
import Link from "next/link"
import useStickyHeaderOnScrollUp from "@/utils/hooks/useStickyHeaderOnScrollUp"
import classNames from "classnames"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars, faXmark, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import './styles.css';
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

const ListItem = ( { title, href, children }: { title: string, href: string, children?: React.ReactNode }) => {
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

const Header: React.FC<HeaderProps> = ({ data, navAlignment = 'right', variant = "standard" }) => {
  const { logo, nav, button, isLoginEnabled } = data
  const sticky = useStickyHeaderOnScrollUp()
  const [ mobileMenuShowed, setMobileMenuShowed ] = useState(false)

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

      {/* MOBILE NAV */}
      <NavigationMenu.Root className={classNames(
        "xl:hidden w-screen h-screen absolute top-full left-0 z-[99999] bg-white",
        { "hidden": !mobileMenuShowed}
      )}>
        <NavigationMenu.List>
          {nav.map(item => (
            <NavigationMenu.Item key={item.title}>
              { item.url && (
                <NavigationMenu.Link className="py-2 px-3 select-none inline-block" href={item.url}>
                  {item.title}
                </NavigationMenu.Link>
              )}
              { item.content && (
                <>
                  <NavigationMenu.Trigger className="py-2 px-3 select-none">
                    {item.title} <FontAwesomeIcon className="inline-block CaretDown" icon={faChevronDown} size="2xs" width={10} />
                  </NavigationMenu.Trigger>
                  <NavigationMenu.Content className="">
                    <ul className="List one">
                      {item.content.map(subItem => (
                        <ListItem key={subItem.title} href={subItem.url} title={subItem.title} />
                      ))}
                    </ul>
                  </NavigationMenu.Content>
                </>
              )}
            </NavigationMenu.Item>
          ))}
        </NavigationMenu.List>
      </NavigationMenu.Root>

      
      <NavigationMenu.Root
        className={classNames(
        "hidden xl:flex relative w-full",
        { "justify-center": navAlignment === "center"},
        { "justify-start": navAlignment === "left"},
        { "justify-end": navAlignment === "right"},
      )}>
        <NavigationMenu.List className={classNames(
          "flex justify-center px-5 list-none m-0",
        )}>
          {nav.map(item => (
            <NavigationMenu.Item key={item.title}>
              { item.url && (
                <NavigationMenu.Link className="py-2 px-5 select-none inline-block underline-hover-effect before:left-5 hover:before:w-[calc(100%-40px)]" href={item.url}>
                  {item.title}
                </NavigationMenu.Link>
              )}
              { item.content && (
                <>
                  <NavigationMenu.Trigger className="py-2 px-5 select-none underline-hover-effect before:left-5 hover:before:w-[calc(100%-40px)]">
                    {item.title} <FontAwesomeIcon className="inline-block CaretDown" icon={faChevronDown} size="2xs" width={10} />
                  </NavigationMenu.Trigger>
                  <NavigationMenu.Content className="NavigationMenuContent">
                    <ul className="List one">
                      {/* <li className="row-span-6">
                        <NavigationMenu.Link asChild>
                          <a className="Callout" href="/">
                            <div className="CalloutHeading">
                              {item.title}
                            </div>
                            <p className="CalloutText">Bluebiz theme</p>
                          </a>
                        </NavigationMenu.Link>
                      </li> */}
                      {item.content.map(subItem => (
                        <ListItem key={subItem.title} href={subItem.url} title={subItem.title} />
                      ))}
                    </ul>
                  </NavigationMenu.Content>
                </>
              )}
            </NavigationMenu.Item>
          ))}

          <NavigationMenu.Indicator className="NavigationMenuIndicator">
            <div className="Arrow" />
          </NavigationMenu.Indicator>
        </NavigationMenu.List>

        <div className={classNames(
          // "ViewportPosition",
          "absolute flex w-full top-full left-0",
          { "justify-center": navAlignment === "center"},
          { "justify-start": navAlignment === "left"},
          { "justify-end": navAlignment === "right"}
        )}>
          <NavigationMenu.Viewport className="NavigationMenuViewport" />
        </div>
      </NavigationMenu.Root>

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
      <div className="xl:hidden ml-auto">
        { !mobileMenuShowed && <FontAwesomeIcon className="cursor-pointer" width={26} icon={faBars} size="xl" onClick={() => {
          setMobileMenuShowed(true)
          document.body.style.overflowY = "hidden"
        }}/> }
        { mobileMenuShowed && <FontAwesomeIcon className="cursor-pointer" width={26} icon={faXmark} size="xl" onClick={() => {
          setMobileMenuShowed(false)
          document.body.style.overflowY = "auto"
        }}/>}
      </div>
    </header>
  )
}

export default Header