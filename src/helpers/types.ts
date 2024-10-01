export type MediaType = {
  id: string;
  url: string;
  title: string;
  width: number;
  height: number;
  contentType: string;
};
export type SNSType = {
  linkedInUrl: string | null;
  facebookUrl: string | null;
  twitterUrl: string | null;
  youtubeUrl: string | null;
  instagramUrl: string | null;
};

export type BackgroundColorType =
  | 'neutral'
  | 'red'
  | 'orange'
  | 'amber'
  | 'yellow'
  | 'lime'
  | 'green'
  | 'emerald'
  | 'teal'
  | 'cyan'
  | 'sky'
  | 'blue'
  | 'indigo'
  | 'violet'
  | 'purple'
  | 'fuchsia'
  | 'pink'
  | 'rose';

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
  buttonLabel: string;
  url: string | null;
  openNewTab: boolean;
  icon?: {
    url: string;
    title: string;
    width: number;
    height: number;
  } | null;
  withArrow: boolean;
  buttonVariant: ButtonVariant;
};

export type LinkType = {
  id: string;
  text: string;
  image: {
    url: string;
    title: string;
    width: number;
    height: number;
  } | null;
  url: string;
  openNewTab: boolean;
  contentType: 'link';
};

export interface LinkGroupType {
  id: string;
  title: string;
  links: Array<LinkType>;
  contentType: 'linkgroup';
}

export interface SubmenuType {
  id: string;
  title: string;
  menu: Array<LinkType | LinkGroupType>;
  featuredContent: Array<BlogType | PageType>;
  layout: 'dropdown' | 'mega';
  contentType: 'submenu';
}

export type NavigationLayout = 'standard' | 'minimal' | 'overlay';
export interface NavigationType {
  url: string;
  logo: MediaType;
  logoRedirect: string | null;
  menu: Array<LinkType | SubmenuType>;
  showModeSelector: boolean;
  buttons: Array<ButtonType>;
  hotButtons: Array<ButtonType>;
  layout: 'standard' | 'minimal' | 'overlay';
  darkMode: boolean;
}

export interface FooterType {
  url: string;
  logo: {
    url: string;
    title: string;
  };
  logoRedirect: string | null;
  description: string | null;
  copyright: string | null;
  sns: SNSType | null;
  menu: Array<LinkGroupType>;
  backgroundColor: BackgroundColorType | null;
  backgroundImage: MediaType | null;
  darkMode: boolean;
}

export type SEOType = {
  metaTitle: string;
  metaDescription: string;
  sharedImage: {
    url: string;
    title: string;
    width: number;
    height: number;
  };
};

export type PageContentType =
  | HeroType
  | AlertType
  | ContentPTType
  | ContentListType
  | FeaturedContentType
  | CTAType;

export type PageType = {
  id: string;
  title: string;
  url: string;
  content: PageContentType | null;
  fontMain: string;
  fontHeading: string;
  headingFontSize: 'standard' | 'standout' | 'impactful';
  colorPrimary: string;
  colorSecondary: string;
  borderRadius: string;
  metaTitle: string | null;
  metaDescription: string | null;
  metaKeywords: Array<string> | null;
  metaImage: MediaType | null;
  contentType: 'page';
};

export type BlogType = {
  id: string;
  firstPublishedAt: string;
  publishedAt: string;
  title: string;
  slug: string;
  featured: boolean;
  summary: string | null;
  content: string | null;
  topics: Array<string>;
  media: MediaType | null;
  author: ExpertType;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: Array<string>;
  metaImage: MediaType;
  contentType: 'blog';
};
export const BLOG_PAGE_SIZE = 9;

export type ExpertType = {
  id: string;
  fullName: string;
  portrait: MediaType | null;
  role: string | null;
  specialization: Array<string> | null;
  organization: string | null;
  summary: string | null;
  sns: SNSType | null;
  contentType: 'expert';
};

export type MediaAspectRatioType =
  | 'auto'
  | 'square'
  | '16/9'
  | '4/3'
  | '3/4'
  | '3/2';

export type FeaturedContentType = {
  id: string;
  title: string;
  htmlid: string;
  eyebrow: string | null;
  displayTitle: string | null;
  summary: string | null;
  media: Array<MediaType>;
  mediaPosition: 'left' | 'right';
  mediaAspectRatio: MediaAspectRatioType;
  supportingItems: Array<FlexibleContentType>;
  buttons: Array<ButtonType>;
  introAlignment: AlignmentType;
  layout: 'flex row' | 'full top';
  backgroundColor: BackgroundColorType | null;
  backgroundImage: MediaType | null;
  enableParallaxEffect: boolean;
  darkMode: boolean;
  showBottomSeparator: boolean;
  contentType: 'featuredcontent';
};

