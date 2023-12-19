import * as NavigationMenu from "@radix-ui/react-navigation-menu"
import { usePathname } from "next/navigation";
import { FaChevronDown } from "react-icons/fa";
import { NavLinkItem } from "@/components/elements/NavLinkItem/NavLinkItem";
import { NavFeaturedContent } from "@/components/elements/NavFeaturedContent/NavFeaturedContent";
import { SubmenuType } from "@/helpers/types";
import { Dispatch, SetStateAction } from "react";
import classNames from "classnames";

export const SubmenuMobile: React.FC<{data: SubmenuType, setMobileMenuShowed:  Dispatch<SetStateAction<boolean>>}> = ({data, setMobileMenuShowed}) => {
  const pathname = usePathname();
  return (
    <NavigationMenu.Item className="py-2 border-b last:border-none border-neutral-100">
      <NavigationMenu.Trigger
        className={classNames(
          "py-2 px-3 select-none font-semibold text-start w-full group rounded-assets hover:bg-primary-100 transition duration-500",
          {
            "bg-primary-100":
              data.featuredContent.find(
                (content) => "url" in content && content.url === pathname
              ) ||
              data.menu.find(
                (subItem) =>
                  (subItem.contentType === "link" &&
                    subItem.url === pathname) ||
                  (subItem.contentType === "linkgroup" &&
                    subItem.links.find((link) => link.url === pathname))
              ),
          }
        )}
      >
        {data.title}
        <FaChevronDown
          size={10}
          className="inline-block ml-2 transition-transform duration-500 group-data-[state=open]:rotate-180"
        />
      </NavigationMenu.Trigger>
      <NavigationMenu.Content className="bg-neutral-50 font-medium mt-2 rounded-assets">
        <NavigationMenu.Sub orientation="vertical" className="py-2 px-4">
          <NavigationMenu.List>
            {data.menu.length > 0 &&
              data.menu.map((subItem) => (
                <NavigationMenu.Item key={subItem.id} className="py-2">
                  {subItem.contentType === "link" && (
                    <NavLinkItem
                      key={subItem.id}
                      href={subItem.url}
                      title={subItem.text}
                      onClick={() => {
                        setMobileMenuShowed(false);
                        document.body.style.overflow = "auto";
                      }}
                    />
                  )}
                  {subItem.contentType === "linkgroup" && (
                    <div>
                      <NavigationMenu.Trigger
                        className={classNames(
                          "w-full select-none text-left py-1.5 px-3 rounded-assets hover:bg-primary-100 transition-color duration-300 data-[state=open]:bg-primary-100 group",
                          {
                            "bg-primary-100": subItem.links.find(
                              (link) => link.url === pathname
                            ),
                          }
                        )}
                      >
                        {subItem.title}
                        <FaChevronDown
                          size={10}
                          className="inline-block ml-2 transition-transform duration-500 group-data-[state=open]:rotate-180"
                        />
                      </NavigationMenu.Trigger>
                      <NavigationMenu.Content className="mt-2">
                        <ul className="pl-4 py-3 flex flex-col gap-y-2">
                          {subItem.links.length > 0 &&
                            subItem.links.map((link) => (
                              <NavLinkItem
                                key={link.id}
                                href={link.url}
                                title={link.text}
                                onClick={() => {
                                  setMobileMenuShowed(false);
                                  document.body.style.overflow = "auto";
                                }}
                              />
                            ))}
                        </ul>
                      </NavigationMenu.Content>
                    </div>
                  )}
                </NavigationMenu.Item>
              ))}
          </NavigationMenu.List>
          {data.featuredContent?.length > 0 && (
            <div className="flex gap-4 overflow-y-auto overscroll-y-contain">
              {data.featuredContent.map((content) => (
                <div
                  key={content.id}
                  className="w-4/5 md:basis-72 shrink-0 grow max-w-xs"
                >
                  <NavFeaturedContent data={content} />
                </div>
              ))}
            </div>
          )}
        </NavigationMenu.Sub>
      </NavigationMenu.Content>
    </NavigationMenu.Item>
  );
}