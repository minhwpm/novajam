import classNames from 'classnames';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const NavLinkItem: React.FC<{
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
  openNewTab?: boolean;
}> = ({ href, children, onClick, openNewTab = false }) => {
  const pathname = usePathname();

  return (
    <NavigationMenu.Link asChild>
      <Link
        href={href}
        onClick={onClick}
        className={classNames(
          'inline-block select-none before:bg-primary-500 dark:before:bg-white underline-hover-effect',
          {
            'before:w-full': href === pathname,
          },
        )}
        target={openNewTab ? '_blank' : '_self'}
      >
        {children}
      </Link>
    </NavigationMenu.Link>
  );
};
