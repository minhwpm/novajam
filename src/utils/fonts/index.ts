import { Nunito, Quicksand, Playfair_Display } from 'next/font/google'

// BODY FONTS
const Nunito_Font = Nunito({
  subsets: ['latin', "vietnamese"],
  display: 'swap',
  weight: ["300", "400", "700", "900"]
})

const Playfair_Display_Font = Playfair_Display({
  subsets: ['latin', "vietnamese"],
  display: 'swap',
  weight: ["400", "500", "700", "900"]
})

// HEADING FONTS
const Quicksand_Font = Quicksand({
  subsets: ['latin', "vietnamese"],
  display: 'swap',
  weight: ["400", "500", "600", "700"],
  variable: "--font-heading"
})

const fonts = {
  Nunito: Nunito_Font,
  Quicksand: Quicksand_Font,
  Playfair_Display: Playfair_Display_Font
}

export default fonts