import { Select } from "@/components/elements/Select/Select";
import { FormFieldType } from "@/helpers/types";
import { Control, UseFormRegister } from "react-hook-form/dist/types/form";
import { FormValues } from "./InquiryForm";

export const SelectField: React.FC<{
  data: FormFieldType;
  control: Control<FormValues, any>;
  register: UseFormRegister<FormValues>;
}> = ({ data, control, register }) => {
  return (
    <Select
      className="rounded-assets w-full"
      control={control}
      options={data.options.map(option => {
        return {
          label: option,
          value: option
        }
      })}
      placeholder={(
        <div className="text-neutral-500">
          {data.placeholder ?? data.label}
        </div>
      )}
      {...register(data.label, {
        required: data.required,
      })}
    />
  )
}