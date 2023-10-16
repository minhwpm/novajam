/* eslint-disable complexity */
'use client'
import classNames from "classnames";
import  { useForm }  from "react-hook-form";
import Button from "@/components/elements/Button/Button";
import Container from "@/components/elements/Container/Container";
import { DatePicker } from "@/components/elements/DatePicker/DatePicker";
import { InquiryFormType } from "@/utils/types";

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
  const { register, control, handleSubmit, watch, formState: { errors } } = useForm<FormValues>();

  function onSubmit(data: FormValues) {
    console.log(data)
  }

  console.log("FORM STATE", errors)

  return (
    <section
      id={htmlid}
      style={
        backgroundImage
          ? {
              backgroundColor: "rgba(0, 0, 0, 0.3)",
              backgroundImage: `url(${backgroundImage.url})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundBlendMode: "overlay",
            }
          : {}
      }
      className={classNames({ "bg-primary-600": !backgroundImage })}
    >
      <Container>
        <div className="grid grid-cols-12 gap-y-10 md:gap-x-10 my-24">
          <div className={classNames("col-span-12 lg:col-span-5 text-white drop-shadow-lg")}>
            <h3 className="text-4xl md:text-5xl font-bold mb-8 tracking-wide leading-snug text-center lg:text-start">
              {title}
            </h3>
            <p className="max-w-lg md:text-lg tracking-wide leading-snug text-center mx-auto lg:text-start lg:mx-0">{subtitle}</p>
          </div>
          <div className="col-span-12 lg:col-span-7">
            <form
              className={classNames(
                "max-w-xl mx-auto lg:mr-0 grid grid-cols-2 gap-x-5 gap-y-3 px-8 py-12 bg-white bg-opacity-70 rounded",
                { "gap-x-0": fields.length === 1 }
              )}
              onSubmit={handleSubmit(onSubmit)}
            >
              {fields.length > 0 &&
                fields.map((fieldItem) => {
                  switch (fieldItem.type) {
                    case "select":
                      return (
                        <div className={classNames("col-span-2",
                          { "md:col-span-1": fieldItem.uiWidth === "half-size"}
                        )}>
                          <select
                            key={fieldItem.id}
                            id={fieldItem.label}
                            className="block border rounded-md w-full px-4 py-3.5 focus:outline-none focus:shadow-lg text-neutral-800 placeholder:text-neutral-400"
                            {...register(fieldItem.label, {
                              required: fieldItem.required,
                            })}
                          >
                            <option
                              value=""
                              disabled
                              selected
                              className="text-neutral-400"
                            >
                              {fieldItem.placeholder ?? fieldItem.label}
                            </option>
                            {fieldItem.options.map((option) => (
                              <option key={option} value={option} className="text-neutral-800">
                                {option}
                              </option>
                            ))}
                          </select>
                          <div className="text-sm text-red-500 h-6 pt-1 pl-4">
                            {errors[fieldItem.label] && (
                              <p>This fieldItem is required</p>
                            )}
                          </div>
                        </div>
                      );
                    case "textarea":
                      return (
                        <div className="col-span-2">
                          <textarea
                            key={fieldItem.id}
                            className="block border rounded-md w-full px-4 py-3.5 focus:outline-none focus:shadow-lg text-neutral-800 placeholder:text-neutral-400"
                            id={fieldItem.label}
                            placeholder={
                              fieldItem.placeholder ??
                              "Your message..." + (fieldItem.required ? "*" : "")
                            }
                            rows={5}
                            {...register(fieldItem.label, {
                              required: fieldItem.required,
                            })}
                          />
                          <div className="text-sm text-red-500 h-6 pt-1 pl-4">
                            {errors[fieldItem.label] && (
                              <p>This fieldItem is required</p>
                            )}
                          </div>
                        </div>
                      );
                    case "date":
                      return (
                        <div className={classNames("col-span-2 flex flex-col",
                          { "md:col-span-1": fieldItem.uiWidth === "half-size"}
                        )}>
                          <DatePicker
                            key={fieldItem.id}
                            className="w-full border rounded-md px-4 py-3.5 cursor-pointer focus:outline-none focus:shadow-lg text-neutral-800 placeholder:text-neutral-400"
                            placeholder={
                              fieldItem.placeholder ??
                              fieldItem.label + (fieldItem.required ? "*" : "")
                            }
                            control={control}
                            {...register(fieldItem.label, {
                              required: fieldItem.required,
                            })}
                            required={fieldItem.required}
                          />
                          <div className="text-sm text-red-500 h-6 pt-1 pl-4">
                            {errors[fieldItem.label] && (
                              <p>This fieldItem is required</p>
                            )}
                          </div>
                        </div>
                      );
                    default:
                      return (
                        <div
                          className={classNames(
                            "col-span-2 relative",
                            { "md:col-span-1": fieldItem.uiWidth === "half-size" } // For subscription form (Email fieldItem & Submit button)
                          )}
                        >
                          {fieldItem.type === "date" && (
                            <label
                              className="block mb-1 absolute -top-6 text-neutral-800"
                              htmlFor={fieldItem.label}
                            >
                              {fieldItem.label} {fieldItem.required && "*"}
                            </label>
                          )}
                          <input
                            className={classNames(
                              "block border rounded-md w-full px-4 py-3.5 focus:outline-none focus:shadow-lg text-neutral-800 placeholder:text-neutral-400"
                            )}
                            key={fieldItem.id}
                            id={fieldItem.label}
                            type={fieldItem.type}
                            {...register(fieldItem.label, {
                              required: fieldItem.required,
                            })}
                            placeholder={
                              fieldItem.placeholder ??
                              fieldItem.label + (fieldItem.required ? "*" : "")
                            }
                          />
                          <div className="text-sm text-red-500 h-6 pt-1 pl-4">
                            {errors[fieldItem.label] && (
                              <p>This fieldItem is required</p>
                            )}
                          </div>
                        </div>
                      );
                  }
                })}
              <div className={classNames("col-span-2 flex flex-col")}>
                <Button
                  variant={submitButton.buttonVariant ?? "black"}
                  size="lg"
                  type="submit"
                >
                  {submitButton.text}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </Container>
    </section>
  );
}