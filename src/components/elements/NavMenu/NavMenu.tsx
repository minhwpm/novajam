import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import classNames from 'classnames';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import SubMenuItem from './SubMenuItem';
import Link from 'next/link';
import { NavMenuProps, LinkProps, SubmenuProps } from "@/utils/types"
// import './styles.css';

export function getMenuItemText(item: LinkProps | SubmenuProps): string {
  if ("text" in item) return item.text
  return item.title
}

const NavMenu: React.FC<NavMenuProps> = ({ menu, navAlignment = "center" }) => {  
  return (
    <NavigationMenu.Root
      className={classNames(
      "hidden xl:flex pt-2 pb-3",
      { "justify-center": navAlignment === "center"},
      { "justify-start": navAlignment === "left"},
      { "justify-end": navAlignment === "right"},
    )}>
      <NavigationMenu.List
        className={classNames(
          "flex justify-center px-5 list-none m-0 gap-10",
        )}
       >
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
                <NavigationMenu.Content className={classNames(
                  "absolute top-full",
                  "duration-250 ease-in data-[motion=from-start]:animation bg-white border-t shadow-lg rounded-lg",
                  // {"w-full inset-x-0": true}, //Mega menu style
                  {"w-64": true} //Dropdown menu style
                )}>
                    <NavigationMenu.List className={classNames("py-6 px-8 list-none",
                      // {"grid gap-x-5 xl:grid-cols-4 grid-flow-col": true}, //Mega menu style
                    )}>
                    {item.menu && item.menu.map((subItem, idx) => (
                      <div key={idx} className="mb-3">
                        {subItem.title && 
                          <p className="text-slate-500 uppercase text-sm tracking-wide font-medium mb-1">
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
                    </NavigationMenu.List>
                </NavigationMenu.Content>
              </>
            )}
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