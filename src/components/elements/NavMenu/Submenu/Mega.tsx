import { SubmenuType } from '@/helpers/types';
import classNames from 'classnames';
import { NavFeaturedContent } from '@/components/elements/NavFeaturedContent/NavFeaturedContent';
import { NavLinkItem } from '@/components/elements/NavLinkItem/NavLinkItem';

export const Mega: React.FC<{ data: SubmenuType }> = ({ data }) => {
  return (
    <div className="container">
      <div className="py-10 flex flex-wrap gap-8">
        {data.menuItems.length > 0 && (
          <div
            className={classNames(
              'basis-52 shrink-0 grow flex flex-wrap gap-6',
            )}
          >
            {data.menuItems.map((item) => (
              <div key={item.id} className="basis-52">
                {item.contentType === 'link' && (
                  <NavLinkItem href={item.href}>{item.label}</NavLinkItem>
                )}
                {item.contentType === 'linkgroup' && (
                  <p className="text-slate-600 uppercase text-sm tracking-wide font-medium mb-2">
                    {item.label}
                  </p>
                )}
                <ul>
                  {item.contentType === 'linkgroup' &&
                    item.links.length > 0 &&
                    item.links.map((link) => (
                      <li key={link.id} className="py-1.5">
                        <NavLinkItem href={link.href}>{link.label}</NavLinkItem>
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </div>
        )}
        {data.featuredContent.length > 0 && (
          <div
            className={classNames(
              'basis-80 flex gap-4 lg:gap-6 overflow-x-scroll overscroll-x-contain',
              { grow: data.featuredContent.length > 1 },
              {
                'justify-end': data.featuredContent.length === 1,
              },
            )}
          >
            {data.featuredContent.map(
              (content) =>
                content && (
                  <div
                    key={content.id}
                    className="w-11/12 basis-80 shrink-0 grow max-w-xs"
                  >
                    <NavFeaturedContent data={content} />
                  </div>
                ),
            )}
          </div>
        )}
      </div>
    </div>
  );
};
