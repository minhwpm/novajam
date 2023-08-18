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

export interface SubmenuProps {
  title: string
  menu: Array<{
    title: string
    links: Array<LinkProps>
  }>
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
      buttonType: ButtonVariant
    }>
  }
  variant?: "standard" | "alternate"
  // @TODO following 4 properties
  stickyType?: 'none' | 'scroll-up' | 'scroll-down'
  logoAlignment?: 'center' | 'left'
  navAlignment?: 'center' | 'left' | 'right' // this property is for XL screens
  backgroundColor?: 'white' | 'transparent'
}