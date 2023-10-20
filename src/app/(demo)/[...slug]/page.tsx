import getPage from "@/helpers/contentful/graphql/getPage"
import Sections from "@/components/sections/Sections/Sections"
import { Params } from "@/helpers/types"
import getProductDetail from "@/helpers/contentful/graphql/getProductDetail"
import ProductDetail from "@/components/sections/ProductDetail/ProductDetail"
import Cart from "@/components/sections/Cart/Cart"
import classNames from "classnames"
import CheckoutForm from "@/components/elements/CheckoutForm/CheckoutForm"
import Order from "@/components/elements/Order/Order"
import { Metadata, ResolvingMetadata } from 'next'
import getBlogDetails from "@/helpers/contentful/graphql/getBlogDetails"
import BlogDetails from "@/components/sections/BlogDetails/BlogDetails"

export async function generateMetadata(
  { params } : {params: Params},
  parent: ResolvingMetadata
): Promise<Metadata> {
  const previousImages = (await parent).openGraph?.images || []
  try {
    const data = await getPage(`/${params.slug.join('/')}`)
    return {
      title: data.metaTitle,
      description: data.metaDescription,
      keywords: data.metaKeywords ?? data.tags ,
      openGraph: {
        images: [data.metaImage ? data.metaImage : {}, ...previousImages]
      }
    }
  } catch (e) {
    console.error(e)
    return {}
  }
}

export default async function Page({ params }: { params: Params }) {
  try {
    let data
    if (params.slug.find((item) => item==="product")) {
      data = await getProductDetail(params.slug[params.slug.length - 1])
      return (
        <main className="flex flex-col gap-28 md:gap-40 min-h-screen pb-24">
          <ProductDetail data={data} />
        </main>
      )
    }
    if (params.slug.find((item) => item === "blog")) {
      data = await getBlogDetails(params.slug[params.slug.length - 1])
      return (
        <main className="flex flex-col gap-28 md:gap-40 min-h-screen pb-24">
          <BlogDetails data={data} />
        </main>
      )
    }
    if (params.slug[params.slug.length - 1] === "cart") {
      return (
        <main className="min-h-screen">
          <div className={classNames("container", "px-4", "mx-auto", "mt-32")}>
            <Cart />
          </div>
        </main>
      )
    }
    if (params.slug[params.slug.length - 1] === "checkout") {
      return (
        <main className="min-h-screen">
          <div className={classNames("container", "px-4", "py-20", "mx-auto")}>
            <h2 className="mb-10 font-heading text-5xl text-center">
              Checkout
            </h2>
            <div className="grid lg:grid-cols-2 gap-8">
              <CheckoutForm />
              <Order />
            </div>
          </div>
        </main>
      )
    }
    data = await getPage(`/${params.slug.join('/')}`)
    return <Sections data={data.content} />
  } catch (e) {
    console.error(e)
    return (
      <main>
        404 Error Page
      </main>
    )
  }

}
