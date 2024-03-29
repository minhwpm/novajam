"use client"
import classNames from "classnames";
import { useForm } from "react-hook-form";
import { Button } from "@/components/elements/Button/Button";
import { Container }from "@/components/elements/Container/Container";
import { InquiryFormType } from "@/helpers/types";
import { RichText2 } from "@/components/elements/RichText/RichText2";
import { InputField } from "./InputField";
import { TextAreaField } from "./TextAreaField";
import { SelectField } from "./SelectField";
import { DatePickerField } from "@/components/elements/DatePickerField/DatePickerField";
import * as Toast from '@radix-ui/react-toast';
import { AiOutlineClose, AiOutlineLoading3Quarters } from "react-icons/ai";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { RiErrorWarningLine } from "react-icons/ri";

export type FormValues = {
  [x: string]: string;
}

type Props = {
  data: InquiryFormType,
}
export const InquiryForm: React.FC<Props> = ({ data }) => {
  const { title, heading, eyebrow, summary, description, formType, fields, dateFormat, submitButton, successMessage, errorMessage, backgroundImage, htmlid } = data;
  const { register, control, handleSubmit, reset, getValues, formState: { errors, isSubmitting, isSubmitted, isSubmitSuccessful } } = useForm<FormValues>();
  
  console.log("FORM ERRORS", errors)
  console.log("FORM VALUES", getValues())

  async function onSubmitValid(formValues: FormValues) {
    try {
      await fetch(`/api/inquiry-form-submission/`, {
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
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <>
      <section
        id={htmlid}
        style={
          backgroundImage
            ? {
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
            <div
              className={classNames(
                "col-span-12 lg:col-span-5 flex flex-col items-center lg:items-start",
                { "text-white drop-shadow-lg": backgroundImage }
              )}
            >
              {eyebrow && (
                <div
                  className={classNames(
                    "tracking-widest font-semibold text-center lg:text-start mb-2"
                  )}
                >
                  {eyebrow}
                </div>
              )}
              {heading && (
                <div
                  className={classNames(
                    "text-heading leading-tight font-heading tracking-wide text-center lg:text-start mb-5"
                  )}
                >
                  <RichText2 data={heading} />
                </div>
              )}
              {summary && (
                <div
                  className={classNames(
                    "prose-lg lg:prose-xl max-w-xl lg:max-w-3xl text-center lg:text-start mb-5"
                  )}
                >
                  {summary}
                </div>
              )}
              {description && (
                <div
                  className={classNames("prose 2xl:prose-lg", {
                    "text-white drop-shadow-lg": backgroundImage,
                  })}
                >
                  <RichText2 data={description} />
                </div>
              )}
            </div>
            <div className="col-span-12 lg:col-span-7">
              <form
                className={classNames(
                  "bg-white first-letter:max-w-xl mx-auto lg:mr-0 grid grid-cols-2 gap-x-5 gap-y-3 px-8 pt-6 pb-12 rounded-assets",
                  { "bg-opacity-90": backgroundImage },
                  { "gap-x-0": fields.length === 1 }
                )}
                onSubmit={handleSubmit(onSubmitValid)}
                // onSubmit={handleSubmit(() => console.log("Submitting"))}
                // onSubmit={handleSubmit(createIFSubmission)}
              >
                {fields.length > 0 &&
                  fields.map((fieldItem) => (
                    <div
                      key={fieldItem.id}
                      className={classNames(
                        "relative col-span-2 flex flex-col",
                        { "md:col-span-1": fieldItem.uiWidth === "half-size" }
                      )}
                    >
                      <div className="text-xs text-red-500 h-6 pt-1 pl-4">
                        {errors[fieldItem.label]?.type === "required" && (
                          <p>required * </p>
                        )}
                        {errors[fieldItem.label]?.type === "pattern" && (
                          <p>Wrong format. Please try again. </p>
                        )}
                      </div>
                      {fieldItem.helpText && (
                        <div className="text-neutral-800 pl-2 pb-2">
                          {fieldItem.helpText}
                        </div>
                      )}
                      {fieldItem.fieldType === "select" && (
                        <SelectField
                          data={fieldItem}
                          control={control}
                          register={register}
                        />
                      )}
                      {fieldItem.fieldType === "date" && (
                        <DatePickerField
                          name={fieldItem.label}
                          data={fieldItem}
                          control={control}
                          register={register}
                          dateFormat={dateFormat}
                        />
                      )}
                      {fieldItem.fieldType === "datetime" && (
                        <DatePickerField
                          name={fieldItem.label}
                          data={fieldItem}
                          control={control}
                          register={register}
                          showTimeSelect={true}
                          dateFormat={dateFormat}
                        />
                      )}
                      {fieldItem.fieldType === "textarea" && (
                        <TextAreaField data={fieldItem} register={register} />
                      )}
                      {fieldItem.fieldType !== "textarea" &&
                        fieldItem.fieldType !== "select" &&
                        fieldItem.fieldType !== "date" &&
                        fieldItem.fieldType !== "datetime" && (
                          <InputField data={fieldItem} register={register} />
                        )}
                    </div>
                  ))}
                <div className={classNames("col-span-2 flex flex-col mt-6")}>
                  <Button
                    variant={submitButton?.buttonVariant ?? "black"}
                    size="lg"
                    type="submit"
                  >
                    {submitButton?.text ?? "Submit"}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </Container>
      </section>
      {isSubmitting && (
        <Toast.Provider swipeDirection="right" duration={100000}>
          <Toast.Root className="data-[state=open]:animate-fadeIn">
            <AiOutlineLoading3Quarters className="animate-spin text-primary-500" size={50} />
          </Toast.Root>
          <Toast.Viewport className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col p-6 m-0 w-24 max-w-full z-50" />
        </Toast.Provider>
      )}
      {isSubmitted && isSubmitSuccessful && (
        <Toast.Provider swipeDirection="right" duration={10000}>
          <Toast.Root
            className="relative bg-primary-50 rounded-assets border border-primary-300 shadow-lg p-8 data-[state=open]:animate-fadeIn"
            onOpenChange={(open: boolean) => {
              if (!open) {
                reset();
              }
            }}
          >
            <Toast.Close className="absolute top-2 right-2">
              <AiOutlineClose className="cursor-pointer ml-auto w-10 h-10 p-2 rounded-full text-primary-500 hover:bg-primary-100 transition-all duration-300 ease-in-out" />
            </Toast.Close>
            <IoMdCheckmarkCircleOutline
              className="text-green-600 m-auto"
              size="50"
            />
            <Toast.Title className="mt-4 font-heading xl:text-lg text-center">
              {successMessage}
            </Toast.Title>
          </Toast.Root>
          <Toast.Viewport className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col m-0 p-4 md:p-6 w-96 max-w-full z-[999999999]" />
        </Toast.Provider>
      )}
      {isSubmitted && !isSubmitSuccessful && (
        <Toast.Provider swipeDirection="right" duration={10000}>
          <Toast.Root className="relative bg-primary-50 rounded-assets border border-primary-300 shadow-lg p-8 data-[state=open]:animate-fadeIn">
            <Toast.Close className="absolute top-2 right-2">
              <AiOutlineClose className="cursor-pointer ml-auto w-10 h-10 p-2 rounded-full text-primary-500 hover:bg-primary-100 transition-all duration-300 ease-in-out" />
            </Toast.Close>
            <RiErrorWarningLine className="text-red-600 m-auto" size="50" />
            <Toast.Title className="mt-4 font-heading xl:text-lg text-center">
              {errorMessage}
            </Toast.Title>
          </Toast.Root>
          <Toast.Viewport className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col m-0 p-4 md:p-6 w-96 max-w-full z-[999999999]" />
        </Toast.Provider>
      )}
    </>
  );
}