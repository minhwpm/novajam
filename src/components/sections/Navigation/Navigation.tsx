/* eslint-disable complexity */ //@TODO eslint
'use client';
import Link from 'next/link';
import classNames from 'classnames';
import useStickyHeaderOnScrollUp from '@/helpers/hooks/useStickyHeaderOnScrollUp';
import NavMenu from '@/components/elements/NavMenu/NavMenu';
import NavMenuMobile from '@/components/elements/NavMenuMobile/NavMenuMobile';
import NavMenuMinimal from '@/components/elements/NavMenuMinimal/NavMenuMinimal';
import { Button } from '@/components/elements/Button/Button';
import { MediaType, NavigationType } from '@/helpers/types';
import { ButtonGroup } from '@/components/elements/ButtonGroup/ButtonGroup';
import { Image } from '@/components/elements/Image/Image';
import { DarkModeToggle } from '@/components/elements/DarkModeToggle/DarkModeToggle';

const Logo: React.FC<{ redirectUrl?: string; logo: MediaType }> = ({
  redirectUrl,
  logo,
}) => (
  <Link
    href={redirectUrl ?? '/'}
    className="block max-h-14 max-w-[12rem] dark:invert dark:filter dark:brightness-0"
  >
    <Image
      className="dark:invert dark:filter dark:brightness-0"
      data={logo}
      alt={logo.title ?? 'Logo'}
      priority
      fallbackSrc="/logo.webp"
      rounded="none"
    />
  </Link>
);

const Header: React.FC<{ data: NavigationType }> = ({ data }) => {
  const {
    logo,
    logoRedirect,
    menuItems,
    showModeSelector,
    buttons,
    layout,
    darkMode,
  } = data;
  const sticky = useStickyHeaderOnScrollUp();

  if (layout === 'minimal') {
    return (
      <header className={classNames('relative z-[99999] tracking-wider')}>
        <div
          className={classNames(
            'absolute w-screen flex justify-center dark:text-slate-100',
          )}
        >
          <div className="container pt-6 flex items-center justify-between flex-1">
            <div className="shrink-0">
              <Logo redirectUrl={logoRedirect ?? ''} logo={logo} />
            </div>
            <div className="flex gap-5 items-center">
              {buttons && buttons.length > 0 && (
                <div className="hidden md:block">
                  <ButtonGroup data={buttons} />
                </div>
              )}
              {showModeSelector && <DarkModeToggle />}
              <NavMenuMinimal data={data} />
            </div>
          </div>
        </div>
      </header>
    );
  }
  if (layout === 'overlay') {
    return (
      <header
        className={classNames('relative z-[99999] w-screen tracking-wider', {
          'sticky w-full z-50 top-0 animate-headerSlideIn': sticky,
          dark: darkMode,
        })}
      >
        <div
          className={classNames(
            'absolute top-0 left-0 right-0 flex justify-center dark:text-slate-100 transition-all duration-500',
            {
              'bg-white/60 backdrop-blur-2xl dark:bg-slate-900/80 shadow':
                sticky,
            },
          )}
        >
          <div className="w-full px-4 md:px-6 lg:px-8 xl:px-10 flex items-center gap-x-4">
            <div className="shrink-0 py-4">
              <Logo redirectUrl={logoRedirect ?? ''} logo={logo} />
            </div>
            <div className="flex-1 lg:text-lg">
              {menuItems && <NavMenu menuItems={menuItems} layout={layout} />}
            </div>
            {showModeSelector && <DarkModeToggle />}
            {buttons && buttons.length > 0 && (
              <div className="shrink-0 hidden lg:block">
                <ButtonGroup data={buttons} size="sm" />
              </div>
            )}
            {menuItems && (
              <NavMenuMobile menuItems={menuItems} buttons={buttons ?? []} />
            )}
          </div>
        </div>
      </header>
    );
  }
  return (
    // Default style - standard
    <header
      className={classNames('relative z-[99999] tracking-wider', {
        'sticky w-full z-50 top-0 animate-headerSlideIn shadow': sticky,
        dark: darkMode,
      })}
    >
      <div
        className={classNames(
          'bg-white/60 dark:text-slate-100 dark:bg-slate-900 transition-all duration-500',
          { 'backdrop-blur-2xl dark:bg-slate-900/80': sticky },
        )}
      >
        <div
          className={classNames(
            'w-full px-4 md:px-6 lg:px-8 xl:px-10 flex items-center gap-x-4',
          )}
        >
          <div className="shrink-0 py-4">
            <Logo redirectUrl={logoRedirect ?? ''} logo={logo} />
          </div>
          <div className="flex-1">
            {menuItems && <NavMenu menuItems={menuItems} layout={layout} />}
          </div>
          {showModeSelector && <DarkModeToggle />}
          {buttons && buttons.length > 0 && (
            <div className="shrink-0 hidden lg:block">
              <ButtonGroup data={buttons} size="sm" />
            </div>
          )}
          {menuItems && (
            <NavMenuMobile menuItems={menuItems} buttons={buttons ?? []} />
          )}
        </div>
      </div>
    </header>
  );
};

export const Navigation: React.FC<{
  data: NavigationType;
}> = ({ data }) => {
  return (
    <>
      <Header data={data} />
      {data?.hotButtons && data.hotButtons.length > 0 && (
        <div
          className={classNames(
            'fixed z-[999999]',
            'w-full bottom-0 rounded-t-theme', //sm devices
            'lg:rotate-90 lg:translate-y-1/2 lg:translate-x-1/2 lg:rounded-t-none lg:rounded-b-theme lg:w-auto lg:bottom-1/2 lg:right-0', //big devices
          )}
        >
          <div className="relative flex justify-center py-2 bg-white bg-opacity-80 shadow-radiant lg:py-0 lg:bg-transparent">
            {data.hotButtons.map((button) => (
              <div key={button.id} className="flex-1 flex justify-center">
                <Button
                  data={button}
                  className="grow absolute lg:top-1/2 mx-1 lg:my-1"
                  size="base"
                >
                  {button.label}
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};
