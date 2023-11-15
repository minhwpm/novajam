export type Params = {
  slug: Array<string>
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

export type AspectRatioType = "video" | "square" | "3/4" | "4/3" | "3/2" | "auto" 

export type AlignmentType = "inherit" | "center" | "reverse"

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
  fontMain: string //@TODO font family options here
  fontHeading: string //@TODO font family options here
  headingFontSize: 'standard' | 'standout' | 'impactful'
  colorPrimary: string
  colorSecondary: string
  borderRadius: string
  metaTitle: string
  metaDescription: string
  metaKeywords?: Array<string>
  metaImage: MediaType
  contentType: "page"
}

export type BlogType = {
  id: string
  title: string
  slug: string
  featured: boolean
  summary: string
  content: string
  topics: Array<string>
  media: MediaType | null
  author: ExpertType
  metaTitle: string
  metaDescription: string
  metaKeywords: Array<string>
  metaImage: MediaType
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
  metaImage: MediaType
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
  content: Array<ContentPieceType>
  layout: "overlay" | "vertical" | "horizontal"
  alignment: AlignmentType
  contentType: "hero"
}

export type CTAType = {
  id: string
  heading: string
  subheading: string
  buttons: Array<ButtonType>
}

export type PresentationType = {
  id: string
  heading: string
  label: string
  subheading: string
  content: Array<ContentPieceType>
  layout: "carousel" | "mini-carousel" | "tab" | "vertical-tab" | "accordion" | "scrolling"
  alignment: AlignmentType
}

export type StatisticsType = {
  id: string
  number: string
  text: string
  contentType: 'statistics'
}

export type ContentPieceType = {
  id: string
  media: Array<MediaType>
  label: string
  heading: string
  content: string
  buttons: Array<ButtonType>
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
  heading: string
  label: string
  subheading: string
  content: Array<CardType>
  seeAllLink: LinkType
  layout: "carousel" | "grid" | "masonry"
  size: 1 | 2 | 3 | 4 | 5
  alignment: AlignmentType
  htmlid: string
}

export type InquiryFormType = {
  id: string
  title: string
  heading: string
  label: string
  subheading: string
  content: string
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
  formType: string
  dateFormat: string
  displayMode: string
}