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
  | 'neutral'
  | 'ghost'
  | 'outline'
  | 'link';

export type ButtonType = {
  id?: string;
  label: string;
  href: string | null;
  eyebrow?: string | null;
  openNewTab?: boolean;
  icon?: MediaType | null;
  withArrow?: boolean;
  variant: ButtonVariant;
  disclaimer?: string | null;
};

export type LinkType = {
  id: string;
  label: string;
  href: string;
  description: string;
  icon: MediaType | null;
  openNewTab: boolean;
  contentType: 'link';
};

export interface SubmenuType {
  id: string;
  label: string;
  menuItems: Array<LinkType | SubmenuType>;
  featuredContent: Array<BlogPostType | PageType>;
  layout: 'dropdown' | 'mega';
  contentType: 'submenu';
}

export type NavigationLayout = 'standard' | 'minimal';
export interface NavigationType {
  url: string;
  logo: MediaType;
  logoRedirect: string | null;
  menuItems: Array<LinkType | SubmenuType>;
  showModeSelector: boolean;
  buttons: Array<ButtonType>;
  hotButtons: Array<ButtonType>;
  layout: NavigationLayout;
  inverse: boolean;
}

export interface FooterType {
  url: string;
  logo: MediaType | null;
  logoRedirect: string | null;
  description: string | null;
  copyright: string | null;
  menuItems: Array<SubmenuType | LinkType>;
  backgroundColor: string | null;
  backgroundImage: MediaType | null;
  inverse: boolean;
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

export type BlogPostType = {
  id: string;
  publishedAt: string;
  postDate: string;
  title: string;
  slug: string;
  featured: boolean;
  summary: string | null;
  body: string;
  taxonomy: Array<CatogoryType>;
  tags: Array<string> | null;
  featuredImage: MediaType;
  author: Array<ExpertType>;
  relatedPosts: Array<BlogPostType>;
  seo: SEOType;
  contentType: 'blog';
};

export type GetBlogsOptions = {
  limit?: number;
  skip?: number;
  featured?: boolean;
  categorySlug?: string;
  tag?: string;
  search?: string;
  excludeSlug?: string;
};

export const BLOG_PAGE_SIZE = 18;

export type ExpertType = {
  id: string;
  name: string;
  profilePicture: MediaType | null;
  role: string | null;
  description: string | null;
  specialization: Array<string> | null;
  organization: string | null;
  alignment: AlignmentType;
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
  titleFontSize: TitleFontSizeType;
  layout: 'stacked' | 'cta-side' | 'body-cta-side' | null;
  alignment: AlignmentType;
  paddingTop: PaddingType;
  paddingLeft: PaddingType;
  paddingBottom: PaddingType;
  paddingRight: PaddingType;
  backgroundColor: string | null;
  contentType: 'richcontent';
};

export type FeaturedMediaType = {
  file: MediaType;
  priority: boolean;
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
  inverse: boolean;
  sectionSeparator: boolean;
  paddingTop: PaddingType;
  paddingBottom: PaddingType;
  width: 'full' | 'standard' | 'narrow';
  contentType: 'smartsection';
};

export type StatisticsType = {
  id: string;
  keyNumber: string;
  description: string;
  alignment: AlignmentType;
  layout: 'horizontal' | 'vertical' | null;
  keyNumberColor: string;
  contentType: 'statistics';
};

export type TestimonialType = {
  id: string;
  content: string | null;
  authorImage: MediaType | null;
  authorName: string | null;
  authorTitle: string | null;
  rating: 0 | 1 | 2 | 3 | 4 | 5 | null;
  alignment: AlignmentType;
  layout: 'horizontal' | 'vertical' | null;
  fontSize: 'base' | 'lg' | 'xl';
  contentType: 'testimonial';
};

export type FlexibleContentType = {
  id: string;
  eyebrow: string | null;
  title: string | null;
  body: string | null;
  buttons: Array<ButtonType>;
  redirectUrl: string | null;
  media: Array<MediaType>;
  alignment: AlignmentType;
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
  alignment: AlignmentType;
  contentType: 'pricingplan';
};

export type QAType = {
  id: string;
  title: string;
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
  | QAType
  | BlogPostType;

export type GapType = 'none' | 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl';

export type ContentListType = {
  id: string;
  contentItems: Array<BlockType>;
  ctas: Array<ButtonType>;
  columns: 1 | 2 | 3 | 4 | 5 | 6 | null;
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
  options: Array<string> | null;
  required: boolean;
  placeholder: string | null;
  helpText: string | null;
  uiWidth: 'half-size' | 'full-size';
  hideLabel: boolean;
};

export type FormType = {
  id: string;
  internalName: string;
  fields: Array<FormFieldType>;
  submitButtonLabel: string | null;
  submitButtonVariant: ButtonVariant | null;
  submitButtonPosition: 'bottom' | 'right';
  disclaimer: string | null;
  formType: string;
  dateFormat: 'DD/MM/YYYY' | 'MM/DD/YYYY' | 'YYYY/MM/DD';
  successMessage: string | null;
  errorMessage: string | null;
  contentType: 'form';
};
