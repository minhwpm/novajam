import classNames from "classnames"
import Link from "next/link"
import { usePathname } from "next/navigation";

export const LinkItem = ({
  title,
  href,
  children,
  className,
  onClick,
}: {
  title: string;
  href: string;
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) => {
  const pathname = usePathname();
  return (
    <Link
      href={href}
      className={classNames(
        "inline-block font-medium py-2 select-none before:bg-primary-500 underline-hover-effect",
        { "before:w-full": href === pathname },
        className,
      )}
      onClick={onClick}
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
  );
};