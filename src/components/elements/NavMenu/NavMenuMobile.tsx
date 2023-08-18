import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import classNames from 'classnames';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars, faXmark, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { NavMenuProps } from "@/utils/types"

import SubMenuItem from './SubMenuItem';
import { useState } from 'react';
import { getMenuItemText } from './NavMenu';

const NavMenuMobile: React.FC<NavMenuProps> = ({ menu, navAlignment = "center" }) => {
  const [ mobileMenuShowed, setMobileMenuShowed ] = useState(false)

  return (
    <>
      {/* MOBILE, TABLET */}
      <NavigationMenu.Root className={classNames(
        "xl:hidden w-screen h-screen absolute top-full left-0 z-[99999] bg-white",
        { "hidden": !mobileMenuShowed}
      )}>
        <NavigationMenu.List>
          {menu.map(item => (
            <NavigationMenu.Item key={getMenuItemText(item)}>
              { "url" in item && (
                <NavigationMenu.Link className="py-2 px-3 select-none inline-block" href={item.url}>
                  {item.text}
                </NavigationMenu.Link>
              )}
              { "menu" in item && (
                <>
                  <NavigationMenu.Trigger className="py-2 px-3 select-none">
                    {item.title} <FontAwesomeIcon className="inline-block CaretDown" icon={faChevronDown} size="2xs" width={10} />
                  </NavigationMenu.Trigger>
                  <NavigationMenu.Content className="">
                    {item.menu && item.menu.map((subItem, idx) => (
                      <div key={idx}>
                        {subItem.title && 
                          <p className="text-slate-500 uppercase text-sm tracking-wide">
                            {subItem.title}
                          </p>
                        }
                        <ul>
                          {subItem.links.map((link) => (
                            <SubMenuItem key={link.url} href={link.url} title={link.text} />
                          ))}
                        </ul>
                      </div>
                    ))}
                  </NavigationMenu.Content>
                </>
              )}
            </NavigationMenu.Item>
          ))}
        </NavigationMenu.List>
      </NavigationMenu.Root>
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
    </>
  )
}

export default NavMenuMobile