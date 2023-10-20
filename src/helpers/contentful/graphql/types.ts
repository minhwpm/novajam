type Link = {
  text: string
  newTab: boolean
  url: string
}
type LinkGroupLinksCollection = {
  items: Array<Link>
}
type LinkGroup = {
  title: string
  linksCollection: LinkGroupLinksCollection
}
type SubmenuMenuCollection = {
  items: Array<LinkGroup>
}

type SubMenu = {
  title: string
  menuCollection: SubmenuMenuCollection
}

type HeaderMenuItem = Link | SubMenu
type HeaderMenuCollection = {
  items: HeaderMenuItem
}

type Button = {
  text: string
  newTab: boolean
  url: string
  bottomType: string
}

type HeaderButtonsCollection = {
  items: Array<Button>
}
type Asset = {
  url: string
  title: string
}
type Header = {
  logo: Asset
  menuCollection: HeaderMenuCollection
  butonsCollection: HeaderButtonsCollection
}
export type HeaderCollection = {
  items: Array<Header>
}
