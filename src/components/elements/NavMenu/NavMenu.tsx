'use client'
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import classNames from 'classnames';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
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
                  className="py-2 select-none underline-hover-effect cursor-pointer data-[state=open]:before:w-full"
                  data-menu-style={item.style}
                  data-state="open"
                  onPointerEnter={(e) => {
                    // console.log("TRIGGER", e.target.getAttribute("data-menu-style"))
                    // setViewportShowed(e.target.getAttribute("data-menu-style"))
                  }}
                >
                  {item.title} <FontAwesomeIcon className="inline-block CaretDown" icon={faChevronDown} size="2xs" width={10} />
                </NavigationMenu.Trigger>
                <NavigationMenu.Content data-state="open" className={classNames("px-5 list-none",
                  {"absolute top-full left-0 w-full bg-white shadow-lg rounded-lg": item.style === 'mega'}, //Mega menu style
                  {"absolute top-full left-0 w-64 bg-white shadow-lg border-t rounded-lg": item.style === 'dropdown'}, //Dropdown menu style
                )}>
                  {/* {item.style === "mega" && ( */}
                    <div className={classNames(
                      {"container mx-auto grid gap-x-5 xl:grid-cols-4 grid-flow-col border-t": item.style === "mega"}
                    )}>
                      {item.menu && item.menu.map((subItem, idx) => (
                        <div key={idx} className="mb-3">
                          {"title" in subItem && subItem.title && 
                            <p className="text-slate-500 uppercase text-sm tracking-wide font-medium mb-1">
                              {subItem.title}
                            </p>
                          }
                          <ul>
                            {"url" in subItem && <SubMenuItem key={subItem.text} href={subItem.url} title={subItem.text} />}
                            {"links" in subItem && subItem.links.map((link) => (
                              <SubMenuItem key={link.text} href={link.url} title={link.text} />
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  {/* )} */}
                  {/* {item.style === "dropdown" && (
                    <NavigationMenu.Sub>
                      <
                    </NavigationMenu.Sub>
                  )} */}
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