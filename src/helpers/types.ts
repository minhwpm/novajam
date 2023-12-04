import { Document } from "@contentful/rich-text-types";

export type Params = {
  string: string
  slug?: Array<string>
}

export type MediaType = {
  id: string
  url: string
  title: string
  width: number
  height: number
  contentType: string
}
export type SNSType = {
  linkedInUrl: string | null
  facebookUrl: string | null
  twitterUrl: string | null
  youtubeUrl: string | null
  instagramUrl: string | null
}

export type AspectRatioType = "video" | "square" | "3/4" | "4/3" | "3/2" | "auto" 

export type AlignmentType = "inherit" | "center" | "reverse"

export type ButtonVariant = "standard" | "alternate" | "black" | "link" | "outline" | "outline-black" | "outline-white"

export type ButtonType = {
  id?: string
  url: string
  text: string
  openNewTab: boolean
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
  openNewTab: boolean
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
  featuredContent: Array<BlogType | PageType>
  layout: 'dropdown' | 'mega'
  contentType: "submenu"
}

export type NavigationUiVariant = "standard" | "minimal" | "overlay"
export interface NavigationType {
  url: string
  logo: MediaType,
  logoRedirect?: string
  menu: Array<LinkType | SubmenuType>
  buttons?: Array<ButtonType>
  uiVariant: NavigationUiVariant
}

export interface FooterType {
  url: string
  logo: {
    url: string
    title: string
  }
  logoRedirect?: string
  copyright?: string
  sns?: SNSType
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
  firstPublishedAt: string
  publishedAt: string
  title: string
  slug: string
  featured: boolean
  summary: string
  content: Document
  topics: Array<string>
  media: MediaType | null
  author: ExpertType
  metaTitle: string
  metaDescription: string
  metaKeywords: Array<string>
  metaImage: MediaType
  contentType: "blog"
}

export type ExpertType = {
  id: string
  slug: string | null
  fullName: string
  portrait: MediaType | null
  role: string | null
  specialization: Array<string> | null
  organization: string | null
  summary: string | null
  description: string | null
  sns: SNSType | null
  contentType: "expert"
}

export type FeatureType = {
  id: string
  title: string
  heading: Document
  label: string | null
  description: Document | null 
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
  textAlignment: AlignmentType
  contentType: "hero"
}

export type CTAType = {
  id: string
  heading: Document
  subheading: string | null
  buttons: Array<ButtonType>
}

export type PresentationType = {
  id: string
  heading: Document | null
  label: string | null
  subheading: string | null
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
  embeddedMediaUrl: string | null
  embeddedMediaTitle: string | null
  label: string | null
  heading: Document | null
  description: Document | null
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

export type CardType = BlogType | PageType | LinkType | ExpertType | StatisticsType | ContentPieceType | PricingPlanType

export type CardListType = {
  id: string
  heading: Document | null
  label: string | null
  subheading: string | null
  content: Array<CardType>
  seeAllLink: LinkType
  layout: "carousel" | "grid" | "masonry"
  size: 1 | 2 | 3 | 4 | 5
  alignment: AlignmentType
  htmlid: string | null
}

export type FormFieldType = {
  id: string
  label: string
  fieldType: 'text' | 'email' | 'tel' | 'number' | 'date' | 'textarea' | 'select'
  options: Array<string>
  required: boolean
  placeholder: string
  uiWidth: "half-size" | "full-size"
}

export type InquiryFormType = {
  id: string
  title: string
  heading: Document | null
  label: string | null
  subheading: string | null
  description: Document | null
  fields: Array<{
    id: string
    label: string
    fieldType: string
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
}