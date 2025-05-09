import classNames from 'classnames';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { LinkType, NavigationLayout, SubmenuType } from '@/lib/types';
import { NavLinkItem } from '@/components/elements/NavLinkItem/NavLinkItem';

export const NavMenu: React.FC<{
  menuItems: Array<LinkType | SubmenuType>;
  layout?: NavigationLayout;
}> = ({ menuItems }) => {
  return (
    <NavigationMenu.Root className={classNames('NavMenu hidden lg:flex')}>
      <NavigationMenu.List
        className={classNames(
          'flex justify-center items-start px-2 list-none m-0',
        )}
      >
        {menuItems.map(
          (item) =>
            item && (
              <NavigationMenu.Item
                key={item.id}
                className={classNames('text-smd px-4', {
                  'py-5': item.contentType === 'link',
                  relative: 'menuItems' in item && item.layout === 'dropdown',
                })}
              >
                {item.contentType === 'link' && (
                  <NavLinkItem
                    key={item.id}
                    href={item.href}
                    openNewTab={item.openNewTab}
                  >
                    {item.label}
                  </NavLinkItem>
                )}
              </NavigationMenu.Item>
            ),
        )}
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
};
