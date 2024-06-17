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

export type TextAlignmentType = "start" | "center" | "end"

export type ButtonVariant = "primary" | "secondary" | "black" | "white" | "ghost" | "outline" | "outline-black" | "outline-white"

export type ButtonType = {
  id?: string
  text: string
  url: string | null
  buttonVariant: ButtonVariant
  openNewTab: boolean
  withArrow: boolean
  icon?: {
    url: string
    title: string
    width: number
    height: number
  } | null
}

export type LinkType = {
  id: string
  text: string
  image: {
    url: string
    title: string
    width: number
    height: number
  } | null
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
  appearanceVariant: 'dropdown' | 'mega'
  contentType: "submenu"
}

export type NavigationVariant = "standard" | "minimal" | "overlay"
export interface NavigationType {
  url: string
  logo: MediaType,
  logoRedirect: string | null
  menu: Array<LinkType | SubmenuType>
  showSearch: boolean
  buttons: Array<ButtonType>
  hotButtons: Array<ButtonType>
  appearanceVariant: NavigationVariant
  darkMode: boolean
}

export interface FooterType {
  url: string
  logo: {
    url: string
    title: string
  }
  logoRedirect: string | null
  copyright: string | null
  sns: SNSType | null
  menu: Array<LinkGroupType>
  backgroundColor: BackgroundColorType | null
  backgroundImage: MediaType | null
  darkMode: boolean
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
  content: HeroType | ContentPTType | ContentListType | FeaturedContentType | null
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
  summary: string | null
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
  fullName: string
  portrait: MediaType | null
  role: string | null
  specialization: Array<string> | null
  organization: string | null
  summary: string | null
  sns: SNSType | null
  contentType: "expert"
}

export type MediaAspectRatioType = "auto" | "square" | "16/9" | "4/3" | "3/4" | "3/2"

export type FeaturedContentVariantType = "Horizontal (Media | Text)" | "Horizontal (Text | Media)" | "Vertical (Media | Text)" | "Vertical (Text | Media)"

export type FeaturedContentType = {
  id: string
  title: string
  heading: Document
  label: string | null
  description: Document | null 
  media: Array<MediaType>
  mediaAspectRatio: MediaAspectRatioType
  buttons: Array<ButtonType>
  content: FlexibleContentType
  htmlid: string
  appearanceVariant: FeaturedContentVariantType
  size: "standard" | "extended"
  backgroundColor: BackgroundColorType | null
  backgroundImage: MediaType | null
  darkMode: boolean
  contentType: "featuredcontent"
}

export type HeroLayoutVariant = "overlay" | "vertical" | "horizontal"

export type HeroType = {
  id: string
  content: Array<FlexibleContentType>
  appearanceVariant: HeroLayoutVariant
  contentTextAlignment: TextAlignmentType
  backgroundColor: BackgroundColorType | null
  backgroundImage: MediaType | null
  darkMode: boolean
  contentType: "hero"
}

export type ContentPTType = {
  id: string
  eyebrow: string | null
  heading: Document | null
  summary: Document | null
  content: Array<FlexibleContentType>
  appearanceVariant: "carousel" | "sleek carousel" | "tab" | "accordion" | "scroll"
  headingTextAlignment: TextAlignmentType
  contentTextAlignment: TextAlignmentType
  htmlid: string | null
  backgroundColor: BackgroundColorType | null
  backgroundImage: MediaType | null
  darkMode: boolean
  contentType: "contentpresentation"
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
  rating: 0 | 1 | 2 | 3 | 4 | 5
  contentType: 'testimonial'
}

export type FlexibleContentType = {
  id: string
  eyebrow: string | null
  heading: Document | null
  description: Document | null
  buttons: Array<ButtonType>
  media: Array<MediaType>
  embeddedMediaUrl: string | null
  embeddedMediaTitle: string | null
  contentType: 'flexiblecontent'
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

export type Content = BlogType | PageType | LinkType | ExpertType | StatisticsType | FlexibleContentType | PricingPlanType | TestimonialType
export type ContentSize =  "S" | "M" | "L" | "XL"
export type ContentOrientationType = "horizontal" | "vertical"

export type ContentListType = {
  id: string
  heading: Document | null
  eyebrow: string | null
  summary: Document | null
  content: Array<Content>
  buttons: Array<ButtonType>
  appearanceVariant: "carousel" | "masonry" | "deck"
  size: ContentSize
  headingTextAlignment: TextAlignmentType
  contentTextAlignment: TextAlignmentType
  contentOrientation: ContentOrientationType
  htmlid: string | null
  backgroundColor: BackgroundColorType | null
  backgroundImage: MediaType | null
  enableParallaxBackground: boolean
  darkMode: boolean
  contentType: "contentlist"
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
  id: string;
  title: string;
  eyebrow: string | null;
  heading: Document | null;
  summary: string | null;
  description: Document | null;
  fields: Array<FormFieldType>;
  dateFormat: "DD/MM/YYYY" | "MM/DD/YYYY" | "YYYY/MM/DD";
  submitButton: ButtonType | null;
  successMessage: string | null;
  errorMessage: string | null;
  htmlid: string | null;
  formType: string;
  appearanceVariant: "horizontal" | "vertical";
  backgroundColor: BackgroundColorType | null;
  backgroundImage: MediaType | null;
  darkMode: boolean;
  contentType: "inquiryform";
};