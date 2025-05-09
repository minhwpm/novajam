'use client';
import Link from 'next/link';
import classNames from 'classnames';
import { usePathname } from 'next/navigation';
import { LinkType } from '@/lib/types';
import { Image } from '@/components/elements/Image/Image';

export const MenuLinkItem = ({
  data,
  className,
  inverseEnable = false,
  onClick,
}: {
  data: LinkType;
  className?: string;
  inverseEnable?: boolean;
  onClick?: () => void;
}) => {
  const pathname = usePathname();
  const { label, href, description, icon, openNewTab } = data;
  const isCurrentPage = href === pathname;
  return description ? (
    <Link
      href={href}
      onClick={onClick}
      className={classNames(
        'block px-3 py-2.5 -mx-3 rounded-md text-slate-600 hover:bg-slate-100 dark:text-slate-100/70 dark:hover:bg-slate-700/60',
        {
          'bg-slate-100': isCurrentPage,
          'inverse:text-slate-100/70': inverseEnable,
        },
      )}
      target={openNewTab ? '_blank' : '_self'}
      rel={openNewTab ? 'noopener noreferrer' : undefined}
      aria-current={isCurrentPage ? 'page' : undefined}
    >
      <div className="text-base font-medium inline-flex gap-x-2 items-center">
        {icon && (
          <Image
            className={classNames(
              'object-contain inline-block w-5 h-5 dark:invert dark:filter dark:brightness-0',
              {
                'inverse:invert inverse:filter inverse:brightness-0':
                  inverseEnable,
              },
            )}
            data={icon}
            alt={`Icon ${icon.title}`}
          />
        )}
        {label}
      </div>
      <div className="mt-0.5 opacity-50 text-[13px]">{description}</div>
    </Link>
  ) : (
    <Link
      href={data.href}
      onClick={onClick}
      className={classNames(
        'self-start text-sm select-none text-slate-600 before:bg-primary-600 underline-hover-effect dark:text-slate-100/70 dark:before:bg-slate-100',
        {
          'before:w-full': isCurrentPage,
          'inverse:text-slate-100/70 inverse:before:bg-slate-100':
            inverseEnable,
        },
        className,
      )}
      target={data.openNewTab ? '_blank' : '_self'}
      rel={data.openNewTab ? 'noopener noreferrer' : undefined}
      aria-current={isCurrentPage ? 'page' : undefined}
    >
      {data.label}
    </Link>
  );
};
