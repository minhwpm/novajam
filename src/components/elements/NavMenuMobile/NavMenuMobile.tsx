"use client"
import { useState } from 'react';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import classNames from 'classnames';
import { ButtonType, LinkType, SubmenuType } from '@/helpers/types';
import { CiMenuFries } from 'react-icons/ci';
import { AiOutlineClose } from 'react-icons/ai';
import Button from '../Button/Button';
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
          <AiOutlineClose
            className="cursor-pointer absolute right-4 top-8"
            size={30}
            onClick={() => {
              setMobileMenuShowed(false);
              document.body.style.overflow = "auto";
            }}
          />
        )}
        <NavigationMenu.List >
          {menu.map((item) => (
            <div key={item.id}>
              {item.contentType === "link" && (
                <NavLinkItem
                  key={item.id} 
                  className="font-semibold py-2 border-b last:border-none border-neutral-100"
                  title={item.text}
                  href={item.url} 
                  onClick={() => {
                    setMobileMenuShowed(false)
                    document.body.style.overflow = "auto";
                  }}
                />
              )}
              {item.contentType === "submenu" && (
                <SubmenuMobile key={item.id} data={item} setMobileMenuShowed={setMobileMenuShowed}/>
              )}
            </div>
          ))}
        </NavigationMenu.List>
        {buttons && buttons.length > 0 && (
          <div className="my-10 flex flex-wrap justify-center gap-5">
            {buttons.map((button) => (
              <Button
                key={button.id}
                url={button.url}
                variant={button.buttonVariant ?? "outline-white"}
                openNewTab={button.openNewTab}
              >
                {button.text}
              </Button>
            ))}
          </div>
        )}
      </NavigationMenu.Root>
      
      <div className="lg:hidden ml-auto">
        {!mobileMenuShowed && (
          <CiMenuFries
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