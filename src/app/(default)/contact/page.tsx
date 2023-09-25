import Container from "@/components/elements/Container/Container";
import ContactForm from "@/components/sections/ContactForm/ContactForm";


export default async function Page() {
  return (
    <main>
      <section className="py-16">
        <Container>
          <div className="grid lg:grid-cols-12 gap-10">
            <div className="col-span-6">
              <h1 className="text-5xl font-bold mb-8">
                Contact Us
              </h1>
              <p className="text-xl">
                Should you have any questions regarding our product or services, do not hesitate to reach out.
              </p>
            </div>
            <div className="col-span-6">
              <div className="max-w-lg m-auto">
                <ContactForm />
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  )
}