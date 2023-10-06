export type Params = {
  slug: Array<string>
}

export type ImageType = {
  url: string
  title: string
  width: number
  height: number
}

export type ButtonVariant = "standard" | "alternate" | "black" | "link-btn" | "outline" | "outline-black" | "outline-white"

export interface LinkType {
  id: string
  text: string
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
  buttons?: Array<{
    text: string
    url: string
    type: ButtonVariant
  }>
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
  media: {
    url: string
    title: string
    width: number
    height: number
    contentType: string
  }
  url?: string
  buttons?: Array<{
    id: string
    url: string
    text: string
    type: ButtonVariant
  }>
  layout: string
  contentType: "feature"
}

export type HeroType = {
  id: string
  label: string
  title: string
  heading: string
  content: string
  buttons: Array<{
    text: string
    url?: string
    type: ButtonVariant
  }>
  media: Array<{
    url: string
    title: string
    width: number
    height: number
    contentType: string
  }>
  mediaForMobile: Array<{
    url: string
    title: string
    width: number
    height: number
    contentType: string
  }>
  contentType: "hero"
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

export type CardType = BlogType | FeatureType | ProductType | PageType | LinkType | ExpertType

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
  layout: "carousel" | "grid" | "flex"
}

export type TestimonialsType = {
  id: string
  title: string
  label?: string
  subtitle?: string
  content: Array<{
    id: string
    title: string
    content: string
    witnessFullName?: string
    witnessRole?: string
    witnessOrganization?: string
    witnessPortrait: ImageType
  }>
}

export type GalleryType = {
  id: string
  title: string
  heading: string
  label?: string
  subtitle?: string
  content: Array<{
    id: string
    url: string
    title: string
    width: number
    height: number
  }>
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