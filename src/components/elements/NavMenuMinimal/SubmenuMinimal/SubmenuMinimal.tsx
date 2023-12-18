import classNames from "classnames";
import * as NavigationMenu from "@radix-ui/react-navigation-menu"
import { SubmenuType } from "@/helpers/types";
import { LinkItem } from "../LinkItem/LinkItem";
import { SubMenuFeaturedContent } from "../../NavMenu/Submenu/SubMenuFeaturedContent";
import { usePathname } from "next/navigation";
import { FaChevronDown } from "react-icons/fa";

export const SubmenuMinimal: React.FC<{data: SubmenuType}> = ({ data }) => {
  const pathname = usePathname();
  return (
    <>
      <NavigationMenu.Trigger className="group w-full">
        <div
          className={classNames(
            "text-center font-medium select-none rounded-assets before:bg-primary-500 underline-hover-effect group-data-[state=open]:before:w-full",
            {
              "before:w-full":
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
          <FaChevronDown size={12} className="inline-block ml-2 transition-transform duration-500 group-data-[state=open]:rotate-180"/>
        </div>
      </NavigationMenu.Trigger>
      <NavigationMenu.Content className="w-full pt-4 pb-10 px-4 lg:px-10 my-4 bg-neutral-700/30 rounded-assets">
        <NavigationMenu.Sub orientation="vertical">
          <NavigationMenu.List className="px-2">
            {data.menu.length > 0 &&
              data.menu.map((subItem) => (
                <NavigationMenu.Item key={subItem.id} className={classNames("py-1 mb-2")}>
                  {subItem.contentType === "link" && (
                    <LinkItem
                      key={subItem.text}
                      href={subItem.url}
                      title={subItem.text}
                    />
                  )}
                  {subItem.contentType === "linkgroup" && (
                    <>
                      <NavigationMenu.Trigger className={classNames("font-medium select-none text-left py-2 rounded-assets before:bg-primary-500 underline-hover-effect data-[state=open]:before:w-full group",
                        {
                          "before:w-full":
                            subItem.links.find((link) => link.url === pathname)
                        }
                      )}>
                        {subItem.title}
                        <FaChevronDown size={12} className="inline-block ml-2 transition-transform duration-500 group-data-[state=open]:rotate-180"/>
                      </NavigationMenu.Trigger>
                      <NavigationMenu.Content>
                        <ul className=" pl-4 py-3 flex flex-col gap-y-2">
                          {subItem.links.length > 0 &&
                            subItem.links.map((link) => (
                              <li key={link.text}>
                                <LinkItem
                                  className="before:bg-primary-500"
                                  href={link.url}
                                  title={link.text}
                                />
                              </li>
                            ))}
                        </ul>
                      </NavigationMenu.Content>
                    </>
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
                  <SubMenuFeaturedContent data={content} />
                </div>
              ))}
            </div>
          )}
        </NavigationMenu.Sub>
      </NavigationMenu.Content>
    </>
  );
}