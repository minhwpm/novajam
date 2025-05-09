'use client';
import classNames from 'classnames';
import { useStickyHeaderOnScrollDown } from '@/lib/hooks';
import { NavMenu } from '@/components/elements/NavMenu/NavMenu';
import { NavMenuMobile } from '@/components/elements/NavMenuMobile/NavMenuMobile';
import { Button } from '@/components/elements/Button/Button';
import { NavigationType } from '@/lib/types';
import { ButtonGroup } from '@/components/elements/ButtonGroup/ButtonGroup';
import { Logo } from '@/components/elements/Logo/Logo';
import { DarkModeToggle } from '@/components/elements/DarkModeToggle/DarkModeToggle';

export const Navigation: React.FC<{
  data: NavigationType;
}> = ({ data }) => {
  return (
    <>
      <Header data={data} />
      {data?.hotButtons && data.hotButtons.length > 0 && (
        <div
          className={classNames(
            'fixed',
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

const Header: React.FC<{ data: NavigationType }> = ({ data }) => {
  const sticky = useStickyHeaderOnScrollDown();
  return <StandardHeader data={data} sticky={sticky} />;
};

const StandardHeader: React.FC<{ data: NavigationType; sticky: boolean }> = ({
  data,
  sticky,
}) => {
  const {
    logo,
    logoRedirect,
    menuItems,
    showModeSelector,
    buttons,
    layout,
    inverse,
  } = data;
  return (
    <header
      className={classNames('relative z-[999] w-screen', {
        'sticky w-full z-50 top-0 animate-headerSlideIn': sticky,
        inverse: inverse && !sticky,
      })}
    >
      <div
        className={classNames(
          'absolute top-0 left-0 right-0 flex justify-center dark:text-slate-100 inverse:text-slate-100 transition-all duration-500',
          {
            'bg-white/60 backdrop-blur-2xl dark:bg-slate-800/80 border-b border-slate-200/50 dark:border-slate-700/50':
              sticky,
            'border-none': !sticky,
          },
        )}
      >
        <div className="w-full max-w-screen-2xl mx-auto px-4 md:px-6 lg:px-8 xl:px-10 flex items-center gap-x-4">
          <div className="shrink-0 py-4">
            <Logo redirectUrl={logoRedirect ?? '/'} data={logo} />
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
};
