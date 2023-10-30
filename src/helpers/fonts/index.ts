import { Nunito, Quicksand, Poppins, Playfair_Display, Montserrat } from 'next/font/google'

// BODY FONTS
export const Nunito_Font = Nunito({
  subsets: ["latin", "vietnamese"],
  display: "swap",
  weight: ["300", "400", "700", "900"]
})

export const Poppins_Font = Poppins({
  subsets: ["latin"],
  display: "swap",
  // weight: ["200", "300", "400", "600", "700"]
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"]
})

export const Montserrat_Font = Montserrat({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"]
})

export const Quicksand_Font = Quicksand({
  subsets: ["latin", "vietnamese"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
})

export const Playfair_Display_Font = Playfair_Display({
  subsets: ["latin", "vietnamese"],
  display: "swap",
  weight: ["400", "500", "700", "900"],
  variable: "--font-heading"
})