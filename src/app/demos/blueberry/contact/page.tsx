import ContactForm from "@/components/sections/ContactForm/ContactForm"
import classNames from "classnames"

const defaultPageData = {
  title: "We'd love to hear from you",
  content: "We love the growing interest in BlueBERRY we’re seeing worldwide! If you have any questions or just want to reach out to us, please fill out the form below and we will contact you as soon as possible!",
}

export default function ContactPage() {
  const { title, content } = defaultPageData
  return (
    <main className="flex flex-col gap-28 md:gap-40 min-h-screen pb-24">
      <div className={classNames("w-full", "py-20", "mx-auto", "flex", "flex-col", "gap-8", "items-center")}>
        <div className="w-full bg-primary-100 flex justify-center py-8">
          <div className="text-center max-w-4xl ">
            <h2 className="font-semibold text-4xl mb-8 text-primary-600">
              {title}
            </h2>
            <div className="text-slate-600 text-lg">
              {content}
            </div>
          </div>
        </div>
        <div className="container flex justify-center">
          <div className="lg:w-1/2 bg-primary-s50 p-4 md:p-8">
            <ContactForm />
          </div>
        </div>
      </div>
    </main>
  )
}