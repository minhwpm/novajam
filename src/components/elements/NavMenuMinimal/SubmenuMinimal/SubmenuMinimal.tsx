import { Dispatch, SetStateAction } from 'react';
import classNames from 'classnames';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { SubmenuType } from '@/helpers/types';
import { NavLinkItem } from '@/components/elements/NavLinkItem/NavLinkItem';
import { usePathname } from 'next/navigation';
import { FaChevronDown } from 'react-icons/fa';
import { NavFeaturedContent } from '@/components/elements/NavFeaturedContent/NavFeaturedContent';

export const SubmenuMinimal: React.FC<{
  data: SubmenuType;
  setNavMenuShowed: Dispatch<SetStateAction<boolean>>;
}> = ({ data, setNavMenuShowed }) => {
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
            'text-center font-medium select-none rounded-theme before:bg-primary-500 dark:before:bg-white underline-hover-effect group-data-[state=open]:before:w-full',
            {
              'before:w-full':
                data.featuredContent.find(
                  (content) => 'url' in content && content.url === pathname,
                ) ||
                data.menuItems.find(
                  (item) =>
                    (item.contentType === 'link' && item.href === pathname) ||
                    (item.contentType === 'linkgroup' &&
                      item.links.find((link) => link.href === pathname)),
                ),
            },
          )}
        >
          {data.label}
          <FaChevronDown
            size={12}
            className="inline-block ml-2 transition-transform duration-500 group-data-[state=open]:rotate-180"
          />
        </div>
      </NavigationMenu.Trigger>
      <NavigationMenu.Content
        className="w-full pt-4 pb-10 px-4 lg:px-10 my-4 bg-slate-700/30 rounded-theme"
        onPointerLeave={(e) => e.preventDefault()}
      >
        <NavigationMenu.Root aria-label="Sub" orientation="vertical">
          <NavigationMenu.List>
            {data.menuItems.length > 0 &&
              data.menuItems.map((item) => (
                <div key={item.id} className={classNames('py-1')}>
                  {item.contentType === 'link' && (
                    <NavLinkItem
                      href={item.href}
                      onClick={() => {
                        setNavMenuShowed(false);
                        document.body.style.overflow = 'auto';
                      }}
                    >
                      {item.label}
                    </NavLinkItem>
                  )}
                  {item.contentType === 'linkgroup' && (
                    <NavigationMenu.Item>
                      <NavigationMenu.Trigger
                        className={classNames(
                          'font-medium select-none text-left py-2 rounded-theme before:bg-primary-500 dark:before:bg-white underline-hover-effect data-[state=open]:before:w-full group',
                          {
                            'before:w-full': item.links.find(
                              (link) => link.href === pathname,
                            ),
                          },
                        )}
                        onPointerEnter={(e) => e.preventDefault()}
                        onPointerMove={(e) => e.preventDefault()}
                        onPointerLeave={(e) => e.preventDefault()}
                      >
                        {item.label}
                        <FaChevronDown
                          size={12}
                          className="inline-block ml-2 transition-transform duration-500 group-data-[state=open]:rotate-180"
                        />
                      </NavigationMenu.Trigger>
                      <NavigationMenu.Content
                        onPointerLeave={(e) => e.preventDefault()}
                      >
                        <ul className="pl-4 py-3 flex flex-col gap-y-2">
                          {item.links.length > 0 &&
                            item.links.map((link) => (
                              <NavLinkItem
                                key={link.id}
                                href={link.href}
                                onClick={() => {
                                  setNavMenuShowed(false);
                                  document.body.style.overflow = 'auto';
                                }}
                              >
                                {link.label}
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
};
