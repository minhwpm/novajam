/* eslint-disable complexity */ // @TODO fix eslint complexity
import { Analytics } from "@vercel/analytics/react";
import Navigation from "@/components/sections/Navigation/Navigation";
import Footer from "@/components/sections/Footer/Footer";
import classNames from "classnames";
import getFooter from "@/helpers/contentful/graphql/getFooter";
import getPage from "@/helpers/contentful/graphql/getPage";
import { Params } from "@/helpers/types";
import { generateColorClassnames } from "@/helpers/utils";
import styles from "./styles.module.css";
import { generateFontClassnames } from "@/helpers/fonts";
import getNavigation from "@/helpers/contentful/graphql/getNavigation";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Params;
}) {
  // console.log(params, JSON.stringify(children, null, 4))
  const slug = [...params.slug];
  let navigation, footer, page, fontTheme, colorTheme, borderRadiusTheme, headingFontSizeTheme;
  try {
    while (
      slug.length > 0 &&
      (!navigation || !footer || !fontTheme || !colorTheme || !borderRadiusTheme)
    ) {
      if (!navigation) navigation = await getNavigation(`/${slug.join("/")}`);
      if (!footer) footer = await getFooter(`/${slug.join("/")}`);
      if (!fontTheme || !colorTheme || !borderRadiusTheme) {
        page = await getPage(`/${slug.join("/")}`);
        if (page) {
          // console.log("PAGE THEME", page.fontMain, page.fontHeading, page.colorPrimary, page.colorSecondary)
          fontTheme = generateFontClassnames(page.fontMain, page.fontHeading);
          colorTheme = generateColorClassnames(
            page.colorPrimary,
            page.colorSecondary
          );
          borderRadiusTheme = `${page?.borderRadius}-border-radius-assets`;
          headingFontSizeTheme= `${page.headingFontSize}-heading-font-size`;
        }
      }
      slug.pop();
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
        // @TODO refactor
        styles[colorTheme ? colorTheme[0] : ""],
        styles[colorTheme ? colorTheme[1] : ""]
      )}
    >
      {navigation && <Navigation data={navigation} />}
      {children}
      {footer && <Footer data={footer} />}
      <Analytics />
    </div>
  );
}
