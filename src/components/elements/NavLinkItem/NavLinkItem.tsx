import classNames from "classnames"
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import Link from "next/link"
import { usePathname } from "next/navigation";

export const NavLinkItem = ({
  title,
  href,
  children,
  className,
  onClick,
  variant = 'highlighted',
}: {
  title?: string;
  href: string;
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: "underlined" | "highlighted"
}) => {
  const pathname = usePathname();
  const classes = classNames(
    { "inline-block py-2 select-none before:bg-primary-500 underline-hover-effect": variant === "underlined"},
    { "before:w-full": variant === "underlined" && href === pathname },
    { "block w-full px-3 py-1.5 rounded-assets hover:bg-primary-50 hover:text-neutral-800 transition duration-500": variant === "highlighted" },
    { "bg-primary-100 text-neutral-800": variant === "highlighted" && href === pathname },
  )
  return (
    <NavigationMenu.Item className={className}>
      <NavigationMenu.Link asChild>
        <Link
          href={href}
          onClick={onClick}
          className={classes}
        >
          {children ? (
            <>
              <span>{title}</span>
              <span>{children}</span>
            </>
          ) : (
            <span>{title}</span>
          )}
        </Link>
      </NavigationMenu.Link>
    </NavigationMenu.Item>
  );
};