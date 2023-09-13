'use client'
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import classNames from 'classnames';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronDown, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import SubMenuItem from './SubMenuItem';
import Link from 'next/link';
import { NavMenuProps, LinkProps, SubmenuProps } from "@/utils/types"
import { useState } from 'react';
import './styles.css';

export function getMenuItemText(item: LinkProps | SubmenuProps): string {
  if ("text" in item) return item.text
  return item.title
}

const NavMenu: React.FC<NavMenuProps> = ({ menu, navAlignment = "center" }) => {  
  const [viewportShowed, setViewportShowed] = useState(false)
  return (
    <NavigationMenu.Root
      className={classNames(
        "NavMenu hidden xl:flex pt-2 pb-3",
        { "justify-center": navAlignment === "center"},
        { "justify-start": navAlignment === "left"},
        { "justify-end": navAlignment === "right"},

      )}
      onValueChange={(value: string) => {
        console.log(value)
        // setViewportShowed()
      }}
    >
      <NavigationMenu.List
        className={classNames(
          "flex justify-center px-5 list-none m-0 gap-x-10",
        )}
       >
        {menu.map((item, idx) => (
          <NavigationMenu.Item
            className={classNames({"relative" : "menu" in item && item.style === "dropdown"})}
            key={getMenuItemText(item)}
          >
            { item.contentType === "link" && (
              <Link className="py-2 select-none inline-block underline-hover-effect " href={item.url}>
                {item.text}
              </Link>
            )}
            { item.contentType === "submenu" && 
              <>
                <NavigationMenu.Trigger
                  className="py-2 select-none underline-hover-effect cursor-pointer data-[state=open]:before:w-full group"
                >
                  {item.title} <FontAwesomeIcon className="inline-block ml-2 transition-transform duration-500 group-data-[state=open]:rotate-180" icon={faChevronDown} size="2xs" width={10} />
                </NavigationMenu.Trigger>
                <NavigationMenu.Content data-state="open" className={classNames("list-none",
                  {"absolute top-full left-0 w-full bg-white shadow-lg rounded-lg": item.style === 'mega'}, //Mega menu style
                  {"absolute top-full left-0 w-64 pt-5": item.style === 'dropdown'}, //Dropdown menu style
                )}>
                  {item.style === "mega" && (
                    <div className={classNames(
                      {"container mx-auto py-5 grid gap-x-5 xl:grid-cols-4 grid-flow-col border-t": item.style === "mega"}
                    )}>
                      {item.menu.length > 0 && item.menu.map((subItem) => (
                        <div key={subItem.id} className="mb-3">
                          { subItem.contentType === "linkgroup" && 
                            <p className="text-slate-500 uppercase text-sm tracking-wide font-medium mb-1">
                              {subItem.title}
                            </p>
                          }
                          <ul className="flex flex-col gap-y-2">
                            { subItem.contentType === "link" && <SubMenuItem key={subItem.text} href={subItem.url} title={subItem.text} />}
                            { subItem.contentType === "linkgroup" && subItem.links.length > 0 && subItem.links.map((link) => (
                              <SubMenuItem key={link.text} href={link.url} title={link.text} />
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}
                  {item.style === "dropdown" && (
                    <NavigationMenu.Sub orientation="vertical" className="py-4 px-2 bg-white shadow-lg border-t rounded-lg">
                      <NavigationMenu.List>
                      {item.menu.length > 0 && item.menu.map((subItem) => (
                        <NavigationMenu.Item key={subItem.id} className="relative">
                          { subItem.contentType === "link" && (
                            <div className="px-3 py-1.5">
                              <SubMenuItem key={subItem.text} href={subItem.url} title={subItem.text} />
                            </div>
                          )}
                          { subItem.contentType === "linkgroup" && (
                            <div className="text-slate-700">
                              <NavigationMenu.Trigger className="w-full font-medium select-none text-left py-1.5 px-3 rounded-md hover:bg-slate-100 transition-color duration-300 data-[state=open]:bg-slate-100 group">
                                {subItem.title}
                                <FontAwesomeIcon className="inline-block ml-2 transition-transform duration-500 group-data-[state=open]:rotate-180" icon={faChevronRight} size="2xs" width={10} />
                              </NavigationMenu.Trigger>
                              <NavigationMenu.Content className="absolute left-full top-0 pl-4">
                                <ul className="px-5 py-5 bg-white rounded-lg shadow-lg w-64 flex flex-col gap-y-3">
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
                    </NavigationMenu.Sub>
                  )}
                </NavigationMenu.Content>
              </>
            }
          </NavigationMenu.Item>
        ))}
        <NavigationMenu.Indicator className="NavigationMenuIndicator">
          <div className="Arrow" />
        </NavigationMenu.Indicator>
      </NavigationMenu.List>
    </NavigationMenu.Root>

  )
}

export default NavMenu