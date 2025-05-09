'use client';
import classNames from 'classnames';
import { useState } from 'react';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { ButtonType, LinkType, SubmenuType } from '@/lib/types';
import { IoCloseOutline } from 'react-icons/io5';
import { RxHamburgerMenu } from 'react-icons/rx';
import { Button } from '@/components/elements/Button/Button';
import { NavLinkItem } from '@/components/elements/NavLinkItem/NavLinkItem';

export const NavMenuMobile: React.FC<{
  menuItems: Array<LinkType | SubmenuType>;
  buttons?: Array<ButtonType>;
}> = ({ menuItems, buttons }) => {
  const [mobileMenuShowed, setMobileMenuShowed] = useState(false);

  return (
    <>
      <NavigationMenu.Root
        className={classNames(
          'lg:hidden absolute top-0 left-0 z-[999] w-screen h-screen px-4 pt-20 pb-36 overflow-y-auto bg-white text-slate-800 dark:bg-slate-800 dark:text-slate-100 ',
          { hidden: !mobileMenuShowed },
        )}
        orientation="vertical"
      >
        {mobileMenuShowed && (
          <button
            className="cursor-pointer absolute right-4 top-4 hover:bg-slate-200 dark:hover:bg-slate-700 p-1.5 lg:p-2 rounded-full"
            aria-label="Close navigation menu"
            onClick={() => {
              setMobileMenuShowed(false);
              document.body.style.overflow = 'auto';
            }}
          >
            <IoCloseOutline size={25} />
          </button>
        )}
        <NavigationMenu.List>
          {menuItems.map(
            (item) =>
              item && (
                <NavigationMenu.Item
                  key={item.id}
                  className={classNames('py-3')}
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
          <button
            className="cursor-pointer w-10 h-10 flex justify-center items-center hover:bg-slate-200/80 dark:hover:bg-slate-100/20 rounded-full"
            onClick={() => {
              setMobileMenuShowed(true);
              document.body.style.overflow = 'hidden';
            }}
          >
            <RxHamburgerMenu className="cursor-pointer" size={22} />
          </button>
        )}
      </div>
    </>
  );
};
