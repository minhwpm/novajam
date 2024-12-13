import classNames from 'classnames';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { NavigationLayout, SubmenuType } from '@/helpers/types';
import { Dropdown } from './Dropdown';
import { Mega } from './Mega';
import { FaChevronDown } from 'react-icons/fa';

export const Submenu: React.FC<{
  data: SubmenuType;
  layout?: NavigationLayout;
}> = ({ data, layout }) => {
  return (
    <>
      <NavigationMenu.Trigger className="group">
        <span className="inline-block select-none before:bg-primary-600 dark:before:bg-slate-100 underline-hover-effect group-data-[state=open]:before:w-full">
          {data.label}
          <FaChevronDown
            size={10}
            className="inline-block ml-2 transition-transform duration-500 group-data-[state=open]:rotate-180"
          />
        </span>
      </NavigationMenu.Trigger>
      <NavigationMenu.Content
        className={classNames('text-inherit', {
          'absolute top-full left-0 w-full bg-white dark:bg-slate-900 border-t shadow-lg data-[state=open]:animate-slidingSubmenu':
            data.layout === 'mega' && layout === 'standard',
          'absolute top-full left-0 w-full bg-white dark:bg-slate-900 shadow-radiant rounded-md data-[state=open]:animate-slidingSubmenu':
            data.layout === 'mega' && layout === 'overlay',
          'absolute top-full left-0 w-64 px-6 py-4 -mt-2 bg-white dark:bg-slate-800 shadow-radiant rounded-md data-[state=open]:animate-slidingSubmenu':
            data.layout === 'dropdown',
        })}
      >
        {data.layout === 'mega' && <Mega data={data} />}
        {data.layout === 'dropdown' && <Dropdown data={data} />}
      </NavigationMenu.Content>
    </>
  );
};
