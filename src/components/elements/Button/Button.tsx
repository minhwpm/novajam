import classNames from 'classnames';
import Link from 'next/link';
import { Image } from '@/components/elements/Image/Image';
import { ButtonType } from '@/lib/types';
import { GoArrowRight } from 'react-icons/go';

interface ButtonProps {
  data: ButtonType;
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  size?: 'sm' | 'base' | 'lg';
  type?: 'submit' | 'button' | 'reset';
  disabled?: boolean;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  data,
  className,
  children,
  onClick,
  size = 'lg',
  type,
  disabled,
  fullWidth,
}) => {
  const {
    label,
    href,
    eyebrow,
    variant = 'primary',
    withArrow = false,
    openNewTab = false,
    icon,
    disclaimer,
  } = data;

  const renderIcon = () =>
    icon && (
      <Image
        className={classNames('object-contain inline-block', {
          'w-5 h-5 mr-2.5': size === 'sm',
          'w-6 h-6 mr-3': size === 'base',
          'w-7 h-7 mr-4': size === 'lg',
        })}
        data={icon}
        alt={`Icon ${icon.title}`}
      />
    );

  const renderArrow = () =>
    withArrow && (
      <GoArrowRight
        className="block ml-4 relative left-1 group-hover/btn:left-2 transition-all duration-300 ease"
        size={size === 'lg' ? 20 : 17}
      />
    );

  const renderDisclaimer = () =>
    disclaimer && (
      <p
        className={classNames(
          'self-center text-sm font-normal tracking-wide text-slate-500/80 dark:text-slate-100/30',
        )}
      >
        {disclaimer}
      </p>
    );

  const renderButtonContent = () => (
    <>
      {renderIcon()}
      {children || (
        <span
          className={classNames({
            'underline-hover-effect': variant === 'link',
          })}
        >
          {eyebrow && (
            <span
              className={classNames('block text-xs font-normal tracking-wide')}
            >
              {eyebrow}
            </span>
          )}
          {label}
        </span>
      )}
      {renderArrow()}
    </>
  );

  const getVariantClasses = () => {
    return classNames(
      'group/btn relative max-h-15 inline-flex justify-center items-center text-start whitespace-nowrap border-2 rounded-theme-button transition-all duration-500 ease',
      {
        'border-primary-600 bg-primary-600 hover:border-primary-700 hover:bg-primary-700 text-slate-100':
          variant === 'primary',
        'border-secondary-600 bg-secondary-600 hover:border-secondary-700 hover:bg-secondary-700 text-slate-100':
          variant === 'secondary',
        'border-slate-900 bg-slate-900 text-slate-100 dark:border-slate-100 dark:bg-slate-100 dark:text-slate-800 inverse:border-slate-100 inverse:bg-slate-100 inverse:text-slate-800':
          variant === 'neutral',
        'border-slate-200 text-slate-800 bg-white hover:bg-slate-100 dark:text-slate-100 dark:bg-slate-800 dark:border-slate-600 dark:hover:bg-slate-700 inverse:text-slate-100 inverse:bg-slate-800 inverse:border-slate-600 inverse:hover:bg-slate-700':
          variant === 'outline',
        'border-transparent text-slate-800 hover:bg-slate-100 dark:text-slate-100 dark:hover:bg-slate-800 inverse:text-slate-100 inverse:hover:bg-slate-800':
          variant === 'ghost',
        '!p-0 border-transparent text-slate-800 dark:text-slate-100 inverse:text-slate-100':
          variant === 'link',
        'px-4 py-1.5 min-w-[100px] lg:min-w-[120px] text-sm font-medium':
          size === 'sm',
        'px-6 py-2 min-w-[100px] lg:min-w-[120px] text-base font-medium':
          size === 'base',
        'px-7 py-3 min-w-[130px] lg:min-w-[160px] xl:text-lg font-medium':
          size === 'lg',
        'opacity-20 pointer-events-none cursor-not-allowed': disabled,
        'w-full': fullWidth,
      },
      className,
    );
  };
  const renderButton = () =>
    href ? (
      <Link
        className={classNames(getVariantClasses())}
        href={href}
        target={openNewTab ? '_blank' : '_self'}
      >
        {renderButtonContent()}
      </Link>
    ) : (
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        aria-label={label}
        className={classNames(getVariantClasses())}
      >
        {renderButtonContent()}
      </button>
    );

  return disclaimer ? (
    <div className={classNames('flex flex-col gap-1', { 'w-full': fullWidth })}>
      {renderButton()}
      {renderDisclaimer()}
    </div>
  ) : (
    renderButton()
  );
};
