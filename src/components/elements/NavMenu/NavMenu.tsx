import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import classNames from 'classnames';
import { LinkType, NavigationLayout, SubmenuType } from '@/helpers/types';
import { Submenu } from './Submenu/Submenu';
import { NavLinkItem } from '../NavLinkItem/NavLinkItem';

export function getMenuItemText(item: LinkType | SubmenuType): string {
  return item.label;
}

const NavMenu: React.FC<{
  menuItems: Array<LinkType | SubmenuType>;
  layout?: NavigationLayout;
}> = ({ menuItems, layout }) => {
  return (
    <NavigationMenu.Root
      className={classNames('NavMenu hidden lg:flex justify-end')}
    >
      <NavigationMenu.List
        className={classNames(
          'flex justify-center items-start px-5 list-none m-0',
        )}
      >
        {menuItems.map(
          (item) =>
            item && (
              <NavigationMenu.Item
                key={item.id}
                className={classNames('text-smd py-7 px-5', {
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
                {item.contentType === 'submenu' && (
                  <Submenu key={item.id} data={item} layout={layout} />
                )}
              </NavigationMenu.Item>
            ),
        )}
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
};

export default NavMenu;
