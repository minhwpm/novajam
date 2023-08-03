'use client'
import Button from "@/components/elements/Button/Button";
import Link from "next/link";
import  { useForm }  from  "react-hook-form";

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
}

const ContactForm = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormValues>();

  function onSubmit(data: FormValues) {
    console.log(data)
  }

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
      <div className="">
        
      </div>
      <div>
        <label className="block mb-1" htmlFor="firstName">
          First Name *
        </label>
        <input
          className="block border rounded-sm w-full px-4 py-2 focus:outline-none focus:shadow-lg"
          type="text"
          id="firstName"
          {...register("firstName", { required: true })}
        />
      </div>

      <div>
        <label className="block mb-1" htmlFor="lastName">
          Last Name *
        </label>
        <input
          className="block border rounded-sm w-full px-4 py-2 focus:outline-none focus:shadow-lg"
          type="text"
          id="lastName"
          {...register("lastName", { required: true })}
        />
      </div>
      <div className="grid md:grid-cols-2 md:gap-5">
        <div>
          <label className="block mb-1" htmlFor="email">
            Email *
          </label>
          <input
            className="block border rounded-sm w-full px-4 py-2 focus:outline-none focus:shadow-lg"
            type="text"
            id="email"
            {...register("email", { required: true })}
          />
        </div>
        <div>
          <label className="block mb-1" htmlFor="phone">
            Phone <span className="text-sm text-slate-500">optional</span>
          </label>
          <input
            className="block border rounded-sm w-full px-4 py-2 focus:outline-none focus:shadow-lg"
            type="text"
            id="phone"
            {...register("phone")}
          />
        </div>
      </div>
      <div>
        <label className="block mb-1" htmlFor="companyOrganiztion">
          Company or Organization <span className="text-sm text-slate-500">optional</span>
        </label>
        <input
          className="block border rounded-sm w-full px-4 py-2 focus:outline-none focus:shadow-lg"
          type="text"
          id="companyOrganiztion"
          {...register("phone")}
        />
      </div>
      <div className="">
        <label className="block mb-1" htmlFor="message">
          Message *
        </label>
        <textarea
          className="block border rounded-sm w-full px-4 py-2 focus:outline-none focus:shadow-lg"
          id="message"
          placeholder="Tell us how we can help"
          rows={5}
          {...register("message")}
        />
      </div>
      <div className="mt-4 flex justify-center">
        <Button variant="black">
          Send message
        </Button>
      </div>
      <p className="text-slate-500 text-sm mt-6">
        By submitting this form, you confirm that you have read and understood our <Link className="underline" href="/privacy-policy">Privacy Policy</Link>.
      </p>
    </form>
  )
}

export default ContactForm