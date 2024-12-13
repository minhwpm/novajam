// This nav menu is for Minimal Navigation
import classNames from 'classnames';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { NavigationType } from '@/helpers/types';
import { NavLinkItem } from '@/components/elements/NavLinkItem/NavLinkItem';
import { useState } from 'react';
// import { CiMenuFries } from "react-icons/ci";
import { FiMenu } from 'react-icons/fi';

import { IoCloseOutline } from 'react-icons/io5';
import { Button } from '../Button/Button';
import { SubmenuMinimal } from './SubmenuMinimal/SubmenuMinimal';

const NavMenuMinimal: React.FC<{ data: NavigationType }> = ({ data }) => {
  const { menuItems, buttons } = data;
  const [navMenuShowed, setNavMenuShowed] = useState(false);

  return (
    <>
      <FiMenu
        className="ml-auto relative cursor-pointer rounded-full w-14 h-14 p-3 bottom-0 hover:bottom-1 hover:bg-primary-600/90 hover:text-white transition-all duration-500 ease"
        onClick={() => {
          setNavMenuShowed(true);
          document.body.style.overflow = 'hidden';
        }}
      />
      <div
        className={classNames(
          'absolute top-0 left-0 z-[99999] w-screen h-screen  bg-neutral-900/95 bg-text-neutral-500 text-white overflow-auto',
          { hidden: !navMenuShowed },
        )}
      >
        <NavigationMenu.Root className={classNames('container')}>
          <IoCloseOutline
            className="cursor-pointer ml-auto mt-6 lg:mt-10 w-14 h-14 p-3 rounded-full bg-transparent hover:bg-neutral-200 hover:text-neutral-900 transition-all duration-300 ease-in-out"
            size={30}
            onClick={() => {
              setNavMenuShowed(false);
              document.body.style.overflow = 'auto';
            }}
          />
          <NavigationMenu.List className="flex flex-col items-center text-lg xl:text-xl py-20">
            {menuItems.map((item) => (
              <NavigationMenu.Item
                key={item.id}
                className="py-2 border-b last:border-none border-neutral-800"
              >
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
                {item.contentType === 'submenu' && (
                  <SubmenuMinimal
                    data={item}
                    setNavMenuShowed={setNavMenuShowed}
                  />
                )}
              </NavigationMenu.Item>
            ))}
          </NavigationMenu.List>
          <div className="flex flex-col p-4 items-center">
            {buttons &&
              buttons.length > 0 &&
              buttons.map((button) => (
                <Button
                  key={button.id}
                  data={button}
                  size="base"
                  onClick={() => {
                    setNavMenuShowed(false);
                    document.body.style.overflow = 'auto';
                  }}
                >
                  {button.label}
                </Button>
              ))}
          </div>
        </NavigationMenu.Root>
      </div>
    </>
  );
};

export default NavMenuMinimal;
