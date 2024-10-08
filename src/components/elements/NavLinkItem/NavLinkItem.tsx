import classNames from 'classnames';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const NavLinkItem = ({
  href,
  children,
  className,
  onClick,
  variant = 'underlined',
  openNewTab = false,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: 'underlined' | 'highlighted';
  openNewTab?: boolean;
}) => {
  const pathname = usePathname();
  const classes = classNames(
    {
      'inline-block select-none before:bg-primary-600 underline-hover-effect':
        variant === 'underlined',
    },
    { 'before:w-full': variant === 'underlined' && href === pathname },
    {
      'block w-full px-3 rounded-theme hover:bg-slate-100 hover:text-inherit transition duration-500':
        variant === 'highlighted',
    },
    {
      'bg-primary-600/50 text-inherit':
        variant === 'highlighted' && href === pathname,
    },
    className,
  );
  return (
    <NavigationMenu.Link asChild>
      <Link
        href={href}
        onClick={onClick}
        className={classes}
        target={openNewTab ? '_blank' : '_self'}
      >
        {children}
      </Link>
    </NavigationMenu.Link>
  );
};
