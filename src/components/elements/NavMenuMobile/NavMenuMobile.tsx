"use client"
import { useState } from 'react';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import classNames from 'classnames';
import { ButtonType, LinkType, SubmenuType } from '@/lib/types';
import { IoCloseOutline } from "react-icons/io5";
import { CiMenuBurger } from "react-icons/ci";
import { Button } from '../Button/Button';
import { SubmenuMobile } from './SubmenuMobile/SubmenuMobile';
import { NavLinkItem } from '../NavLinkItem/NavLinkItem';

const NavMenuMobile: React.FC<{ menu: Array<LinkType | SubmenuType>, buttons?: Array<ButtonType> }> = ({ menu, buttons }) => {
  const [ mobileMenuShowed, setMobileMenuShowed ] = useState(false)

  return (
    <>
      <NavigationMenu.Root
        className={classNames(
          "lg:hidden absolute top-0 left-0 z-[99999] bg-white text-neutral-900 font-lg w-screen h-screen px-4 pt-20 pb-36 overflow-y-auto",
          { hidden: !mobileMenuShowed }
        )}
        orientation="vertical"
      >
        {mobileMenuShowed && (
          <IoCloseOutline
            className="cursor-pointer absolute right-4 top-8"
            size={30}
            onClick={() => {
              setMobileMenuShowed(false);
              document.body.style.overflow = "auto";
            }}
          />
        )}
        <NavigationMenu.List>
          {menu.map(
            (item) =>
              item && (
                <NavigationMenu.Item
                  key={item.id}
                  className={classNames(
                    "py-2 border-b last:border-none border-neutral-200"
                  )}
                >
                  {item.contentType === "link" && (
                    <NavLinkItem
                      className={classNames("font-semibold")}
                      href={item.url}
                      onClick={() => {
                        setMobileMenuShowed(false);
                        document.body.style.overflow = "auto";
                      }}
                    >
                      {item.text}
                    </NavLinkItem>
                  )}
                  {item.contentType === "submenu" && (
                    <SubmenuMobile
                      data={item}
                      setMobileMenuShowed={setMobileMenuShowed}
                    />
                  )}
                </NavigationMenu.Item>
              )
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
                  document.body.style.overflow = "auto";
                }}
                size="base"
              >
                {button.text}
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
              document.body.style.overflow = "hidden";
            }}
          />
        )}
      </div>
    </>
  );
}

export default NavMenuMobile