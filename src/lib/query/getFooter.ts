import { FooterType } from '@/lib/types';
import footers from './static-data/footers.json';

export async function getFooter(url: string) {
  const result = footers.find((item) => item.url === url) as
    | FooterType
    | undefined;
  return result;
}
