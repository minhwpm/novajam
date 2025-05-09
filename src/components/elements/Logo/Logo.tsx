import Link from 'next/link';
import { MediaType } from '@/lib/types';
import { Image } from '@/components/elements/Image/Image';

export const Logo: React.FC<{ redirectUrl?: string; data: MediaType }> = ({
  redirectUrl,
  data,
}) => (
  <Link href={redirectUrl ?? '/'} className="block max-h-14 max-w-[12rem]">
    <Image
      className="dark:invert dark:filter dark:brightness-0 inverse:invert inverse:filter inverse:brightness-0"
      data={data}
      alt={data?.title ?? 'Logo'}
      priority
      fallbackSrc="/logo.webp"
      rounded="none"
    />
  </Link>
);
