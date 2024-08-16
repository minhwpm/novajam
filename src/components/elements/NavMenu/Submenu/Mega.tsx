import { SubmenuType } from "@/lib/types"
import classNames from "classnames"
import { NavFeaturedContent } from "@/components/elements/NavFeaturedContent/NavFeaturedContent";
import { NavLinkItem } from "@/components/elements/NavLinkItem/NavLinkItem";

export const Mega: React.FC<{data: SubmenuType}> = ({ data }) => {
  return (
    <div className="container px-4 mx-auto">
      <div className="py-10 flex flex-wrap gap-8">
        {data.menu.length > 0 && (
          <div
            className={classNames(
              "basis-52 shrink-0 grow flex flex-wrap gap-6"
            )}
          >
            {data.menu.map((subItem) => (
              <div key={subItem.id} className="basis-52">
                {subItem.contentType === "link" && (
                  <NavLinkItem href={subItem.url}>{subItem.text}</NavLinkItem>
                )}
                {subItem.contentType === "linkgroup" && (
                  <p className="text-neutral-500 uppercase text-sm tracking-wide font-medium mb-2">
                    {subItem.title}
                  </p>
                )}
                <ul>
                  {subItem.contentType === "linkgroup" &&
                    subItem.links.length > 0 &&
                    subItem.links.map((link) => (
                      <li key={link.id} className="py-1.5">
                        <NavLinkItem href={link.url}>{link.text}</NavLinkItem>
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </div>
        )}
        {data.featuredContent.length > 0 && (
          <div
            className={classNames(
              "basis-80 flex gap-4 lg:gap-6 overflow-x-scroll overscroll-x-contain",
              { grow: data.featuredContent.length > 1 },
              {
                "justify-end": data.featuredContent.length === 1,
              }
            )}
          >
            {data.featuredContent.map((content) => content && (
              <div
                key={content.id}
                className="w-11/12 basis-80 shrink-0 grow max-w-xs"
              >
                <NavFeaturedContent data={content} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}