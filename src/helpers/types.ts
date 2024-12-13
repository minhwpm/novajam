export type MediaType = {
  id: string;
  url: string;
  title: string;
  description: string | null;
  width: number;
  height: number;
  contentType: string;
};

export type AlignmentType = 'start' | 'center' | 'end';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'black'
  | 'white'
  | 'ghost'
  | 'outline'
  | 'outline-black'
  | 'outline-white';

export type ButtonType = {
  id?: string;
  label: string;
  href: string | null;
  openNewTab: boolean;
  icon?: {
    url: string;
    title: string;
    width: number;
    height: number;
  } | null;
  withArrow: boolean;
  variant: ButtonVariant;
};

export type LinkType = {
  id: string;
  label: string;
  href: string;
  openNewTab: boolean;
  contentType: 'link';
};

export interface LinkGroupType {
  id: string;
  label: string;
  links: Array<LinkType>;
  contentType: 'linkgroup';
}

export interface SubmenuType {
  id: string;
  label: string;
  menuItems: Array<LinkType | LinkGroupType>;
  featuredContent: Array<PageType>;
  layout: 'dropdown' | 'mega';
  contentType: 'submenu';
}

export type NavigationLayout = 'standard' | 'minimal' | 'overlay';
export interface NavigationType {
  url: string;
  logo: MediaType;
  logoRedirect: string | null;
  menuItems: Array<LinkType | SubmenuType>;
  showModeSelector: boolean;
  buttons: Array<ButtonType>;
  hotButtons: Array<ButtonType>;
  layout: 'standard' | 'minimal' | 'overlay';
  darkMode: boolean;
}

export interface FooterType {
  url: string;
  logo: MediaType | null;
  logoRedirect: string | null;
  description: string | null;
  copyright: string | null;
  menuItems: Array<LinkGroupType>;
  backgroundColor: string | null;
  backgroundImage: MediaType | null;
  darkMode: boolean;
}

export type PageType = {
  id: string;
  title: string;
  url: string;
  content: Array<SmartSectionType>;
  fontMain: string;
  fontHeading: string;
  colorPrimary: string;
  colorSecondary: string;
  borderRadius: string;
  seo: SEOType;
  contentType: 'page';
};

export type SEOType = {
  metaTitle: string;
  metaDescription: string;
  canonicalUrl: string | null;
  focusKeywords: string | null;
  ogImage: MediaType | null;
  nofollow: boolean;
  noindex: boolean;
};

export type CatogoryType = {
  name: string;
  slug: string;
  description: string | null;
};

export type ExpertType = {
  id: string;
  fullName: string;
  profilePicture: MediaType | null;
  role: string | null;
  description: string | null;
  specialization: Array<string> | null;
  organization: string | null;
  alignment: AlignmentType | null;
  layout: 'horizontal' | 'vertical' | null;
  contentType: 'expert';
};

export type MediaAspectRatioType =
  | 'auto'
  | 'square'
  | '16/9'
  | '4/3'
  | '3/4'
  | '3/2';

export type TitleFontSizeType = 'sm' | 'base' | 'lg' | 'xl' | '2xl';

export type RichContentType = {
  eyebrow: string | null;
  title: string | null;
  body: string | null;
  ctas: Array<ButtonType> | null;
  disclaimer: string | null;
  titleFontSize: TitleFontSizeType;
  alignment: AlignmentType;
  paddingTop: PaddingType;
  paddingLeft: PaddingType;
  paddingBottom: PaddingType;
  paddingRight: PaddingType;
  contentType: 'richcontent';
};

export type FeaturedMediaType = {
  file: MediaType;
  aspectRatio: MediaAspectRatioType;
  altText: string;
  contentType: 'featuredmedia';
};

export type SmartSectionLayoutType =
  | 'Classic'
  | 'Classic R'
  | 'Columns'
  | 'Rows'
  | 'Banner';

