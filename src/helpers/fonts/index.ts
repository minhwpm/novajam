import classNames from "classnames";
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
  Rubik,
  Lato,
  Merriweather,
  Inria_Serif,
  PT_Serif,
  Oswald,
  Cormorant_Garamond
} from "next/font/google";

export const Poppins_Font = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-heading",
});

export const Open_Sans_Font = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-heading",
});

export const Montserrat_Font = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-heading",
});

export const Libre_Franklin_Font = Libre_Franklin({
  subsets: ["latin"],
  display: "swap",
})

export const Roboto_Font = Roboto({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "300", "400", "500", "700", "900"],
  variable: "--font-heading",
})

export const Raleway_Font = Raleway({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-heading",
})

export const Inter_Font = Inter({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
})

export const Lato_Font = Lato({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "300", "400", "700", "900"],
  variable: "--font-heading",
})

export const Inria_Serif_Font = Inria_Serif({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "700"],
  variable: "--font-heading",
})

export const Playfair_Display_Font = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "600"],
  variable: "--font-heading",
});

export const Lora_Font = Lora({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "600"],
  variable: "--font-heading",
});

export const Rubik_Font = Rubik({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-heading",
});

export const Merriweather_Font = Merriweather({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "700"],
  variable: "--font-heading",
})

export const PT_Serif_Font = PT_Serif({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700"],
  variable: "--font-heading",
})

export const Oswald_Font = Oswald({
  subsets: ["latin"],
  display: "swap",
  weight: ["200", "300", "600", "700"],
  variable: "--font-heading",
})

export const Cormorant_Garamond_Font = Cormorant_Garamond({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-heading",
})

export const generateFontClassnames = (fontMain: string | null, fontHeading: string | null) => classNames({
  [Poppins_Font.className]: fontMain === "Poppins",
  [Poppins_Font.variable]: fontHeading === "Poppins",
  [Montserrat_Font.className]: fontMain === "Montserrat",
  [Montserrat_Font.variable]: fontHeading === "Montserrat",
  [Open_Sans_Font.className]: fontMain === "Open Sans",
  [Open_Sans_Font.variable]: fontHeading === "Open Sans",
  [Raleway_Font.className]: fontMain === "Raleway",
  [Raleway_Font.variable]: fontHeading === "Raleway",
  [Inter_Font.className]: fontMain === "Inter",
  [Roboto_Font.className]: fontMain === "Roboto",
  [Roboto_Font.variable]: fontHeading === "Roboto",
  [Lato_Font.className]: fontMain === "Lato",
  [Lato_Font.variable]: fontHeading === "Lato",
  [Inria_Serif_Font.className]: fontMain === "Inria Serif",
  [Inria_Serif_Font.variable]: fontHeading === "Inria Serif",
  [Libre_Franklin_Font.className]: fontMain === "Libre Franklin",
  [Oswald_Font.className]: fontMain === "Oswald",
  [Oswald_Font.variable]: fontHeading === "Oswald",
  [Playfair_Display_Font.variable]: fontHeading === "Playfair Display",
  [Lora_Font.variable]: fontHeading === "Lora",
  [Rubik_Font.variable]: fontHeading === "Rubik",
  [Merriweather_Font.variable]: fontHeading === "Merriweather",
  [Cormorant_Garamond_Font.variable]: fontHeading === "Cormorant Garamond"
})