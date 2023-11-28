import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import classNames from 'classnames';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import SubMenuItem from './SubMenuItem';
import { useState } from 'react';
import { getMenuItemText } from './NavMenu';
import SubMenuFeaturedContent from './SubMenuFeaturedContent';
import { LinkType, SubmenuType } from '@/helpers/types';
import { CiMenuFries } from 'react-icons/ci';
import { AiOutlineClose } from 'react-icons/ai';
import Link from 'next/link';

const NavMenuMobile: React.FC<{ menu: Array<LinkType | SubmenuType> }> = ({ menu }) => {
  const [ mobileMenuShowed, setMobileMenuShowed ] = useState(false)

  return (
    <>
      {/* MOBILE, TABLET */}
      <NavigationMenu.Root
        className={classNames(
          "lg:hidden absolute top-0 left-0 z-[99999] bg-white text-neutral-900 w-screen h-screen px-4 py-20 overflow-y-auto",
          { hidden: !mobileMenuShowed }
        )}
      >
        {mobileMenuShowed && (
          <AiOutlineClose
            className="cursor-pointer absolute right-4 top-8"
            size={30}
            onClick={() => {
              setMobileMenuShowed(false);
              document.body.style.overflow = "auto";
            }}
          />
        )}
        <NavigationMenu.List>
          {menu.map((item) => (
            <NavigationMenu.Item key={getMenuItemText(item)}>
              {item.contentType === "link" && (
                <Link className="py-2 select-none inline-block" href={item.url}>
                  {item.text}
                </Link>
              )}
              {item.contentType === "submenu" && (
                <>
                  <NavigationMenu.Trigger className="py-2 select-none group">
                    {item.title}{" "}
                    <FontAwesomeIcon
                      className="inline-block ml-2 transition-transform duration-500 group-data-[state=open]:rotate-180"
                      icon={faChevronDown}
                      size="2xs"
                      width={10}
                    />
                  </NavigationMenu.Trigger>
                  <NavigationMenu.Content
                    onInteractOutside={(e) => {
                      e.preventDefault();
                    }}
                  >
                    <NavigationMenu.Sub
                      orientation="vertical"
                      className="py-2 px-4"
                    >
                      <NavigationMenu.List>
                        {item.menu.length > 0 &&
                          item.menu.map((subItem) => (
                            <NavigationMenu.Item key={subItem.id}>
                              {subItem.contentType === "link" && (
                                <SubMenuItem
                                  key={subItem.text}
                                  href={subItem.url}
                                  title={subItem.text}
                                />
                              )}
                              {subItem.contentType === "linkgroup" && (
                                <div className="text-slate-700">
                                  <NavigationMenu.Trigger className="w-full font-medium select-none text-left py-1.5 px-3 rounded-sm hover:bg-slate-100 transition-color duration-300 data-[state=open]:bg-slate-100 group">
                                    {subItem.title}
                                    <FontAwesomeIcon
                                      className="inline-block ml-2 transition-transform duration-500 group-data-[state=open]:rotate-180"
                                      icon={faChevronDown}
                                      size="2xs"
                                      width={10}
                                    />
                                  </NavigationMenu.Trigger>
                                  <NavigationMenu.Content
                                    onInteractOutside={(e) => {
                                      e.preventDefault();
                                    }}
                                  >
                                    <ul className="pl-5 flex flex-col">
                                      {subItem.links.length > 0 &&
                                        subItem.links.map((link) => (
                                          <SubMenuItem
                                            key={link.text}
                                            href={link.url}
                                            title={link.text}
                                          />
                                        ))}
                                    </ul>
                                  </NavigationMenu.Content>
                                </div>
                              )}
                            </NavigationMenu.Item>
                          ))}
                      </NavigationMenu.List>
                      {item.featuredContent?.length > 0 && (
                        <div className="flex overflow-y-auto overscroll-y-contain">
                          {item.featuredContent.map((content) => (
                            <div
                              key={content.id}
                              className="basis-72 shrink-0 grow max-w-xs"
                            >
                              <SubMenuFeaturedContent data={content} />
                            </div>
                          ))}
                        </div>
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
        {!mobileMenuShowed && (
          <CiMenuFries
            className="cursor-pointer"
            size={30}
            onClick={() => {
              setMobileMenuShowed(true);
              document.body.style.overflow = "hidden";
            }}
          />
        )}
      </div>
    </>
  );
}

export default NavMenuMobile