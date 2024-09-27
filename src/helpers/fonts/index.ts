import classNames from 'classnames';
import {
  Poppins,
  Open_Sans,
  Playfair_Display,
  Montserrat,
  Libre_Franklin,
  Roboto,
  Raleway,
  Inter,
  Lora,
  Lato,
  Merriweather,
  Oswald,
  Cormorant_Garamond,
  Nunito,
  Nunito_Sans,
  Noto_Sans,
  Quicksand,
} from 'next/font/google';

const Poppins_Font = Poppins({
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800'],
  variable: '--font-heading',
});

const Open_Sans_Font = Open_Sans({
  subsets: ['latin', 'latin-ext', 'vietnamese'],
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800'],
});

const Montserrat_Font = Montserrat({
  subsets: ['latin', 'latin-ext', 'vietnamese'],
  display: 'swap',
  variable: '--font-heading',
});

const Libre_Franklin_Font = Libre_Franklin({
  subsets: ['latin', 'latin-ext', 'vietnamese'],
  display: 'swap',
});

const Roboto_Font = Roboto({
  subsets: ['latin', 'latin-ext', 'vietnamese'],
  display: 'swap',
  weight: ['100', '300', '400', '500', '700', '900'],
});

const Raleway_Font = Raleway({
  subsets: ['latin', 'latin-ext', 'vietnamese'],
  display: 'swap',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800'],
  variable: '--font-heading',
});

const Inter_Font = Inter({
  subsets: ['latin', 'latin-ext', 'vietnamese'],
  display: 'swap',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800'],
});

const Lato_Font = Lato({
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  weight: ['100', '300', '400', '700', '900'],
});

const Playfair_Display_Font = Playfair_Display({
  subsets: ['latin', 'latin-ext', 'vietnamese'],
  display: 'swap',
  weight: ['400', '600'],
  variable: '--font-heading',
});

const Lora_Font = Lora({
  subsets: ['latin', 'latin-ext', 'vietnamese'],
  display: 'swap',
  weight: ['400', '600'],
  variable: '--font-heading',
});

const Merriweather_Font = Merriweather({
  subsets: ['latin', 'latin-ext', 'vietnamese'],
  display: 'swap',
  weight: ['300', '400', '700'],
  variable: '--font-heading',
});

const Oswald_Font = Oswald({
  subsets: ['latin', 'latin-ext', 'vietnamese'],
  display: 'swap',
  weight: ['200', '300', '600', '700'],
  variable: '--font-heading',
});

const Cormorant_Garamond_Font = Cormorant_Garamond({
  subsets: ['latin', 'latin-ext', 'vietnamese'],
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-heading',
});

const Nunito_Font = Nunito({
  subsets: ['latin', 'latin-ext', 'vietnamese'],
  display: 'swap',
  weight: ['200', '300', '400', '500', '600', '700', '800'],
});

const Nunito_Sans_Font = Nunito_Sans({
  subsets: ['latin', 'latin-ext', 'vietnamese'],
  display: 'swap',
  weight: ['200', '300', '400', '500', '600', '700', '800'],
});

const Noto_Sans_Font = Noto_Sans({
  subsets: ['latin', 'latin-ext', 'vietnamese'],
  display: 'swap',
  weight: ['200', '300', '400', '500', '600', '700', '800'],
});

const Quicksand_Font = Quicksand({
  subsets: ['latin', 'latin-ext', 'vietnamese'],
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-heading',
});

export const generateFontClassnames = (
  fontMain: string | null,
  fontHeading: string | null,
) =>
  classNames({
    // 12 main fonts
    [Inter_Font.className]: fontMain === 'Inter',
    [Lato_Font.className]: fontMain === 'Lato',
    [Libre_Franklin_Font.className]: fontMain === 'Libre Franklin',
    [Lora_Font.className]: fontMain === 'Lora',
    [Merriweather_Font.className]: fontMain === 'Merriweather',
    [Montserrat_Font.className]: fontMain === 'Montserrat',
    [Noto_Sans_Font.className]: fontMain === 'Noto Sans',
    [Nunito_Font.className]: fontMain === 'Nunito',
    [Nunito_Sans_Font.className]: fontMain === 'Nunito Sans',
    [Open_Sans_Font.className]: fontMain === 'Open Sans',
    [Poppins_Font.className]: fontMain === 'Poppins',
    [Roboto_Font.className]: fontMain === 'Roboto',

    // 9 heading fonts
    [Cormorant_Garamond_Font.variable]: fontHeading === 'Cormorant Garamond',
    [Lora_Font.variable]: fontHeading === 'Lora',
    [Merriweather_Font.variable]: fontHeading === 'Merriweather',
    [Montserrat_Font.variable]: fontHeading === 'Montserrat',
    [Oswald_Font.variable]: fontHeading === 'Oswald',
    [Playfair_Display_Font.variable]: fontHeading === 'Playfair Display',
    [Poppins_Font.variable]: fontHeading === 'Poppins',
    [Raleway_Font.variable]: fontHeading === 'Raleway',
    [Quicksand_Font.variable]: fontHeading === 'Quicksand',
  });
