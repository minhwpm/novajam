import { DatePicker } from "@/components/elements/DatePicker/DatePicker"
import { FormFieldType } from "@/helpers/types";
import { Control, UseFormRegister } from "react-hook-form/dist/types/form";
import { FormValues } from "./InquiryForm";

export const DatePickerField: React.FC<{
  data: FormFieldType;
  control: Control<FormValues, any>;
  register: UseFormRegister<FormValues>;
}> = ({ data, control, register }) => {
  return (
    <DatePicker
      className="w-full border border-neutral-300 rounded-assets px-4 py-3.5 cursor-pointer focus:outline-none focus:shadow-lg text-neutral-800 placeholder:text-neutral-500"
      placeholder={
        data.placeholder ??
        data.label + (data.required ? "*" : "")
      }
      control={control}
      {...register(data.label, {
        required: data.required,
      })}
      required={data.required}
    />
  )
}