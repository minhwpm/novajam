import classNames from "classnames";
import * as NavigationMenu from "@radix-ui/react-navigation-menu"
import { SubmenuType } from "@/helpers/types";
import { NavLinkItem } from "@/components/elements/NavLinkItem/NavLinkItem";
import { usePathname } from "next/navigation";
import { FaChevronDown } from "react-icons/fa";
import { NavFeaturedContent } from "@/components/elements/NavFeaturedContent/NavFeaturedContent";

export const SubmenuMinimal: React.FC<{data: SubmenuType}> = ({ data }) => {
  const pathname = usePathname();
  return (
    <NavigationMenu.Item className="py-2 border-b last:border-none border-neutral-800">
      <NavigationMenu.Trigger
        className="group w-full"
        onPointerEnter={(e) => e.preventDefault()}
        onPointerMove={(e) => e.preventDefault()}
        onPointerLeave={(e) => e.preventDefault()}
      >
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
          <FaChevronDown
            size={12}
            className="inline-block ml-2 transition-transform duration-500 group-data-[state=open]:rotate-180"
          />
        </div>
      </NavigationMenu.Trigger>
      <NavigationMenu.Content
        className="w-full pt-4 pb-10 px-4 lg:px-10 my-4 bg-neutral-700/30 rounded-assets"
        onPointerLeave={(e) => e.preventDefault()}
      >
        <NavigationMenu.Root aria-label="Sub" orientation="vertical">
          <NavigationMenu.List className="px-2">
            {data.menu.length > 0 &&
              data.menu.map((subItem) => (
                <>
                  {subItem.contentType === "link" && (
                    <NavLinkItem
                      key={subItem.id}
                      className={classNames("py-1 mb-2")}
                      variant="underlined"
                      href={subItem.url}
                      title={subItem.text}
                    />
                  )}
                  {subItem.contentType === "linkgroup" && (
                    <NavigationMenu.Item key={subItem.id}>
                      <NavigationMenu.Trigger
                        className={classNames(
                          "font-medium select-none text-left py-2 rounded-assets before:bg-primary-500 underline-hover-effect data-[state=open]:before:w-full group",
                          {
                            "before:w-full": subItem.links.find(
                              (link) => link.url === pathname
                            ),
                          }
                        )}
                        onPointerEnter={(e) => e.preventDefault()}
                        onPointerMove={(e) => e.preventDefault()}
                        onPointerLeave={(e) => e.preventDefault()}
                      >
                        {subItem.title}
                        <FaChevronDown
                          size={12}
                          className="inline-block ml-2 transition-transform duration-500 group-data-[state=open]:rotate-180"
                        />
                      </NavigationMenu.Trigger>
                      <NavigationMenu.Content onPointerLeave={(e) => e.preventDefault()}>
                        <ul className="pl-4 py-3 flex flex-col gap-y-2">
                          {subItem.links.length > 0 &&
                            subItem.links.map((link) => (
                              <NavLinkItem
                                key={link.id}
                                className="before:bg-primary-500"
                                href={link.url}
                                title={link.text}
                                variant="underlined"
                              />
                            ))}
                        </ul>
                      </NavigationMenu.Content>
                    </NavigationMenu.Item>
                  )}
                </>
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
        </NavigationMenu.Root>
      </NavigationMenu.Content>
    </NavigationMenu.Item>
  );
}