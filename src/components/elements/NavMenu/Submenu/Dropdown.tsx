import { SubmenuType } from "@/helpers/types";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import classNames from "classnames";
import { FaChevronRight } from "react-icons/fa";
import { NavFeaturedContent } from "@/components/elements/NavFeaturedContent/NavFeaturedContent";
import { usePathname } from "next/navigation";
import { NavLinkItem } from "../../NavLinkItem/NavLinkItem";

export const Dropdown: React.FC<{data: SubmenuType}> = 
({ data }) => {
  const pathname = usePathname();
  return (
    <NavigationMenu.Root aria-label="Sub" orientation="vertical">
      <NavigationMenu.List>
        {data.menu.length > 0 &&
          data.menu.map((subItem) => (
            <NavigationMenu.Item
              key={subItem.id}
              value={subItem.id}
              className="relative py-1 border-b border-neutral-100 first:pt-0 last:border-none"
            >
              {subItem.contentType === "link" && (
                <NavLinkItem href={subItem.url}>{subItem.text}</NavLinkItem>
              )}
              {subItem.contentType === "linkgroup" && (
                <>
                  <NavigationMenu.Trigger
                    className={classNames(
                      "w-full select-none text-left py-2 px-3 rounded-assets hover:bg-primary-50 transition-color duration-300 data-[state=open]:bg-primary-50 group",
                      {
                        "bg-primary-100": subItem.links.find(
                          (link) => link.url === pathname
                        ),
                      }
                    )}
                  >
                    {subItem.title}
                    <FaChevronRight
                      size={10}
                      className="inline-block ml-2 transition-transform duration-500 group-data-[state=open]:rotate-180"
                    />
                  </NavigationMenu.Trigger>
                  <NavigationMenu.Content className="absolute left-full pt-1 pl-4 data-[state=open]:animate-slidingLinkgroup">
                    <ul className="p-3 bg-white rounded-md shadow-radiant w-64 flex flex-col">
                      {subItem.links.length > 0 &&
                        subItem.links.map((link) => (
                          <li key={link.id} className="py-1">
                            <NavLinkItem href={link.url}>
                              {link.text}
                            </NavLinkItem>
                          </li>
                        ))}
                    </ul>
                  </NavigationMenu.Content>
                </>
              )}
            </NavigationMenu.Item>
          ))}
      </NavigationMenu.List>
      {data.featuredContent.length > 0 && (
        <div className="mt-4 flex gap-2 overflow-y-scroll overscroll-y-contain">
          {data.featuredContent.map((data) => (
            <div key={data.id} className="basis-5/6 shrink-0 grow">
              <NavFeaturedContent data={data} />
            </div>
          ))}
        </div>
      )}
    </NavigationMenu.Root>
  );
}