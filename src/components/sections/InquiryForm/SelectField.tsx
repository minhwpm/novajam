import ReactSelect from "react-select";
import { useController } from "react-hook-form";
import { FormFieldType } from "@/lib/types";
import { Control } from "react-hook-form/dist/types/form";
import { FormValues } from "./InquiryForm";
import { useEffect, useState } from "react";

export const SelectField: React.FC<{
  data: FormFieldType;
  control: Control<FormValues>;
}> = ({ data, control }) => {
  const { field } = useController({
    name: data.label,
    control,
    rules: { required: data.required },
  });
  const [isClient, setIsClient] = useState(false)
  useEffect(() => { // for fixing hydration warnings and errors
    setIsClient(true)
  }, [])
  
  return isClient ? (
    <ReactSelect
      className="w-full"
      name={data.label}
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
          borderRadius: "var(--border-radius-theme-button)",
        }),
      }}
      placeholder={(
        <div className="text-neutral-500">
          {data.label + (data.required ? "*" : "")}
        </div>
      )}
      onChange={(selectedOption) => {
        field.onChange(selectedOption?.value)
      }}
    />
  ) : null
}