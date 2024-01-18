// @TODO fix eslint complexity
/* eslint-disable complexity */ 
import classNames from "classnames";
import { Navigation } from "@/components/sections/Navigation/Navigation";
import { Footer } from "@/components/sections/Footer/Footer";
import { generateColorClassnames } from "@/helpers/utils";
import { generateFontClassnames } from "@/helpers/fonts";
import getPage from "@/helpers/contentful/graphql/getPage";
import getNavigation from "@/helpers/contentful/graphql/getNavigation";
import getFooter from "@/helpers/contentful/graphql/getFooter";
import styles from "./styles.module.css";

// @TODO metadata
export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { slug: Array<string> }
}) {
  // console.log(params, JSON.stringify(children, null, 4))
  let navigation, footer, page, fontTheme, colorTheme, borderRadiusTheme, headingFontSizeTheme;
  try {
    while (
      params.slug!.length >= 0 &&
      (!navigation || !footer || !fontTheme || !colorTheme || !borderRadiusTheme)
    ) {
      if (!navigation) navigation = await getNavigation(`/${params.slug!.join("/")}`);
      if (!footer) footer = await getFooter(`/${params.slug!.join("/")}`);
      if (!fontTheme || !colorTheme || !borderRadiusTheme) {
        page = await getPage(`/${params.slug!.join("/")}`);
        if (page) {
          fontTheme = generateFontClassnames(page.fontMain, page.fontHeading);
          colorTheme = generateColorClassnames(
            page.colorPrimary,
            page.colorSecondary
          );
          borderRadiusTheme = `${page.borderRadius}-border-radius-assets`;
          headingFontSizeTheme= `${page.headingFontSize}-heading-font-size`;
        }
      }
      params.slug!.pop();
    }
  } catch(e) {
    console.error(e);
  }

  return (
    <div
      className={classNames(
        fontTheme,
        styles[borderRadiusTheme ?? ""],
        styles[headingFontSizeTheme ?? ""],
        styles[colorTheme?.primaryColor ?? ""],
        styles[colorTheme?.secondaryColor ?? ""]
      )}
    >
      {navigation && <Navigation data={navigation} />}
      {children}
      {footer && <Footer data={footer} />}
    </div>
  );
}