export type HeroLayoutVariant = 'overlay' | 'vertical' | 'horizontal';

export type HeroType = {
  id: string;
  htmlid: string | null;
  eyebrow: string | null;
  displayTitle: string | null;
  summary: string | null;
  buttons: Array<ButtonType>;
  media: MediaType | null;
  layout: 'horizontal' | 'vertical';
  introAlignment: AlignmentType;
  backgroundColor: BackgroundColorType | null;
  backgroundImage: MediaType | null;
  enableParallaxEffect: boolean;
  darkMode: boolean;
  showBottomSeparator: boolean;
  contentType: 'hero';
};

export type AlertType = {
  id: string;
  icon: MediaType | null;
  message: string | null;
  backgroundColor: string | null;
  darkMode: boolean;
  contentType: 'alert';
};

export type ContentPTType = {
  id: string;
  htmlid: string | null;
  eyebrow: string | null;
  displayTitle: string | null;
  summary: string | null;
  buttons: Array<ButtonType>;
  introAlignment: AlignmentType;
  presentationItems: Array<FlexibleContentType>;
  itemAlignment: AlignmentType;
  presentationVariant:
    | 'carousel'
    | 'sleek carousel'
    | 'tab'
    | 'accordion'
    | 'scroll';
  layout: 'flex row' | 'full top';
  backgroundColor: BackgroundColorType | null;
  backgroundImage: MediaType | null;
  enableParallaxEffect: boolean;
  darkMode: boolean;
  showBottomSeparator: boolean;
  contentType: 'contentpresentation';
};

export type StatisticsType = {
  id: string;
  number: string;
  text: string;
  contentType: 'statistics';
};

export type TestimonialType = {
  id: string;
  content: string | null;
  portrait: MediaType | null;
  name: string | null;
  role: string | null;
  rating: 0 | 1 | 2 | 3 | 4 | 5;
  contentType: 'testimonial';
};

export type FlexibleContentType = {
  id: string;
  eyebrow: string | null;
  displayTitle: string | null;
  description: string | null;
  buttons: Array<ButtonType>;
  redirectUrl: string | null;
  media: Array<MediaType>;
  mediaAspectRatio: MediaAspectRatioType;
  contentType: 'flexiblecontent';
};

export type PricingPlanType = {
  id: string;
  title: string;
  pricing: string;
  pricingSuffix: string;
  badge: string;
  description: string | null;
  ctaButton: ButtonType;
  contentType: 'pricingplan';
};

export type Content =
  | BlogType
  | PageType
  | ExpertType
  | StatisticsType
  | FlexibleContentType
  | PricingPlanType
  | TestimonialType;

export type ItemSize = 'S' | 'M' | 'L' | 'XL' | '2XL';

export type ContentListType = {
  id: string;
  eyebrow: string | null;
  displayTitle: string | null;
  summary: string | null;
  buttons: Array<ButtonType>;
  introAlignment: AlignmentType;
  listItems: Array<Content>;
  itemAlignment: AlignmentType;
  itemLayout: 'horizontal' | 'vertical';
  itemSize: ItemSize;
  listVariant: 'carousel' | 'masonry' | 'deck';
  layout: 'flex row' | 'full top';
  backgroundColor: BackgroundColorType | null;
  backgroundImage: MediaType | null;
  enableParallaxEffect: boolean;
  darkMode: boolean;
  showBottomSeparator: boolean;
  htmlid: string | null;
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
};

export type CTAType = {
  id: string;
  title: string;
  htmlid: string | null;
  eyebrow: string | null;
  displayTitle: string | null;
  summary: string | null;
  introAlignment: AlignmentType;
  buttons: Array<ButtonType>;
  form: FormType | null;
  layout: 'flex row' | 'full top';
  backgroundColor: string | null;
  backgroundImage: MediaType | null;
  enableParallaxEffect: boolean;
  darkMode: boolean;
  showBottomSeparator: boolean;
  contentType: 'cta';
};

export type FormType = {
  id: string;
  title: string;
  fields: Array<FormFieldType>;
  submitButton: ButtonType | null;
  formType: string;
  dateFormat: 'DD/MM/YYYY' | 'MM/DD/YYYY' | 'YYYY/MM/DD';
  successMessage: string | null;
  errorMessage: string | null;
};
