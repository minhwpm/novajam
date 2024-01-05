"use client"
import classNames from "classnames";
import  { useForm }  from "react-hook-form";
import { Button } from "@/components/elements/Button/Button";
import { Container }from "@/components/elements/Container/Container";
import { InquiryFormType } from "@/helpers/types";
import { RichText2 } from "@/components/elements/RichText/RichText2";
import { InputField } from "./InputField";
import { TextAreaField } from "./TextAreaField";
import { SelectField } from "./SelectField";
import { DatePicker } from "@/components/elements/DatePicker/DatePicker";

export type FormValues = {
  [x: string]: string;
}

export const InquiryForm: React.FC<{data: InquiryFormType}> = ({ data }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { title, heading, label, subheading, description, formType, fields, submitButton, backgroundImage, htmlid } = data
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
          formType: formType,
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
  // console.log("FORM STATE", errors)
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
    >
      <Container>
        <div className="grid grid-cols-12 gap-y-10 md:gap-x-10 my-24">
          <div className={classNames("col-span-12 lg:col-span-5 flex flex-col items-center lg:items-start",
            {"text-white drop-shadow-lg": backgroundImage}
          )}>
            {label && (
              <div className={classNames("tracking-widest font-semibold text-center lg:text-start mb-2 text-secondary-500")}>
                {label}
              </div>
            )}
            {heading && (
              <div className={classNames("text-heading leading-tight font-heading tracking-wide text-center lg:text-start mb-5")}>
                <RichText2 data={heading} />
              </div>
            )}
            {subheading && (
              <div className={classNames("prose-lg lg:prose-xl max-w-xl lg:max-w-3xl text-center lg:text-start mb-5")}>
                {subheading}
              </div>
            )}
            {description && (
              <div className={classNames("prose lg:prose-lg",
                { "text-white drop-shadow-lg": backgroundImage}
              )}>
                <RichText2 data={description} />
              </div>
            )}
          </div>
          <div className="col-span-12 lg:col-span-7">
            <form
              className={classNames(
                "max-w-xl mx-auto lg:mr-0 grid grid-cols-2 gap-x-5 gap-y-3 px-8 pt-6 pb-12 rounded-assets",
                { "bg-neutral-50 bg-opacity-70": backgroundImage },
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
                    {fieldItem.fieldType === "select" && (
                      <SelectField data={fieldItem} control={control} register={register} />
                    )}
                    {fieldItem.fieldType === "date" && (
                      <DatePicker name={fieldItem.label} data={fieldItem} control={control} register={register} />
                    )}
                    {fieldItem.fieldType === "datetime" && (
                      <DatePicker name={fieldItem.label} data={fieldItem} control={control} register={register} showTimeSelect={true} />
                    )}
                    {fieldItem.fieldType === "textarea" && (
                      <TextAreaField data={fieldItem} register={register} />
                    )}

                    {(fieldItem.fieldType !== "textarea" && fieldItem.fieldType !== "select" && fieldItem.fieldType !== "date") && (
                      <InputField data={fieldItem} register={register} />
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