import { SubmenuType } from "@/lib/types";
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
              className="relative py-2 first:pt-0 last:pb-0"
            >
              {subItem.contentType === "link" && (
                <NavLinkItem href={subItem.url}>{subItem.text}</NavLinkItem>
              )}
              {subItem.contentType === "linkgroup" && (
                <>
                  <NavigationMenu.Trigger
                    className={classNames(
                      "w-full select-none text-left pb-2 rounded-theme data-[state=open]:text-primary-600 group",
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
                  <NavigationMenu.Content className="absolute left-full py-4 pl-8 data-[state=open]:animate-slidingLinkgroup">
                    <ul className="px-6 py-4 bg-white rounded-md shadow-radiant w-64 flex flex-col">
                      {subItem.links.length > 0 &&
                        subItem.links.map((link) => (
                          <li key={link.id} className="py-2 first:pt-0 last:pb-0">
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