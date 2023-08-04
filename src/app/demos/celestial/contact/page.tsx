import ContactForm from "@/components/sections/ContactForm/ContactForm"
import classNames from "classnames"

const defaultPageData = {
  title: "We'd love to help",
  content: "Reach out and we'll get in touch within 24 hours.",
}

export default function ContactPage() {
  const { title, content } = defaultPageData
  return (
    <main className="flex flex-col gap-28 md:gap-40 min-h-screen pb-24">
      <div className={classNames("container", "px-4", "py-20", "mx-auto", "grid", "lg:grid-cols-2", "gap-8")}>
        <div>
          <h2 className="font-semibold text-4xl mb-4">
            {title}
          </h2>
          <div className="text-slate-600 text-lg">
            {content}
          </div>
        </div>
        <div className="bg-slate-100 p-4 md:p-8">
          <ContactForm />
        </div>
      </div>
    </main>
  )
}