import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import classNames from 'classnames';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars, faXmark, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import SubMenuItem from './SubMenuItem';
import { useState } from 'react';
import { getMenuItemText } from './NavMenu';
import SubMenuFeaturedContent from './SubMenuFeaturedContent';
import { LinkType, SubmenuType } from '@/helpers/types';

const NavMenuMobile: React.FC<{ menu: Array<LinkType | SubmenuType> }> = ({ menu }) => {
  const [ mobileMenuShowed, setMobileMenuShowed ] = useState(false)

  return (
    <>
      {/* MOBILE, TABLET */}
      <NavigationMenu.Root className={classNames(
        "lg:hidden w-screen h-screen absolute top-full left-0 z-[99999] bg-white overflow-auto",
        { "hidden": !mobileMenuShowed}
      )}>
        <NavigationMenu.List>
          {menu.map(item => (
            <NavigationMenu.Item key={getMenuItemText(item)}>
              { item.contentType === "link"  && (
                <NavigationMenu.Link className="py-2 px-3 select-none inline-block" href={item.url}>
                  {item.text}
                </NavigationMenu.Link>
              )}
              { item.contentType === "submenu" && (
                <>
                  <NavigationMenu.Trigger className="py-2 px-3 select-none group">
                    {item.title} <FontAwesomeIcon className="inline-block ml-2 transition-transform duration-500 group-data-[state=open]:rotate-180" icon={faChevronDown} size="2xs" width={10} />
                  </NavigationMenu.Trigger>
                  <NavigationMenu.Content
                    onInteractOutside={(e) => {
                      e.preventDefault()
                    }}
                  >
                    <NavigationMenu.Sub orientation="vertical" className="py-2 px-4">
                      <NavigationMenu.List>
                      {item.menu.length > 0 && item.menu.map((subItem) => (
                        <NavigationMenu.Item key={subItem.id}>
                          { subItem.contentType === "link" && (
                            <div className="px-3 py-1.5">
                              <SubMenuItem key={subItem.text} href={subItem.url} title={subItem.text} />
                            </div>
                          )}
                          { subItem.contentType === "linkgroup" && (
                            <div className="text-slate-700">
                              <NavigationMenu.Trigger className="w-full font-medium select-none text-left py-1.5 px-3 rounded-sm hover:bg-slate-100 transition-color duration-300 data-[state=open]:bg-slate-100 group">
                                {subItem.title}
                                <FontAwesomeIcon className="inline-block ml-2 transition-transform duration-500 group-data-[state=open]:rotate-180" icon={faChevronDown} size="2xs" width={10} />
                              </NavigationMenu.Trigger>
                              <NavigationMenu.Content >
                                <ul className="px-8 py-2 flex flex-col gap-y-3">
                                  { subItem.links.length > 0 && subItem.links.map((link) => (
                                    <SubMenuItem key={link.text} href={link.url} title={link.text} />
                                  ))}
                                </ul>
                              </NavigationMenu.Content>
                            </div>
                          )}
                        </NavigationMenu.Item>
                      
                      ))}
                      </NavigationMenu.List>
                      {item.featuredContent?.length > 0 && (
                        <SubMenuFeaturedContent data={item.featuredContent[0]} />
                      )}
                    </NavigationMenu.Sub>
                  </NavigationMenu.Content>
                </>
              )}
            </NavigationMenu.Item>
          ))}
        </NavigationMenu.List>
      </NavigationMenu.Root>
      <div className="lg:hidden ml-auto">
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