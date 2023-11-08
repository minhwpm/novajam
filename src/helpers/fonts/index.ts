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
  Bricolage_Grotesque,
} from "next/font/google";

// BODY FONTS
export const Poppins_Font = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const Open_Sans_Font = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
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
  weight: ["100", "300", "500", "700", "900"],
})

export const Raleway_Font = Raleway({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
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
})

// HEADING FONTS
export const Playfair_Display_Font = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
  variable: "--font-heading",
});

export const Lora_Font = Lora({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
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
  weight: ["300", "400", "700", "900"],
  variable: "--font-heading",
})

export const Bricolage_Grotesque_Font = Bricolage_Grotesque({
  subsets: ["latin"],
  display: "swap",
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-heading",
})

export const generateFontClassnames = (fontMain: string | null, fontHeading: string | null) => classNames({
  [Poppins_Font.className]: fontMain === "Poppins",
  [Montserrat_Font.className]: fontMain === "Montserrat",
  [Montserrat_Font.variable]: fontHeading === "Montserrat",
  [Open_Sans_Font.className]: fontMain === "Open Sans",
  [Raleway_Font.className]: fontMain === "Raleway",
  [Inter_Font.className]: fontMain === "Inter",
  [Roboto_Font.className]: fontMain === "Roboto",
  [Lato_Font.className]: fontHeading === "Lato",
  [Libre_Franklin_Font.className]: fontMain === "Libre Franklin",
  [Playfair_Display_Font.variable]: fontHeading === "Playfair Display",
  [Lora_Font.variable]: fontHeading === "Lora",
  [Rubik_Font.variable]: fontHeading === "Rubik",
  [Merriweather_Font.variable]: fontHeading === "Merriweather",
  [Bricolage_Grotesque_Font.variable]: fontHeading === "Bricolage Grotesque",
})