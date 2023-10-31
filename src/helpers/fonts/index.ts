import classNames from "classnames";
import {
  Poppins,
  Playfair_Display,
  Montserrat,
  Libre_Franklin,
  Roboto,
  Raleway,
  Inter,
  Lora,
  Rubik,
  Bricolage_Grotesque
} from "next/font/google";

// BODY FONTS
export const Poppins_Font = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const Montserrat_Font = Montserrat({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const Libre_Franklin_Font = Libre_Franklin({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
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

// HEADING FONTS
export const Playfair_Display_Font = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  style: "italic",
  weight: ["400", "500", "700", "900"],
  variable: "--font-heading",
});

export const Lora_Font = Lora({
  subsets: ["latin"],
  display: "swap",
  style: "italic",
  weight: ["400", "500", "600", "700"],
  variable: "--font-heading",
});

export const Rubik_Font = Rubik({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-heading",
});

export const Bricolage_Grotesque_Font = Bricolage_Grotesque({
  subsets: ["latin"],
  display: "swap",
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-heading",
})

export const getFontClassNames = (fontMain: string | null, fontHeading: string | null) => classNames({
  [Poppins_Font.className]: fontMain === "Poppins",
  [Montserrat_Font.className]: fontMain === "Montserrat",
  [Raleway_Font.className]: fontMain === "Raleway",
  [Inter_Font.className]: fontMain === "Inter",
  [Roboto_Font.className]: fontMain === "Roboto",
  [Libre_Franklin_Font.className]: fontMain === "Libre_Franklin",
  [Playfair_Display_Font.variable]: fontHeading === "Playfair_Display",
  [Lora_Font.variable]: fontHeading === "Lora",
  [Rubik_Font.variable]: fontHeading === "Rubik",
  [Bricolage_Grotesque_Font.variable]: fontHeading === "Bricolage_Grotesque",
})