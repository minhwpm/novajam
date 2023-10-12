'use client'
import Button from "@/components/elements/Button/Button";
import Container from "@/components/elements/Container/Container";
import { InquiryFormType } from "@/utils/types";
import classNames from "classnames";
import  { useForm }  from  "react-hook-form";

interface Props {
  data: InquiryFormType
}
type FormValues = {
  [x: string]: string;
}

export const InquiryForm: React.FC<Props> = ({ data }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { title, subtitle, type, fields, submitButton, backgroundImage, htmlid } = data
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormValues>();

  function onSubmit(data: FormValues) {
    console.log(data)
  }

  console.log("FORM STATE", errors)

  return (
    <section
      id={htmlid}
      style={backgroundImage?.url ? {
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        backgroundImage: `url(${backgroundImage.url})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundBlendMode: 'overlay'
      } : {} }
    >
      <Container>
        <div className="grid lg:grid-cols-12 gap-10 my-24">
          <div className={classNames("col-span-6")}>
            <h3 className="text-5xl font-bold mb-8">
              {title}
            </h3>
            <p className="text-xl max-w-lg">
              {subtitle}
            </p>
          </div>
          <div className="col-span-6">
            <form 
              className="max-w-xl mx-auto lg:mr-0 grid md:grid-cols-2 gap-x-5 gap-y-3 px-8 py-12 bg-white bg-opacity-50 rounded" 
              onSubmit={handleSubmit(onSubmit)}
            >
              {fields.map(field => {
                switch (field.type) {
                  case "select": 
                    return (
                      <div className="col-span-2 md:col-span-1">
                        <select
                          key={field.id}
                          id={field.label}
                          className="block rounded-md w-full px-4 py-3 focus:outline-none focus:shadow-lg placeholder:text-neutral-400"
                          {...register(field.label, { required: field.required })}
                        >
                          <option value="" disabled selected className="text-neutral-400">
                            {field.placeholder ?? field.label}
                          </option>
                          {field.options.map(option => (
                            <option
                              key={option}
                              value={option}
                            >
                              {option}
                            </option>
                          ))}
                        </select>
                        <div className="text-sm text-red-500 h-6 pt-1 pl-4">
                          { errors[field.label] && (<p>This field is required</p>)}
                        </div>
                      </div>
                    )
                  case "textarea":
                    return (
                      <div className="col-span-2">
                        <textarea
                          key={field.id}
                          className="block rounded-md w-full px-4 py-3 focus:outline-none focus:shadow-lg placeholder:text-neutral-400"
                          id={field.label}
                          placeholder={field.placeholder ?? "Your message..." + (field.required ? "*" : "")}
                          rows={5}
                          {...register(field.label, { required: field.required })}
                        />
                        <div className="text-sm text-red-500 h-6 pt-1 pl-4">
                          { errors[field.label] && (<p>This field is required</p>)}
                        </div>
                      </div>
                    )
                  default:
                    return (
                      <div className={classNames("col-span-2 md:col-span-1 relative")}>
                        {field.type === "date" && 
                          <label className="block mb-1 absolute -top-6 text-neutral-600" htmlFor={field.label}>
                            {field.label} {field.required && "*"}
                          </label>
                        }
                        <input
                          className="block rounded-md w-full px-4 py-3 focus:outline-none focus:shadow-lg placeholder:text-neutral-400"
                          key={field.id}
                          id={field.label}
                          type={field.type}
                          {...register(field.label, { required: field.required })}
                          placeholder={field.placeholder ?? field.label + (field.required ? "*" : "")}
                        />
                        <div className="text-sm text-red-500 h-6 pt-1 pl-4">
                          { errors[field.label] && (<p>This field is required</p>)}
                        </div>
                      </div>
                    )
                }
              })}
              <div className="flex flex-col col-start-2">
                <Button variant={submitButton.buttonVariant ?? "black"} size="lg" type="submit">
                  {submitButton.text}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </Container>
    </section>
    
  )
}