import classNames from 'classnames';
import { Poppins, Montserrat, Inter } from 'next/font/google';

const Inter_Font = Inter({
  subsets: ['latin', 'latin-ext', 'vietnamese'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800'],
  display: 'swap',
});

const Poppins_Font = Poppins({
  subsets: ['latin', 'latin-ext'],
  weight: ['100', '200', '300', '400', '500', '600', '700'],
  variable: '--font-heading',
  display: 'swap',
});

const Montserrat_Font = Montserrat({
  subsets: ['latin', 'latin-ext', 'vietnamese'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800'],
  variable: '--font-heading',
  display: 'swap',
});

export const generateFontClassnames = (
  fontMain: string | null,
  fontHeading: string | null,
) =>
  classNames({
    [Inter_Font.className]: fontMain === 'Inter',
    [Montserrat_Font.className]: fontMain === 'Montserrat',
    [Montserrat_Font.variable]: fontHeading === 'Montserrat',
    [Poppins_Font.className]: fontMain === 'Poppins',
    [Poppins_Font.variable]: fontHeading === 'Poppins',
  });
