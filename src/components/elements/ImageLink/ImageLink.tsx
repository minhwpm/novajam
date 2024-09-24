'use client';
import classNames from 'classnames';
import Link from 'next/link';
import Image from 'next/image';
import { LinkType } from '@/helpers/types';
import { useIntersecting } from '@/helpers/hooks/useIntersecting';

export const ImageLink: React.FC<{
  data: LinkType;
  animate?: boolean;
}> = ({ data, animate }) => {
  const [ref, isIntersecting] = useIntersecting();
  return (
    <div
      ref={ref}
      className={classNames(
        'flex p-4 rounded-theme',
        { 'relative -bottom-10 opacity-0': animate },
        {
          'animate-slidingUpContent animation-delay-150':
            isIntersecting && animate,
        },
      )}
    >
      <Link href={data.url}>
        {data.image ? (
          <Image
            src={data.image.url}
            alt={data.text}
            width={data.image.width}
            height={data.image.height}
          />
        ) : (
          data.text
        )}
      </Link>
    </div>
  );
};
