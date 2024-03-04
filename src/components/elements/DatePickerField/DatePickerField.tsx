import { useController, UseControllerProps } from "react-hook-form";
import DatePicker from "react-datepicker"
import { FormFieldType } from "@/helpers/types";
import { UseFormRegister } from "react-hook-form/dist/types/form";
import { FormValues } from "@/components/sections/InquiryForm/InquiryForm";
import "react-datepicker/dist/react-datepicker.css";

interface Props extends UseControllerProps {
  data: FormFieldType;
  register: UseFormRegister<FormValues>;
  showTimeSelect?: boolean
}

export function DatePickerField({ data, control, showTimeSelect }: Props) {
  const { label, required } = data
  const {
    field,
  } = useController({
    name: label,
    control,
    rules: {required: required}
  })

  return (
    <DatePicker
      className="w-full border border-neutral-300 rounded-assets px-4 py-3.5 cursor-pointer focus:outline-none focus:shadow-lg text-neutral-800 placeholder:text-neutral-500"
      placeholderText={label + (required ? "*" : "")}
      selected={field.value}
      onChange={(date) => {
        field.onChange(date);
      }}
      showTimeSelect={showTimeSelect}
      dateFormat={showTimeSelect ? "d MMMM, yyyy - h:mma" : "d MMMM, yyyy"}
    />
  );
}