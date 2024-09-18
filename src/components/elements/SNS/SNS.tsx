import classNames from 'classnames';
import { SNSType } from '@/helpers/types';
import { RiFacebookFill } from 'react-icons/ri';
import { FaXTwitter } from 'react-icons/fa6';
import { FaInstagram, FaYoutube, FaLinkedinIn } from 'react-icons/fa';
import Link from 'next/link';
import React from 'react';

export const SNS: React.FC<{
  data: SNSType;
  variant?: 'standard' | 'alternate';
  darkMode?: boolean;
}> = ({ data, variant, darkMode = false }) => {
  const { linkedInUrl, facebookUrl, twitterUrl, youtubeUrl, instagramUrl } =
    data;
  const renderIconLink = (url: string, icon: JSX.Element) => (
    <Link
      href={url}
      className={classNames('group/sns', {
        'w-10 h-10 rounded-full flex justify-center items-center bg-slate-100 hover:bg-slate-200 transition-colors duration-300 ease-in-out':
          variant === 'alternate',
      })}
    >
      {React.cloneElement(icon, {
        className: classNames('transition-colors duration-300 ease-in-out', {
          'text-primary-600 group-hover/sns:text-primary-600': !darkMode,
          'text-slate-300 group-hover/sns:text-slate-100': darkMode,
        }),
      })}
    </Link>
  );
  return (
    <div className={classNames('flex gap-5 items-center py-3')}>
      {linkedInUrl && renderIconLink(linkedInUrl, <FaLinkedinIn />)}
      {facebookUrl && renderIconLink(facebookUrl, <RiFacebookFill />)}
      {twitterUrl && renderIconLink(twitterUrl, <FaXTwitter />)}
      {youtubeUrl && renderIconLink(youtubeUrl, <FaYoutube />)}
      {instagramUrl && renderIconLink(instagramUrl, <FaInstagram />)}
    </div>
  );
};
