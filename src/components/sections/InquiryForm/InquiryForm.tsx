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
  const { title, subtitle, type, fields, submitButton, backgroundImage } = data
  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormValues>();
  console.log("HHHH", data)

  function onSubmit(data: FormValues) {
    console.log(data)
  }

  return (
    <section
      className=""
      style={backgroundImage?.url ? {
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        backgroundImage: `url(${backgroundImage.url})`,
        backgroundBlendMode: 'overlay'
      } : {} }
    >
      <Container>
        <div className="grid lg:grid-cols-12 gap-10 my-20">
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
              className="max-w-xl ml-auto grid md:grid-cols-2 gap-5 p-8 bg-white rounded" 
              onSubmit={handleSubmit(onSubmit)}
            >
              {fields.map(field => {
                switch (field.type) {
                  case "select": 
                    return (
                      <div className="col-span-2">
                        <label className="block mb-1" htmlFor={field.label}>
                          {field.label} {field.required && "*"}
                        </label>
                        <select
                          key={field.id}
                          id={field.label}
                          className="block border rounded-sm w-full px-4 py-2 focus:outline-none focus:shadow-lg"
                          placeholder={field.placeholder ?? "Select an option"} 
                        >
                          {field.options.map(option => (
                            <option
                              key={option}
                              value={option}
                            >
                              {option}
                            </option>
                          ))}
                        </select>
                      </div>
                    )
                  case "textarea":
                    return (
                      <div className="col-span-2">
                        <label className="block mb-1" htmlFor={field.label}>
                          {field.label} {field.required && "*"}
                        </label>
                        <textarea
                          key={field.id}
                          className="block border rounded-sm w-full px-4 py-2 focus:outline-none focus:shadow-lg"
                          id={field.label}
                          placeholder="" //@TODO: add Placeholder to Form Field Content Type
                          rows={5}
                          {...register(field.label)}
                        />
                      </div>
                    )
                  default:
                    return (
                      <div className={classNames({
                        "col-span-2 md:col-span-1" : field.type === "phone"
                      })}>
                        <label className="block mb-1" htmlFor={field.label}>
                          {field.label} {field.required && "*"}
                        </label>
                        <input
                          className="block border rounded-sm w-full px-4 py-2 focus:outline-none focus:shadow-lg"
                          key={field.id}
                          id={field.label}
                          type={field.type}
                        />
                      </div>
                    )
                }
              })}
              <div className="col-span-2 mt-4 flex justify-center">
                <Button variant={submitButton.buttonType} type="input">
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