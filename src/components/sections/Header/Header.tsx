'use client'
import { useState } from "react"
import Button, { ButtonVariant } from "@/components/elements/Button/Button"
import Link from "next/link"
import useStickyHeaderOnScrollUp from "@/utils/hooks/useStickyHeaderOnScrollUp"
import classNames from "classnames"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import './styles.css';

const ListItem = ( { title, href, children }: { title: string, href: string, children?: React.ReactNode }) => {
  return (
    <li className="px-3 py-1 rounded hover:bg-gray-100 transition-colors duration-500">
      <Link href={href}>
        {children ? (
          <>
            <div className="font-semibold">{title}</div>
            <div>{children}</div>
          </>
        ) : (
          <div>{title}</div>
        )}
      </Link>
    </li>
  )
}

interface HeaderProps {
  data: {
    logo: {
      text: string
      src: string
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
  stickyType?: 'none' | 'scroll-up' | 'scroll-down' //@TODO modify Hook later to handle this property
  logoAlignments?: 'center' | 'left'
  navAlignment?: 'center' | 'left' | 'right' // this property is for XL screens
  backgroundColor?: 'white' | 'transparent'
  shadowed?: boolean
  bottomBordered?: boolean
  fontBold?: boolean 
  btnComponent?: React.ReactNode
}

const Header: React.FC<HeaderProps> = ({ data, navAlignment = 'right', shadowed = true, bottomBordered = false, fontBold = false, btnComponent }) => {
  const { logo, nav, button, isLoginEnabled } = data
  const sticky = useStickyHeaderOnScrollUp()
  const [ mobileMenuShowed, setMobileMenuShowed ] = useState(false)

  return (
    <header className={classNames(
      "relative flex p-4 lg:px-32 lg:py-5 items-center bg-white z-[99999]",
      { "sticky w-full z-50 top-0 animate-headerSlideIn": sticky },
      { "shadow-md": sticky && shadowed },
      { "border-b": sticky && bottomBordered },
      { "font-bold tracking-wider": fontBold}
    )}>
      <div>
        <Link href="/">
          <div className="flex items-center font-semibold text-primary-600 text-3xl italic tracking-widest">
            {/* <FontAwesomeIcon width={26} icon={faCloudBolt} /> */}
            <div>{logo.text}</div>
          </div>
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
                    {item.title} <FontAwesomeIcon className="CaretDown " icon={faChevronDown} size="2xs" width={10} />
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
                <NavigationMenu.Link className="py-2 px-5 select-none inline-block" href={item.url}>
                  {item.title}
                </NavigationMenu.Link>
              )}
              { item.content && (
                <>
                  <NavigationMenu.Trigger className="py-2 px-3 select-none">
                    {item.title} <FontAwesomeIcon className="CaretDown " icon={faChevronDown} size="2xs" width={10} />
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
      <div className="hidden lg:block">
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