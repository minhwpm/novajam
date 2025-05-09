import classNames from 'classnames';

export function generateColorClassnames(
  colorPrimary: string | null,
  colorSecondary: string | null,
): { primaryColor: string; secondaryColor: string } {
  return {
    primaryColor: colorPrimary ? `${colorPrimary}-primary-color` : '',
    secondaryColor: colorSecondary ? `${colorSecondary}-secondary-color` : '',
  };
}

export function getSpacingClasses(key: string, size: string): string {
  return classNames({
    [`${key}-2 md:${key}-2.5 lg:${key}-3`]: size === 'xs',
    [`${key}-4 md:${key}-5 lg:${key}-6`]: size === 'sm',
    [`${key}-6 md:${key}-7.5 lg:${key}-9`]: size === 'base',
    [`${key}-10 md:${key}-12 lg:${key}-15`]: size === 'lg',
    [`${key}-16 md:${key}-20 lg:${key}-24`]: size === 'xl',
    [`${key}-26 md:${key}-32 lg:${key}-39`]: size === '2xl',
    [`${key}-42 md:${key}-52 lg:${key}-63`]: size === '3xl',
  });
}

export function getTextColorClass(color: string): string {
  const colorMap: Record<string, string> = {
    slate: 'text-slate-800 dark:text-slate-100',
    red: 'text-red-500',
    orange: 'text-orange-500',
    amber: 'text-amber-500',
    yellow: 'text-yellow-500',
    lime: 'text-lime-500',
    green: 'text-green-500',
    emerald: 'text-emerald-500',
    teal: 'text-teal-500',
    cyan: 'text-cyan-500',
    sky: 'text-sky-500',
    blue: 'text-blue-500',
    indigo: 'text-indigo-500',
    violet: 'text-violet-500',
    purple: 'text-purple-500',
    fuchsia: 'text-fuchsia-500',
    pink: 'text-pink-500',
    rose: 'text-rose-500',
  };
  return colorMap[color] || colorMap['slate'];
}

export function getAlignmentClass(alignment: string): string {
  return (
    {
      center: 'text-center items-center',
      end: 'text-end items-end',
    }[alignment] || ''
  );
}
