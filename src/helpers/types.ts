export type Params = {
  slug: Array<string>
}

export type ImageType = {
  url: string
  title: string
  width: number
  height: number
}

export type MediaType = {
  id: string
  url: string
  title: string
  width: number
  height: number
  contentType: string
}

export type ButtonVariant = "standard" | "alternate" | "black" | "link" | "outline" | "outline-black" | "outline-white"

export type ButtonType = {
  id?: string
  url: string
  text: string
  buttonVariant: ButtonVariant
}

export type LinkType = {
  id: string
  text: string
  image: {
    url: string
    title: string
    width: number
    height: number
  }
  url: string
  newTab: boolean
  contentType: "link"
}

export interface LinkGroupType {
  id: string
  title: string
  links: Array<LinkType>
  contentType: "linkgroup"
}

export interface SubmenuType {
  id: string
  title: string
  menu: Array<LinkType | LinkGroupType>
  featuredContent: Array<BlogType | ProductType | PageType>
  style: 'dropdown' | 'mega'
  contentType: "submenu"
}

export interface HeaderType {
  url: string
  logo: {
    url: string
    title?: string
  },
  logoRedirect?: string
  menu: Array<LinkType | SubmenuType>
  isLoginEnabled?: boolean
  isShoppingEnabled?: boolean
  searchBox?: {
    enabled: boolean
    placeholder: string
  } 
  buttons?: Array<ButtonType>
  uiVariant: "standard" | "extended" | "minimal"
}

export interface FooterType {
  url: string
  logo: {
    url: string
    title: string
  }
  logoRedirect?: string
  copyright?: string
  sns?: Array<{
    url: string
    icon: {
      url: string
      altText: string
    }
  }>
  menu: Array<{
    title?:  string
    links: Array<{
      text: string
      url: string
    }>
  }>
}

export type SEOType = {
  metaTitle: string
  metaDescription: string
  sharedImage: {
    url: string
    title: string
    width: number
    height: number
  }
}

export type PageType = {
  id: string
  title: string
  url: string
  content: HeroType | CTAType | PresentationType | CardListType | FeatureType
  fontMain: string
  fontHeading: string
  colorPrimary: string
  colorSecondary: string
  borderRadius: string
  metaTitle: string
  metaDescription: string
  metaKeywords?: Array<string>
  metaImage: ImageType
  contentType: "page"
}

export type BlogType = {
  id: string
  title: string
  slug: string
  featured: boolean
  summary?: string
  content: string
  topics?: Array<string>
  media: {
    url: string
    title: string
    width: number
    height: number
  }
  author?: ExpertType
  metaTitle: string
  metaDescription: string
  metaKeywords?: Array<string>
  metaImage: ImageType
  contentType: "blog"
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
    width: number
    height: number
  }>
  metaTitle: string
  metaDescription: string
  metaKeywords?: Array<string>
  metaImage: ImageType
  contentType: "product"
}

export type ExpertType = {
  id: string
  slug: string
  fullName: string
  portrait: {
    title: string
    url: string
    width: number
    height: number
  }
  role: string
  specialization: Array<string>
  organization: string
  summary: string
  description?: string
  contentType: "expert"
}

export type FeatureType = {
  id: string
  title: string
  heading: string
  label: string
  content: string
  media: Array<MediaType>
  mediaAspectRatio: "auto" | "16/9" | "4/3" | "square" | "3/4" | "3/2"
  url?: string
  buttons: Array<ButtonType>
  layout: "Horizontal (Image | Text)" | "Horizontal (Text | Image)" | "Vertical (Image | Text)" | "Vertical (Text | Image)"
  uiVariant: "standard" | "extended"
  backgroundImage: MediaType
  contentType: "feature"
}

export type HeroType = {
  id: string
  label: string
  title: string
  heading: string
  content: string
  buttons: Array<ButtonType>
  media: Array<MediaType>
  mediaForMobile: Array<MediaType>
  contentType: "hero"
}

export type CTAType = {
  id: string
  title: string
  content: string
  buttons: Array<ButtonType>
}

export type PresentationType = {
  id: string
  title: string
  label: string
  subtitle: string
  content: Array<ContentPieceType>
}

export type StatisticsType = {
  id: string
  number: string
  text: string
  contentType: 'statistics'
}

export type ContentPieceType = {
  id: string
  heading: string
  content: string
  media: Array<MediaType>
  ctaButton: ButtonType
  alignment: 'auto' | 'left' | 'right' | 'center'
  contentType: 'contentpiece'
}

export type PricingPlanType = {
  id: string
  title: string
  pricing: string
  pricingSuffix: string
  badge: string
  features: Array<string>
  ctaButton: ButtonType
  contentType: 'pricingplan'
}

export type CardType = BlogType | ProductType | PageType | LinkType | ExpertType | StatisticsType | ContentPieceType | PricingPlanType

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
  layout: "carousel" | "grid" | "flex" | "masonry"
  size: 1 | 2 | 3 | 4 | 5
  htmlid: string
}

export type InquiryFormType = {
  id: string
  title: string
  subtitle: string
  type: string
  fields: Array<{
    id: string
    label: string
    type: string
    options: Array<string>
    required: boolean
    placeholder: string
    uiWidth: "half-size" | "full-size"
  }>
  submitButton: {
    text: string
    url: string
    buttonVariant: ButtonVariant
  }
  backgroundImage: {
    url: string
    title: string
    width: number
    height: number
  }
  htmlid: string
}