import { Document } from "@contentful/rich-text-types";

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

export type BackgroundColorType = "neutral" | "red" | "orange" | "amber" | "yellow" | "lime" | "green" | "emerald" | "teal" | "cyan" | "sky" | "blue" | "indigo" | "violet" | "purple" | "fuchsia" | "pink" | "rose"  

export type AlignmentType = "inherit" | "center" | "reverse"

export type ButtonVariant = "standard" | "alternate" | "black" | "arrow" | "outline" | "outline-black" | "outline-white"

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
  buttons: Array<ButtonType>
  hotButtons: Array<ButtonType>
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
  content: HeroType | CTAType | ContentPTType | ContentListType | FeaturedContentType
  fontMain: string
  fontHeading: string
  headingFontSize: 'standard' | 'standout' | 'impactful'
  colorPrimary: string
  colorSecondary: string
  borderRadius: string
  metaTitle: string | null
  metaDescription: string | null
  metaKeywords: Array<string> | null
  metaImage: MediaType | null
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
export const BLOG_PAGE_SIZE = 9

export type ExpertType = {
  id: string
  slug: string | null
  fullName: string
  portrait: MediaType | null
  role: string | null
  specialization: Array<string> | null
  organization: string | null
  summary: string | null
  description: Document | null
  sns: SNSType | null
  contentType: "expert"
}

export type MediaAspectRatioType = "auto" | "square" | "16/9" | "4/3" | "3/4" | "3/2"

export type FeaturedContentLayoutType = "Horizontal (Image | Text)" | "Horizontal (Text | Image)" | "Vertical (Image | Text)" | "Vertical (Text | Image)"

export type FeaturedContentType = {
  id: string
  title: string
  heading: Document
  label: string | null
  description: Document | null 
  media: Array<MediaType>
  mediaAspectRatio: MediaAspectRatioType
  url?: string
  buttons: Array<ButtonType>
  content: ContentPieceType
  htmlid: string
  layout: FeaturedContentLayoutType
  uiVariant: "standard" | "extended"
  backgroundColor: BackgroundColorType | null
  backgroundImage: MediaType | null
  darkMode: boolean
  contentType: "feature"
}

export type HeroLayoutType = "overlay" | "vertical" | "horizontal"

export type HeroType = {
  id: string
  content: Array<ContentPieceType>
  layout: HeroLayoutType
  alignment: AlignmentType
  backgroundImage: MediaType | null
  darkMode: boolean
  contentType: "hero"
}

export type CTAType = {
  id: string
  heading: Document
  content: Document | null
  buttons: Array<ButtonType>
  contentType: "cta"
}

export type ContentPTType = {
  id: string
  eyebrow: string | null
  heading: Document | null
  summary: Document | null
  content: Array<ContentPieceType>
  layout: "carousel" | "mini-carousel" | "tab" | "vertical-tab" | "accordion" | "scrolling"
  alignment: AlignmentType
  htmlid: string | null
  backgroundColor: BackgroundColorType | null
  backgroundImage: MediaType | null
  darkMode: boolean
  contentType: "presentation"
}

export type StatisticsType = {
  id: string
  number: string
  text: string
  contentType: 'statistics'
}

export type TestimonialType = {
  id: string
  content: Document 
  portrait: MediaType | null
  name: string | null
  role: string | null
  contentType: 'testimonial'
}

export type ContentPieceType = {
  id: string
  eyebrow: string | null
  heading: Document | null
  description: Document | null
  buttons: Array<ButtonType>
  media: Array<MediaType>
  embeddedMediaUrl: string | null
  embeddedMediaTitle: string | null
  contentType: 'contentpiece'
}

export type PricingPlanType = {
  id: string
  title: string
  pricing: string
  pricingSuffix: string
  badge: string
  description: Document | null
  ctaButton: ButtonType
  contentType: 'pricingplan'
}

export type Content = BlogType | PageType | LinkType | ExpertType | StatisticsType | ContentPieceType | PricingPlanType | TestimonialType
export type ContentSize =  "S" | "M" | "L" | "XL"
export type ContentListLayout = "carousel" | "spotlight" | "masonry" | "deck"

export type ContentListType = {
  id: string
  heading: Document | null
  eyebrow: string | null
  summary: Document | null
  content: Array<Content>
  seeAllLink: LinkType | null
  layout: ContentListLayout
  size: ContentSize
  alignment: AlignmentType
  htmlid: string | null
  backgroundColor: BackgroundColorType | null
  backgroundImage: MediaType | null
  darkMode: boolean
  contentType: "cardlist"
}

export type FormFieldType = {
  id: string
  label: string
  fieldType: 'text' | 'email' | 'tel' | 'number' | 'date' | 'datetime' | 'textarea' | 'select'
  options: Array<string>
  required: boolean
  helpText: string
  uiWidth: "half-size" | "full-size"
}

export type InquiryFormType = {
  id: string
  title: string
  eyebrow: string | null
  heading: Document | null
  summary: string | null
  description: Document | null
  fields: Array<FormFieldType>
  submitButton: {
    text: string
    url: string
    buttonVariant: ButtonVariant
  } | null
  successMessage: string
  errorMessage: string
  backgroundImage: {
    url: string
    title: string
    width: number
    height: number
  }
  htmlid: string
  formType: string
  contentType: "inquiryform"
}