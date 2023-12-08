"use client";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import SubMenuItem from "./SubMenuItem";
import Link from "next/link";
import { LinkType, NavigationUiVariant, SubmenuType } from "@/helpers/types";
import SubMenuFeaturedContent from "./SubMenuFeaturedContent";
import { usePathname } from "next/navigation";
import "./styles.css";

export interface NavMenuProps {
  menu: Array<LinkType | SubmenuType>;
  uiVariant: NavigationUiVariant
}

export function getMenuItemText(item: LinkType | SubmenuType): string {
  if ("text" in item) return item.text;
  return item.title;
}

const NavMenu: React.FC<NavMenuProps> = ({ menu, uiVariant }) => {
  const pathname = usePathname();
  return (
    <NavigationMenu.Root
      className={classNames(
        "NavMenu hidden lg:flex pt-2 pb-3",
        { "justify-center": uiVariant === "standard" },
        { "justify-end": uiVariant === "overlay" }
      )}
    >
      <NavigationMenu.List
        className={classNames(
          "flex justify-center px-5 list-none m-0 gap-x-10"
        )}
      >
        {menu.map((item) => (
          <NavigationMenu.Item
            key={item.id}
            className={classNames({
              relative: "menu" in item && item.layout === "dropdown",
            })}
          >
            {item.contentType === "link" && (
              <Link
                href={item.url}
                className={classNames(
                  "py-2 select-none inline-block underline-hover-effect",
                  { "before:w-full": pathname === item.url }
                )}
              >
                {item.text}
              </Link>
            )}
            {item.contentType === "submenu" && (
              <>
                <NavigationMenu.Trigger
                  className={classNames(
                    "py-2 select-none underline-hover-effect cursor-pointer data-[state=open]:before:w-full group",
                    {
                      "before:w-full":
                        item.featuredContent.find(
                          (content) =>
                            "url" in content && content.url === pathname
                        ) ||
                        item.menu.find(
                          (subItem) =>
                            (subItem.contentType === "link" &&
                              subItem.url === pathname) ||
                            (subItem.contentType === "linkgroup" &&
                              subItem.links.find(
                                (link) => link.url === pathname
                              ))
                        ),
                    }
                  )}
                  onPointerEnter={(e) => {
                    e.preventDefault();
                  }}
                >
                  {item.title}{" "}
                  <FontAwesomeIcon
                    className="inline-block ml-2 transition-transform duration-500 group-data-[state=open]:rotate-180"
                    icon={faChevronDown}
                    size="2xs"
                    width={10}
                  />
                </NavigationMenu.Trigger>
                <NavigationMenu.Content
                  data-state="open"
                  className={classNames(
                    "list-none",
                    {
                      "absolute top-full left-0 w-full bg-white shadow-lg":
                        item.layout === "mega",
                    }, //Mega menu style
                    {
                      "absolute top-full left-0 w-64 pt-5":
                        item.layout === "dropdown",
                    } //Dropdown menu style
                  )}
                  onFocusOutside={() => {
                    console.log("HELLO CONTENT");
                  }}
                >
                  {item.layout === "mega" && (
                    <div
                      className={classNames({
                        "container mx-auto px-4 pb-10 text-neutral-900":
                          item.layout === "mega",
                      })}
                    >
                      <div className="grow flex gap-12 pt-5 border-t">
                        {item.menu.length > 0 && (
                          <div
                            className={classNames(
                              "grow flex flex-wrap gap-8 py-5"
                            )}
                          >
                            {item.menu.map((subItem) => (
                              <div
                                key={subItem.id}
                                className="basis-60 shrink-0 mb-3"
                              >
                                {subItem.contentType === "link" && (
                                  <SubMenuItem
                                    href={subItem.url}
                                    title={subItem.text}
                                  />
                                )}
                                {subItem.contentType === "linkgroup" && (
                                  <p className="text-neutral-500 uppercase text-sm tracking-wide font-medium mb-2">
                                    {subItem.title}
                                  </p>
                                )}
                                <ul className="flex flex-col">
                                  {subItem.contentType === "linkgroup" &&
                                    subItem.links.length > 0 &&
                                    subItem.links.map((link) => (
                                      <SubMenuItem
                                        key={link.id}
                                        href={link.url}
                                        title={link.text}
                                      />
                                    ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        )}
                        {item.featuredContent.length > 0 && (
                          <div
                            className={classNames(
                              "basis-1/3 xl:basis-1/4 shrink-0 grow flex gap-2 overflow-y-scroll overscroll-y-contain ",
                              {
                                "justify-end":
                                  item.featuredContent.length === 1,
                              }
                            )}
                          >
                            {item.featuredContent.map((item) => (
                              <div
                                key={item.id}
                                className="basis-72 shrink-0 grow max-w-xs"
                              >
                                <SubMenuFeaturedContent data={item} />
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  {item.layout === "dropdown" && (
                    <NavigationMenu.Sub
                      orientation="vertical"
                      className="py-4 px-2 bg-white text-neutral-800 shadow-lg border-t rounded-assets"
                    >
                      <NavigationMenu.List>
                        {item.menu.length > 0 &&
                          item.menu.map((subItem) => (
                            <NavigationMenu.Item
                              key={subItem.id}
                              className="relative"
                            >
                              {subItem.contentType === "link" && (
                                <Link
                                  href={subItem.url}
                                  className={classNames(
                                    "block w-full font-medium px-3 py-1.5 rounded-sm hover:bg-primary-50 transition-color duration-300",
                                    {
                                      "bg-primary-100":
                                        subItem.url === pathname,
                                    }
                                  )}
                                >
                                  {subItem.text}
                                </Link>
                              )}
                              {subItem.contentType === "linkgroup" && (
                                <div className="text-neutral-700">
                                  <NavigationMenu.Trigger
                                    className={classNames(
                                      "w-full font-medium select-none text-left py-1.5 px-3 rounded-sm hover:bg-primary-50 transition-color duration-300 data-[state=open]:bg-primary-50 group"
                                    )}
                                  >
                                    {subItem.title}
                                    <FontAwesomeIcon
                                      className="inline-block ml-2 transition-transform duration-500 group-data-[state=open]:rotate-180"
                                      icon={faChevronRight}
                                      size="2xs"
                                      width={10}
                                    />
                                  </NavigationMenu.Trigger>
                                  <NavigationMenu.Content className="absolute left-full top-0 pl-4">
                                    <ul className="py-4 px-2 bg-white rounded-assets shadow-lg w-64 flex flex-col">
                                      {subItem.links.length > 0 &&
                                        subItem.links.map((link) => (
                                          <SubMenuItem
                                            key={link.id}
                                            href={link.url}
                                            title={link.text}
                                            currentPathname={pathname}
                                          />
                                        ))}
                                    </ul>
                                  </NavigationMenu.Content>
                                </div>
                              )}
                            </NavigationMenu.Item>
                          ))}
                      </NavigationMenu.List>
                      {item.featuredContent.length > 0 && (
                        <div className="mt-2 flex gap-2 overflow-y-scroll overscroll-y-contain">
                          {item.featuredContent.map((item) => (
                            <div
                              key={item.id}
                              className="basis-5/6 shrink-0 grow"
                            >
                              <SubMenuFeaturedContent data={item} />
                            </div>
                          ))}
                        </div>
                      )}
                    </NavigationMenu.Sub>
                  )}
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
  );
};

export default NavMenu