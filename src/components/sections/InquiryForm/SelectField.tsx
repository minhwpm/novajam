import ReactSelect from "react-select";
import { useController } from "react-hook-form";
import { FormFieldType } from "@/helpers/types";
import { Control, UseFormRegister } from "react-hook-form/dist/types/form";
import { FormValues } from "./InquiryForm";

export const SelectField: React.FC<{
  data: FormFieldType;
  control: Control<FormValues, any>;
  register: UseFormRegister<FormValues>;
}> = ({ data, control, register }) => {
  const { field } = useController({
    name: data.label,
    control,
    rules: { required: data.required },
  });
  return (
    <ReactSelect
      className="rounded-assets w-full"
      options={data.options.map(option => {
        return {
          label: option,
          value: option
        }
      })}
      styles={{
        control: (baseStyles) => ({
          ...baseStyles,
          padding: "8px 6px",
          borderColor: "rgb(212 212 212)",
          borderRadius: "var(--border-radius-assets)",
        }),
      }}
      placeholder={(
        <div className="text-neutral-500">
          {data.label + (data.required ? "*" : "")}
        </div>
      )}
      {...register(data.label, {
        required: data.required,
      })}
      onChange={(value) => {
        field.onChange(value)
      }}
    />
  )
}