import pages from './static-data/pages.json';
import { PageType } from '@/lib/types';

export async function getPage(url: string) {
  const result = pages.find((item) => item.url === url) as PageType | undefined;
  return result;
}
