/* eslint-disable complexity */
'use client'
import classNames from "classnames";
import  { useForm }  from "react-hook-form";
import Button from "@/components/elements/Button/Button";
import Container from "@/components/elements/Container/Container";
import { DatePicker } from "@/components/elements/DatePicker/DatePicker";
import { InquiryFormType } from "@/helpers/types";
import { Select } from "@/components/elements/Select/Select";
import { getRegEx } from "@/helpers/utils";
import RichText from "@/components/elements/RichText/RichText";

interface Props {
  data: InquiryFormType
}
type FormValues = {
  [x: string]: string;
}

export const InquiryForm: React.FC<Props> = ({ data }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { title, heading, label, subheading, formType, fields, submitButton, backgroundImage, htmlid, dateFormat, displayMode } = data
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { register, control, handleSubmit, setError, watch, formState: { errors } } = useForm<FormValues>();

  async function onSubmit(formValues: FormValues) {
    console.log("FORM VALUES:", formValues)
    try {
      const res = await fetch(`/api/inquiry-form-submission/`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          title: title,
          type: formType,
          submittedContent: {
            ...formValues,
          },
        }),
      });
      console.log(res);
    } catch (err) {
      console.error(err);
    }
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
          <div className={classNames("col-span-12 lg:col-span-5 text-white drop-shadow-lg flex flex-col items-center lg:items-start")}>
            {label && (
              <div className="tracking-widest text-white font-semibold text-center lg:text-start">
                {label}
              </div>
            )}
            {heading && (
              <div className={classNames("text-4xl md:text-4.5xl lg:text-5xl !leading-normal font-heading tracking-wide  text-center lg:text-start",
                {"mt-2": label},
              )}>
                <RichText htmlString={heading} />
              </div>
            )}
            {subheading && (
              <div className={classNames("text-white prose-lg lg:prose-xl max-w-xl lg:max-w-3xl text-center lg:text-start",
                {"mt-5": heading},
              )}>
                {subheading}
              </div>
            )}
          </div>
          <div className="col-span-12 lg:col-span-7">
            <form
              className={classNames(
                "max-w-xl mx-auto lg:mr-0 grid grid-cols-2 gap-x-5 gap-y-3 px-8 pt-6 pb-12 bg-white bg-opacity-70 rounded-assets",
                { "gap-x-0": fields.length === 1 }
              )}
              onSubmit={handleSubmit(onSubmit)}
            >
              {fields.length > 0 &&
                fields.map((fieldItem) => (
                  <div
                    key={fieldItem.id} 
                    className={classNames("relative col-span-2 flex flex-col",
                      { "md:col-span-1": fieldItem.uiWidth === "half-size"}
                    )}
                  >
                    <div className="text-xs text-red-500 h-6 pt-1 pl-4">
                      { errors[fieldItem.label]?.type === "required" && (
                        <p>required * </p>
                      )}
                      { errors[fieldItem.label]?.type === "pattern" &&  (
                        <p>Wrong format. Please try again. </p> 
                      )}
                    </div>
                    {fieldItem.type === "select" && (
                      <Select
                        className="rounded-assets w-full"
                        control={control}
                        options={fieldItem.options.map(option => {
                          return {
                            label: option,
                            value: option
                          }
                        })}
                        placeholder={(
                          <div className="text-neutral-400">
                            {fieldItem.placeholder ?? fieldItem.label}
                          </div>
                        )}
                        {...register(fieldItem.label, {
                          required: fieldItem.required,
                        })}
                      />
                    )}
                    
                    {fieldItem.type === "date" && (
                      <DatePicker
                        className="w-full border rounded-assets px-4 py-3.5 cursor-pointer focus:outline-none focus:shadow-lg text-neutral-800 placeholder:text-neutral-400"
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
                    )}

                    {fieldItem.type === "textarea" && (
                      <textarea
                        key={fieldItem.id}
                        className="block border rounded-assets w-full px-4 py-3.5 focus:outline-none focus:shadow-lg text-neutral-800 placeholder:text-neutral-400"
                        id={fieldItem.label}
                        placeholder={
                          fieldItem.placeholder ??
                          fieldItem.label + (fieldItem.required ? "*" : "")
                        }
                        rows={5}
                        {...register(fieldItem.label, {
                          required: fieldItem.required,
                        })}
                      />
                    )}

                    {(fieldItem.type !== "textarea" && fieldItem.type !== "select" && fieldItem.type !== "date") && (
                      <input
                        className={classNames(
                          "block border rounded-assets w-full px-4 py-3.5 focus:outline-none focus:shadow-lg text-neutral-800 placeholder:text-neutral-400"
                        )}
                        type={fieldItem.type}
                        {...register(fieldItem.label, {
                          required: fieldItem.required,
                          pattern: getRegEx(fieldItem.type),

                        })}
                        placeholder={
                          fieldItem.placeholder ??
                          fieldItem.label + (fieldItem.required ? "*" : "")
                        }
                      />
                    )}
                    
                  </div>
                ))}
              <div className={classNames("col-span-2 flex flex-col")}>
                
                {submitButton ? (
                  <Button
                    variant={submitButton.buttonVariant ?? "black"}
                    size="lg"
                    type="submit"
                  >
                    {submitButton.text}
                  </Button>
                ) : (
                  <Button
                    variant="black"
                    size="lg"
                    type="submit"
                  >
                    SUBMIT
                  </Button>
                )}
              </div>
            </form>
          </div>
        </div>
      </Container>
    </section>
  );
}