'use client';
import { useState } from 'react';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import classNames from 'classnames';
import { ButtonType, LinkType, SubmenuType } from '@/helpers/types';
import { IoCloseOutline } from 'react-icons/io5';
import { CiMenuBurger } from 'react-icons/ci';
import { Button } from '../Button/Button';
import { SubmenuMobile } from './SubmenuMobile/SubmenuMobile';
import { NavLinkItem } from '../NavLinkItem/NavLinkItem';

const NavMenuMobile: React.FC<{
  menuItems: Array<LinkType | SubmenuType>;
  buttons?: Array<ButtonType>;
}> = ({ menuItems, buttons }) => {
  const [mobileMenuShowed, setMobileMenuShowed] = useState(false);

  return (
    <>
      <NavigationMenu.Root
        className={classNames(
          'lg:hidden absolute top-0 left-0 z-[99999] w-screen h-screen px-4 pt-20 pb-36 overflow-y-auto bg-white text-slate-800 dark:bg-slate-900 dark:text-slate-100 ',
          { hidden: !mobileMenuShowed },
        )}
        orientation="vertical"
      >
        {mobileMenuShowed && (
          <IoCloseOutline
            className="cursor-pointer absolute right-4 top-8"
            size={30}
            onClick={() => {
              setMobileMenuShowed(false);
              document.body.style.overflow = 'auto';
            }}
          />
        )}
        <NavigationMenu.List>
          {menuItems.map(
            (item) =>
              item && (
                <NavigationMenu.Item
                  key={item.id}
                  className={classNames(
                    'py-2.5 border-b last:border-none border-slate-100 dark:border-slate-800',
                  )}
                >
                  {item.contentType === 'link' && (
                    <NavLinkItem
                      href={item.href}
                      onClick={() => {
                        setMobileMenuShowed(false);
                        document.body.style.overflow = 'auto';
                      }}
                    >
                      {item.label}
                    </NavLinkItem>
                  )}
                  {item.contentType === 'submenu' && (
                    <SubmenuMobile
                      data={item}
                      setMobileMenuShowed={setMobileMenuShowed}
                    />
                  )}
                </NavigationMenu.Item>
              ),
          )}
        </NavigationMenu.List>
        {buttons && buttons.length > 0 && (
          <div className="my-10 flex flex-wrap justify-center gap-5">
            {buttons.map((button) => (
              <Button
                key={button.id}
                data={button}
                onClick={() => {
                  setMobileMenuShowed(false);
                  document.body.style.overflow = 'auto';
                }}
                size="base"
              >
                {button.label}
              </Button>
            ))}
          </div>
        )}
      </NavigationMenu.Root>

      <div className="lg:hidden ml-auto">
        {!mobileMenuShowed && (
          <CiMenuBurger
            className="cursor-pointer"
            size={30}
            onClick={() => {
              setMobileMenuShowed(true);
              document.body.style.overflow = 'hidden';
            }}
          />
        )}
      </div>
    </>
  );
};

export default NavMenuMobile;
