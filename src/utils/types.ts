export type Params = {
  slug: Array<string>
}
export type ButtonVariant = "standard" | "alternate" | "black" | "link-btn" | "outline" | "outline-black" | "outline-white"

export interface ButtonProps {
  children: React.ReactNode
  url?: string
  onClick?: () => void
  variant?: ButtonVariant
  size?: "base" | "lg"
  fontWeight?: "normal" | "bold"
  borderRadius?: "none" | "base" | "full"
  type?: "submit" | "button" | "reset" | undefined
}

export interface LinkProps {
  text: string
  url: string
  newTab: boolean
}

export interface LinkGroupProps {
  title: string
  links: Array<LinkProps>
}

export interface SubmenuProps {
  title: string
  menu: Array<LinkProps | LinkGroupProps>
  style: 'dropdown' | 'mega'
}

export interface NavMenuProps {
  menu: Array<LinkProps | SubmenuProps>
  navAlignment?: "center" | "left" | "right"
}

export interface HeaderProps {
  data: {
    logo: {
      url: string
      title?: string
    },
    menu: Array<LinkProps | SubmenuProps>
    isLoginEnabled?: boolean
    isShoppingEnabled?: boolean
    searchBox?: {
      enabled: boolean
      placeholder: string
    } 
    buttons?: Array<{
      text: string
      url: string
      type: ButtonVariant
    }>
  }
  variant?: "standard" | "alternate"
  // @TODO following 4 properties
  stickyType?: 'none' | 'scroll-up' | 'scroll-down'
  logoAlignment?: 'center' | 'left'
  navAlignment?: 'center' | 'left' | 'right' // this property is for XL screens
  backgroundColor?: 'white' | 'transparent'
}

export type ArticleType = {
  id: string
  title: string
  url?: string
  summary?: string
  content?: string
  tags?: Array<string>
  media?: {
    contentType: string
    url: string
    title?: string
  }
  buttons?: Array<{
    url: string
    text: string
    type?: ButtonVariant
  }>
  contentType: string
}

export type ProductType = {
  id: string
  title: string
  slug: string
  price: number
  summary: string
  content: string
  categories: Array<string>
  inStock: boolean
  media: Array<{
    title: string
    url: string
  }>
  contentType: string
}

export type FeatureType = {
  id: string
  title: string
  label?: string
  summary?: string
  content?: string
  media?: {
    url: string
    title?: string
    width: number
    height: number
  }
  url?: string
  buttons?: Array<{
    id: string
    url: string
    text: string
    type: ButtonVariant
  }>
  contentType: string
}

export type HeroType = {
  id: string
  label?: string
  title: string
  slidingTexts?: Array<string>
  subtitle?: string
  buttons?: Array<{
    text: string
    url?: string
    type: ButtonVariant
  }>
}

export type CTAType = {
  id: string
  title: string
  subtitle?: string
  button: {
    text: string
    url: string
    type: ButtonVariant
  }
}

export type PresentationType = {
  id: string
  title?: string
  label?: string
  subtitle?: string
  content: Array<FeatureType>
}

export type CardListType = {
  id: string
  title: string
  label?: string
  subtitle?: string
  content: Array<CardType>
  link: {
    url: string
    text: string
  }
}


export interface ArticleCardProps {
  data: ArticleType
  aspectRatio?: "video" | "square" | "3/4" | "4/3" | "3/2"
  shadow?: boolean
  border?: boolean
  rounded?: boolean
  thumbnailImagePosition?: "top" | "overlay"
  textAlign?: "left" | "right" | "center"
}

export interface ProductCardProps {
  data: ProductType
}

export interface FeatureCardProps {
  data: FeatureType
}

export type CardType = ArticleType | FeatureType | ProductType