export type PaddingType =
  | 'none'
  | 'xs'
  | 'sm'
  | 'base'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl';

export type SmartSectionType = {
  id: string;
  htmlid: string | null;
  content: Array<
    RichContentType | FeaturedMediaType | ContentListType | FormType
  >;
  layout: SmartSectionLayoutType;
  gap: GapType;
  backgroundColor: string | null;
  backgroundImage: MediaType | null;
  enableParallaxEffect: boolean;
  darkMode: boolean;
  sectionSeparator: boolean;
  paddingTop: PaddingType;
  paddingBottom: PaddingType;
  fullViewWidth: boolean;
  contentType: 'smartsection';
};

export type StatisticsType = {
  id: string;
  keyNumber: string;
  description: string;
  alignment: AlignmentType | null;
  layout: 'horizontal' | 'vertical' | null;
  contentType: 'statistics';
};

export type TestimonialType = {
  id: string;
  content: string | null;
  authorImage: MediaType | null;
  authorName: string | null;
  authorTitle: string | null;
  rating: 0 | 1 | 2 | 3 | 4 | 5 | null;
  alignment: AlignmentType | null;
  layout: 'horizontal' | 'vertical' | null;
  fontSize: 'base' | 'lg' | 'xl';
  contentType: 'testimonial';
};

export type FlexibleContentType = {
  id: string;
  eyebrow: string | null;
  title: string | null;
  body: string | null;
  tags: Array<string> | null;
  buttons: Array<ButtonType>;
  redirectUrl: string | null;
  media: Array<MediaType>;
  alignment: AlignmentType | null;
  layout: 'horizontal' | 'vertical' | null;
  contentType: 'flexiblecontent';
};

export type PricingOptionType = {
  billingCycle: 'Monthly' | 'Yearly' | 'One-Time';
  price: string;
  priceSuffix: string | null;
};

export type PricingPlanType = {
  id: string;
  planName: string;
  pricing: string;
  pricingSuffix: string;
  pricingOptions: Array<PricingOptionType>;
  badge: string;
  featured: boolean;
  description: string | null;
  features: Array<string>;
  planLimitations: Array<string>;
  cta: ButtonType | null;
  disclaimer: string | null;
  alignment: AlignmentType | null;
  contentType: 'pricingplan';
};

export type QAType = {
  id: string;
  heading: string;
  body: string;
  isCollapsed: boolean;
  contentType: 'qa';
};

export type BlockType =
  | ExpertType
  | StatisticsType
  | FlexibleContentType
  | PricingPlanType
  | TestimonialType
  | QAType;

export type ColumnsType = 1 | 2 | 3 | 4 | 5;

export type GapType = 'none' | 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl';

export type ContentListType = {
  id: string;
  contentItems: Array<BlockType>;
  ctas: Array<ButtonType>;
  columns: ColumnsType | null;
  gap: GapType;
  layout: 'carousel' | 'masonry' | 'grid' | 'flex' | null;
  contentType: 'contentlist';
};

export type FormFieldType = {
  id: string;
  label: string;
  fieldType:
    | 'text'
    | 'email'
    | 'tel'
    | 'number'
    | 'date'
    | 'datetime'
    | 'textarea'
    | 'select';
  options: Array<string>;
  required: boolean;
  placeholder: string;
  helpText: string;
  uiWidth: 'half-size' | 'full-size';
  hideLabel: boolean | null;
};

export type FormType = {
  id: string;
  internalName: string;
  fields: Array<FormFieldType>;
  submitButtonLabel: string | null;
  submitButtonVariant:
    | 'primary'
    | 'secondary'
    | 'black'
    | 'outline'
    | 'outline-black'
    | null;
  disclaimer: string | null;
  formType: string;
  dateFormat: 'DD/MM/YYYY' | 'MM/DD/YYYY' | 'YYYY/MM/DD';
  successMessage: string | null;
  errorMessage: string | null;
  contentType: 'form';
};
