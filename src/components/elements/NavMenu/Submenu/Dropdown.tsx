import { SubmenuType } from '@/helpers/types';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import classNames from 'classnames';
import { FaChevronRight } from 'react-icons/fa';
import { NavFeaturedContent } from '@/components/elements/NavFeaturedContent/NavFeaturedContent';
import { usePathname } from 'next/navigation';
import { NavLinkItem } from '../../NavLinkItem/NavLinkItem';

export const Dropdown: React.FC<{ data: SubmenuType }> = ({ data }) => {
  const pathname = usePathname();
  return (
    <NavigationMenu.Root aria-label="Sub" orientation="vertical">
      <NavigationMenu.List>
        {data.menuItems.length > 0 &&
          data.menuItems.map((item) => (
            <NavigationMenu.Item
              key={item.id}
              value={item.id}
              className="relative py-2 first:pt-0 last:pb-0"
            >
              {item.contentType === 'link' && (
                <NavLinkItem href={item.href}>{item.label}</NavLinkItem>
              )}
              {item.contentType === 'linkgroup' && (
                <>
                  <NavigationMenu.Trigger
                    className={classNames(
                      'w-full select-none text-left pb-2 rounded-theme data-[state=open]:text-primary-600 group',
                      {
                        'bg-slate-100': item.links.find(
                          (link) => link.href === pathname,
                        ),
                      },
                    )}
                  >
                    {item.label}
                    <FaChevronRight
                      size={10}
                      className="inline-block ml-2 transition-transform duration-500 group-data-[state=open]:rotate-180"
                    />
                  </NavigationMenu.Trigger>
                  <NavigationMenu.Content className="absolute left-full py-4 pl-8 data-[state=open]:animate-slidingLinkgroup">
                    <ul className="px-6 py-4 bg-white rounded-md shadow-radiant w-64 flex flex-col">
                      {item.links.length > 0 &&
                        item.links.map((link) => (
                          <li
                            key={link.id}
                            className="py-2 first:pt-0 last:pb-0"
                          >
                            <NavLinkItem href={link.href}>
                              {link.label}
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
};
