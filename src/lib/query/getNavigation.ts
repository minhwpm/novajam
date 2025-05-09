import navigations from './static-data/navigations.json';
import { NavigationType } from '@/lib/types';

export async function getNavigation(url: string) {
  const result = navigations.find((item) => item.url === url) as
    | NavigationType
    | undefined;
  return result;
}
