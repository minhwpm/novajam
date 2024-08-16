import { Dispatch, SetStateAction } from "react";
import classNames from "classnames";
import * as NavigationMenu from "@radix-ui/react-navigation-menu"
import { SubmenuType } from "@/lib/types";
import { NavLinkItem } from "@/components/elements/NavLinkItem/NavLinkItem";
import { usePathname } from "next/navigation";
import { FaChevronDown } from "react-icons/fa";
import { NavFeaturedContent } from "@/components/elements/NavFeaturedContent/NavFeaturedContent";

export const SubmenuMinimal: React.FC<{data: SubmenuType, setNavMenuShowed: Dispatch<SetStateAction<boolean>>}> = ({ data, setNavMenuShowed }) => {
  const pathname = usePathname();
  return (
    <>
      <NavigationMenu.Trigger
        className="group w-full"
        onPointerEnter={(e) => e.preventDefault()}
        onPointerMove={(e) => e.preventDefault()}
        onPointerLeave={(e) => e.preventDefault()}
      >
        <div
          className={classNames(
            "text-center font-medium select-none rounded-theme before:bg-primary-500 underline-hover-effect group-data-[state=open]:before:w-full",
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
        className="w-full pt-4 pb-10 px-4 lg:px-10 my-4 bg-neutral-700/30 rounded-theme"
        onPointerLeave={(e) => e.preventDefault()}
      >
        <NavigationMenu.Root aria-label="Sub" orientation="vertical">
          <NavigationMenu.List>
            {data.menu.length > 0 &&
              data.menu.map((subItem) => (
                <div key={subItem.id} className={classNames("py-1")}>
                  {subItem.contentType === "link" && (
                    <NavLinkItem
                      variant="underlined"
                      href={subItem.url}
                      onClick={() => {
                        setNavMenuShowed(false);
                        document.body.style.overflow = "auto";
                      }}
                    >
                      {subItem.text}
                    </NavLinkItem>
                  )}
                  {subItem.contentType === "linkgroup" && (
                    <NavigationMenu.Item>
                      <NavigationMenu.Trigger
                        className={classNames(
                          "font-medium select-none text-left py-2 rounded-theme before:bg-primary-500 underline-hover-effect data-[state=open]:before:w-full group",
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
                                href={link.url}
                                variant="underlined"
                                onClick={() => {
                                  setNavMenuShowed(false);
                                  document.body.style.overflow = "auto";
                                }}
                              >
                                {link.text}
                              </NavLinkItem>
                            ))}
                        </ul>
                      </NavigationMenu.Content>
                    </NavigationMenu.Item>
                  )}
                </div>
              ))}
          </NavigationMenu.List>
          {data.featuredContent?.length > 0 && (
            <div className="mt-4 flex gap-4 overflow-y-auto overscroll-y-contain">
              {data.featuredContent.map((content) => (
                <div
                  key={content.id}
                  className="w-11/12 md:basis-72 shrink-0 grow max-w-xs"
                >
                  <NavFeaturedContent data={content} />
                </div>
              ))}
            </div>
          )}
        </NavigationMenu.Root>
      </NavigationMenu.Content>
    </>
  );
}