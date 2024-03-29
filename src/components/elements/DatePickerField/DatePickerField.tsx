import { useController, UseControllerProps } from "react-hook-form";
import DatePicker from "react-datepicker"
import { FormFieldType } from "@/helpers/types";
import { UseFormRegister } from "react-hook-form/dist/types/form";
import { FormValues } from "@/components/sections/InquiryForm/InquiryForm";
import { CiCalendar } from "react-icons/ci";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "../Button/Button";

interface Props extends UseControllerProps {
  data: FormFieldType;
  register: UseFormRegister<FormValues>;
  showTimeSelect?: boolean
  dateFormat: "DD/MM/YYYY" | "MM/DD/YYYY" | "YYYY/MM/DD"
}

const dateFormatMatching = {
  "DD/MM/YYYY": "dd/MM/yyyy",
  "MM/DD/YYYY": "MM/dd/yyyy",
  "YYYY/MM/DD": "yyyy/MM/dd",
}

export function DatePickerField({ data, control, showTimeSelect, dateFormat = "DD/MM/YYYY" }: Props) {
  const { label, required } = data
  const {
    field,
  } = useController({
    name: label,
    control,
    rules: {required: required}
  })

  // @TODO format Datetime value sent to CMS
  return (
    <DatePicker
      className="w-full border border-neutral-300 rounded-assets px-4 py-3.5 cursor-pointer focus:outline-none focus:shadow-lg text-neutral-800 placeholder:text-neutral-500"
      placeholderText={label + (required ? "*" : "")}
      selected={field.value}
      onChange={(date) => {
        console.log(date, field.value)
        field.onChange(date);
      }}
      onFocus={e => e.target.blur()} //to prevent edit by typing
      showTwoColumnMonthYearPicker
      showTimeInput={showTimeSelect}
      dateFormat={showTimeSelect ? `${dateFormatMatching[dateFormat]} - h:mma` : dateFormatMatching[dateFormat]}
      isClearable
    />
  );
}