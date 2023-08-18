import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import classNames from 'classnames';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars, faXmark, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import SubMenuItem from './SubMenuItem';
import './styles.css';
import Link from 'next/link';
import { NavMenuProps, LinkProps, SubmenuProps } from "@/utils/types"

export function getMenuItemText(item: LinkProps | SubmenuProps): string {
  if ("text" in item) return item.text
  return item.title
}

const NavMenu: React.FC<NavMenuProps> = ({ menu, navAlignment = "center" }) => {  
  return (
    <NavigationMenu.Root
      className={classNames(
      "hidden xl:flex relative w-full pt-2 pb-3",
      { "justify-center": navAlignment === "center"},
      { "justify-start": navAlignment === "left"},
      { "justify-end": navAlignment === "right"},
    )}>
      <NavigationMenu.List className={classNames(
        "flex justify-center px-5 list-none m-0 gap-10",
      )}>
        {menu.map((item, idx) => (
          <NavigationMenu.Item key={getMenuItemText(item)}>
            { "url" in item && (
              <Link className="py-2 select-none inline-block underline-hover-effect " href={item.url}>
                {item.text}
              </Link>
            )}
            { "menu" in item && (
              <>
                <NavigationMenu.Trigger className="py-2 select-none underline-hover-effect cursor-pointer">
                  {item.title} <FontAwesomeIcon className="inline-block CaretDown" icon={faChevronDown} size="2xs" width={10} />
                </NavigationMenu.Trigger>
                <NavigationMenu.Content className="NavigationMenuContent List two">
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
                    {item.menu && item.menu.map((subItem, idx) => (
                      <div key={idx} className="">
                        {subItem.title && 
                          <p className="text-slate-500 uppercase text-sm tracking-wide">
                            {subItem.title}
                          </p>
                        }
                        <ul>
                          {subItem.links.map((link) => (
                            <SubMenuItem key={link.text} href={link.url} title={link.text} />
                          ))}
                        </ul>
                      </div>
                    ))}
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
        "absolute flex w-full top-full left-0 z-[9999]",
        { "justify-center": navAlignment === "center"},
        { "justify-start": navAlignment === "left"},
        { "justify-end": navAlignment === "right"}
      )}>
        <NavigationMenu.Viewport className="NavigationMenuViewport" />
      </div>
    </NavigationMenu.Root>
  )
}

export default NavMenu