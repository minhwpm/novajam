import classNames from "classnames";
import { Navigation } from "@/components/sections/Navigation/Navigation";
import { Footer } from "@/components/sections/Footer/Footer";
import { generateColorClassnames } from "@/lib/utils";
import { generateFontClassnames } from "@/lib/fonts";
import getPage from "@/lib/query/getPage";
import getNavigation from "@/lib/query/getNavigation";
import getFooter from "@/lib/query/getFooter";
import styles from "./styles.module.css";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { slug: Array<string> }
}) {
  let navigation, footer, page, fontTheme, colorTheme, borderRadiusTheme, headingFontSizeTheme;
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
        borderRadiusTheme = `${page.borderRadius}-border-radius-theme`;
        headingFontSizeTheme= `${page.headingFontSize}-heading-font-size`;
      }
    }
    params.slug!.pop();
  }
  

  return (
    <div
      className={classNames(
        "main min-h-screen flex flex-col justify-between", //@TODO reconsider flexbox here
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
