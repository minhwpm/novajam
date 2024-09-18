import classNames from 'classnames';

// Constrains the maximum width of page content.
interface Props {
  children: React.ReactNode;
  className?: string;
}

export function Container({ children, className }: Props) {
  return (
    <div className={classNames('container mx-auto px-4', className)}>
      {children}
    </div>
  );
}
