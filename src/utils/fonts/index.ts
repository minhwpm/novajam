import { Nunito, Quicksand, Poppins, Playfair_Display } from 'next/font/google'

// BODY FONTS
const Nunito_Font = Nunito({
  subsets: ["latin", "vietnamese"],
  display: "swap",
  weight: ["300", "400", "700", "900"]
})

const Poppins_Font = Poppins({
  subsets: ["latin"],
  display: "swap",
  // weight: ["200", "300", "400", "600", "700"]
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"]
})

// const Montserrat_Font = Montserrat({
//   subsets: ["latin"],
//   display: "swap",
//   weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"]
// })

const Quicksand_Font = Quicksand({
  subsets: ["latin", "vietnamese"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
})

const Playfair_Display_Font = Playfair_Display({
  subsets: ["latin", "vietnamese"],
  display: "swap",
  weight: ["400", "500", "700", "900"],
  variable: "--font-heading"
})

const fonts = {
  Nunito: Nunito_Font,
  Quicksand: Quicksand_Font,
  Poppins: Poppins_Font,
  Playfair_Display: Playfair_Display_Font
}

export default fonts