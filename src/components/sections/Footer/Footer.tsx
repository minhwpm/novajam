import classNames from 'classnames';
import { MarkdownRenderer } from '@/components/elements/MarkdownRenderer/MarkdownRenderer';
import { MenuLinkItem } from '@/components/elements/MenuLinkItem/MenuLinkItem';
import { Logo } from '@/components/elements/Logo/Logo';
import { FooterType } from '@/lib/types';

type FooterProps = {
  data: FooterType;
};

const getBackgroundStyle = (
  color?: string | null,
  image?: { url: string } | null,
) => {
  const toRgb = (hex: string) =>
    `${parseInt(hex.slice(1, 3), 16)}, ${parseInt(hex.slice(3, 5), 16)}, ${parseInt(hex.slice(5, 7), 16)}`;

  return {
    backgroundColor: color
      ? `rgba(${toRgb(color)}, var(--tw-bg-opacity))`
      : 'none',
    backgroundImage: image ? `url(${image.url}), url('/fallback.png')` : 'none',
  };
};

const getFooterClassNames = (
  hasImage: boolean,
  hasColor: boolean,
  inverse: boolean,
) =>
  classNames('bg-opacity-100', {
    'bg-center bg-no-repeat bg-cover bg-blend-multiply': hasImage,
    'dark:bg-opacity-5': hasColor && !inverse,
    'dark:bg-opacity-80': hasColor && inverse,
    'dark:bg-opacity-95 dark:bg-blend-color-burn': hasImage && !inverse,
    'dark:bg-opacity-50 dark:bg-blend-color-burn': hasImage && inverse,
    inverse,
  });

const RenderMenuItem = ({ item }: { item: any }) => {
  if (item.contentType === 'link') {
    return (
      <MenuLinkItem
        key={item.label}
        data={item}
        className="inverse:text-slate-100/70"
      />
    );
  }

  if (item.contentType === 'submenu' && item.menuItems?.length) {
    return (
      <div key={item.label}>
        <div className="text-sm font-medium mb-2 lg:mb-4">{item.label}</div>
        <ul>
          {item.menuItems.map(
            (link: any) =>
              link.contentType === 'link' && (
                <li key={link.id} className="py-1 inverse:text-slate-100/70">
                  <MenuLinkItem data={link} inverseEnable />
                </li>
              ),
          )}
        </ul>
      </div>
    );
  }

  return null;
};

export const Footer: React.FC<FooterProps> = ({ data }) => {
  const {
    logo,
    logoRedirect = '/',
    description,
    copyright,
    menuItems = [],
    backgroundColor,
    backgroundImage,
    inverse,
  } = data;

  const bgStyle = getBackgroundStyle(backgroundColor, backgroundImage);
  const footerClass = getFooterClassNames(
    !!backgroundImage,
    !!backgroundColor,
    inverse,
  );

  return (
    <footer className={footerClass} style={bgStyle}>
      <div className="container py-20 flex flex-wrap gap-x-5 gap-y-16">
        <div className="w-full lg:w-1/2 xl:w-1/3 flex flex-col justify-between gap-4 md:gap-10 lg:gap-12">
          {logo?.url && <Logo redirectUrl={logoRedirect ?? '/'} data={logo} />}
          <div className="flex flex-col gap-2">
            {description && (
              <div className="prose prose-sm dark:prose-invert inverse:prose-invert">
                <MarkdownRenderer>{description}</MarkdownRenderer>
              </div>
            )}
            {copyright && (
              <p className="text-sm text-slate-500 dark:text-slate-100/60 inverse:text-slate-100/60">
                {copyright}
              </p>
            )}
          </div>
        </div>

        <div className="grow flex flex-wrap gap-8 lg:justify-end">
          {menuItems.map((item, idx) => (
            <div
              key={idx}
              className={classNames(
                'basis-40 grow flex flex-col gap-2 dark:text-slate-100 inverse:text-slate-100',
                { 'xl:col-start-10': menuItems.length === 1 },
              )}
            >
              <RenderMenuItem item={item} />
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
};
